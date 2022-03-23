import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';

export class GlobleException implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.message : exception;
    console.log(message);
    response.status(code).json({
      code,
      message
    });
  }
}
