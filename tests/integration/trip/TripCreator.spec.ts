import { Driver } from "../../../src/modules/driver/domain/Driver";
import { Passenger } from "../../../src/modules/passenger/domain/Passenger";
import { MongoDB } from "../../../src/modules/shared/database/infrastructure/mongodb/MongoDB"
import { DriverObjectMother } from "../../shared/DriverObjectMother";
import { PassengerObjectMother } from "../../shared/PassengerObjectMother";
import { DriverMongooseRepository } from "../../../src/modules/driver/infrastructure/mongodb/DriverMongooseRepository"
import { PassengerMongooseRepository } from "../../../src/modules/passenger/infrastructure/mongodb/PassengerMongooseRepository"
import { TripCreator } from "../../../src/modules/trip/application/TripCreator";
import { TripMongooseRepository } from "../../../src/modules/trip/infrastructure/mongodb/TripMongooseRepository";
import { PassengerFinder } from "../../../src/modules/passenger/application/PassengerFinder";
import { DriverFinder } from "../../../src/modules/driver/application/DriverFinder";
import { Location } from "../../../src/modules/shared/location/domain/Location";
import { LocationObjectMother } from "../../shared/LocationObjectMother";

describe("Trip Creator", () => {
  const mongoDB = new MongoDB();
  const driverRepository = new DriverMongooseRepository()
  const passengerRepository = new PassengerMongooseRepository()
  const tripRepository = new TripMongooseRepository()

  let driver: Driver
  let passenger: Passenger
  let location: Location
  let passengerFinder: PassengerFinder
  let driverFinder: DriverFinder

  beforeAll(async () => {
    await mongoDB.connect();
  });

  beforeEach(async () => {
    driver = DriverObjectMother.available();
    passenger = PassengerObjectMother.random();
    location = LocationObjectMother.random();
    passengerFinder = new PassengerFinder(passengerRepository);
    driverFinder = new DriverFinder(driverRepository);
    await driverRepository.create(driver);
    await passengerRepository.create(passenger);
  });

  afterEach(async () => {
    await mongoDB.clear();
  })

  afterAll(async () => {
    await mongoDB.close();
  });

  it("When a trip is created, should set driver as not available", async () => {
    const tripCreator = new TripCreator(tripRepository, passengerFinder, driverFinder, driverRepository);
    await tripCreator.run({
      ...location,
      driverId: driver.id,
      passengerId: passenger.id,
    })

    const noAvaiableDriver = await driverRepository.find(driver.id);
    expect(noAvaiableDriver?.isAvailable).toBe(false);
  })
})