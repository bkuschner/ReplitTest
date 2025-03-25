import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist API routes
  app.post("/api/waitlist", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const result = insertWaitlistSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }

      const { fullName, email, company } = result.data;
      
      // Check if email is already on the waitlist
      const existingEntry = await storage.getWaitlistEntryByEmail(email);
      if (existingEntry) {
        return res.status(409).json({ message: "This email is already on our waitlist" });
      }

      // Create new waitlist entry
      const newEntry = await storage.createWaitlistEntry({
        fullName,
        email,
        company,
      });

      res.status(201).json({ 
        message: "Successfully added to waitlist",
        data: newEntry
      });
    } catch (error) {
      console.error("Waitlist submission error:", error);
      res.status(500).json({ message: "An error occurred while processing your request" });
    }
  });

  app.get("/api/waitlist", async (req: Request, res: Response) => {
    try {
      const entries = await storage.getWaitlistEntries();
      res.status(200).json({ entries });
    } catch (error) {
      console.error("Error fetching waitlist entries:", error);
      res.status(500).json({ message: "Failed to fetch waitlist entries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
