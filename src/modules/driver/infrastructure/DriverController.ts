import { Request, Response } from "express";
import { DriverGetter } from "../application/DriverGetter";
import { DriverMongooseRepository } from "./mongodb/DriverMongooseRepository";
import { DriverFinder } from "../application/DriverFinder";
import { AvailableDriversGetter } from "../application/AvailableDriversGetter";

export class DriverController {
  async availables(req: Request, res: Response) {
    const getter = new AvailableDriversGetter(new DriverMongooseRepository());
    const { latitude, longitude } = req.query;
    console.log(req.query)
    const drivers = await getter.run({ latitude: Number(latitude), longitude: Number(longitude) });
    res.status(200).json(drivers);
  }

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