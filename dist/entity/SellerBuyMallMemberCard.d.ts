import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 卖家购买商城会员卡实体类
 * 继承自BaseModel，包含卖家购买商城会员卡相关的各种信息
 */
export declare class SellerBuyMallMemberCard extends BaseModel {
    /**
     * 会员卡ID
     * 对应会员卡的唯一标识
     */
    memberCardId: string;
    /**
     * 卖家ID
     * 对应购买会员卡的卖家的唯一标识
     */
    sellerId: string;
    /**
     * 店铺ID
     * 对应购买会员卡的店铺的唯一标识
     */
    shopId: string;
    /**
     * 订单ID
     * 对应购买会员卡的订单的唯一标识
     */
    orderId: string;
}
