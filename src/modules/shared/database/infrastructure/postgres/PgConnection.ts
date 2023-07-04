import {
  QueryRunner,
  Repository,
  ObjectLiteral,
  EntityTarget,
  DataSource,
} from "typeorm";
import { dataSource } from "./data-source";
import { DbTransaction } from "../../domain/DbTransaction";

export class PgConnection implements DbTransaction {
  private static instance?: PgConnection;
  private queryRunner: QueryRunner | null = null;
  private connection: DataSource | null = null;

  private constructor() {
    //Do nothing
  }

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined)
      PgConnection.instance = new PgConnection();
    return PgConnection.instance;
  }

  async connect(): Promise<void> {
    if (dataSource.isInitialized) {
      return;
    }

    this.connection = await dataSource.initialize();
  }

  async openTransaction(): Promise<void> {
    if (!this.connection) {
      return;
    }
    this.queryRunner = this.connection.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async closeTransaction(): Promise<void> {
    await this.queryRunner?.release();
  }

  async commit(): Promise<void> {
    await this.queryRunner?.commitTransaction();
  }

  async rollback(): Promise<void> {
    await this.queryRunner?.rollbackTransaction();
  }

  getRepository<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>
  ): Repository<Entity> | null {
    if (!this.queryRunner?.manager) {
      return null;
    }
    return this.queryRunner.manager.getRepository(entity);
  }
}
