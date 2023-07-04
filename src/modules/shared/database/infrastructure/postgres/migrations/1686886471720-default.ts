import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1686886471720 implements MigrationInterface {
    name = 'Default1686886471720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "passengers" ("id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9863c72acd866e4529f65c6c98c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "passengers"`);
    }

}
