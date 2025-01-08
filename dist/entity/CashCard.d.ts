import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 现金卡实体类
 *
 * 该类用于定义现金卡的基本信息，包括减免金额和起用金额。
 * 所有标识符名称均来自微信支付平台。
 */
export declare class CashCard extends BaseModel {
    /**
     * 代金券减免金额（单位为分）
     *
     * 表示使用该代金券可以减免的金额。
     */
    reduceCost: number;
    /**
     * 代金券起用金额（单位为分）
     *
     * 表示使用该代金券的最低消费金额。如果无起用门槛则填0。
     */
    leastCost: number;
}