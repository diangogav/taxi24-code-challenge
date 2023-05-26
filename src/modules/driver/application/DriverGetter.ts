import { Criteria } from "../../shared/criteria/domain/Criteria";
import { Driver } from "../domain/Driver";
import { DriverGetterFilter } from "../domain/DriverGetterFilter";
import { DriverRepository } from "../domain/DriverRepository";

export class DriverGetter {
  constructor(private readonly repository: DriverRepository) { }

  async run(filter: DriverGetterFilter): Promise<Driver[]> {
    const criteria = new Criteria(filter as { [key: string]: unknown });
    const drivers = await this.repository.get(criteria);
    return drivers;
  }
}