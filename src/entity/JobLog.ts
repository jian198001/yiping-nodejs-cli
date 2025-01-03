import {ApiProperty,} from "@midwayjs/swagger"
import {Column, } from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 任务日志实体类
 * 用于记录任务执行的日志信息
 */
// @Entity()
export class JobLog extends BaseModel {
  /**
   * 任务ID
   * 关联的任务的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'job_id',})
  @ApiProperty({description: '任务ID',})
  public jobId: string  
  
  /**
   * 任务处理程序名称
   * 任务处理程序的名称
   */
  @Column({nullable: true, comment: '', name: 'handler_name',})
  @ApiProperty({description: '任务处理程序名称',})
  public handlerName: string  
  
  /**
   * 任务处理程序参数
   * 任务处理程序的参数
   */
  @Column({nullable: true, comment: '', name: 'handler_param',})
  @ApiProperty({description: '任务处理程序参数',})
  public handlerParam: string  
  
  /**
   * cron表达式
   * 用于定时任务的cron表达式
   */
  @Column({nullable: true, comment: '', name: 'cron_expression',})
  @ApiProperty({description: 'cron表达式',})
  public cronExpression: string  
  
  /**
   * 执行索引
   * 任务执行的索引
   */
  @Column({nullable: true, comment: '', name: 'execute_index',})
  @ApiProperty({description: '执行索引',})
  public executeIndex: string  
  
  /**
   * 开始时间
   * 任务执行的开始时间
   */
  @Column({nullable: true, comment: '', name: 'begin_time',})
  @ApiProperty({description: '开始时间',})
  public beginTime: string  
  
  /**
   * 结束时间
   * 任务执行的结束时间
   */
  @Column({nullable: true, comment: '', name: 'end_time',})
  @ApiProperty({description: '结束时间',})
  public endTime: string  
  
  /**
   * 执行状态
   * 任务执行的状态
   */
  @Column({nullable: true, comment: '', name: 'execute_status',})
  @ApiProperty({description: '执行状态',})
  public executeStatus: string  
  
  /**
   * 执行时间
   * 任务执行的时间
   */
  @Column({nullable: true, comment: '', name: 'execute_time',})
  @ApiProperty({description: '执行时间',})
  public executeTime: string  
  
  /**
   * 执行结果
   * 任务执行的结果
   */
  @Column({nullable: true, comment: '', name: 'execute_result',})
  @ApiProperty({description: '执行结果',})
  public executeResult: string  
  
  /**
   * 错误信息
   * 任务执行失败时的错误信息
   */
  @Column({nullable: true, comment: '', name: 'error_message',})
  @ApiProperty({description: '错误信息',})
  public errorMessage: string  
  
  /**
   * 错误堆栈
   * 任务执行失败时的错误堆栈信息
   */
  @Column({nullable: true, comment: '', name: 'error_stack',})
  @ApiProperty({description: '错误堆栈',})
  public errorStack: string  
  
}
