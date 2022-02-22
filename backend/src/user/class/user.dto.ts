import { ApiProperty, PickType } from "@nestjs/swagger";
import { ArrayNotEmpty, IsEmail, IsString, MaxLength } from "class-validator";
import { MAX_LENGTH } from "src/database/entities/user.entity";
import { MAX_LENGTH as HOBBY_MAX_LENGTH } from 'src/database/entities/hobby.entity';

export class UserLoginDTO {
  @ApiProperty({ type: String, default: 'test@gmail.com' })
  @IsEmail()
  @MaxLength(MAX_LENGTH.EMAIL)
  email: string;

  @ApiProperty({ type: String, default: '12345678' })
  @IsString()
  password: string;
}

export class CreateUserDTO extends PickType(UserLoginDTO, ['email', 'password'] as const) { }

export class AddHobbyDTO {
  @ApiProperty({ type: String, default: '趣味の名前' })
  @ArrayNotEmpty()
  @MaxLength(HOBBY_MAX_LENGTH.NAME, { each: true })
  names: string[];
}
