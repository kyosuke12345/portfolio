import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { isUndefined } from 'type-guards';
import { ChartService } from './chart.service';
import { ChartResponseItem } from './class/chart.response';

@Controller('chart')
export class ChartController {
  constructor(
    private service: ChartService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOkResponse({
    description: 'list取得時',
    type: ChartResponseItem,
    isArray: true,
  })
  @Get('list/btc')
  async list() {
    const cacheValue = await this.cacheManager.get<{
      btc: ChartResponseItem[];
      eth: ChartResponseItem[];
      sol: ChartResponseItem[];
    }>('crypto');
    if (!isUndefined(cacheValue)) {
      return cacheValue;
    } else {
      const btc = await this.service.getCryptoCurrencyLists('5');
      const eth = await this.service.getCryptoCurrencyLists('29');
      const sol = await this.service.getCryptoCurrencyLists('855');
      const res = {
        btc: btc,
        eth: eth,
        sol: sol,
      };
      await this.cacheManager.set('crypto', res, { ttl: 60 * 5 });
      return res;
    }
  }
}
