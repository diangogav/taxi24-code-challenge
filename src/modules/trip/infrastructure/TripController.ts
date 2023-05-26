import { Request, Response } from "express";
import { TripCreator } from "../application/TripCreator";
import { TripMongooseRepository } from "./mongodb/TripMongooseRepository";
import { DriverFinder } from "../../driver/application/DriverFinder";
import { DriverMongooseRepository } from "../../driver/infrastructure/mongodb/DriverMongooseRepository";
import { PassengerFinder } from "../../passenger/application/PassengerFinder";
import { PassengerMongooseRepository } from "../../passenger/infrastructure/mongodb/PassengerMongooseRepository";
import { TripCompleter } from "../application/TripCompleter";
import { TripGetter } from "../application/TripGetter";

export class TripController {
  async create(req: Request, res: Response) {
    const body = req.body;
    const repository = new TripMongooseRepository();
    const driverFinder = new DriverFinder(new DriverMongooseRepository());
    const passengerFinder = new PassengerFinder(new PassengerMongooseRepository());

    const creator = new TripCreator(repository, passengerFinder, driverFinder);
    await creator.run(body);
    res.status(200).json({});
  }

  async complete(req: Request, res: Response) {
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    const completer = new TripCompleter(new TripMongooseRepository());
    await completer.run({ tripId: id, latitude, longitude });
    res.status(200).json({});
  }

  async get(req: Request, res: Response) {
    const { status } = req.query;
    const getter = new TripGetter(new TripMongooseRepository());
    const trips = await getter.run({ status: status as string });
    res.status(200).json(trips);

  }
}