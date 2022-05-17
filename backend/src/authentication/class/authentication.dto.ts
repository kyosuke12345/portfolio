import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { User } from "libs/lib/src/database/entities/user.entity";

export class LoginDTO {
  @ApiProperty({ type: String })
  @IsEmail()
  email: User['email'];
  @ApiProperty({ type: String })
  @IsString()
  password: User['password'];
}