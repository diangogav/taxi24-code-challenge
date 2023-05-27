import { randUuid } from "@ngneat/falso";
import { Trip } from "../../src/modules/trip/domain/Trip";
import { LocationObjectMother } from "./LocationObjectMother";

export class TripObjectMother {
  static active() {
    return new Trip({
      id: randUuid(),
      passengerId: randUuid(),
      driverId: randUuid(),
      status: "active",
      start: new Date(),
      startLocation: LocationObjectMother.random()
    })
  }

  static completed() {
    return new Trip({
      id: randUuid(),
      passengerId: randUuid(),
      driverId: randUuid(),
      status: "completed",
      start: new Date(),
      startLocation: LocationObjectMother.random(),
      endLocation: LocationObjectMother.random(),
      end: new Date()
    })
  }
}