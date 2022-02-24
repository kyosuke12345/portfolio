import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { Hobby } from "../entities/hobby.entity";

const TEST_USER = [
    { email: 'test1@test.test.com', password: 'test1', hobbies: ['読書', '映画鑑賞'] },
    { email: 'test2@test.test.com', password: 'test2', hobbies: ['野球'] },
    { email: 'test3@test.test.com', password: 'test3', hobbies: ['バスケットボール'] },
    { email: 'test4@test.test.com', password: 'test4', hobbies: ['サッカー'] },
    { email: 'test5@test.test.com', password: 'test5', hobbies: ['テニス'] },
    { email: 'test6@test.test.com', password: 'test6', hobbies: ['釣り'] },
    { email: 'test7@test.test.com', password: 'test7', hobbies: ['フットサル'] },
    { email: 'test8@test.test.com', password: 'test8', hobbies: ['TV鑑賞'] },
    { email: 'test9@test.test.com', password: 'test9', hobbies: ['音楽鑑賞'] },
    { email: 'test10@test.test.com', password: 'test10', hobbies: ['野球鑑賞'] },
    { email: 'test11@test.test.com', password: 'test11', hobbies: ['サッカー'] },
    { email: 'test12@test.test.com', password: 'test12', hobbies: ['読書'] },
]

export class createTestUser1645666971417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const test of TEST_USER) {
            const user = new User();
            user.email = test.email;
            user.plainPassword = test.password;
            user.password = await bcrypt.hash(user.plainPassword, 10);
            const newUser = await queryRunner.manager.save(User, user);
            for (const h of test.hobbies) {
                const hobby = new Hobby();
                hobby.user = newUser;
                hobby.name = h;
                await queryRunner.manager.save(Hobby, hobby);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM hobby`)
        await queryRunner.query(`DELETE FROM users`);
    }

}
