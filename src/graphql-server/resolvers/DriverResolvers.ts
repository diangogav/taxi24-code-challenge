import { DriverGetter } from "../../modules/driver/application/DriverGetter";
import { DriverMongooseRepository } from "../../modules/driver/infrastructure/mongodb/DriverMongooseRepository";

export class DriverResolvers {
  async get() {
    const getter = new DriverGetter(new DriverMongooseRepository());
    const drivers = await getter.run();
    return drivers;
  }
}
