import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 可预约的资源排班状态实体类
 * 继承自BaseModel，用于存储可预约资源的排班状态信息
 */
@Entity()
export class TimeResJob extends BaseModel { // 可预约的资源排班状态
  
  /**
   * 内容
   * 对应可预约资源排班状态的相关内容
   */
  @Column({nullable: true, comment: '内容',})
  public content: string  
  
  /**
   * 资源ID
   * 对应可预约资源的唯一标识
   */
  @Column({nullable: true, comment: '资源ID', name: 'time_res_id',})
  public timeResId: string  
  
  /**
   * 预约开始时间
   * 对应可预约资源的预约开始时间
   */
  @Column({nullable: true, comment: '预约开始时间', name: 'time_start',})
  public timeStart: Date  
  
  /**
   * 预约结束时间
   * 对应可预约资源的预约结束时间
   */
  @Column({nullable: true, comment: '预约结束时间', name: 'time_end',})
  public timeEnd: Date  
  
  /**
   * 此资源最大可预约数量
   * 对应可预约资源的最大可预约数量，默认为1
   */
  @Column({nullable: true, comment: '此资源最大可预约数量', type: 'double',})
  public quota: number = 1  

}
