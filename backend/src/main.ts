import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as createRedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import helmet from 'helmet';
import { createClient } from 'redis';
import { isProduct } from '../libs/lib/src/config/enviroment';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from 'libs/lib/src/core/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(new ValidationPipe());

  // helmet
  app.use(
    helmet({
      hidePoweredBy: true,
    }),
  );

  const configService = app.get(ConfigService);
  // redis version4はnest側でまだ対応されていない
  const RedisStore = createRedisStore(session);
  const redisClient = createClient({
    host: isProduct() ? undefined : configService.get('REDIS_HOST'),
    port: isProduct() ? undefined : configService.get('REDIS_PORT'),
    url: isProduct ? configService.get('REDIS_TLS_URL') : undefined,
    tls: isProduct()
      ? {
        rejectUnauthorized: false,
      }
      : undefined,
  });
  app.use(
    session({
      name: configService.get('SESSION_NAME'),
      store: new RedisStore({
        client: redisClient,
        ttl: 60 * 30, // redis側でsession管理 30分
      }),
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      proxy: isProduct(),
      cookie: isProduct() ? { secure: true } : {},
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Kyosuke Portfolio api v1')
    .setDescription('ポートフォリオ用のapi類')
    .setVersion('1.0')
    .addCookieAuth(configService.get('SESSION_NAME'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3100);
}
bootstrap();
