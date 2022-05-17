import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import {
  AfterLoad,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hobby } from './hobby.entity';
import { MAX_DB_LENGTH, UserRole } from './dbType';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @ApiProperty()
  @IsEmail()
  @Column({
    name: 'email',
    unique: true,
    type: 'varchar',
    length: MAX_DB_LENGTH.EMAIL,
  })
  email: string;

  @ApiProperty()
  @IsString()
  @Column({
    name: 'password',
    type: 'varchar',
    length: MAX_DB_LENGTH.BCRYPT_PASSWORD,
  })
  password: string;

  @ApiProperty()
  @IsString()
  @Column({
    name: 'plain_password',
    type: 'varchar',
    length: MAX_DB_LENGTH.PLAIN_PASSWORD,
  })
  plainPassword: string;

  @ApiProperty()
  @IsEnum(UserRole)
  @Column({
    name: 'role',
    type: 'varchar',
    length: MAX_DB_LENGTH.ROLE,
    default: UserRole.Normal
  })
  role: UserRole;

  @OneToMany(() => Hobby, (hobby) => hobby.user)
  hobbies: Hobby[];

  @AfterLoad()
  afterLoad() {
    this.id = Number(this.id);
  }
}
