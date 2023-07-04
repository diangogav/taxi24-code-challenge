import "reflect-metadata";

import { GraphQLServer } from "./graphql-server/GraphQLServer";
import { MongoDB } from "./modules/shared/database/infrastructure/mongodb/MongoDB";
import { Server } from "./server/Server";
import { PgConnection } from "./modules/shared/database/infrastructure/postgres/PgConnection";

boostrap();

async function boostrap(): Promise<void> {
  const server = new Server();
  const database = new MongoDB();
  const graphQLServer = new GraphQLServer();

  await server.initialize();
  await graphQLServer.initialize();
  await database.connect();
  PgConnection.getInstance().connect();
}
