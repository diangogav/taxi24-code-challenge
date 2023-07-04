import { Passenger } from "../../domain/Passenger";
import { PassengerRepository } from "../../domain/PassengerRepository";
import { PassengerEntity } from "../typeorm/PassengerEntity";
import { PgRepository } from "../../../shared/database/infrastructure/postgres/PgRepository";
import { dataSource } from "../../../shared/database/infrastructure/postgres/data-source";

export class PassengerTypeORMRepository
  extends PgRepository
  implements PassengerRepository
{
  async get(): Promise<Passenger[]> {
    const repository = dataSource.getRepository(PassengerEntity);
    const data = await repository?.find();
    if(!data) { return [] }
    return data.map((entity) => new Passenger({ ...entity }));
  }

  find(id: string): Promise<Passenger | null> {
    throw new Error("Method not implemented.");
  }

  async create(passenger: Passenger): Promise<void> {
    const repository = this.getRepository(PassengerEntity);
    await repository?.save(passenger);
  }
}
