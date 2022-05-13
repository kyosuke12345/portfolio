import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from 'src/core/core.module';
import { CryptocurrencyDayData } from 'src/database/entities/cryptocurrencyDayData.entity';
import { CronService } from './cron.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CryptocurrencyDayData]),
    ScheduleModule.forRoot(),
    HttpModule,
    CoreModule,
  ],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
