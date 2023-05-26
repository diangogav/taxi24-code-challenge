import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGO_DB_URI) { throw new Error("MONGO_DB_URI env is required.") }

export const config = {
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGO_DB_URI
  }
}