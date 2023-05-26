import { Criteria } from "../../../shared/criteria/domain/Criteria";
import { Trip } from "../../domain/Trip";
import { TripRepository } from "../../domain/TripRepository";
import { TripModel } from "./TripModel";

export class TripMongooseRepository implements TripRepository {
  async getBy(criteria: Criteria): Promise<Trip[]> {
    const data = await TripModel
      .find(criteria.filter.value)
      .limit(criteria.limit)
      .lean();

    return data.map((item) => new Trip(item));
  }

  async find(tripId: string): Promise<Trip | null> {
    const data = await TripModel.findOne({ id: tripId }).lean();
    if (!data) { return null }
    return new Trip(data);
  }

  async updateOne(trip: Trip): Promise<void> {
    await TripModel.updateOne(
      { id: trip.id },
      { $set: trip }
    )
  }

  async create(trip: Trip): Promise<void> {
    const instance = await new TripModel(trip).save();
    instance.save();
  }
}