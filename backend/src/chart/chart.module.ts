import { CryptocurrencyDayData } from '@lib/lib/database/entities/cryptocurrencyDayData.entity';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';

@Module({
  imports: [TypeOrmModule.forFeature([CryptocurrencyDayData]), CacheModule.register()],
  controllers: [ChartController],
  providers: [ChartService]
})
export class ChartModule {}
