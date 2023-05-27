import { DriverFinder } from "../../driver/application/DriverFinder";
import { DriverRepository } from "../../driver/domain/DriverRepository";
import { ConflictError } from "../../shared/errors/domain/ConflictError";
import { NotFoundError } from "../../shared/errors/domain/NotFoundError";
import { Location } from "../../shared/location/domain/Location";
import { Trip } from "../domain/Trip";
import { TripRepository } from "../domain/TripRepository";

export class TripCompleter {
  constructor(
    private readonly repository: TripRepository, 
    private readonly driverFinder: DriverFinder,
    private readonly driverRepository: DriverRepository
  ) { }

  async run({ tripId, latitude, longitude }: { tripId: string; latitude: number; longitude: number }): Promise<void> {
    const trip = await this.findTrip(tripId);
    const driver = await this.driverFinder.run(trip.driverId);
    this.ensureTripIsActive(trip);
    const endLocation = new Location({ latitude, longitude });
    const completedTrip = trip.complete({ endLocation });
    driver.completeTrip(latitude, longitude);
    await this.repository.updateOne(completedTrip);
    await this.driverRepository.updateOne(driver)
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