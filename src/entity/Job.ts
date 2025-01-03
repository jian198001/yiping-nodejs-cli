import {ApiProperty,} from "@midwayjs/swagger"
import {Column, } from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 任务实体类
 * 用于表示任务的基本信息
 */
// @Entity()
export class Job extends BaseModel {
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
   * 重试次数
   * 任务执行失败后的重试次数
   */
  @Column({nullable: true, comment: '', name: 'retry_count',})
  @ApiProperty({description: '重试次数',})
  public retryCount: number = null;
  
  /**
   * 重试间隔
   * 任务执行失败后的重试间隔时间（单位：秒）
   */
  @Column({nullable: true, comment: '', name: 'retry_interval',})
  @ApiProperty({description: '重试间隔（单位：秒）',})
  public retryInterval: number = null;
  
  /**
   * 监控超时时间
   * 任务执行的监控超时时间（单位：秒）
   */
  @Column({nullable: true, comment: '', name: 'monitor_timeout',})
  @ApiProperty({description: '监控超时时间（单位：秒）',})
  public monitorTimeout: number = null;
}
