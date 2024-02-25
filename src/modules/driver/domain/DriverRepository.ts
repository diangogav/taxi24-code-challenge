import { Driver } from './Driver';

export interface DriverRepository {
  get(): Promise<Driver[]>;
  getAvailablesNearestDrivers({
    latitude,
    longitude,
    maxDistanceInMeters,
    limit,
  }: {
    latitude?: number;
    longitude?: number;
    maxDistanceInMeters: number;
    limit: number;
  }): Promise<Driver[]>;
  find(id: string): Promise<Driver | null>;
  updateOne(driver: Driver): Promise<void>;
}
