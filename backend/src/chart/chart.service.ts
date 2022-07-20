import { CryptocurrencyDayData } from '@lib/lib/database/entities/cryptocurrencyDayData.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChartResponseItem } from './class/chart.response';

@Injectable()
export class ChartService {
  constructor(@InjectRepository(CryptocurrencyDayData) private currencyRepository: Repository<CryptocurrencyDayData>) {}

  async getBTCLists(): Promise<ChartResponseItem[]> {
    const list = await this.currencyRepository.find({ where: {cryptocurrencyType: '5'}, order: {day: 'ASC'}});
    return list.map((row) => {
      return new ChartResponseItem(row);
    })
  }
}
