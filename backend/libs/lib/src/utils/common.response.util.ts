import { ApiProperty } from "@nestjs/swagger";

class Pagination {
  @ApiProperty({ description: '1ページあたりの表示件数' })
  per: number;
  @ApiProperty({ description: 'ページ' })
  page: number;
  @ApiProperty({ description: 'トータルの件数' })
  total: number;
  @ApiProperty({ description: 'トータルのページ件数' })
  totalPage: number;
}

export class PaginationResponse {
  @ApiProperty({})
  pager: Pagination;

  constructor(page: number, per: number, total) {
    this.pager = new Pagination();
    this.pager.page = page;
    this.pager.page = page;
    this.pager.total = total;
    this.pager.per = per;
    this.pager.totalPage = total === 0 ? 0 : Math.floor(total / per) + 1;
  }
}

export class PaginationListResponse<T> extends PaginationResponse {
  @ApiProperty()
  items: T[];

  constructor(items: T[], page: number, per: number, total: number) {
    super(page, per, total);
    this.items = items;
  }
}