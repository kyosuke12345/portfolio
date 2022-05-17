import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCryptocurrency1652425647405 implements MigrationInterface {
  name = 'createCryptocurrency1652425647405';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cryptocurrency_master" ("id" BIGSERIAL NOT NULL, "type" character varying(3) NOT NULL, "name" character varying(16) NOT NULL, CONSTRAINT "UQ_335a79cae7df0e046c2a0b59c95" UNIQUE ("type"), CONSTRAINT "PK_53f4a2160bbf4dc0d80c7e80a4a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cryptocurrency_day_data" ("id" BIGSERIAL NOT NULL, "cryptocurrency_type" character varying(3) NOT NULL, "max_price" double precision NOT NULL, "min_price" double precision NOT NULL, "hajime_price" double precision NOT NULL, "owari_price" double precision, "day" date NOT NULL, CONSTRAINT "PK_f9b35ad0119a183e4b987fb9d70" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cryptocurrency_day_data" ADD CONSTRAINT "FK_0727b31c062b3408690f958da8f" FOREIGN KEY ("cryptocurrency_type") REFERENCES "cryptocurrency_master"("type") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(`
          INSERT INTO cryptocurrency_master (type, name) VALUES ('855', 'SOL')
    `);
    await queryRunner.query(`
          INSERT INTO cryptocurrency_master (type, name) VALUES ('5', 'BTC')
    `);
    await queryRunner.query(`
          INSERT INTO cryptocurrency_master (type, name) VALUES ('29', 'ETH')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cryptocurrency_day_data" DROP CONSTRAINT "FK_0727b31c062b3408690f958da8f"`,
    );
    await queryRunner.query(`DROP TABLE "cryptocurrency_day_data"`);
    await queryRunner.query(`DROP TABLE "cryptocurrency_master"`);
  }
}
