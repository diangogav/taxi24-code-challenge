import express, { Express } from "express";
import { loadRoutes } from "./routes";
import { config } from "../config";

export class Server {
  private readonly app: Express

  constructor() {
    this.app = express();
    loadRoutes(this.app);
  }

  initialize(): void {
    this.app.listen(config.port, () => {
      console.log("Server listen in port 3000");
    })
  }
}