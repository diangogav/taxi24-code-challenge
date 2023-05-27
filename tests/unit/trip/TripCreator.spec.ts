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

describe("Trip Creator", () => {
  let tripRepository: MockProxy<TripRepository>
  let driverFinder: MockProxy<DriverFinder>
  let passengerFinder: MockProxy<PassengerFinder>
  let driver: Driver
  let passenger: Passenger
  let location: Location

  beforeEach(() => {
    tripRepository = mock();
    driverFinder = mock();
    passengerFinder = mock();
    driver = DriverObjectMother.random();
    passenger = PassengerObjectMother.random();
    location = LocationObjectMother.random();
  })

  it("Should create a trip", async () => {
    driverFinder.run.mockResolvedValue(driver);
    passengerFinder.run.mockResolvedValue(passenger);
    const creator = new TripCreator(tripRepository, passengerFinder, driverFinder);
    await creator.run({ driverId: driver.id, passengerId: passenger.id, latitude: location.latitude, longitude: location.longitude });
    expect(driverFinder.run).toHaveBeenCalledWith(driver.id);
    expect(passengerFinder.run).toHaveBeenCalledWith(passenger.id);
  })
})