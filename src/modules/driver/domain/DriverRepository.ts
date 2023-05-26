import { Criteria } from "../../shared/criteria/domain/Criteria";
import { Driver } from "./Driver";

export interface DriverRepository {
  get(): Promise<Driver[]>;
  getByCriteria(criteria: Criteria): Promise<Driver[]>;
  find(id: string): Promise<Driver | null>;
}