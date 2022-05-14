import { ApiProperty } from "@nestjs/swagger";
import { CryptocurrencyMaster } from "src/database/entities/cryptocurrencyMaster.entity";
import { PaginationListResponse } from "src/utils/common.response.util";

export class CryptocurrencyMasterListItemResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  type: string;
  @ApiProperty()
  name: string;

  static generate(data: CryptocurrencyMaster) {
    let res = new CryptocurrencyMasterListItemResponse();
    res.id = Number(data.id);
    res.name = data.name;
    res.type = data.type;
    return res;
  }
}

export class CryptocurrencyMasterListResponse extends PaginationListResponse<CryptocurrencyMasterListItemResponse> {
  constructor(items: CryptocurrencyMasterListItemResponse[], page: number, per: number, total: number) {
    super(items, page, per, total);
  }
}

export class CryptocurrencyMasterDetailResponse extends CryptocurrencyMasterListItemResponse { }