import { Criteria } from "../../../shared/criteria/domain/Criteria";
import { Driver } from "../../domain/Driver";
import { DriverRepository } from "../../domain/DriverRepository";
import { DriverModel } from "./DriverModel";

export class DriverMongooseRepository implements DriverRepository {
  async getByCriteria(criteria: Criteria): Promise<Driver[]> {
    const data = await DriverModel.find(criteria.filter).lean();
    return data.map((item) => new Driver({
      ...item,
      location: {
        latitude: item.coordinates[0],
        longitude: item.coordinates[1]
      }
    }))
  }
  async find(id: string): Promise<Driver | null> {
    const data = await DriverModel.findOne({ id }).lean();
    if (!data) { return null }
    return new Driver({
      ...data,
      location: {
        latitude: data.coordinates[0],
        longitude: data.coordinates[1]
      }
    });
  }
  async get(): Promise<Driver[]> {
    const data = await DriverModel.find().lean();
    return data.map((item) => new Driver({
      ...item,
      location: {
        latitude: item.coordinates[0],
        longitude: item.coordinates[1]
      }
    }))
  }
}