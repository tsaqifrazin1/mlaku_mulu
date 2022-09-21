import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsers1663788456001 implements MigrationInterface {
    name = 'createUsers1663788456001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "email" character varying NOT NULL, "fullname" character varying NOT NULL, "password" character varying NOT NULL, "last_successful_logged_date" TIMESTAMP, "last_failed_logged_date" TIMESTAMP, "last_logout_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
