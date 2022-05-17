import { Global, Module } from '@nestjs/common';
import { AccessLoggerService } from './access-logger.service';
import { ErrorLoggerService } from './error-logger.service';

// import しなくても使用できるように
@Global()
@Module({
  providers: [ErrorLoggerService, AccessLoggerService],
  exports: [ErrorLoggerService, AccessLoggerService],
})
export class CustomLoggerModule { }
