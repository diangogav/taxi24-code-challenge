import { Passenger } from "../../domain/Passenger";
import { PassengerRepository } from "../../domain/PassengerRepository";
import { PassengerModel } from "./PassegerModel";

export class PassengerMongooseRepository implements PassengerRepository {
  async get(): Promise<Passenger[]> {
    const data = await PassengerModel.find().lean();
    return data.map(item => new Passenger(item));
  }

  async find(id: string): Promise<Passenger | null> {
    const data = await PassengerModel.findOne({ id }).lean();
    if (!data) { return null }
    return new Passenger(data)
  }
}