import { DriverFinder } from "../../modules/driver/application/DriverFinder";
import { DriverGetter } from "../../modules/driver/application/DriverGetter";
import { DriverMongooseRepository } from "../../modules/driver/infrastructure/mongodb/DriverMongooseRepository";

export class DriverResolvers {
  async get() {
    const getter = new DriverGetter(new DriverMongooseRepository());
    const drivers = await getter.run();
    return drivers;
  }

  async find(parent: undefined, args: { id: string }) {
    const finder = new DriverFinder(new DriverMongooseRepository());
    const driver = await finder.run(args.id);
    return driver;
  }
}
