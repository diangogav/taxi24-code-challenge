import "express-async-errors";
import express, { Express, Response, NextFunction, Request } from "express";
import { loadRoutes } from "./routes";
import { config } from "../config";
import bodyParser from "body-parser";
import { ApplicationError } from "../modules/shared/errors/domain/ApplicationError";
import { ServerError } from "../modules/shared/errors/domain/ServerError";

export class Server {
  private readonly app: Express

  constructor() {
    this.app = express();

    this.app.use(bodyParser.json());

    loadRoutes(this.app);

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
    this.app.listen(config.port, () => {
      console.log("Server listen in port 3000");
    })
  }
}