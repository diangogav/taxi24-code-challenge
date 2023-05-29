import "express-async-errors";
import express, { Express, Response, NextFunction, Request } from "express";
import { loadRoutes } from "./routes";
import { config } from "../config";
import bodyParser from "body-parser";
import { ApplicationError } from "../modules/shared/errors/domain/ApplicationError";
import { ServerError } from "../modules/shared/errors/domain/ServerError";
import http from "http";
import { BillCreatorOnTripCompleted } from "../modules/bill/application/BilCreatorOnTripCompleted";
import { EventBus } from "../modules/shared/event-bus/EventBus";
import { BillMongooseRepository } from "../modules/bill/infrastructure/mongodb/BillMongooseRepository";

export class Server {
  private readonly app: Express;
  private connection: http.Server | null = null;

  constructor() {
    this.app = express();

    this.app.use(bodyParser.json());

    loadRoutes(this.app);
    this.registerSubscribers();

    this.app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof ApplicationError) {
        return res.status(error.statusCode).json(error.serialize());
      }

      const serverError = new ServerError((<Error>error).message);
      res.status(serverError.statusCode).json(serverError.serialize());
      next();
    })
  }

  async initialize(): Promise<void> {
    this.connection = this.app.listen(config.port, () => {
      console.log("Server listen in port 3000");
    })
  }

  async stop(): Promise<void> {
    if (!this.connection) { return }
    this.connection.close(() => {
      return Promise.resolve();
    });
  }

  registerSubscribers() {
    const eventBus = EventBus.getInstance();

    const subscriber = new BillCreatorOnTripCompleted(new BillMongooseRepository());

    eventBus.subscribe(BillCreatorOnTripCompleted.ListenTo, subscriber);
  }
}