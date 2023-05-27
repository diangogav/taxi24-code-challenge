import { randUuid } from "@ngneat/falso";
import { Trip } from "../../src/modules/trip/domain/Trip";
import { LocationObjectMother } from "./LocationObjectMother";

export class TripObjectMother {
  private instance: Trip
  private properties: Partial<Trip>

  constructor() {
    this.instance = TripObjectMother.random();
    this.properties = {};
  }

  withPassengerId(passengerId: string) {
    this.properties = {
      ...this.properties,
      passengerId
    }

    return this;
  }

  withStatus(status: "active" | "completed") {
    this.properties = {
      ...this.properties,
      status
    }

    return this;
  }

  get value(): Trip {
    return new Trip({
      ...this.instance,
      ...this.properties as Trip
    })
  }

  static random() {
    return new Trip({
      id: randUuid(),
      passengerId: randUuid(),
      driverId: randUuid(),
      status: "active",
      start: new Date(),
      startLocation: LocationObjectMother.random()
    })
  }

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