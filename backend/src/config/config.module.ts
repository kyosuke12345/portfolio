import { Module } from '@nestjs/common';
import { ConfigModule as OriginConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './database.config';
import enviroment from './enviroment'

@Module({
  imports: [
    OriginConfigModule.forRoot({
      envFilePath: `env/${enviroment.NODE_ENV}.env`,
      isGlobal: true, // どこでも使用できるようにglobalに設定
    }),
  ],
  providers: [DatabaseConfig],
  exports: [DatabaseConfig],
})
export class ConfigModule { }