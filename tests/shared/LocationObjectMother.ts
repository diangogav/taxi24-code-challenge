import { randLatitude, randLongitude } from "@ngneat/falso";
import { Location } from "../../src/modules/shared/location/domain/Location";

export class LocationObjectMother {
  static random(): Location {
    return new Location({
      latitude: randLatitude(),
      longitude: randLongitude()
    })
  }
}