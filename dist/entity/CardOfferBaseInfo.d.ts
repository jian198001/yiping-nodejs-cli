import { CardBaseInfo } from "./CardBaseInfo";
/**
 * 卡券优惠基础信息实体类
 * 继承自CardBaseInfo，包含卡券优惠相关的各种基础信息
 */
export declare class CardOfferBaseInfo extends CardBaseInfo {
    /**
     * 卡券ID
     * 对应卡券的唯一标识
     */
    cardId: string;
    /**
     * 结束时间
     * 对应卡券优惠的结束时间
     */
    endTime: any;
    /**
     * 是否为转赠领取
     * 1代表是，0代表否
     */
    isGiveByFriend: string;
    /**
     * 当前code对应卡券的状态
     * NORMAL 正常 CONSUMED 已核销 EXPIREL 已过期 GIFTING 转赠中 GIFT_TIMEOUT 转赠超时 DELETE 已删除 UNAVAILABLE 已失效 code未被添加或被转赠领取的情况则统一报错：invalid serial code
     */
    userCardStatus: string;
    /**
     * 开始时间
     * 对应卡券优惠的开始时间
     */
    beginTime: any;
    /**
     * 转赠前的code
     * 为保证安全，微信会在转赠发生后变更该卡券的code号，该字段表示转赠前的code
     */
    oldUserCardCode: string;
    /**
     * 领取场景值
     * 用于领取渠道数据统计。可在生成二维码接口及添加Addcard接口中自定义该字段的字符串值
     */
    outerStr: string;
    /**
     * 买家ID
     * 对应领取卡券优惠的买家的唯一标识
     */
    shopBuyerId: string;
    /**
     * 发起转赠用户的openid
     * 当IsGiveByFriend为1时填入的字段，表示发起转赠用户的openid
     */
    friendUserName: string;
    /**
     * 是否为找回会员卡
     * 用户删除会员卡后可重新finder，当用户本次操作为finder时，该值为1，否则为0
     */
    isRestoreMemberCard: string;
}
