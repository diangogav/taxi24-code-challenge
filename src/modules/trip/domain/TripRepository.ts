import { Criteria } from "../../shared/criteria/domain/Criteria";
import { Trip } from "./Trip";
import { TripGetterFilter } from "./TripGetterFilter";

export interface TripRepository {
  create(trip: Trip): Promise<void>;
  find(tripId: string): Promise<Trip | null>;
  updateOne(trip: Trip): Promise<void>;
  getBy(criteria: Criteria): Promise<Trip[]>;
  findBy(filter: TripGetterFilter): Promise<Trip | null>;
}