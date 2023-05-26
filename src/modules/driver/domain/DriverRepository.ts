import { Driver } from "./Driver";

export interface DriverRepository {
  get(): Promise<Driver[]>;
}