# Waitlist Application

## Project Overview
A modern, professional waitlist website built with React and Express that collects user information for a startup. The application is designed to be deployed on AWS with DynamoDB for data storage.

## Architecture
- **Frontend**: React with TypeScript, TailwindCSS, and Shadcn/UI components
- **Backend**: Express.js with TypeScript
- **Storage**: AWS DynamoDB with automatic fallback to in-memory storage
- **Styling**: Professional theme using purple color scheme

## Recent Changes
- **2025-01-11**: Updated color scheme from blue to purple (hsl(270, 80%, 50%))
- **2025-01-11**: Implemented AWS DynamoDB storage integration with automatic fallback
- **2025-01-11**: Added comprehensive error handling for database operations
- **2025-01-11**: Created DynamoDB table setup for users and waitlist entries

## User Preferences
- Deploy on AWS rather than Replit
- Use modern, professional design aesthetic
- Prefer robust error handling with graceful fallbacks

## Technical Details
- DynamoDB tables: WaitlistAppUsers, WaitlistAppEntries
- Storage interface supports both DynamoDB and memory storage
- Automatic table creation with proper indexes
- Global secondary indexes for efficient querying by username and email

## Environment Variables
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY  
- AWS_REGION

## Files Structure
- `server/storage.ts` - Storage abstraction layer with DynamoDB implementation
- `server/routes.ts` - API routes for waitlist operations
- `client/src/` - React frontend components
- `shared/schema.ts` - Shared type definitions and validation schemas
- `theme.json` - Color scheme and design system configuration