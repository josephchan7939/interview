import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as config from '@/config';
import { BadRequestException, ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { AppLoggerService } from './common/logger/app-logger.service';
//import { useContainer } from 'class-validator';
//import { ValidationExceptionFilter } from './common/filter/validation-exception.filter';
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';
import { setupSwagger } from './helper/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const { globalPrefix, port } = configService.get<config.IAppConfig>('app');
 // app.setGlobalPrefix(globalPrefix);

 // useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useLogger(app.get(AppLoggerService));
  app.useGlobalPipes(
    new ValidationPipe(/*{
      exceptionFactory: (errors) => {
 
        console.log('test');
        return new BadRequestException(errors[0].constraints[Object.keys(errors[0].constraints)[0]]);
     
      },
      stopAtFirstError: true,
      transform: true
    }*/),
  )
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
 // app.useGlobalFilters(new ValidationExceptionFilter());
  setupGracefulShutdown({ app });
  setupSwagger(app, configService);
  await app.listen(port,'0.0.0.0');

  // started log
  const logger = new Logger('NestApplication');
  logger.log(`Server running on ${await app.getUrl()}`);


}
bootstrap();
