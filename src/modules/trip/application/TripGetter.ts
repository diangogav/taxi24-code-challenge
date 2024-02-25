import { Criteria } from "../../shared/criteria/domain/Criteria";
import { Trip } from "../domain/Trip";
import { TripRepository } from "../domain/TripRepository";

export class TripGetter {
  constructor(private readonly repository: TripRepository) { }

  async run(criteria: Criteria): Promise<Trip[]> {
    const trips = this.repository.getBy(criteria);
    return trips;
  }
}