import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { catchError, Observable, throwError } from 'rxjs';
import { AccessLoggerService } from 'libs/lib/src/custom-logger/access-logger.service';
import { ErrorLoggerService } from 'libs/lib/src/custom-logger/error-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly accessLogger: AccessLoggerService,
    private readonly errorLogger: ErrorLoggerService,
  ) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const body = request.body ?? {}
    const requestData = `time: ${new Date()} ip:${request.ip} method:${request.method} url:${request.url} body:${JSON.stringify(body)}`;
    this.accessLogger.log(requestData);

    return next.handle().pipe(
      catchError((err) => {
        this.errorLogger.error(err?.status ?? err?.statusCode ?? 500, err?.message ?? '', requestData);
        return throwError(() => err);
      }),
    );
    // .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}