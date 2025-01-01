import { ApiProperty, } from "@midwayjs/swagger"
import { Column, Entity, } from "typeorm"
import { BaseModel, } from "../module/common/model/BaseModel";

/**
 * 微信配置实体类
 * 继承自BaseModel，包含微信相关的各种配置信息
 */
@Entity()
export class wechatConfig extends BaseModel {
  /**
   * 网页授权回调地址
   * 用于微信网页授权回调
   */
  @Column({ nullable: true, comment: '', name: 'wechat_redirect_url', })
  @ApiProperty({ description: '网页授权回调地址', })
  public wechatRedirectUrl: string;

  /**
   * 微信Token
   * 第一次在微信控制台保存开发者配置信息时使用
   */
  @Column({ nullable: true, comment: '', name: 'wechat_token', })
  @ApiProperty({ description: '第一次在微信控制台保存开发者配置信息时使用', })
  public wechatToken: string;

  /**
   * 应用ID
   * 微信公众号或小程序的应用ID
   */
  @Column({ nullable: true, comment: '', name: 'app_id', })
  @ApiProperty({ description: '', })
  public appId: string;

  /**
   * 应用密钥
   * 微信公众号或小程序的应用密钥
   */
  @Column({ nullable: true, comment: '', name: 'app_secret', })
  @ApiProperty({ description: '', })
  public appSecret: string;

  /**
   * 商户ID
   * 微信支付商户ID
   */
  @Column({ nullable: true, comment: '', name: 'merchant_id', })
  @ApiProperty({ description: '商户ID', })
  public merchantId: string;

  /**
   * 支付密钥
   * 微信支付的密钥
   */
  @Column({ nullable: true, comment: '', name: 'payment_key', })
  @ApiProperty({ description: '', })
  public paymentKey: string;

  /**
   * 支付证书PFX
   * 微信支付的PFX证书
   */
  @Column({ nullable: true, comment: '', name: 'payment_certificate_pfx', })
  @ApiProperty({ description: 'pfx 证书', })
  public paymentCertificatePfx: string;

  /**
   * 支付通知地址
   * 微信支付的通知地址
   */
  @Column({ nullable: true, comment: '', name: 'payment_notify_url', })
  @ApiProperty({ description: '默认微信支付通知地址', })
  public paymentNotifyUrl: string;

  /**
   * 小程序应用ID
   * 微信小程序的应用ID
   */
  @Column({ nullable: true, comment: '', name: 'mini_program_app_id', })
  @ApiProperty({ description: '小程序配置', })
  public miniProgramAppId: string;

  /**
   * 小程序应用密钥
   * 微信小程序的应用密钥
   */
  @Column({ nullable: true, comment: '', name: 'mini_program_app_secret', })
  @ApiProperty({ description: '小程序配置', })
  public miniProgramAppSecret: string;

  /**
   * 店铺ID
   * 对应微信支付的店铺ID
   */
  @Column({ nullable: true, comment: '', name: 'shop_id', })
  @ApiProperty({ description: '', })
  public shopId: string;
}
