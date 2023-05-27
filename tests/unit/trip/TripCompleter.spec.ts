import { MockProxy, mock } from "jest-mock-extended"
import { TripCompleter } from "../../../src/modules/trip/application/TripCompleter"
import { TripRepository } from "../../../src/modules/trip/domain/TripRepository"
import { Trip } from "../../../src/modules/trip/domain/Trip"
import { TripObjectMother } from "../../shared/TripObjectMother"
import { Location } from "../../../src/modules/shared/location/domain/Location"
import { LocationObjectMother } from "../../shared/LocationObjectMother"
import { ApplicationError } from "../../../src/modules/shared/errors/domain/ApplicationError"
import { ConflictError } from "../../../src/modules/shared/errors/domain/ConflictError"

describe("Trip Completer", () => {
  let repository: MockProxy<TripRepository>
  let activeTrip: Trip
  let endLocation: Location

  beforeEach(() => {
    repository = mock();
    activeTrip = TripObjectMother.active();
    endLocation = LocationObjectMother.random();
  })

  it("Shoul complete an active trip", async () => {
    const completer = new TripCompleter(repository);
    repository.find.mockResolvedValue(activeTrip);
    await completer.run({ tripId: activeTrip.id, latitude: endLocation.latitude, longitude: endLocation.longitude })
  })

  it("Should throw conflict error if a completed trip is tried to complete", async () => {
    const completer = new TripCompleter(repository);
    const completedTrip = TripObjectMother.completed();
    repository.find.mockResolvedValue(completedTrip);

    try {
      await completer.run({ 
        tripId: completedTrip.id, 
        latitude:endLocation.latitude,
        longitude: endLocation.longitude
      })
    } catch (error) {
      expect(error instanceof ConflictError).toBe(true);
      expect((<ApplicationError>error).message).toBe(`Trip ${completedTrip.id} is already completed.`)
    }
  })
})