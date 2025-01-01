// import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 连续签到天数实体类
 * 继承自BaseModel，用于存储用户连续签到天数的信息
 */
@Entity()
export class SignInDay extends BaseModel { // 连续签到天数

    /**
     * 签到用户ID
     * 对应签到用户的唯一标识
     */
    @Column({ nullable: true, comment: '', name: 'shop_buyer_id' })
    public shopBuyerId: string; // 签到用户

    /**
     * 连续签到天数
     * 对应用户的连续签到天数，默认为1
     */
    @Column({ nullable: true, comment: '', })
    public day: number = 1; // 连续签到天数

}
