import { Location } from "../../../shared/location/domain/Location";
import { Driver } from "../../domain/Driver";
import { DriverFilter, DriverGetterFilterBuilder } from "../../domain/DriverGetterFilter";
import { DriverRepository } from "../../domain/DriverRepository";
import { DriverModel } from "./DriverModel";

export class DriverMongooseRepository implements DriverRepository {
  async updateOne(driver: Driver): Promise<void> {
    const { location, ...data } = driver;

    await DriverModel.updateOne(
      { id: driver.id },
      {
        $set: {
          ...data,
          isAvailable: driver.isAvailable,
          coordinates: [location.longitude, location.latitude]
        }
      }
    )
  }

  async getAvailablesNearestDrivers({
    latitude,
    longitude,
    maxDistanceInMeters,
    limit,
  }: {
    latitude?: number;
    longitude?: number;
    maxDistanceInMeters: number;
    limit: number;
  }): Promise<Driver[]> {
    const filterBuilder = new DriverGetterFilterBuilder().available();
    if (isFinite(Number(latitude)) && isFinite(Number(longitude))) {
      filterBuilder
        .nearestTo(Number(latitude), Number(longitude))
        .maxDistance(maxDistanceInMeters)
    }
    const filter = filterBuilder.value as DriverFilter
    if (!filter.nearest) {
      const data = await DriverModel.find(filter).limit(limit).lean();
      return data.map((item) => new Driver({
        ...item,
        location: new Location({
          latitude: item.coordinates[1],
          longitude: item.coordinates[0]
        })
      }))
    }

    const { nearest, maxDistanceInMeters: _maxDistanceInMeters, ...filterWithoutNearest } = filter;
    const data = await DriverModel.find({
      ...filterWithoutNearest,
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [nearest.longitude, nearest.latitude]
          },
          $maxDistance: _maxDistanceInMeters || 3000
        }
      }
    })
      .limit(limit)
      .lean();

    return data.map((item) => new Driver({
      ...item,
      location: new Location({
        latitude: item.coordinates[1],
        longitude: item.coordinates[0]
      })
    }))
  }

  async find(id: string): Promise<Driver | null> {
    const data = await DriverModel.findOne({ id }).lean();
    if (!data) { return null }
    return new Driver({
      ...data,
      location: new Location({
        latitude: data.coordinates[1],
        longitude: data.coordinates[0]
      })
    });
  }

  async get(): Promise<Driver[]> {
    const data = await DriverModel.find().lean();
    return data.map((item) => new Driver({
      ...item,
      location: new Location({
        latitude: item.coordinates[1],
        longitude: item.coordinates[0]
      })
    }))
  }

  async create(driver: Driver): Promise<void> {
    const { location, ...data } = driver;
    await DriverModel.create({
      ...data,
      isAvailable: driver.isAvailable,
      coordinates: [location.longitude, location.latitude]
    });
  }
}