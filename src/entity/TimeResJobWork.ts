import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 可预约的资源排班工作实体类
 * 继承自BaseModel，用于存储可预约资源排班工作的相关信息
 */
@Entity()
export class TimeResJobWork extends BaseModel { // 可预约的资源排班状态

  /**
   * 资源排班ID
   * 对应可预约资源排班的唯一标识
   */
  @Column({nullable: true, comment: '资源排班ID', name: 'time_res_job_id',})
  public timeResJobId: string  

  /**
   * 预约用户id
   * 对应预约用户的唯一标识
   */
  @Column({nullable: true, comment: '预约用户id', name: 'user_id',})
  public userId: string  

  /**
   * 预约用户留言
   * 对应预约用户的留言信息
   */
  @Column({nullable: true, comment: '预约用户留言',})
  public message: string  

}
