import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";
import { PassengerSeeder } from "./PassengerSeeder";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, PassengerSeeder);
  }
}
