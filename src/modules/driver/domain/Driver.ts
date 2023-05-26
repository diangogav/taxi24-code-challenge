import { Location } from "../../shared/location/domain/Location";

export class Driver {
  readonly id: string;
  readonly name: string;
  readonly isAvailable: boolean;
  readonly location: Location

  constructor({ id, name, isAvailable, location }: { id: string; name: string; isAvailable: boolean; location: Location }) {
    this.id = id;
    this.name = name;
    this.isAvailable = isAvailable;
    this.location = location
  }
}