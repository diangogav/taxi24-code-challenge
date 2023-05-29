import { Bill } from "../../domain/Bill";
import { BillRepository } from "../../domain/BillRepository";
import { BillModel } from "./BillModel";

export class BillMongooseRepository implements BillRepository {
  async create(bill: Bill): Promise<void> {
    const instance = new BillModel(bill);
    await instance.save()
  }
}