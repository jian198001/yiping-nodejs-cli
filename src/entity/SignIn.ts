// import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 签到实体类
 * 继承自BaseModel，用于存储签到相关的信息
 */
@Entity()
export class SignIn extends BaseModel { // 签到

    /**
     * 签到用户ID
     * 对应签到用户的唯一标识
     */
    @Column({ nullable: true, comment: '', name: 'shop_buyer_id' })
    public shopBuyerId: string; // 签到用户

}
