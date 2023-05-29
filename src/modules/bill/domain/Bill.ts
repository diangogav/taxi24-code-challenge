import { Location } from "../../shared/location/domain/Location";

export class Bill {
  readonly id: string;
  readonly driverName: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly startLocation: Location;
  readonly endLocation: Location;

  constructor({
    id,
    driverName,
    startDate,
    endDate,
    startLocation,
    endLocation,
  }: {
    id: string;
    driverName: string;
    startDate: Date;
    endDate: Date;
    startLocation: Location;
    endLocation: Location;
  }) {
    this.id = id;
    this.driverName = driverName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
  }

}