import { Request, Response } from "express";
import { DriverGetter } from "../application/DriverGetter";
import { DriverMongooseRepository } from "./mongodb/DriverMongooseRepository";
import { DriverFinder } from "../application/DriverFinder";

export class DriverController {
  async get(_req: Request, res: Response) {
    const getter = new DriverGetter(new DriverMongooseRepository());
    const drivers = await getter.run();
    res.status(200).json(drivers);
  }

  async find(req: Request, res: Response) {
    const { id } = req.params; 
    const finder = new DriverFinder(new DriverMongooseRepository());
    const drivers = await finder.run(id);
    res.status(200).json(drivers);
  }
}