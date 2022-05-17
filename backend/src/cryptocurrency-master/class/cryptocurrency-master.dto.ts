import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, MaxLength, Min } from "class-validator";
import { MAX_DB_LENGTH } from "libs/lib/src/database/entities/dbType";

export class CreateCryptocurrencyDTO {
  @ApiProperty()
  @MaxLength(MAX_DB_LENGTH.CRYPTOCURRENCY_TYPE)
  type: string;

  @ApiProperty()
  @MaxLength(MAX_DB_LENGTH.CURRENCY_NAME)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  minThreshold: number | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxThreshold: number | null;
}

export class UpdateCryptocurrencyDTO extends CreateCryptocurrencyDTO { }

