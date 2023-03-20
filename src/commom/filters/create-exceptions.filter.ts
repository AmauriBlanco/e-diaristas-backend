import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { Utils } from 'src/utils/utils';

@Catch(HttpException)
export class CreateException implements ExceptionFilter {
  constructor(private utils: Utils) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const url = request.originalUrl;
    const oldData = request.body;

    if (exception instanceof BadRequestException) {
      request.flash(
        'message',
        this.utils.formatException(exception['response']['message']),
      );
      request.flash('alert', 'alert alert-danger');
      request.flash('oldData', oldData);
      response.redirect(`${url}/create`);
    } else {
      response.redirect(`${url}/index`);
    }
  }
}
