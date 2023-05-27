import { ConflictError } from "../../shared/errors/domain/ConflictError";
import { NotFoundError } from "../../shared/errors/domain/NotFoundError";
import { Location } from "../../shared/location/domain/Location";
import { Trip } from "../domain/Trip";
import { TripRepository } from "../domain/TripRepository";

export class TripCompleter {
  constructor(private readonly repository: TripRepository) { }

  async run({ tripId, latitude, longitude }: { tripId: string; latitude: number; longitude: number }): Promise<void> {
    const trip = await this.findTrip(tripId);
    this.ensureTripIsActive(trip);
    const endLocation = new Location({ latitude, longitude });
    const completedTrip = trip.complete({ endLocation });
    await this.repository.updateOne(completedTrip);
  }

  private async findTrip(tripId: string) {
    const trip = await this.repository.find(tripId);
    if (!trip) { throw new NotFoundError(`Trip ${tripId} not found.`) }
    return trip;
  }

  private ensureTripIsActive(trip: Trip) {
    if(trip.status === "completed") {
      throw new ConflictError(`Trip ${trip.id} is already completed.`);
    }
  }
}