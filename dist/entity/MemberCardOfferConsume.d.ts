import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 会员卡优惠消费实体类
 * 用于表示会员卡优惠消费的基本信息
 */
export declare class MemberCardOfferConsume extends BaseModel {
    /**
     * 会员卡优惠ID
     * 关联的会员卡优惠的唯一标识
     */
    memberCardOfferId: string;
    /**
     * 消费码
     * 用于记录会员卡优惠消费的唯一码
     */
    code: string;
}
