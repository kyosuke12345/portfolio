import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { DatabaseConfig } from './config/database.config';
import { UserModule } from './user/user.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../front/public"),
    }),
    UserModule,
    CustomLoggerModule,
    CoreModule,
    AuthenticationModule,
    CronModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
