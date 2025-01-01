import {ApiProperty,} from "@midwayjs/swagger"
import {Column, } from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

// @Entity()
export class Job extends BaseModel {
   
  @Column({nullable: true, comment: '', name: 'handler_name',})
  @ApiProperty({description: '',})
  public handlerName: string  
  
  @Column({nullable: true, comment: '', name: 'handler_param',})
  @ApiProperty({description: '',})
  public handlerParam: string  
  
  @Column({nullable: true, comment: '', name: 'cron_expression',})
  @ApiProperty({description: '',})
  public cronExpression: string  
  
  @Column({nullable: true, comment: '', name: 'retry_count',})
  @ApiProperty({description: '',})
  public retryCount: number = null;
  
  @Column({nullable: true, comment: '', name: 'retry_interval',})
  @ApiProperty({description: '',})
  public retryInterval: number = null;
  
  @Column({nullable: true, comment: '', name: 'monitor_timeout',})
  @ApiProperty({description: '',})
  public monitorTimeout: number = null;
 
}
