import { randBoolean, randFullName, randUuid } from "@ngneat/falso";
import { Driver } from "../../src/modules/driver/domain/Driver";
import { Location } from "../../src/modules/shared/location/domain/Location";
import { LocationObjectMother } from "./LocationObjectMother";

export class DriverObjectMother {
  private instance: Driver
  private properties: Partial<Driver>

  constructor() {
    this.instance = DriverObjectMother.random();
    this.properties = {};
  }

  static random(): Driver {
    return new Driver({
      id: randUuid(),
      name: randFullName(),
      isAvailable: randBoolean(),
      location: new Location(LocationObjectMother.random())
    })
  }

  static available(): Driver {
    return new Driver({
      id: randUuid(),
      name: randFullName(),
      isAvailable: true,
      location: new Location(LocationObjectMother.random())
    })
  }

  get value(): Driver {
    return new Driver({
      ...this.instance.toPrimitives(),
      ...this.properties as Driver
    })
  }

  withId(id: string) {
    this.properties = {
      ...this.properties,
      id
    }

    return this;
  }

  withAvailable(available: boolean) {
    this.properties = {
      ...this.properties,
      isAvailable: available
    }

    return this;
  }
}