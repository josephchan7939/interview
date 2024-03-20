import { IsFQDN } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQueryDNSDto {
    @ApiProperty({ description: '待验证的域名', type: 'string', required: true })
    @IsFQDN()
    domain: string;
}
