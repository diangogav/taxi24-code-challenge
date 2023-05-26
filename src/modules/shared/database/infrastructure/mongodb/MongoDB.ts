import mongoose from "mongoose";
import { Database } from "../../domain/Database";
import { config } from "../../../../../config";

export class MongoDB implements Database {
  async connect(): Promise<void> {
    await mongoose.connect(config.mongodb.uri);
    console.log("Connected to mongodb");
  }
}