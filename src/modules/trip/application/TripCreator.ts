import { DriverFinder } from "../../driver/application/DriverFinder";
import { DriverRepository } from "../../driver/domain/DriverRepository";
import { PassengerFinder } from "../../passenger/application/PassengerFinder";
import { Location } from "../../shared/location/domain/Location";
import { Trip } from "../domain/Trip";
import { TripRepository } from "../domain/TripRepository";

export class TripCreator {
  constructor(
    private readonly repository: TripRepository,
    private readonly passengerFinder: PassengerFinder,
    private readonly driverFinder: DriverFinder,
    private readonly driverRepository: DriverRepository
  ) { }

  async run({ driverId, passengerId, latitude, longitude }: { driverId: string; passengerId: string; latitude: number; longitude: number }): Promise<void> {
    const driver = await this.driverFinder.run(driverId);
    await this.passengerFinder.run(passengerId);
    const startLocation = new Location({ latitude, longitude });
    const trip = Trip.create({ driverId, passengerId, startLocation });
    await this.repository.create(trip);
    driver.drive();
    await this.driverRepository.updateOne(driver);
  }
}