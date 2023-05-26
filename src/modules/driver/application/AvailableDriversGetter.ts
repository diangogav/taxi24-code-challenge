import { Criteria } from "../../shared/criteria/domain/Criteria";
import { Driver } from "../domain/Driver";
import { DriverGetterFilter } from "../domain/DriverGetterFilter";
import { DriverRepository } from "../domain/DriverRepository";

export class AvailableDriversGetter {
  private readonly MAX_DISTANCE_IN_METERS = 3000;

  constructor(private readonly repository: DriverRepository) { }

  async run({ latitude, longitude, limit }: { latitude?: number, longitude?: number, limit?: number }): Promise<Driver[]> {
    const filter = new DriverGetterFilter().available();
    if (isFinite(Number(latitude)) && isFinite(Number(longitude))) {
      filter
        .nearestTo(Number(latitude), Number(longitude))
        .maxDistance(this.MAX_DISTANCE_IN_METERS)
    }
    const criteria = new Criteria({ filter, limit })
    const drivers = await this.repository.getBy(criteria);
    return drivers;
  }
}