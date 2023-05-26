import { Location } from "../../shared/location/domain/Location";
import { TripRepository } from "../domain/TripRepository";

export class TripCompleter {
  constructor(private readonly repository: TripRepository) { }

  async run({ tripId, latitude, longitude }: { tripId: string; latitude: number; longitude: number }): Promise<void> {
    const trip = await this.repository.find(tripId);
    if (!trip) { throw new Error(`Trip ${tripId} not found.`) }
    const endLocation = new Location({ latitude, longitude });
    const completedTrip = trip.complete({ endLocation });
    await this.repository.updateOne(completedTrip);
  }
}