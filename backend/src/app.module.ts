import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../libs/lib/src/config/config.module';
import { DatabaseConfig } from '../libs/lib/src/config/database.config';
import { UserModule } from './user/user.module';
import { CustomLoggerModule } from '../libs/lib/src/custom-logger/custom-logger.module';
import { CoreModule } from '../libs/lib/src/core/core.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CronModule } from './cron/cron.module';
import { CryptocurrencyMasterModule } from './cryptocurrency-master/cryptocurrency-master.module';
import { ChatGateway } from './chat.gateway';
import { ChartModule } from './chart/chart.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../front/public'),
    }),
    UserModule,
    CustomLoggerModule,
    CoreModule,
    AuthenticationModule,
    CronModule,
    CryptocurrencyMasterModule,
    ChartModule,
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
