import { ConsoleLogger, Injectable } from '@nestjs/common';

/**
 * Herokuのpaper trailのaddonを使用するのでConsoleLoggerをextendsする
 */
@Injectable()
export class AccessLoggerService extends ConsoleLogger {
  log(message: any) {
    super.log(message)
  }
  error(message: object | string) {
    super.error(message);
  }
  warn(message: object | string) {
    super.warn(message);
  }
  debug(message: object | string) {
    super.debug(message);
  }
}