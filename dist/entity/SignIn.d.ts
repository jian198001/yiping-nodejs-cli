import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 签到实体类
 * 继承自BaseModel，用于存储签到相关的信息
 */
export declare class SignIn extends BaseModel {
    /**
     * 签到用户ID
     * 对应签到用户的唯一标识
     */
    shopBuyerId: string;
}
