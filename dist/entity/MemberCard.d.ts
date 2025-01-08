import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 会员卡实体类
 * 用于表示会员卡的基本信息
 */
export declare class MemberCard extends BaseModel {
    /**
     * 激活类型
     * 会员卡的激活类型，可选值为use（首次使用时激活）或pay（付款即激活），默认值为use
     */
    activateType: string;
    /**
     * 单次最长暂停天数
     * 会员卡单次最长暂停天数
     */
    maxPauseDay: number;
    /**
     * 背景图片URL
     * 会员卡的背景图片URL
     */
    backgroundPicUrl: string;
    /**
     * 积分规则URL
     * 会员卡的积分规则URL
     */
    bonusUrl: string;
    /**
     * 积分规则
     * 会员卡的积分规则
     */
    bonusRules: string;
    /**
     * 激活小程序路径
     * 会员卡激活小程序的路径
     */
    activateAppBrandPass: string;
    /**
     * 积分是否已清零
     * 会员卡的积分是否已清零
     */
    bonusCleared: string;
    /**
     * 激活小程序用户名
     * 会员卡激活小程序的用户名
     */
    activateAppBrandUserName: string;
    /**
     * 买家角色
     * 会员卡的买家角色，默认值为buyer
     */
    buyerRole: string;
    /**
     * 商品ID
     * 会员卡关联的商品ID
     */
    goodsId: string;
    /**
     * 可核销次数
     * 会员卡的可核销次数
     */
    consume: number;
    /**
     * 每月最多核销次数
     * 会员卡每月最多核销次数
     */
    maxMonth: number;
    /**
     * 每天最多核销次数
     * 会员卡每天最多核销次数
     */
    maxDay: number;
    /**
     * 充值余额
     * 会员卡的充值余额
     */
    supplyBalance: string;
    /**
     * 充值积分
     * 会员卡的充值积分
     */
    supplyBonus: string;
    /**
     * 特权
     * 会员卡的特权
     */
    prerogative: string;
    /**
     * 激活URL
     * 会员卡的激活URL
     */
    activateUrl: string;
    /**
     * 是否自动激活
     * 会员卡是否自动激活
     */
    autoActivate: string;
    /**
     * 每周最多核销次数
     * 会员卡每周最多核销次数
     */
    maxWeek: number;
    /**
     * 折扣
     * 会员卡的折扣
     */
    discount: number;
    /**
     * 余额规则
     * 会员卡的余额规则
     */
    balanceRules: string;
    /**
     * 余额规则URL
     * 会员卡的余额规则URL
     */
    balanceUrl: string;
    /**
     * 可暂停次数
     * 会员卡的可暂停次数
     */
    maxPause: number;
}
