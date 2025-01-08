import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 提现实体类
 * 继承自BaseModel，包含提现所需的各种信息
 */
export declare class Withdrawal extends BaseModel {
    /**
     * 用户ID
     * 对应提现的用户ID
     */
    shopBuyerId: string;
    /**
     * 提现金额
     * 对应提现的金额
     */
    amount: number;
    /**
     * 商户订单号
     * 对应提现的商户订单号
     */
    outTradeNo: string;
}
