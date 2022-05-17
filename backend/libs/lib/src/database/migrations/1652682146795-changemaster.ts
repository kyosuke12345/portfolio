import { MigrationInterface, QueryRunner } from "typeorm";

export class changemaster1652682146795 implements MigrationInterface {
    name = 'changemaster1652682146795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cryptocurrency_master" ADD "min_threshold" integer`);
        await queryRunner.query(`ALTER TABLE "cryptocurrency_master" ADD "max_threshold" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cryptocurrency_master" DROP COLUMN "max_threshold"`);
        await queryRunner.query(`ALTER TABLE "cryptocurrency_master" DROP COLUMN "min_threshold"`);
    }

}
