import { NotFoundError } from "../../shared/errors/domain/NotFoundError";
import { Passenger } from "../domain/Passenger";
import { PassengerRepository } from "../domain/PassengerRepository";

export class PassengerFinder {
  constructor(private readonly repository: PassengerRepository) { }

  async run(passengerId: string): Promise<Passenger> {
    const passenger = await this.repository.find(passengerId);
    if (!passenger) { throw new NotFoundError(`Passenger ${passengerId} not found.`) }
    return passenger
  }
}