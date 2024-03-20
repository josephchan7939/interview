import { IsIP } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateValidateIPDto {
    @ApiProperty({ description: '待验证的IP', type: 'string', required: true })
    @IsIP()
    ip: string;
}