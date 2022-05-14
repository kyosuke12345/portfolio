import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/database/entities/user.entity';
import { Hobby } from 'src/database/entities/hobby.entity';
import { isProduct } from './enviroment';
import { CryptocurrencyMaster } from 'src/database/entities/cryptocurrencyMaster.entity';
import { CryptocurrencyDayData } from 'src/database/entities/cryptocurrencyDayData.entity';
import { CryptocurrencyThreshold } from 'src/database/entities/cryptocurrencyThreshold.entity';

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
      entities: [User, Hobby, CryptocurrencyMaster, CryptocurrencyDayData, CryptocurrencyThreshold],
      synchronize: false,
      logging: this.configService.get<string>('DATABASE_LOG') === 'true',
      extra: {
        poolSize: 10,
      },
    };

    return config;
  }
}
