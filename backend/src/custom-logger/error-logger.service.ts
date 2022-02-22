import { ConsoleLogger, Injectable } from '@nestjs/common';

/**
 * Herokuのpaper trailのaddonを使用するのでConsoleLoggerをextendsする
 */
@Injectable()
export class ErrorLoggerService extends ConsoleLogger {
  log(message: any) {
    super.log(message)
  }
  error(statusCode: number, errorMessage: string, request: string) {
    super.error(`status:${statusCode} request:${request} errorMessage:${errorMessage}`);
  }
  warn(message: object | string) {
    super.warn(message);
  }
  debug(message: object | string) {
    super.debug(message);
  }
}