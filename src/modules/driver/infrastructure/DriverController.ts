import { Request, Response } from "express";
import { DriverGetter } from "../application/DriverGetter";
import { DriverMongooseRepository } from "./mongodb/DriverMongooseRepository";

export class DriverController {
  async get(_req: Request, res: Response) {
    const getter = new DriverGetter(new DriverMongooseRepository());
    const drivers = await getter.run();
    res.status(200).json(drivers);
  }
}