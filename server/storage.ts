import { users, type User, type InsertUser, waitlistEntries, type WaitlistEntry, type InsertWaitlistEntry } from "@shared/schema";
import { 
  DynamoDBClient, 
  CreateTableCommand,
  DescribeTableCommand,
  ResourceNotFoundException
} from "@aws-sdk/client-dynamodb";
import { 
  DynamoDBDocumentClient, 
  PutCommand, 
  GetCommand, 
  ScanCommand, 
  QueryCommand 
} from "@aws-sdk/lib-dynamodb";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getWaitlistEntries(): Promise<WaitlistEntry[]>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
}

/**
 * Memory-based storage implementation
 */
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlist: Map<number, WaitlistEntry>;
  currentUserId: number;
  currentWaitlistId: number;

  constructor() {
    this.users = new Map();
    this.waitlist = new Map();
    this.currentUserId = 1;
    this.currentWaitlistId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    return Array.from(this.waitlist.values());
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    return Array.from(this.waitlist.values()).find(
      (entry) => entry.email === email,
    );
  }

  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const id = this.currentWaitlistId++;
    const createdAt = new Date().toISOString();
    const entry: WaitlistEntry = { 
      ...insertEntry, 
      id, 
      createdAt,
      company: insertEntry.company || null 
    };
    this.waitlist.set(id, entry);
    return entry;
  }
}

/**
 * DynamoDB-based storage implementation
 */
export class DynamoDBStorage implements IStorage {
  private client: DynamoDBClient;
  private docClient: DynamoDBDocumentClient;
  private usersTableName = 'WaitlistAppUsers';
  private waitlistTableName = 'WaitlistAppEntries';
  initialized: boolean = false;

  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      }
    });
    
    this.docClient = DynamoDBDocumentClient.from(this.client);
    
    // Initialize tables
    this.init().catch(err => {
      console.error("Failed to initialize DynamoDB tables:", err);
    });
  }

  private async init(): Promise<void> {
    if (this.initialized) return;
    
    try {
      // Check if users table exists
      await this.ensureTableExists(this.usersTableName, {
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'N' },
          { AttributeName: 'username', AttributeType: 'S' }
        ],
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' }
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: 'UsernameIndex',
            KeySchema: [
              { AttributeName: 'username', KeyType: 'HASH' }
            ],
            Projection: {
              ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      });

      // Check if waitlist entries table exists
      await this.ensureTableExists(this.waitlistTableName, {
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'N' },
          { AttributeName: 'email', AttributeType: 'S' }
        ],
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' }
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: 'EmailIndex',
            KeySchema: [
              { AttributeName: 'email', KeyType: 'HASH' }
            ],
            Projection: {
              ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5
            }
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      });

      this.initialized = true;
      console.log("DynamoDB tables are ready");
    } catch (error) {
      console.error("Error initializing DynamoDB tables:", error);
      throw error;
    }
  }

  private async ensureTableExists(tableName: string, tableDefinition: any): Promise<void> {
    try {
      // Check if table already exists
      await this.client.send(new DescribeTableCommand({ TableName: tableName }));
      console.log(`Table ${tableName} already exists`);
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        // Table doesn't exist, create it
        console.log(`Creating table ${tableName}...`);
        const createTableCommand = new CreateTableCommand({
          TableName: tableName,
          ...tableDefinition
        });
        
        await this.client.send(createTableCommand);
        console.log(`Table ${tableName} created successfully`);
        
        // Wait for the table to be created
        console.log(`Waiting for table ${tableName} to be available...`);
        let tableIsActive = false;
        while (!tableIsActive) {
          try {
            const { Table } = await this.client.send(
              new DescribeTableCommand({ TableName: tableName })
            );
            tableIsActive = Table?.TableStatus === "ACTIVE";
            if (!tableIsActive) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          } catch (error) {
            console.error(`Error checking table status for ${tableName}:`, error);
            throw error;
          }
        }
        console.log(`Table ${tableName} is now active and ready to use`);
      } else {
        console.error(`Error checking if table ${tableName} exists:`, error);
        throw error;
      }
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    await this.init();
    
    const params = {
      TableName: this.usersTableName,
      Key: { id }
    };
    
    try {
      const { Item } = await this.docClient.send(new GetCommand(params));
      return Item as User | undefined;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    await this.init();
    
    const params = {
      TableName: this.usersTableName,
      IndexName: 'UsernameIndex',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    };
    
    try {
      const { Items } = await this.docClient.send(new QueryCommand(params));
      return Items && Items.length > 0 ? Items[0] as User : undefined;
    } catch (error) {
      console.error("Error getting user by username:", error);
      throw error;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    await this.init();
    
    // Get the next available ID
    const allUsers = await this.getAllUsers();
    const maxId = allUsers.reduce((max, user) => Math.max(max, user.id), 0);
    const nextId = maxId + 1;
    
    const user: User = {
      ...insertUser,
      id: nextId
    };
    
    const params = {
      TableName: this.usersTableName,
      Item: user
    };
    
    try {
      await this.docClient.send(new PutCommand(params));
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  private async getAllUsers(): Promise<User[]> {
    await this.init();
    
    const params = {
      TableName: this.usersTableName
    };
    
    try {
      const { Items } = await this.docClient.send(new ScanCommand(params));
      return (Items || []) as User[];
    } catch (error) {
      console.error("Error scanning users table:", error);
      throw error;
    }
  }

  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    await this.init();
    
    const params = {
      TableName: this.waitlistTableName
    };
    
    try {
      const { Items } = await this.docClient.send(new ScanCommand(params));
      return (Items || []) as WaitlistEntry[];
    } catch (error) {
      console.error("Error getting waitlist entries:", error);
      throw error;
    }
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    await this.init();
    
    const params = {
      TableName: this.waitlistTableName,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    };
    
    try {
      const { Items } = await this.docClient.send(new QueryCommand(params));
      return Items && Items.length > 0 ? Items[0] as WaitlistEntry : undefined;
    } catch (error) {
      console.error("Error getting waitlist entry by email:", error);
      throw error;
    }
  }

  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    await this.init();
    
    // Get the next available ID
    const allEntries = await this.getWaitlistEntries();
    const maxId = allEntries.reduce((max, entry) => Math.max(max, entry.id), 0);
    const nextId = maxId + 1;
    
    const entry: WaitlistEntry = {
      ...insertEntry,
      id: nextId,
      createdAt: new Date().toISOString(),
      company: insertEntry.company || null
    };
    
    const params = {
      TableName: this.waitlistTableName,
      Item: entry
    };
    
    try {
      await this.docClient.send(new PutCommand(params));
      return entry;
    } catch (error) {
      console.error("Error creating waitlist entry:", error);
      throw error;
    }
  }
}

// Create both storage options
const memStorage = new MemStorage();
let dynamoStorage: DynamoDBStorage | null = null;

// First, use memory storage as a safe default
let storageImplementation: IStorage = memStorage;

// Try to use DynamoDB storage
try {
  dynamoStorage = new DynamoDBStorage();
  
  // Initially use DynamoDB
  storageImplementation = dynamoStorage;
  
  // Check after 5 seconds if DynamoDB initialization was successful
  setTimeout(() => {
    if (dynamoStorage && !dynamoStorage.initialized) {
      console.warn("DynamoDB initialization is taking too long or failed. Using memory storage as fallback.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).storageImplementation = memStorage;
    }
  }, 5000);
} catch (error) {
  console.error("Failed to initialize DynamoDB storage:", error);
  console.warn("Using memory storage instead");
}

export const storage = storageImplementation;
