import { CardOfferBaseInfo } from "./CardOfferBaseInfo";
/**
 * 会员卡优惠实体类
 * 用于表示会员卡优惠的基本信息
 */
export declare class MemberCardOffer extends CardOfferBaseInfo {
    /**
     * 可暂停次数
     * 会员卡优惠的可暂停次数
     */
    maxPause: number;
    /**
     * 每周最多核销次数
     * 会员卡优惠每周最多核销次数
     */
    maxWeek: number;
    /**
     * 是否自动激活
     * 会员卡优惠是否自动激活
     */
    autoActivate: string;
    /**
     * 折扣
     * 会员卡优惠的折扣
     */
    discount: number;
    /**
     * 余额规则
     * 会员卡优惠的余额规则
     */
    balanceRules: string;
    /**
     * 余额规则URL
     * 会员卡优惠的余额规则URL
     */
    balanceUrl: string;
    /**
     * 特权
     * 会员卡优惠的特权
     */
    prerogative: string;
    /**
     * 激活URL
     * 会员卡优惠的激活URL
     */
    activateUrl: string;
    /**
     * 每月最多核销次数
     * 会员卡优惠每月最多核销次数
     */
    maxMonth: number;
    /**
     * 每天最多核销次数
     * 会员卡优惠每天最多核销次数
     */
    maxDay: number;
    /**
     * 订单项目ID
     * 会员卡优惠关联的订单项目ID
     */
    orderItemId: string;
    /**
     * 充值余额
     * 会员卡优惠的充值余额
     */
    supplyBalance: string;
    /**
     * 充值积分
     * 会员卡优惠的充值积分
     */
    supplyBonus: string;
    /**
     * 销售人员ID
     * 会员卡优惠的销售人员ID
     */
    sellerId: string;
    /**
     * 激活小程序用户名
     * 会员卡优惠激活小程序的用户名
     */
    activateAppBrandUserName: string;
    /**
     * 会员卡ID
     * 会员卡优惠关联的会员卡ID
     */
    memberCardId: string;
    /**
     * 买家角色
     * 会员卡优惠的买家角色，默认值为buyer
     */
    buyerRole: string;
    /**
     * 可核销次数
     * 会员卡优惠的可核销次数
     */
    consume: number;
    /**
     * 积分规则
     * 会员卡优惠的积分规则
     */
    bonusRules: string;
    /**
     * 积分规则URL
     * 会员卡优惠的积分规则URL
     */
    bonusUrl: string;
    /**
     * 积分是否已清零
     * 会员卡优惠的积分是否已清零
     */
    bonusCleared: string;
    /**
     * 激活小程序路径
     * 会员卡优惠激活小程序的路径
     */
    activateAppBrandPass: string;
    /**
     * 激活类型
     * 会员卡优惠的激活类型，可选值为use（首次使用时激活）或pay（付款即激活），默认值为use
     */
    activateType: string;
    /**
     * 背景图片URL
     * 会员卡优惠的背景图片URL
     */
    backgroundPicUrl: string;
    /**
     * 单次最长暂停天数
     * 会员卡优惠单次最长暂停天数
     */
    maxPauseDay: number;
}
