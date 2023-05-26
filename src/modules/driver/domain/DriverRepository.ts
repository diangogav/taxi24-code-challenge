import { Driver } from "./Driver";
import { DriverFilter } from "./DriverGetterFilter";

export interface DriverRepository {
  get(): Promise<Driver[]>;
  getBy(filter: Partial<DriverFilter>): Promise<Driver[]>;
  find(id: string): Promise<Driver | null>;
}