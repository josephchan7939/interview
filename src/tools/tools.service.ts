import { Injectable } from '@nestjs/common';
import { CreateQueryDNSDto } from './dto/create-querydns.dto';
import { promisify } from 'util';
import * as dns from 'dns';
import { QueryResult } from './entities/queryresult.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateValidateIPDto } from './dto/create-validateip.dto';
import { isIP } from 'class-validator';

@Injectable()
export class ToolsService {

  constructor(
    @InjectRepository(QueryResult)
    private queryResultRep: Repository<QueryResult>,
  ) {}  

  validate(ValidateIPDto: CreateValidateIPDto) {
   // const bStatus = isIP(ValidateIPDto.ip,4)?{status:true}:{status:false};
   // return bStatus;
  
    return {status:isIP(ValidateIPDto.ip,4)};
  }

  getHistory(){
   return this.queryResultRep.find({
      order: {
          created_at: "DESC"
      },
      take: 20
  })
  }

 async findAll(domain:string,clientIP:string) {
    const resolve4 = promisify(dns.resolve4);
    try {
     // console.log(createQueryDNSDto.domain);
    //  console.log(clientIP);
      const addresses = await resolve4(domain);
      
      if(addresses)
      {
        const ipv4Regex = /(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/;
        const ipv4Match = clientIP.match(ipv4Regex);
    
     //   if (ipv4Match) {
        const ipv4Address = ipv4Match?ipv4Match[0]:null;
      //  }   
     // console.log(addresses); 
      let queryResult = new QueryResult();
      queryResult.addresses = JSON.stringify(addresses);
      queryResult.client_ip = ipv4Address;
      queryResult.domain = domain;
     // console.log(queryResult); 
      return await this.queryResultRep.save(queryResult);
        
      }
      else 
        return null;  
      // Return the IPv4 address
      //return addresses;
    } catch (error) {
    //  console.log("222"); 
     // throw error;
      //console.error('Failed to resolve domain to IPv4 address:', error);
      return null;
    }     

    
  }
/** 
  findOne(id: number) {
    return `This action returns a #${id} tool`;
  }

  update(id: number, updateToolDto: UpdateToolDto) {
    return `This action updates a #${id} tool`;
  }

  remove(id: number) {
    return `This action removes a #${id} tool`;
  }
  */
}
