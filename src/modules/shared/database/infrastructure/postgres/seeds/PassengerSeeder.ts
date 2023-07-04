import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { PassengerEntity } from "../../../../../passenger/infrastructure/typeorm/PassengerEntity";
import { randUuid, randFullName } from "@ngneat/falso";

export class PassengerSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    const passengerRepository = dataSource.getRepository(PassengerEntity);
    const passenger = passengerRepository.create({
      id: randUuid(),
      name: randFullName(),
    });

    await passengerRepository.save(passenger)
  }
}
