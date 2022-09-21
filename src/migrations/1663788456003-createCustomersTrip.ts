import { MigrationInterface, QueryRunner } from "typeorm";

export class createCustomersTrip1663788456003 implements MigrationInterface {
    name = 'createCustomersTrip1663788456003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers_trip" ("id" BIGSERIAL NOT NULL, "destination" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "customer_id" bigint NOT NULL, CONSTRAINT "PK_bf6c14c047f343fbc686283afa1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customers_trip" ADD CONSTRAINT "FK_da97cbe0720b40b53e3eb95d1a1" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers_trip" DROP CONSTRAINT "FK_da97cbe0720b40b53e3eb95d1a1"`);
        await queryRunner.query(`DROP TABLE "customers_trip"`);
    }

}
