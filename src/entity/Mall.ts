import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 商城实体类
 * 用于表示商城的基本信息
 */
@Entity()
export class Mall extends BaseModel {

  /**
   * 二级返佣比例
   * 商城的二级返佣比例
   */
  @Column({nullable: true, comment: '', name: 'i_rate2', type: 'double',})
  public iRate2: number  

  /**
   * 一级返佣比例
   * 商城的一级返佣比例
   */
  @Column({nullable: true, comment: '', name: 'i_rate1', type: 'double',})
  public iRate1: number  

  /**
   * 备注信息
   * 商城的备注信息
   */
  @Column({nullable: true, comment: '', name: 'note',})
  @ApiProperty({description: '备注信息',})
  public note: string  

  /**
   * 买家订单权限
   * 买家能看到本商家的订单还是能看到所有商家的订单
   */
  @Column({nullable: true, comment: '', name: 'buyer_order',})
  @ApiProperty({description: '买家能看到本商家的订单还是能看到所有商家的订单',})
  public buyerOrder: string  

  /**
   * 购物车支持
   * 是否支持购物车：0->不支持；1->支持
   */
  @Column({nullable: true, comment: '', name: 'cart',})
  @ApiProperty({description: '是否支持购物车：0->不支持；1->支持',})
  public cart: string  

  /**
   * 退款规则
   * 0任何状态下都需要人工审核才可以退款1如订单是已支付状态下,不需人工审核可直接退款2'已支付未核销'订单不需人工审核直接退款,3不允许申请退款默认值0
   */
  @Column({nullable: true, comment: '', name: 'refund',})
  @ApiProperty({description: '0任何状态下都需要人工审核才可以退款1如订单是已支付状态下,不需人工审核可直接退款2\'已支付未核销\'订单不需人工审核直接退款,3不允许申请退款默认值0',})
  public refund: string  

  /**
   * 营业时间
   * 商城的营业时间，默认值：00:00-23:59
   */
  @Column({nullable: true, comment: '', name: 'business_hours',})
  @ApiProperty({description: '营业时间:默认值：00:00-23:59',})
  public businessHours: string  

  /**
   * 联系地址
   * 店铺的具体位置，需要经纬度获取，用于手机端店铺街调取店铺精准位置
   */
  @Column({nullable: true, comment: '', name: 'region',})
  @ApiProperty({description: '联系地址：店铺的具体位置,需要经纬度获取,用于手机端店铺街调取店铺精准位置',})
  public region: string  

  /**
   * 省份/直辖市
   * 商城所在的省份/直辖市
   */
  @Column({nullable: true, comment: '', name: 'province',})
  @ApiProperty({description: '省份/直辖市',})
  public province: string  

  /**
   * 非营业时间操作
   * 非营业时间内网店可进行的操作：goods->展示商品，但无法下单；order->可下单支付，但暂缓配送
   */
  @Column({nullable: true, comment: '', name: 'non_business_hours_show',})
  @ApiProperty({description: '非营业时间内网店可进行的操作：goods->展示商品,但无法下单；order->可下单支付,但暂缓配送',})
  public nonBusinessHoursShow: string  

  /**
   * 物流范围
   * 商城的物流范围，是同城还是支持全国
   */
  @Column({nullable: true, comment: '', name: 'delivery_area',})
  @ApiProperty({description: '物流范围,是同城还是支持全国',})
  public deliveryArea: string  

  /**
   * 邮箱
   * 商城的联系邮箱
   */
  @Column({nullable: true, comment: '', name: 'email',})
  @ApiProperty({description: '邮箱',})
  public email: string  

  /**
   * 微信支付通知URL
   * 微信支付成功后的通知URL
   */
  @Column({nullable: true, comment: '', name: 'wxpay_notify_url',})
  public wxpayNotifyUrl: string  

  /**
   * 买家分销
   * 是否开启分销
   */
  @Column({nullable: true, comment: '', name: 'buyer_sales',})
  @ApiProperty({description: '是否开启分销',})
  public buyerSales: string  

  /**
   * 门店自提
   * 门店是否支持门店自提，0->不支持；1->支持
   */
  @Column({nullable: true, comment: '', name: 'obs',})
  @ApiProperty({description: '门店是否支持门店自提,：0->不支持；1->支持',})
  public obs: string  

  /**
   * 支付类型
   * 商户是使用本商户的微信支付宝收款信息进行收款，还是使用商城的收款信息进行收款:shop:本商户,mall:商城,默认mall
   */
  @Column({nullable: true, comment: '', name: 'pay_type',})
  @ApiProperty({description: '商户是使用本商户的微信支付宝收款信息进行收款,还是使用商城的收款信息进行收款:shop:本商户,mall:商城,默认mall',})
  public payType: string  

  /**
   * 营业状态
   * 商城的营业状态
   */
  @Column({nullable: true, comment: '', name: 'status',})
  @ApiProperty({description: '营业状态',})
  public status: string  

  /**
   * 城市
   * 商城所在的城市
   */
  @Column({nullable: true, comment: '', name: 'city',})
  @ApiProperty({description: '城市',})
  public city: string  

  /**
   * 区域ID
   * 商城所在的区域ID
   */
  @Column({nullable: true, comment: '', name: 'area_id',})
  public areaId: string  

  /**
   * 微信支付退款通知URL
   * 微信支付退款成功后的通知URL
   */
  @Column({nullable: true, comment: '', name: 'wxpay_refund_notify_url',})
  public wxpayRefundNotifyUrl: string  

  /**
   * 买家分销规则
   * 买家分销的规则
   */
  @Column({nullable: true, comment: '', name: 'buyer_sales_rule',})
  public buyerSalesRule: string  

  /**
   * 昵称
   * 商城的昵称
   */
  @Column({nullable: true, comment: '', name: 'nick_name',})
  @ApiProperty({description: '昵称',})
  public nickName: string  

  /**
   * 初始SKU
   * 多规格商品的默认SKU规格价格信息
   */
  @Column({nullable: true, comment: '', name: 'initial_sku',})
  @ApiProperty({description: '多规格商品的默认SKU规格价格信息',})
  public initialSku: string  

  /**
   * 最后登录时间
   * 商城的最后登录时间
   */
  @Column({nullable: true, comment: '', name: 'login_time', type: "datetime",})
  @ApiProperty({description: '最后登录时间',})
  public loginTime: any = null;

  /**
   * 地址
   * 商城的详细地址
   */
  @Column({nullable: true, comment: '', name: 'address',})
  public address: string  

  /**
   * 营业开始时间
   * 商城的营业开始时间，默认值：00:00
   */
  @Column({nullable: true, comment: '', name: 'start_time', type: "datetime",})
  @ApiProperty({description: '营业开始时间:默认值：00:00',})
  public startTime: any = null;

  /**
   * 营业结束时间
   * 商城的营业结束时间，默认值：23:59
   */
  @Column({nullable: true, comment: '', name: 'end_time', type: "datetime",})
  @ApiProperty({description: '营业结束时间:默认值：23:59',})
  public endTime: any = null;

}
