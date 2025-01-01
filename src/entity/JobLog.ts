import {ApiProperty,} from "@midwayjs/swagger"
import {Column, } from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

// @Entity()
export class JobLog extends BaseModel {
  
  @Column({nullable: true, comment: '', name: 'job_id',})
  @ApiProperty({description: '',})
  public jobId: string  
  
  @Column({nullable: true, comment: '', name: 'handler_name',})
  @ApiProperty({description: '',})
  public handlerName: string  
  
  @Column({nullable: true, comment: '', name: 'handler_param',})
  @ApiProperty({description: '',})
  public handlerParam: string  
  
  @Column({nullable: true, comment: '', name: 'cron_expression',})
  @ApiProperty({description: '',})
  public cronExpression: string  
  
  @Column({nullable: true, comment: '', name: 'execute_index',})
  @ApiProperty({description: '',})
  public executeIndex: string  
  
  @Column({nullable: true, comment: '', name: 'begin_time',})
  @ApiProperty({description: '',})
  public beginTime: string  
  
  @Column({nullable: true, comment: '', name: 'end_time',})
  @ApiProperty({description: '',})
  public endTime: string  
  
  @Column({nullable: true, comment: '', })
  @ApiProperty({description: '',})
  public duration: string  
 
}
