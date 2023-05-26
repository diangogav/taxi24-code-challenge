import { Driver } from "../domain/Driver";
import { DriverGetterFilter } from "../domain/DriverGetterFilter";
import { DriverRepository } from "../domain/DriverRepository";

export class AvailableDriversGetter {
  private readonly MAX_DISTANCE_IN_METERS = 3000;

  constructor(private readonly repository: DriverRepository) { }

  async run({ latitude, longitude }: { latitude: number, longitude: number }): Promise<Driver[]> {
    const filter = new DriverGetterFilter().available();
    if (isFinite(Number(latitude)) && isFinite(Number(longitude))) {
      filter
        .nearestTo(Number(latitude), Number(longitude))
        .maxDistance(this.MAX_DISTANCE_IN_METERS)
    }
    const drivers = await this.repository.getBy(filter.value);
    return drivers;
  }
}