import { ApiProperty } from "@nestjs/swagger";

export class PaginationResponse {
  @ApiProperty({ description: '1ページあたりの表示件数' })
  per: number;
  @ApiProperty({ description: 'ページ' })
  page: number;
  @ApiProperty({ description: 'トータルの件数' })
  total: number;
  @ApiProperty({ description: 'トータルのページ件数' })
  totalPage: number;
}

export class PaginationListResponse<T> extends PaginationResponse {
  @ApiProperty()
  items: T[];

  constructor(items: T[], page: number, per: number, total: number) {
    super();
    this.page = page;
    this.items = items;
    this.total = total;
    this.per = per;
    this.totalPage = total === 0 ? 0 : Math.floor(total / per) + 1;
  }
}