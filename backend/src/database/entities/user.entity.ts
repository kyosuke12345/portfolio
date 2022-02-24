import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { AfterLoad, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hobby } from "./hobby.entity";

export const MAX_LENGTH = {
  EMAIL: 80,
  BCRYPT_PASSWORD: 60,
  PLAIN_PASSWORD: 16,
} as const;

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @ApiProperty()
  @IsEmail()
  @Column({ name: 'email', unique: true, type: 'varchar', length: MAX_LENGTH.EMAIL })
  email: string;

  @ApiProperty()
  @IsString()
  @Column({ name: 'password', type: 'varchar', length: MAX_LENGTH.BCRYPT_PASSWORD })
  password: string;

  @ApiProperty()
  @IsString()
  @Column({ name: 'plain_password', type: 'varchar', length: MAX_LENGTH.PLAIN_PASSWORD })
  plainPassword: string;

  @OneToMany(() => Hobby, hobby => hobby.user)
  hobbies: Hobby[];

  @AfterLoad()
  afterLoad() {
    this.id = Number(this.id);
  }

}