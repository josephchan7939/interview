import { Controller, Get, Post, Body, Patch, Delete, Query, Ip, Res, UseFilters } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateQueryDNSDto } from './dto/create-querydns.dto';
import { Response as ResPon} from 'express';
import { LookupDNSExceptionFilter } from '@/common/filter/lookupdns-exception.filter';
import { CreateValidateIPDto } from './dto/create-validateip.dto';
import { ApiOperation, ApiTags,ApiParam,ApiResponse } from '@nestjs/swagger';
//import validUrl from 'valid-url';
//import isValidDomain from 'is-valid-domain';

@ApiTags('System - 查询域名及验证IP模块')
@Controller('v1/tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @ApiOperation({ summary: '验证IP地址是否IPv4格式' })
  @ApiParam({ name: 'ip', description: 'ip address', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return status code 200 ,and true if ip is ipv4,else return false' })
  @ApiResponse({ status: 400, description: 'return status code 400 if query string is not valid ip' })
  @Post('validate')
  create(@Body() ValidateIPDto: CreateValidateIPDto) {
    //console.log(ValidateIPDto);
    return this.toolsService.validate(ValidateIPDto);
  }

  @ApiOperation({ summary: '查询对应域名的IPv4地址' })
  @ApiParam({ name: 'domain', description: 'query domain', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return status code 200 if domain ipv4 is resolved' })
  @ApiResponse({ status: 400, description: 'return status code 400 if domain is not valid domain' })
  @ApiResponse({ status: 404, description: 'return status code 404 if domain can not be resolved' })
  @Get('lookup')
  //@UseFilters(LookupDNSExceptionFilter)
  async findAll(@Query() createQueryDNSDto: CreateQueryDNSDto , @Ip() clientIP:string,@Res({ passthrough: true }) res:ResPon) {
   // console.log(validUrl.isUri(domain));
 //  console.log(createQueryDNSDto.domain);
 //   if(createQueryDNSDto.domain && isValidDomain(createQueryDNSDto.domain))
 //   {
    const queryRt = await this.toolsService.findAll(createQueryDNSDto.domain,clientIP);
   // console.log(queryRt);
    if(queryRt)
    return queryRt;
    else
    res.status(404).json({ message: 'ipv4 dns records not found!' });
//   }
 //  else
 //   res.status(400).json({ message: 'domain must be a valid domain name' });
  }
/** 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(+id, updateToolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toolsService.remove(+id);
  }
  */
}
