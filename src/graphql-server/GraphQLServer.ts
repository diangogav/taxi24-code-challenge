import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { DriverResolvers } from "./resolvers/DriverResolvers";
import { PassegerResolvers } from "./resolvers/PassegerResolvers";

export class GraphQLServer {
  private readonly server: ApolloServer;

  constructor() {
    this.server = new ApolloServer({
      typeDefs: this.typeDefinitions(),
      resolvers: this.resolvers(),
    });
  }

  async initialize(): Promise<void> {
    const { url } = await startStandaloneServer(this.server);
    console.log(`🚀 Server ready at ${url}`);
  }

  private typeDefinitions(): string {
    return `
    type Location {
      longitude: Float!
      latitude: Float!
    }
    type Driver {
      id: String!
      name: String!
      isAvailable: Boolean!
      location: Location!
    }
    type Passenger {
      id: String!
      name: String!
    }

    type Query {
      drivers: [Driver]
      passengers: [Passenger]
    }
    `;
  }

  private resolvers() {
    return {
      Query: {
        drivers: async () => await new DriverResolvers().get(),
        passengers: async () => await new PassegerResolvers().get()
      },
    };
  }
}
