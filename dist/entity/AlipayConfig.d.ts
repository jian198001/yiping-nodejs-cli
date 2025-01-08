import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 支付宝配置实体类
 * 继承自BaseModel，包含支付宝支付所需的各种配置信息
 */
export declare class AlipayConfig extends BaseModel {
    /**
     * 店铺ID
     * 对应支付宝支付的店铺ID
     */
    shopId: string;
    /**
     * 协议
     * 对应支付宝支付的协议
     */
    protocol: string;
    /**
     * 网关主机
     * 对应支付宝支付的网关主机
     */
    gatewayHost: string;
    /**
     * 应用ID
     * 对应支付宝支付的应用ID
     */
    appId: string;
    /**
     * 签名类型
     * 对应支付宝支付的签名类型
     */
    signType: string;
    /**
     * 支付宝公钥
     * 对应支付宝支付的公钥
     */
    alipayPublicKey: string;
    /**
     * 商户私钥
     * 对应支付宝支付的商户私钥
     */
    merchantPrivateKey: string;
    /**
     * 商户证书路径
     * 对应支付宝支付的商户证书路径
     */
    merchantCertPath: string;
    /**
     * 支付宝证书路径
     * 对应支付宝支付的支付宝证书路径
     */
    alipayCertPath: string;
    /**
     * 支付宝根证书路径
     * 对应支付宝支付的根证书路径
     */
    alipayRootCertPath: string;
    /**
     * 通知URL
     * 对应支付宝支付的通知URL
     */
    notifyUrl: string;
    /**
     * 加密密钥
     * 对应支付宝支付的加密密钥
     */
    encryptKey: string;
    /**
     * 签名提供者
     * 对应支付宝支付的签名提供者
     */
    signProvider: string;
}
