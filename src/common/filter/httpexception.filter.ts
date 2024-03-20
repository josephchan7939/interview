import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
 

   // console.log("111");
    /*
    if(exception instanceof ValidationError)
    response
        .status(400)
        .json({
          message:exception.constraints[Object.keys(exception.constraints)[0]]
        });
        */
     
    const status = exception.getStatus();
    // 如果是 400 Bad Request，则自定义 JSON 响应
    if (status === 400) {
      response
        .status(status)
        .json({
          message:exception.getResponse()['message'][0]
        });
    }
    
    else if (status === 503){
      response
      .status(status)
      .json({
        message:exception.getResponse()
      });

    }
    
    else {
      response
      .status(status)
      .json({
        message:exception.getResponse()['message']
      });      
    }
        
    /* else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest().url,
      });
    }
    */
  }
}