import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private logger = new Logger('Logger');

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const userAgent = request.get('user-agent') || 'Неизвестно';

    this.logger.log(
      `[Ошибка] IP: ${request.ip}. User agent: ${userAgent}. Метод: ${request.method}. Статус: ${status}. URL: ${request.url}`,
    );

    response.status(status).json({
      statusCode: status,
      message: exception.getResponse()['message'],
    });
  }
}
