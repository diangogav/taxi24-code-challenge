import { Passenger } from "../domain/Passenger";
import { PassengerRepository } from "../domain/PassengerRepository";

export class PassengerCreator {
  constructor(private readonly repository: PassengerRepository) {}

  async run({ id, name }: { id: string; name: string }): Promise<void> {
    const passenger = new Passenger({ id, name });
    await this.repository.create(passenger);
  }
}
