import { Request, Response } from "express";
import { PassengerGetter } from "../application/PassengerGetter";
import { PassengerMongooseRepository } from "./mongodb/PassengerMongooseRepository";
import { PassengerFinder } from "../application/PassengerFinder";

export class PassengerController {
  async get(_req: Request, res: Response) {
    const getter = new PassengerGetter(new PassengerMongooseRepository());
    const passengers = await getter.run();
    res.status(200).json(passengers);
  }

  async find(req: Request, res: Response) {
    const { id } = req.params;
    const finder = new PassengerFinder(new PassengerMongooseRepository());
    const passenger = await finder.run(id);
    res.status(200).json(passenger);
  }
}