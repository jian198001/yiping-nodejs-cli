import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 支付宝配置实体类
 * 继承自BaseModel，包含支付宝支付所需的各种配置信息
 */
@Entity()
export class AlipayConfig extends BaseModel {

  /**
   * 店铺ID
   * 对应支付宝支付的店铺ID
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  /**
   * 协议
   * 对应支付宝支付的协议
   */
  @Column({nullable: true, comment: '', name: 'protocol',})
  public protocol: string  

  /**
   * 网关主机
   * 对应支付宝支付的网关主机
   */
  @Column({nullable: true, comment: '', name: 'gateway_host',})
  public gatewayHost: string  

  /**
   * 应用ID
   * 对应支付宝支付的应用ID
   */
  @Column({nullable: true, comment: '', name: 'app_id',})
  public appId: string  

  /**
   * 签名类型
   * 对应支付宝支付的签名类型
   */
  @Column({nullable: true, comment: '', name: 'sign_type',})
  public signType: string  

  /**
   * 支付宝公钥
   * 对应支付宝支付的公钥
   */
  @Column({nullable: true, comment: '', name: 'alipay_public_key',})
  public alipayPublicKey: string  

  /**
   * 商户私钥
   * 对应支付宝支付的商户私钥
   */
  @Column({nullable: true, comment: '', name: 'merchant_private_key',})
  public merchantPrivateKey: string  

  /**
   * 商户证书路径
   * 对应支付宝支付的商户证书路径
   */
  @Column({nullable: true, comment: '', name: 'merchant_cert_path',})
  public merchantCertPath: string  

  /**
   * 支付宝证书路径
   * 对应支付宝支付的支付宝证书路径
   */
  @Column({nullable: true, comment: '', name: 'alipay_cert_path',})
  public alipayCertPath: string  

  /**
   * 支付宝根证书路径
   * 对应支付宝支付的根证书路径
   */
  @Column({nullable: true, comment: '', name: 'alipay_root_cert_path',})
  public alipayRootCertPath: string  

  /**
   * 通知URL
   * 对应支付宝支付的通知URL
   */
  @Column({nullable: true, comment: '', name: 'notify_url',})
  public notifyUrl: string  

  /**
   * 加密密钥
   * 对应支付宝支付的加密密钥
   */
  @Column({nullable: true, comment: '', name: 'encrypt_key',})
  public encryptKey: string  

  /**
   * 签名提供者
   * 对应支付宝支付的签名提供者
   */
  @Column({nullable: true, comment: '', name: 'sign_provider',})
  public signProvider: string  

}
