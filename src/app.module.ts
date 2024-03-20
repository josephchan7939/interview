import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as config from '@/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolsModule } from './tools/tools.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/httpexception.filter';
import { ToolsService } from './tools/tools.service';
import { AppLoggerService } from './common/logger/app-logger.service';
import { AccessLogMiddleware } from './common/middleware/accesslog-midware';
import { GracefulShutdownModule } from 'nestjs-graceful-shutdown';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import HealthModule from './monitor/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[`.env.${process.env.NODE_ENV}.local`,
      `.env.${process.env.NODE_ENV}`,
      '.env.local',
      '.env'
    ],
    load:[...Object.values(config)]
    }),
    TypeOrmModule.forRootAsync({
      useFactory:(configService:ConfigService) => ({
        ...(configService.get<config.IDBConfig>('database')),
        type:'mysql',
        autoLoadEntities: true,
      }),
      inject:[ConfigService],
    }),
    GracefulShutdownModule.forRoot(),
    PrometheusModule.register(),
    ToolsModule, 
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppLoggerService,
 
  ],
 // exports:[AppLoggerService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessLogMiddleware).forRoutes('*'); // Apply middleware to all routes
}  
}
