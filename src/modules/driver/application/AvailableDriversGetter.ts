import { Driver } from "../domain/Driver";
import { DriverRepository } from "../domain/DriverRepository";

export class AvailableDriversGetter {
  private readonly MAX_DISTANCE_IN_METERS = 3000;

  constructor(private readonly repository: DriverRepository) { }

  async run({ latitude, longitude, limit = 20 }: { latitude?: number, longitude?: number, limit?: number }): Promise<Driver[]> {
    const drivers = await this.repository.getAvailablesNearestDrivers({
      latitude,
      longitude,
      maxDistanceInMeters: this.MAX_DISTANCE_IN_METERS,
      limit
    });
    return drivers;
  }
}