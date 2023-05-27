import { randFullName, randUuid } from "@ngneat/falso";
import { Passenger } from "../../src/modules/passenger/domain/Passenger";

export class PassengerObjectMother {
  static random(): Passenger {
    return new Passenger({
      id: randUuid(),
      name: randFullName(),
    })
  }
}