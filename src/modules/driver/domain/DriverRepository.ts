import { Driver } from "./Driver";

export interface DriverRepository {
  get(): Promise<Driver[]>;
  find(id: string): Promise<Driver | null>;
}