import { Request, Response } from 'express';
import { TripCreator } from '../application/TripCreator';
import { TripMongooseRepository } from './mongodb/TripMongooseRepository';
import { DriverFinder } from '../../driver/application/DriverFinder';
import { DriverMongooseRepository } from '../../driver/infrastructure/mongodb/DriverMongooseRepository';
import { PassengerFinder } from '../../passenger/application/PassengerFinder';
import { PassengerMongooseRepository } from '../../passenger/infrastructure/mongodb/PassengerMongooseRepository';
import { TripCompleter } from '../application/TripCompleter';
import { TripGetter } from '../application/TripGetter';
import { InvalidArgumentError } from '../../shared/errors/domain/InvalidArgumentError';
import { BadRequestError } from '../../shared/errors/domain/BadRequestError';
import { SearchParamsCriteriaFiltersParser } from '../../shared/criteria/infrastructure/SearchParamsCriteriaFiltersParser';
import { Criteria } from '../../shared/criteria/domain/Criteria';

export class TripController {
  async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const repository = new TripMongooseRepository();
      const driverRepository = new DriverMongooseRepository();
      const driverFinder = new DriverFinder(driverRepository);
      const passengerFinder = new PassengerFinder(
        new PassengerMongooseRepository()
      );
      const creator = new TripCreator(
        repository,
        passengerFinder,
        driverFinder,
        driverRepository
      );
      await creator.run(body);
      res.status(200).json({});
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        throw new BadRequestError((<InvalidArgumentError>error).message);
      }

      throw error;
    }
  }

  async complete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { latitude, longitude } = req.body;
      const driverRepository = new DriverMongooseRepository();
      const completer = new TripCompleter(
        new TripMongooseRepository(),
        new DriverFinder(driverRepository),
        driverRepository
      );
      await completer.run({ tripId: id, latitude, longitude });
      res.status(200).json({});
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        throw new BadRequestError((<InvalidArgumentError>error).message);
      }

      throw error;
    }
  }

  async get(req: Request, res: Response) {
    const urlSearchParams = new URLSearchParams(req.url);
    const filters = SearchParamsCriteriaFiltersParser.parse(urlSearchParams);
    const criteria = Criteria.fromPrimitives(
      filters,
      urlSearchParams.get('orderBy'),
      urlSearchParams.get('order'),
      urlSearchParams.get('pageSize') ? parseInt(urlSearchParams.get('pageSize') as string, 10) : null,
      urlSearchParams.get('pageNumber') ? parseInt(urlSearchParams.get('pageNumber') as string, 10) : null,
    );
    const getter = new TripGetter(new TripMongooseRepository());
    const trips = await getter.run(criteria);
    res.status(200).json(trips);
  }
}
