import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";
import { MAX_DB_LENGTH } from "src/database/entities/dbType";

export class CreateCryptocurrencyDTO {
  @ApiProperty()
  @MaxLength(MAX_DB_LENGTH.CRYPTOCURRENCY_TYPE)
  type: string;

  @ApiProperty()
  @MaxLength(MAX_DB_LENGTH.CURRENCY_NAME)
  name: string;
}

export class UpdateCryptocurrencyDTO extends CreateCryptocurrencyDTO { }

