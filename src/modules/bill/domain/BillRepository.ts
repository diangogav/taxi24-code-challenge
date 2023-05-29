import { Bill } from "./Bill";

export interface BillRepository {
  create(bill: Bill): Promise<void>
}