import { Location } from "../../shared/location/domain/Location";
import { Uuid } from "../../shared/value-objets/Uuid";

export class Driver {
  readonly id: string;
  readonly name: string;
  private _isAvailable: boolean;
  private _location: Location

  constructor({ id, name, isAvailable, location }: { id: string; name: string; isAvailable: boolean; location: Location }) {
    this.id = new Uuid(id).value;
    this.name = name;
    this._isAvailable = isAvailable;
    this._location = location
  }

  drive() {
    this._isAvailable = false;
  }

  completeTrip(latitude: number, longitude: number) {
    this._isAvailable = true;
    this._location = new Location({
      latitude,
      longitude
    })
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }

  get location(): Location {
    return this._location;
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      isAvailable: this._isAvailable,
      location: this._location
    }
  }

}