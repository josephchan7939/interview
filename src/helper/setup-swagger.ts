import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from '@/config';


export function setupSwagger(app: INestApplication, configService: ConfigService): void {

  const documentBuilder = new DocumentBuilder()
    .setTitle(`${configService.get<config.IAppConfig>('app').name}`)
    .setDescription(`${configService.get<config.IAppConfig>('app').description}`)
    .setVersion(`${configService.get<config.IAppConfig>('app').apiversion}`);
    

  // auth security
  /*
  documentBuilder.addSecurity(API_SECURITY_AUTH, {
    description: 'Auth',
    type: 'apiKey',
    in: 'header',
    name: 'Authorization',
  });
  */

  const document = SwaggerModule.createDocument(app, documentBuilder.build());

  SwaggerModule.setup('docs', app, document);

  // started log
  const logger = new Logger('SwaggerModule');
  logger.log(
    `Document running on http://127.0.0.1:${configService.get<config.IAppConfig>('app').port}/docs`,
  );

  // // 业务 api文档
  // const options_apps = new DocumentBuilder()
  //   .setTitle(`${config.get<IAppConfig>('app').name} client API document`)
  //   .setDescription(`${config.get<IAppConfig>('app').name} client API document`)
  //   .setVersion('1.0')
  //   .build();
  // const document_apps = SwaggerModule.createDocument(app, options_apps, {
  //   include: [AppsModule],
  //   ignoreGlobalPrefix: true,
  //   extraModels: [BaseEntity, ResOp, PageResult, TreeResult],
  // });
  // SwaggerModule.setup(path + '/client', app, document_apps);
}
