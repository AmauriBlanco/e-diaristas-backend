import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof NotFoundException) {
      console.log(exception);
      response.redirect('/admin/404');
    } else if (exception instanceof InternalServerErrorException) {
      console.log(exception);
      response.redirect('/admin/500');
    }
  }
}
