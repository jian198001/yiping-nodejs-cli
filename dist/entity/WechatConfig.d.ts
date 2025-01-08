import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 微信配置实体类
 * 继承自BaseModel，包含微信相关的各种配置信息
 */
export declare class wechatConfig extends BaseModel {
    /**
     * 网页授权回调地址
     * 用于微信网页授权回调
     */
    wechatRedirectUrl: string;
    /**
     * 微信Token
     * 第一次在微信控制台保存开发者配置信息时使用
     */
    wechatToken: string;
    /**
     * 应用ID
     * 微信公众号或小程序的应用ID
     */
    appId: string;
    /**
     * 应用密钥
     * 微信公众号或小程序的应用密钥
     */
    appSecret: string;
    /**
     * 商户ID
     * 微信支付商户ID
     */
    merchantId: string;
    /**
     * 支付密钥
     * 微信支付的密钥
     */
    paymentKey: string;
    /**
     * 支付证书PFX
     * 微信支付的PFX证书
     */
    paymentCertificatePfx: string;
    /**
     * 支付通知地址
     * 微信支付的通知地址
     */
    paymentNotifyUrl: string;
    /**
     * 小程序应用ID
     * 微信小程序的应用ID
     */
    miniProgramAppId: string;
    /**
     * 小程序应用密钥
     * 微信小程序的应用密钥
     */
    miniProgramAppSecret: string;
    /**
     * 店铺ID
     * 对应微信支付的店铺ID
     */
    shopId: string;
}
