import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 微信支付配置实体类
 * 继承自BaseModel，包含微信支付所需的各种配置信息
 */
export declare class WxPayConfig extends BaseModel {
    /**
     * 店铺ID
     * 对应微信支付商户平台的店铺ID
     */
    shopId: string;
    /**
     * 应用ID
     * 对应微信支付商户平台的应用ID
     */
    appId: string;
    /**
     * 应用密钥
     * 对应微信支付商户平台的应用密钥
     */
    appSecret: string;
    /**
     * 商户号
     * 对应微信支付商户平台的商户号
     */
    mchId: string;
    /**
     * 商户密钥
     * 对应微信支付商户平台的商户密钥
     */
    mchKey: string;
    /**
     * 证书路径
     * 对应微信支付商户平台的证书路径
     */
    keyPath: string;
}
