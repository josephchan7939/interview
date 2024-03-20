import { Column, Entity,PrimaryGeneratedColumn,CreateDateColumn } from "typeorm";
import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class QueryResult {
    @ApiProperty({ description: '记录ID' })
    @PrimaryGeneratedColumn()
    @Exclude({toPlainOnly:true})
    id!:number;
    
    @ApiProperty({ description: '查询IP地址结果,以JSON string存储' })
    @Column({ type: 'text', nullable: false }) 
    @Transform(obj => (JSON.parse((obj.value as unknown as string)) as Array<string>).map((value)=>{return {ip:value}}),{toPlainOnly:true} )
   addresses:string;

   @ApiProperty({ description: '查询客户端IP' })
   @Column()
   client_ip:string;

   @ApiProperty({ description: '查询记录生成时间' })
   @CreateDateColumn({
   name:'created_at', 
   })
   @Transform(obj =>(obj.value instanceof Date? obj.value.getTime():obj.value),{toPlainOnly:true}) 
   created_at:Date;

   @ApiProperty({ description: '查询域名' })
   @Column()
   domain:string;
}
