import { Criteria } from "../../shared/criteria/domain/Criteria";
import { Driver } from "../domain/Driver";
import { DriverGetterFilter } from "../domain/DriverGetterFilter";
import { DriverRepository } from "../domain/DriverRepository";

export class AvailableDriversGetter {
  constructor(private readonly repository: DriverRepository) { }

  async run(): Promise<Driver[]> {
    const filter = new DriverGetterFilter({ isAvailable: true });
    const criteria = new Criteria(filter as { [key: string]: unknown })
    const drivers = await this.repository.getByCriteria(criteria);
    return drivers;
  }
}