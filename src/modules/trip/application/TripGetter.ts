import { Criteria } from "../../shared/criteria/domain/Criteria";
import { Trip } from "../domain/Trip";
import { TripGetterFilter } from "../domain/TripGetterFilter";
import { TripRepository } from "../domain/TripRepository";

export class TripGetter {
  constructor(private readonly repository: TripRepository) { }

  async run({ status }: { status?: string }): Promise<Trip[]> {
    const filter = new TripGetterFilter();

    if (status) {
      filter.status(status);
    }

    const criteria = new Criteria({ filter });
    const trips = this.repository.getBy(criteria);

    return trips;
  }
}