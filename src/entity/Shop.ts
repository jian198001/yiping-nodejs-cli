import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel"

/**
 * 店铺实体类
 * 继承自BaseModel，包含店铺相关的各种信息
 */
@Entity()
export class Shop extends BaseModel {

  /**
   * 编码
   * 对应店铺的唯一编码
   */
  @Column({nullable: true, comment: '', })
  @ApiProperty({description: '编码',})
  public code: string  

  /**
   * 邮箱
   * 对应店铺的联系邮箱
   */
  @Column({nullable: true, comment: '', name: 'email',})
  @ApiProperty({description: '邮箱',})
  public email: string  

  /**
   * 地区编码
   * 对应店铺所在地区的编码
   */
  @Column({nullable: true, comment: '', name: 'region_code',})
  public regionCode: string  

  /**
   * 非营业时间内网店可进行的操作
   * 非营业时间内网店可进行的操作：goods->展示商品,但无法下单；order->可下单支付预订,但延时配送，默认为'order'
   */
  @Column({nullable: true, comment: '', name: 'non_business_hours_show',})
  @ApiProperty({description: '非营业时间内网店可进行的操作：goods->展示商品,但无法下单；order->可下单支付预订,但延时配送',})
  public nonBusinessHoursShow: string = 'order';

  /**
   * 课程消费类型
   * 课程的消费类型，默认为'courseShift'
   */
  @Column({nullable: true, comment: '', name: 'course_consume_type',})
  public courseConsumeType: string = 'courseShift';

  /**
   * 物流范围-快递
   * 物流范围,是同城还是支持全国,是否开启快递配送
   */
  @Column({nullable: true, comment: '', name: 'express',})
  @ApiProperty({description: '物流范围,是同城还是支持全国,是否开启快递配送',})
  public express: string  

  /**
   * 物流范围-同城
   * 物流范围,是同城还是支持national,是否开启同城配送
   */
  @Column({nullable: true, comment: '', name: 'same_city',})
  @ApiProperty({description: '物流范围,是同城还是支持全国,是否开启同城配送',})
  public sameCity: string  

  /**
   * 物流范围-自提
   * 物流范围,是同城还是支持全国,是否开启线下自提
   */
  @Column({nullable: true, comment: '', name: 'pickup',})
  @ApiProperty({description: '物流范围,是同城还是支持全国,是否开启线下自提',})
  public pickup: string  

  /**
   * 省份/直辖市
   * 对应店铺所在的省份或直辖市
   */
  @Column({nullable: true, comment: '', name: 'province',})
  @ApiProperty({description: '省份/直辖市',})
  public province: string  

  @Column({nullable: true, comment: '', name: 'city',})
  @ApiProperty({description: '市',})
  public city: string  

  /**
   * 区
   * 对应店铺所在的区
   */
  @Column({nullable: true, comment: '', name: 'region',})
  @ApiProperty({description: '区',})
  public region: string  

  /**
   * 营业时间
   * 对应店铺的营业时间，默认值为'00:00-23:59'
   */
  @Column({nullable: true, comment: '', name: 'business_hours',})
  @ApiProperty({description: '营业时间:默认值：00:00-23:59',})
  public businessHours: string  

  /**
   * 地区邮编
   * 对应店铺所在地区的邮编
   */
  @Column({nullable: true, comment: '', name: 'region_postcode',})
  public regionPostcode: string  

  /**
   * 退款设置
   * 0任何状态下都需要人工审核才可以退款1如订单是已支付状态下,不需人工审核可直接退款2'已支付未核销'订单不需人工审核直接退款,默认值0
   */
  @Column({nullable: true, comment: '', name: 'refund',})
  @ApiProperty({description: '0任何状态下都需要人工审核才可以退款1如订单是已支付状态下,不需人工审核可直接退款2\'已支付未核销\'订单不需人工审核直接退款,默认值0',})
  public refund: string

  /**
   * 联系电话
   * 对应店铺的联系电话
   */
  @Column({nullable: true, comment: '', name: 'phone',})
  public phone: string  

  /**
   * 是否支持购物车
   * 是否支持购物车：0->不支持；1->支持，默认为'1'
   */
  @Column({nullable: true, comment: '', name: 'cart',})
  @ApiProperty({description: '是否支持购物车：0->不支持；1->支持',})
  public cart: string = '1';

  /**
   * 买家订单可见性
   * 买家能看到本商家的订单还是能看到所有商家的订单
   */
  @Column({nullable: true, comment: '', name: 'buyer_order',})
  @ApiProperty({description: '买家能看到本商家的订单还是能看到所有商家的订单',})
  public buyerOrder: string  

  /**
   * 备注信息
   * 对应店铺的备注信息
   */
  @Column({nullable: true, comment: '', name: 'note',})
  @ApiProperty({description: '备注信息',})
  public note: string  

  /**
   * 有效期结束时间
   * 对应店铺的有效期结束时间
   */
  @Column({nullable: true, comment: '', name: 'end_time_valid', type: 'datetime',})
  public endTimeValid: any = null;

  /**
   * 利率1
   * 对应店铺的利率1
   */
  @Column({nullable: true, comment: '', name: 'i_rate1', type: 'double',})
  public iRate1: number  

  /**
   * 利率2
   * 对应店铺的利率2
   */
  @Column({nullable: true, comment: '', name: 'i_rate2', type: 'double',})
  public iRate2: number  

  /**
   * 卖家ID
   * 对应店铺所属卖家的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'seller_id',})
  public sellerId: string  

  /**
   * 联系地址
   * 对应店铺的联系地址：店铺的具体位置,需要经纬度获取,用于手机端店铺街调取店铺精准位置
   */
  @Column({nullable: true, comment: '', name: 'address',})
  @ApiProperty({description: '联系地址：店铺的具体位置,需要经纬度获取,用于手机端店铺街调取店铺精准位置',})
  public address: string  

  /**
   * 昵称
   * 对应店铺的昵称
   */
  @Column({nullable: true, comment: '', name: 'nickname',})
  @ApiProperty({description: '昵称',})
  public nickname: string  

  /**
   * 地区值
   * 对应店铺所在地区的值
   */
  @Column({nullable: true, comment: '', name: 'region_value',})
  public regionValue: string  

  /**
   * 多规格商品的默认SKU规格价格信息
   * 对应多规格商品的默认SKU规格价格信息
   */
  @Column({nullable: true, comment: '', name: 'initial_sku',})
  @ApiProperty({description: '多规格商品的默认SKU规格价格信息',})
  public initialSku: string  

  /**
   * 微信支付退款通知URL
   * 对应微信支付退款通知的URL
   */
  @Column({nullable: true, comment: '', name: 'wxpay_refund_notify_url',})
  public wxpayRefundNotifyUrl: string  

  /**
   * 买家销售规则
   * 对应买家销售的规则
   */
  @Column({nullable: true, comment: '', name: 'buyer_sales_rule',})
  public buyerSalesRule: string  

  
  @Column({nullable: true, comment: '', })
  @ApiProperty({description: '本店铺对应的运营区域', name: 'delivery_area'})
  public deliveryArea: string  

}
