import { Request, Response } from "express";
import { PassengerGetter } from "../application/PassengerGetter";
import { PassengerMongooseRepository } from "./mongodb/PassengerMongooseRepository";
import { PassengerFinder } from "../application/PassengerFinder";
import { AvailableDriversGetter } from "../../driver/application/AvailableDriversGetter";
import { DriverMongooseRepository } from "../../driver/infrastructure/mongodb/DriverMongooseRepository";
import { PassengerTypeORMRepository } from "./mongodb/PassengerTypeORMRepository";
import { PassengerCreator } from "../application/PassengerCreator";
import { PgConnection } from "../../shared/database/infrastructure/postgres/PgConnection";

export class PassengerController {
  async create(req: Request, res: Response) {
    const transaction = PgConnection.getInstance();
    try {
      await transaction.openTransaction();
      const { id, name } = req.body;
      const passengerCreator = new PassengerCreator(
        new PassengerTypeORMRepository()
      );
      await passengerCreator.run({ id, name });
      await transaction.commit();

      res.status(200).json({});
    } catch (error) {
      await transaction.rollback();
      throw error;
    } finally {
      await transaction.closeTransaction();
    }
  }

  async get(_req: Request, res: Response) {
    // const getter = new PassengerGetter(new PassengerTypeORMRepository());
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

  async drivers(req: Request, res: Response) {
    const getter = new AvailableDriversGetter(new DriverMongooseRepository());
    const { latitude, longitude } = req.query;
    const limit = 3;
    const drivers = await getter.run({
      latitude: Number(latitude),
      longitude: Number(longitude),
      limit,
    });
    res.status(200).json(drivers.map((driver) => driver.toPrimitives()));
  }
}
