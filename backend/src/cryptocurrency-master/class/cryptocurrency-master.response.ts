import { ApiProperty } from "@nestjs/swagger";
import { CryptocurrencyMaster } from "libs/lib/src/database/entities/cryptocurrencyMaster.entity";
import { PaginationListResponse } from "libs/lib/src/utils/common.response.util";

export class CryptocurrencyMasterListItemResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  type: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  minThreshold: number | null;
  @ApiProperty()
  maxThreshold: number | null;

  static generate(data: CryptocurrencyMaster) {
    let res = new CryptocurrencyMasterListItemResponse();
    res.id = Number(data.id);
    res.name = data.name;
    res.type = data.type;
    res.minThreshold = data.minThreshold;
    res.maxThreshold = data.maxThreshold;
    return res;
  }
}

export class CryptocurrencyMasterListResponse extends PaginationListResponse<CryptocurrencyMasterListItemResponse> {
  constructor(items: CryptocurrencyMasterListItemResponse[], page: number, per: number, total: number) {
    super(items, page, per, total);
  }
}

export class CryptocurrencyMasterDetailResponse extends CryptocurrencyMasterListItemResponse { }