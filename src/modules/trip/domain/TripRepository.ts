import { Trip } from "./Trip";

export interface TripRepository {
  create(trip: Trip): Promise<void>;
  find(tripId: string): Promise<Trip | null>;
  updateOne(trip: Trip): Promise<void>;
}