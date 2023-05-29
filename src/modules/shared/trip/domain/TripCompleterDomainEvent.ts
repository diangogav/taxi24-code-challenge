import { Location } from "../../location/domain/Location";

type TripCompleterDomainEventDTO = {
  driverName: string,
  startDate: Date,
  endDate: Date,
  startLocation: Location,
  endLocation: Location,
}
export class TripCompleterDomainEvent {
  static readonly DOMAIN_EVENT = "TRIP_COMPLETER";
  readonly data: TripCompleterDomainEventDTO

  constructor(data: TripCompleterDomainEventDTO) {
    this.data = data;
  }
}