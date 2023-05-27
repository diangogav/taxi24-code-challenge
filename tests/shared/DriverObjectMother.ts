import { randBoolean, randFullName, randUuid } from "@ngneat/falso";
import { Driver } from "../../src/modules/driver/domain/Driver";
import { Location } from "../../src/modules/shared/location/domain/Location";
import { LocationObjectMother } from "./LocationObjectMother";

export class DriverObjectMother {
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
}