import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'libs/lib/src/database/entities/user.entity';
import { Hobby } from 'libs/lib/src/database/entities/hobby.entity';
import { isProduct } from './enviroment';
import { CryptocurrencyMaster } from 'libs/lib/src/database/entities/cryptocurrencyMaster.entity';
import { CryptocurrencyDayData } from 'libs/lib/src/database/entities/cryptocurrencyDayData.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD', ''),
      database: this.configService.get<string>('DATABASE_NAME'),
      ssl: isProduct() && {
        rejectUnauthorized: false,
      },
      entities: [User, Hobby, CryptocurrencyMaster, CryptocurrencyDayData],
      synchronize: false,
      logging: this.configService.get<string>('DATABASE_LOG') === 'true',
      extra: {
        poolSize: 10,
      },
    };

    return config;
  }
}
