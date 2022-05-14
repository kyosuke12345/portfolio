import { MigrationInterface, QueryRunner } from "typeorm";

export class createThreshold1652531849045 implements MigrationInterface {
    name = 'createThreshold1652531849045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cryptocurrency_threshold" ("id" BIGSERIAL NOT NULL, "cryptocurrency_type" character varying(3) NOT NULL, "min_threshold" integer, "max_threshold" integer, "update_dt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_5fa21bfa98c80793179a5fc05b" UNIQUE ("cryptocurrency_type"), CONSTRAINT "PK_50151ccaa5ca91c8895faa982c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cryptocurrency_threshold" ADD CONSTRAINT "FK_5fa21bfa98c80793179a5fc05b7" FOREIGN KEY ("cryptocurrency_type") REFERENCES "cryptocurrency_master"("type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cryptocurrency_threshold" DROP CONSTRAINT "FK_5fa21bfa98c80793179a5fc05b7"`);
        await queryRunner.query(`DROP TABLE "cryptocurrency_threshold"`);
    }

}
