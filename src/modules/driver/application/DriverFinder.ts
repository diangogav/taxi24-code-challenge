import { Driver } from "../domain/Driver";
import { DriverRepository } from "../domain/DriverRepository";

export class DriverFinder {
  constructor(private readonly repository: DriverRepository) { }

  async run(driverId: string): Promise<Driver> {
    const driver = await this.repository.find(driverId);
    if (!driver) { throw new Error(`Driver ${driverId} not found.`) }
    return driver;
  }
}