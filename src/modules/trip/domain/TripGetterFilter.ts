import { Filter } from "../../shared/criteria/domain/Filter";

export type TripFilter = {
  status: string;
}

export class TripGetterFilter implements Filter {
  private filter: Partial<TripFilter> = {}

  status(status: string) {
    this.filter.status = status;
  }

  get value() {
    return this.filter;
  }

}