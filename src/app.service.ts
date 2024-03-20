import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//import now from 'lodash/now';
import now from 'lodash/now';
import * as config from '@/config';

@Injectable()
export class AppService {
  constructor(private configService:ConfigService ) {

  }
  getHello() {
    const queryTime = now();
    const {apiversion} = this.configService.get<config.IAppConfig>('app');
    const bUnderKuber = process.env.KUBERNETES_SERVICE_HOST?true:false;
    

    return {
      version:apiversion,
      date:queryTime,
      kubernetes:bUnderKuber
    };
  }

  getHistory() {

    return 'Hello World!';
  }
}
