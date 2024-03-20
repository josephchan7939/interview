import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ToolsService } from './tools/tools.service';
import { ApiOperation, ApiTags,ApiResponse } from '@nestjs/swagger';

@ApiTags('System - root及历史查询DNS记录')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private toolsService: ToolsService) {}

  @ApiOperation({ summary: 'root查询' })
  @ApiResponse({ status: 200, description: 'Return the current date,app version and if it is running under kubernetes' })
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: '查询最近20条域名查询记录' })
  @ApiResponse({ status: 200, description: 'Return the last 20 querying dns records' })
  @Get('v1/history')
  getHistory()  {
    return this.toolsService.getHistory();
  }
}
