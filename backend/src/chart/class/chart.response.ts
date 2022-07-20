import { CryptocurrencyDayData } from "@lib/lib/database/entities/cryptocurrencyDayData.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ChartResponseItem {
  @ApiProperty()
  x: string;
  @ApiProperty()
  open: number;
  @ApiProperty()
  close: number;
  @ApiProperty()
  high: number;
  @ApiProperty()
  low: number;

  constructor(data: CryptocurrencyDayData) {
    this.x = `${data.day.getMonth() + 1}/${data.day.getDate()}`;
    this.open = data.hajimePrice;
    this.close = data.owariPrice;
    this.high = data.maxPrice;
    this.low = data.minPrice;
  }
}