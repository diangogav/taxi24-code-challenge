import { Passenger } from "./Passenger";

export interface PassengerRepository {
  get(): Promise<Passenger[]>;
}