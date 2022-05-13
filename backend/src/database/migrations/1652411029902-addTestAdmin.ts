import { isProduct } from 'src/config/enviroment';
import { MigrationInterface, QueryRunner } from 'typeorm';

import * as bcrypt from 'bcrypt';

const USER_ID = 'admin';
const USER_PASSWORD = 'admin';

export class addTestAdmin1652411029902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!isProduct()) {
      const password = bcrypt.hash(USER_PASSWORD, 10);
      const userId = USER_ID;
      queryRunner.query(`
        INSERT INTO admin_info (user_id, password) values ('${userId}', '${password}')
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (!isProduct()) {
      queryRunner.query(`
            DELETE FROM admin_info where user_id = '${USER_ID}'
        `);
    }
  }
}
