import { DataSource, DataSourceOptions } from "typeorm";
import { PassengerEntity } from "../../../../passenger/infrastructure/typeorm/PassengerEntity";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./seeds/MainSeeder";
import { config } from "../../../../../config";

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: config.postgres.host,
  port: config.postgres.port,
  username: config.postgres.user,
  password: config.postgres.password,
  database: config.postgres.db,
  synchronize: false,
  logging: true,
  entities: [PassengerEntity],
  subscribers: [],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  seeds: [MainSeeder]
};
export const dataSource = new DataSource(options);
