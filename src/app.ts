import { MongoDB } from "./modules/shared/database/infrastructure/mongodb/MongoDB";
import { Server } from "./server/Server";

const server = new Server();
const database = new MongoDB();

server.initialize()
  .then(async () => {
    await database.connect();
  })
