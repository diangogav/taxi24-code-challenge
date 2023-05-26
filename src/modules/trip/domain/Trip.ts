import { Location } from "../../shared/location/domain/Location";
import { v4 as uuidv4 } from 'uuid';

export class Trip {
  readonly id: string;
  readonly passengerId: string;
  readonly driverId: string;
  readonly status: "active" | "completed";
  readonly start: Date;
  readonly startLocation: Location
  readonly endLocation?: Location
  readonly end?: Date;

  constructor({
    id,
    passengerId,
    driverId,
    status,
    start,
    startLocation,
    endLocation,
    end
  }: {
    id: string;
    passengerId: string;
    driverId: string;
    status: "active" | "completed";
    start: Date;
    startLocation: Location;
    endLocation?: Location;
    end?: Date;
  }) {
    this.id = id;
    this.passengerId = passengerId;
    this.driverId = driverId;
    this.status = status;
    this.start = start;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.end = end;
  }

  static create({ driverId, passengerId, startLocation }: { driverId: string, passengerId: string; startLocation: Location }) {
    return new Trip({
      id: uuidv4(),
      passengerId,
      driverId,
      status: "active",
      start: new Date(),
      startLocation
    })
  }

  complete({ endLocation }: { endLocation: Location }) {
    return new Trip({
      ...this,
      status: 'completed',
      endLocation
    });
  }

}