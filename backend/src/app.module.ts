import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { DatabaseConfig } from './config/database.config';
import { UserModule } from './user/user.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig
    }),
    UserModule,
    CustomLoggerModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
