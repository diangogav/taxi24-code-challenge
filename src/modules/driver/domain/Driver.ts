import { Location } from "../../shared/location/domain/Location";
import { Uuid } from "../../shared/value-objets/Uuid";

export class Driver {
  readonly id: string;
  readonly name: string;
  readonly isAvailable: boolean;
  readonly location: Location

  constructor({ id, name, isAvailable, location }: { id: string; name: string; isAvailable: boolean; location: Location }) {
    this.id = new Uuid(id).value;
    this.name = name;
    this.isAvailable = isAvailable;
    this.location = location
  }
}