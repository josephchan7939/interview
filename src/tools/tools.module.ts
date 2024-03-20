import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryResult } from './entities/queryresult.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([QueryResult]),
  ],
  controllers: [ToolsController],
  providers: [ToolsService],
  exports:[ToolsService]
})
export class ToolsModule {}
