import { Driver } from "../../domain/Driver";
import { DriverRepository } from "../../domain/DriverRepository";
import { DriverModel } from "./DriverModel";

export class DriverMongooseRepository implements DriverRepository {
  async get(): Promise<Driver[]> {
    const data = await DriverModel.find();
    return data.map((item) => new Driver({ ...item.toJSON() }))
  }
}