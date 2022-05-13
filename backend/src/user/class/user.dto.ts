import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { User } from 'src/database/entities/user.entity';
import { Hobby } from 'src/database/entities/hobby.entity';
import { MAX_DB_LENGTH } from 'src/database/entities/dbType';

export class UserLoginDTO {
  @ApiProperty({ type: String, default: 'test@gmail.com' })
  @IsEmail()
  @MaxLength(MAX_DB_LENGTH.EMAIL)
  email: User['email'];

  @ApiProperty({ type: String, default: '12345678' })
  @IsString()
  password: User['password'];
}

export class CreateUserDTO extends PickType(UserLoginDTO, [
  'email',
  'password',
] as const) {}

export class AddHobbyDTO {
  @ApiProperty({ type: Number, description: 'uesr id' })
  @IsNumber()
  userId: User['id'];

  @ApiProperty({
    type: String,
    isArray: true,
    maxLength: MAX_DB_LENGTH.HOBBY_NAME,
  })
  @ArrayNotEmpty()
  @MaxLength(MAX_DB_LENGTH.HOBBY_NAME, { each: true })
  names: Hobby['name'][];
}

export class RemoveHobbyDTO {
  @ApiProperty({ type: Number, description: 'uesr id' })
  @IsNumber()
  userId: User['id'];

  @ApiProperty({ type: [Number] })
  @ArrayNotEmpty()
  hobbyIds: Hobby['id'][];
}
