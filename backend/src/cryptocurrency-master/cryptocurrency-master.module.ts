import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from 'libs/lib/src/core/core.module';
import { CryptocurrencyMaster } from 'libs/lib/src/database/entities/cryptocurrencyMaster.entity';
import { CryptocurrencyMasterController } from './cryptocurrency-master.controller';
import { CryptocurrencyMasterService } from './cryptocurrency-master.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CryptocurrencyMaster]),
    CoreModule
  ],
  controllers: [CryptocurrencyMasterController],
  providers: [CryptocurrencyMasterService]
})
export class CryptocurrencyMasterModule { }
