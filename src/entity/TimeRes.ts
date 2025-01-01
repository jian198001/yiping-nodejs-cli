import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 可预约的资源实体类
 * 继承自BaseModel，用于存储可预约资源的相关信息
 */
@Entity()
export class TimeRes extends BaseModel { // 可预约的资源

    /**
     * 发布用户ID
     * 对应可预约资源的发布用户的唯一标识
     */
    @Column({ nullable: true, comment: '发布用户id', name: 'user_id' })
    public userId: string;
  
}
