import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 连续签到天数实体类
 * 继承自BaseModel，用于存储用户连续签到天数的信息
 */
export declare class SignInDay extends BaseModel {
    /**
     * 签到用户ID
     * 对应签到用户的唯一标识
     */
    shopBuyerId: string;
    /**
     * 连续签到天数
     * 对应用户的连续签到天数，默认为1
     */
    day: number;
}
