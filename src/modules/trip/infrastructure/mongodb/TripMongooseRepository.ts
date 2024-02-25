import { Criteria } from '../../../shared/criteria/domain/Criteria';
import { CriteriaToMongooseConverter } from '../../../shared/criteria/infrastructure/CriteriaToMongooseConverter';
import { Location } from '../../../shared/location/domain/Location';
import { Trip } from '../../domain/Trip';
import { TripGetterFilter } from '../../domain/TripGetterFilter';
import { TripRepository } from '../../domain/TripRepository';
import { TripModel } from './TripModel';

export class TripMongooseRepository implements TripRepository {
  async getBy(criteria: Criteria): Promise<Trip[]> {
    const query = new CriteriaToMongooseConverter().convert(criteria);
    const data = await TripModel.find(query.filters, null, query.options)
      .lean();

    return data.map(
      (item) =>
        new Trip({
          ...item,
          startLocation: new Location(item.startLocation),
          endLocation: item?.endLocation && new Location(item.endLocation),
        })
    );
  }

  async find(tripId: string): Promise<Trip | null> {
    const data = await TripModel.findOne({ id: tripId }).lean();
    if (!data) {
      return null;
    }
    return new Trip({
      ...data,
      startLocation: new Location(data.startLocation),
      endLocation: data?.endLocation && new Location(data.endLocation),
    });
  }

  async updateOne(trip: Trip): Promise<void> {
    await TripModel.updateOne({ id: trip.id }, { $set: trip });
  }

  async create(trip: Trip): Promise<void> {
    const instance = await new TripModel(trip).save();
    instance.save();
  }

  async findBy(filter: TripGetterFilter): Promise<Trip | null> {
    const data = await TripModel.findOne(filter.value).lean();
    if (!data) {
      return null;
    }
    return new Trip({
      ...data,
      startLocation: new Location(data.startLocation),
      endLocation: data?.endLocation && new Location(data.endLocation),
    });
  }
}
