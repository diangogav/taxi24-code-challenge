import { Passenger } from "./Passenger";

export interface PassengerRepository {
  get(): Promise<Passenger[]>;
  find(id: string): Promise<Passenger | null>;
}