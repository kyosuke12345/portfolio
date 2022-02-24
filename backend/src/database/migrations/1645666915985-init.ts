import { MigrationInterface, QueryRunner } from "typeorm";

export class init1645666915985 implements MigrationInterface {
    name = 'init1645666915985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "email" character varying(80) NOT NULL, "password" character varying(60) NOT NULL, "plain_password" character varying(16) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hobby" ("id" BIGSERIAL NOT NULL, "name" character varying(50) NOT NULL, "user_id" bigint NOT NULL, CONSTRAINT "PK_9cf21d5206ec584a4cc14a8703e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hobby" ADD CONSTRAINT "FK_b30e4eea01e112e848822fc6e7e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hobby" DROP CONSTRAINT "FK_b30e4eea01e112e848822fc6e7e"`);
        await queryRunner.query(`DROP TABLE "hobby"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
