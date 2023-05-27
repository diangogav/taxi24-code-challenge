import { DriverFinder } from "../../../src/modules/driver/application/DriverFinder";
import { Driver } from "../../../src/modules/driver/domain/Driver";
import { DriverMongooseRepository } from "../../../src/modules/driver/infrastructure/mongodb/DriverMongooseRepository";
import { MongoDB } from "../../../src/modules/shared/database/infrastructure/mongodb/MongoDB";
import { Location } from "../../../src/modules/shared/location/domain/Location";
import { TripCompleter } from "../../../src/modules/trip/application/TripCompleter"
import { Trip } from "../../../src/modules/trip/domain/Trip";
import { TripMongooseRepository } from "../../../src/modules/trip/infrastructure/mongodb/TripMongooseRepository"
import { DriverObjectMother } from "../../shared/DriverObjectMother";
import { LocationObjectMother } from "../../shared/LocationObjectMother";
import { TripObjectMother } from "../../shared/TripObjectMother";

describe("Trip Completer", () => {
  const mongoDB = new MongoDB();
  const tripRepository = new TripMongooseRepository();
  const driverRepository = new DriverMongooseRepository();

  let trip: Trip;
  let location: Location;
  let driver: Driver

  beforeAll(async () => {
    await mongoDB.connect();
  })

  beforeEach(async () => {
    trip = TripObjectMother.active();
    driver = new DriverObjectMother().withId(trip.driverId).withAvailable(false).value;
    location = LocationObjectMother.random();
    await tripRepository.create(trip);
    await driverRepository.create(driver);
  })

  afterEach(async () => {
    await mongoDB.clear();
  })

  afterAll(async () => {
    await mongoDB.close();
  })

  it("When a trip is completed, should set driver as available and set end position", async () => {
    expect(driver.isAvailable).toBe(false);
    const completer = new TripCompleter(tripRepository, new DriverFinder(driverRepository), driverRepository);
    await completer.run({
      ...location,
      tripId: trip.id,
    });

    const driverReleased = await driverRepository.find(driver.id);
    expect(driverReleased?.isAvailable).toBe(true);
    expect(driverReleased?.location.latitude).toBe(location.latitude);
    expect(driverReleased?.location.longitude).toBe(location.longitude);
  })
})