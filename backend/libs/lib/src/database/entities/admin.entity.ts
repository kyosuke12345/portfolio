import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MAX_DB_LENGTH } from './dbType';

@Entity('admin_info')
export class AdminInfo {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @ApiProperty()
  @IsEmail()
  @Column({
    name: 'user_id',
    unique: true,
    type: 'varchar',
    length: MAX_DB_LENGTH.ADMIN_ID,
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

  @AfterLoad()
  afterLoad() {
    this.id = Number(this.id);
  }
}
