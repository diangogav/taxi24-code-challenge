import mongoose from "mongoose";
import { Database } from "../../domain/Database";
import { config } from "../../../../../config";

export class MongoDB implements Database {
  async connect(): Promise<void> {
    await mongoose.connect(config.mongodb.uri);
    console.log("Connected to mongodb");
  }

  async close(): Promise<void> {
    await mongoose.disconnect()
    await mongoose.connection.close();
  }

  async clear(): Promise<void> {
    if(process.env.NODE_ENV !== "test") { return }
    const collections = mongoose.connection.collections;
    for(const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}