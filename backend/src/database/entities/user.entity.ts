import { IsEmail, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hobby } from "./hobby.entity";

export const MAX_LENGTH = {
  EMAIL: 80,
  BCRYPT_PASSWORD: 60,
  PLAIN_PASSWORD: 16,
} as const;

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @IsEmail()
  @Column({ name: 'email', unique: true, type: 'varchar', length: MAX_LENGTH.EMAIL })
  email: string;

  @IsString()
  @Column({ name: 'password', type: 'varchar', length: MAX_LENGTH.BCRYPT_PASSWORD })
  password: string;

  @IsString()
  @Column({ name: 'plain_password', type: 'varchar', length: MAX_LENGTH.PLAIN_PASSWORD })
  plainPassword: string;

  @OneToMany(() => Hobby, hobby => hobby.user)
  hobbies: Hobby[];

}