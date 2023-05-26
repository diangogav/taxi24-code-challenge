import { Passenger } from "../domain/Passenger";
import { PassengerRepository } from "../domain/PassengerRepository";

export class PassengerGetter {
  constructor(private readonly repository: PassengerRepository) { }

  async run(): Promise<Passenger[]> {
    const passengers = await this.repository.get();
    return passengers;
  }
}