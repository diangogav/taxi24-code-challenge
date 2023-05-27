import { DriverRepository } from "../domain/DriverRepository";

export class DriverGetter {
  constructor(private readonly repository: DriverRepository) { }

  async run(): Promise<{ [key: string]: unknown }[]> {
    const drivers = await this.repository.get();
    return drivers.map(driver => driver.toPrimitives());
  }
}