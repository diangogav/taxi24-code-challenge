import { Request, Response } from "express";
import { DriverGetter } from "../application/DriverGetter";
import { DriverMongooseRepository } from "./mongodb/DriverMongooseRepository";
import { DriverFinder } from "../application/DriverFinder";
import { DriverGetterFilter } from "../domain/DriverGetterFilter";

export class DriverController {
  async get(req: Request, res: Response) {
    const filter = new DriverGetterFilter(req.query);
    const getter = new DriverGetter(new DriverMongooseRepository());
    const drivers = await getter.run(filter);
    res.status(200).json(drivers);
  }

  async find(req: Request, res: Response) {
    const { id } = req.params; 
    const finder = new DriverFinder(new DriverMongooseRepository());
    const drivers = await finder.run(id);
    res.status(200).json(drivers);
  }
}