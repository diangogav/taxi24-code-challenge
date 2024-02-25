import { Filter } from "../../shared/criteria/domain/Filter";

export type TripFilter = {
  status: string;
  passengerId: string;
}

export class TripGetterFilter  {
  private filter: Partial<TripFilter> = {}

  status(status: string): TripGetterFilter {
    this.filter.status = status;
    return this;
  }

  passenger(passengerId: string): TripGetterFilter {
    this.filter.passengerId = passengerId;
    return this;
  }

  get value() {
    return this.filter;
  }

}