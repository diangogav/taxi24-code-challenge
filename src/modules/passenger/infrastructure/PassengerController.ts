import { Request, Response } from "express";
import { PassengerGetter } from "../application/PassengerGetter";
import { PassengerMongooseRepository } from "./mongodb/PassengerMongooseRepository";

export class PassengerController {
  async get(_req: Request, res: Response) {
    const getter = new PassengerGetter(new PassengerMongooseRepository());
    const passengers = await getter.run();
    res.status(200).json(passengers);
  }
}