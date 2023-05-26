import { Driver } from "../../domain/Driver";
import { DriverFilter } from "../../domain/DriverGetterFilter";
import { DriverRepository } from "../../domain/DriverRepository";
import { DriverModel } from "./DriverModel";

export class DriverMongooseRepository implements DriverRepository {
  async getBy(filter: Partial<DriverFilter>): Promise<Driver[]> {
    if (!filter.nearest) {
      const data = await DriverModel.find(filter).lean();
      return data.map((item) => new Driver({
        ...item,
        location: {
          latitude: item.coordinates[1],
          longitude: item.coordinates[0]
        }
      }))
    }

    const { nearest, maxDistanceInMeters, ...filterWithoutNearest } = filter;
    const data = await DriverModel.find({
      ...filterWithoutNearest,
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [nearest.longitude, nearest.latitude]
          },
          $maxDistance: maxDistanceInMeters || 3000
        }
      }
    }).lean();

    return data.map((item) => new Driver({
      ...item,
      location: {
        latitude: item.coordinates[1],
        longitude: item.coordinates[0]
      }
    }))
  }
  async find(id: string): Promise<Driver | null> {
    const data = await DriverModel.findOne({ id }).lean();
    if (!data) { return null }
    return new Driver({
      ...data,
      location: {
        latitude: data.coordinates[1],
        longitude: data.coordinates[0]
      }
    });
  }
  async get(): Promise<Driver[]> {
    const data = await DriverModel.find().lean();
    return data.map((item) => new Driver({
      ...item,
      location: {
        latitude: item.coordinates[1],
        longitude: item.coordinates[0]
      }
    }))
  }
}