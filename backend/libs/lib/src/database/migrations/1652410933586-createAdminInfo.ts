import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAdminInfo1652410933586 implements MigrationInterface {
  name = 'createAdminInfo1652410933586';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admin_info" ("id" BIGSERIAL NOT NULL, "user_id" character varying(8) NOT NULL, "password" character varying(60) NOT NULL, CONSTRAINT "UQ_f9d926a8385408ac3021562e1da" UNIQUE ("user_id"), CONSTRAINT "PK_07362e5e3eddbdddb3f3c30484f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admin_info"`);
  }
}
