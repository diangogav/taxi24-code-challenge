import { PgConnection } from "./PgConnection";
import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { dataSource } from "./data-source";

export abstract class PgRepository {
  constructor(
    private readonly connection: PgConnection = PgConnection.getInstance()
  ) {}

  getRepository<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>
  ): Repository<Entity> | null {
    return this.connection.getRepository(entity);
  }
}
