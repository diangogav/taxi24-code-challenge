import { Driver } from "../domain/Driver";
import { DriverRepository } from "../domain/DriverRepository";

export class DriverGetter {
  constructor(private readonly repository: DriverRepository) {}

  async run(): Promise<Driver[]> {
    const drivers = await this.repository.get();
    return drivers;
  }
}