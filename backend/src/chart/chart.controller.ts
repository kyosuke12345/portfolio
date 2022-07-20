import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { isUndefined } from 'type-guards';
import { ChartService } from './chart.service';
import { ChartResponseItem } from './class/chart.response';

@Controller('chart')
export class ChartController {
  constructor(private service: ChartService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @ApiOkResponse({ description: 'list取得時', type: ChartResponseItem, isArray: true })
  @Get('list/btc')
  async list() {
    const cacheValue = await this.cacheManager.get<ChartResponseItem[]>('btc')
    if (!isUndefined(cacheValue)) {
      return cacheValue;
    } else {
      const list = await this.service.getBTCLists();
      await this.cacheManager.set('btc', list, { ttl: 60 * 5 });
      return list;
    }
  }

}
