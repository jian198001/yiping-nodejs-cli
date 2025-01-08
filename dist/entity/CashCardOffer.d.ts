import { CardOfferBaseInfo } from "./CardOfferBaseInfo";
/**
 * 现金券优惠实体类
 *
 * 该类用于定义现金券优惠的基本信息，包括起用金额和减免金额。
 * 所有标识符名称均来自微信支付平台。
 */
export declare class CashCardOffer extends CardOfferBaseInfo {
    /**
     * 代金券起用金额（单位为分）
     *
     * 表示使用该代金券的最低消费金额。如果无起用门槛则填0。
     */
    leastCost: number;
    /**
     * 代金券减免金额（单位为分）
     *
     * 表示使用该代金券可以减免的金额。
     */
    reduceCost: number;
}