import "express-async-errors";
import express, { Express, Response, NextFunction, Request } from "express";
import { loadRoutes } from "./routes";
import { config } from "../config";

export class Server {
  private readonly app: Express

  constructor() {
    this.app = express();
    loadRoutes(this.app);

    this.app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json((<Error>error).message);
      next();
    })
  }

  async initialize(): Promise<void> {
    this.app.listen(config.port, () => {
      console.log("Server listen in port 3000");
    })
  }
}