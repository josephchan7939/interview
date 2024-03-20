import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class LookupDNSExceptionFilter implements ExceptionFilter {
  catch(exception:unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

   // const errors = exception.getResponse();

   
    response.status(404).json({
      message: `error:${exception},ipv4 dns records not found!`,
     });
  }
}