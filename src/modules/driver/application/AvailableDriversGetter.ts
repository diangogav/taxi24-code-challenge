import { Driver } from "../domain/Driver";
import { DriverGetterFilter } from "../domain/DriverGetterFilter";
import { DriverRepository } from "../domain/DriverRepository";

export class AvailableDriversGetter {
  constructor(private readonly repository: DriverRepository) { }

  async run({ latitude, longitude }: { latitude: number, longitude: number }): Promise<Driver[]> {
    const filter = new DriverGetterFilter().available();
    if (isFinite(Number(latitude)) && isFinite(Number(longitude))) {
      filter.nearestTo(Number(latitude), Number(longitude));
    }
    const drivers = await this.repository.getBy(filter.value);
    return drivers;
  }
}