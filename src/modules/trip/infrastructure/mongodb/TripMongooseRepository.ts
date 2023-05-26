import { Trip } from "../../domain/Trip";
import { TripRepository } from "../../domain/TripRepository";
import { TripModel } from "./TripModel";

export class TripMongooseRepository implements TripRepository {
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