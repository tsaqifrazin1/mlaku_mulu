import { MigrationInterface, QueryRunner } from "typeorm";

export class creteCustomers1663788456002 implements MigrationInterface {
    name = 'creteCustomers1663788456002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" BIGSERIAL NOT NULL, "nik" character varying NOT NULL, "fullname" character varying NOT NULL, "age" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_14e5b41d4cdfb088f3e02bce93e" UNIQUE ("nik"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
