import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 微信支付配置实体类
 * 继承自BaseModel，包含微信支付所需的各种配置信息
 */
@Entity()
export class WxPayConfig extends BaseModel {
  /**
   * 店铺ID
   * 对应微信支付商户平台的店铺ID
   */
  @Column({ nullable: true, comment: '店铺ID', name: 'shop_id' })
  public shopId: string;

  /**
   * 应用ID
   * 对应微信支付商户平台的应用ID
   */
  @Column({ nullable: true, comment: '应用ID', name: 'app_id' })
  public appId: string;

  /**
   * 应用密钥
   * 对应微信支付商户平台的应用密钥
   */
  @Column({ nullable: true, comment: '应用密钥', name: 'app_secret' })
  public appSecret: string;

  /**
   * 商户号
   * 对应微信支付商户平台的商户号
   */
  @Column({ nullable: true, comment: '商户号', name: 'mch_id' })
  public mchId: string;

  /**
   * 商户密钥
   * 对应微信支付商户平台的商户密钥
   */
  @Column({ nullable: true, comment: '商户密钥', name: 'mch_key' })
  public mchKey: string;

  /**
   * 证书路径
   * 对应微信支付商户平台的证书路径
   */
  @Column({ nullable: true, comment: '证书路径', name: 'key_path' })
  public keyPath: string;
}
