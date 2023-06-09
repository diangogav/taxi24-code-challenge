import { MockProxy, mock } from "jest-mock-extended"
import { TripCreator } from "../../../src/modules/trip/application/TripCreator"
import { TripRepository } from "../../../src/modules/trip/domain/TripRepository"
import { DriverFinder } from "../../../src/modules/driver/application/DriverFinder"
import { PassengerFinder } from "../../../src/modules/passenger/application/PassengerFinder"
import { Driver } from "../../../src/modules/driver/domain/Driver"
import { Passenger } from "../../../src/modules/passenger/domain/Passenger"
import { DriverObjectMother } from "../../shared/DriverObjectMother"
import { PassengerObjectMother } from "../../shared/PassengerObjectMother"
import { Location } from "../../../src/modules/shared/location/domain/Location"
import { LocationObjectMother } from "../../shared/LocationObjectMother"
import { DriverRepository } from "../../../src/modules/driver/domain/DriverRepository"
import { TripObjectMother } from "../../shared/TripObjectMother"

describe("Trip Creator", () => {
  let tripRepository: MockProxy<TripRepository>
  let driverFinder: MockProxy<DriverFinder>
  let passengerFinder: MockProxy<PassengerFinder>
  let driverRepository: MockProxy<DriverRepository>

  let driver: Driver
  let passenger: Passenger
  let location: Location

  beforeEach(() => {
    tripRepository = mock();
    driverFinder = mock();
    passengerFinder = mock();
    driverRepository = mock();
    driver = DriverObjectMother.available();
    passenger = PassengerObjectMother.random();
    location = LocationObjectMother.random();
  })

  it("Should create a trip", async () => {
    driverFinder.run.mockResolvedValue(driver);
    passengerFinder.run.mockResolvedValue(passenger);
    const creator = new TripCreator(tripRepository, passengerFinder, driverFinder, driverRepository);
    await creator.run({ driverId: driver.id, passengerId: passenger.id, latitude: location.latitude, longitude: location.longitude });
    expect(driverFinder.run).toHaveBeenCalledWith(driver.id);
    expect(passengerFinder.run).toHaveBeenCalledWith(passenger.id);
  })

  it("Should throw an error if passenger already in a active trip", async () => {
    const trip = new TripObjectMother()
      .withPassengerId(passenger.id)
      .withStatus("active")
      .value

    tripRepository.findBy.mockResolvedValue(trip);
    driverFinder.run.mockResolvedValue(driver);
    passengerFinder.run.mockResolvedValue(passenger);

    const creator = new TripCreator(tripRepository, passengerFinder, driverFinder, driverRepository);

    await expect(
      creator.run({ driverId: driver.id, passengerId: passenger.id, latitude: location.latitude, longitude: location.longitude })
    )
      .rejects
      .toThrowError();
  })

  it("Should throw an error if driver is not available", async () => {
    driver = new DriverObjectMother().withAvailable(false).value;
    driverFinder.run.mockResolvedValue(driver);
    passengerFinder.run.mockResolvedValue(passenger);

    const creator = new TripCreator(tripRepository, passengerFinder, driverFinder, driverRepository);

    await expect(
      creator.run({ driverId: driver.id, passengerId: passenger.id, latitude: location.latitude, longitude: location.longitude })
    )
      .rejects
      .toThrowError();
  })
})