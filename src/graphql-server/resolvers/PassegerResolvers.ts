import { PassengerGetter } from "../../modules/passenger/application/PassengerGetter";
import { PassengerMongooseRepository } from "../../modules/passenger/infrastructure/mongodb/PassengerMongooseRepository";

export class PassegerResolvers {
  async get() {
    const getter = new PassengerGetter(new PassengerMongooseRepository());
    const passengers = await getter.run();
    return passengers;
  }
}
