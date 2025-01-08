import { CardOfferBaseInfo } from "./CardOfferBaseInfo";
/**
 * 礼品卡优惠实体类，继承自 CardOfferBaseInfo
 */
export declare class GiftCardOffer extends CardOfferBaseInfo {
    /**
     * 兑换券专用，填写兑换内容的名称
     */
    gift: string;
}
