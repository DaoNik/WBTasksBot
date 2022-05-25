import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger('Logger');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const { ip, method, url } = req;
    const userAgent = req.get('user-agent') || 'Неизвестно';

    this.logger.log(
      `[Запрос] IP: ${ip}. User agent: ${userAgent}. Метод: ${method}. URL: ${url}`,
    );

    return next.handle().pipe(
      tap(() =>
        this.logger.log(
          `[Ответ] IP: ${ip}. User agent: ${userAgent}. Метод: ${method}. Статус: ${res.statusCode}. URL: ${url}`,
        ),
      ),
      catchError((err: HttpException) => {
        this.logger.log(
          `[Ошибка] IP: ${ip}. User agent: ${userAgent}. Метод: ${method}. Статус: ${err.getStatus()}. URL: ${url}`,
        );

        return of(err.getResponse());
      }),
    );
  }
}
