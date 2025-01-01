import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 交易订单实体类
 * 继承自BaseModel，用于存储交易订单的相关信息
 */
@Entity()
export class TradeOrder extends BaseModel {

  /**
   * 买家角色
   * 对应买家的角色，默认为'buyer'
   */
  @Column({nullable: true, comment: '', name: 'buyer_role',})
  public buyerRole: string = 'buyer';
 
  /**
   * 发票内容
   * 对应发票的具体内容
   */
  @Column({nullable: true, comment: '', name: 'bill_content',})
  @ApiProperty({description: '发票内容',})
  public billContent: string  

  /**
   * 第三方商户系统内部订单号
   * 要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一
   */
  @Column({nullable: true, comment: '', name: 'out_trade_no',})
  @ApiProperty({description: '第三方商户系统内部订单号,要求32个字符内,只能是数字、大小写字母_-|*@ ,且在同一个商户号下唯一',})
  public outTradeNo: string  

  /**
   * 详细地址
   * 对应收货人的详细地址
   */
  @Column({nullable: true, comment: '', name: 'detail_address',})
  @ApiProperty({description: '详细地址',})
  public detailAddress: string  

  /**
   * 收货人邮编
   * 对应收货人的邮政编码
   */
  @Column({nullable: true, comment: '', name: 'post_code',})
  @ApiProperty({description: '收货人邮编',})
  public postCode: string  

  /**
   * 收票人电话
   * 对应收票人的联系电话
   */
  @Column({nullable: true, comment: '', name: 'bill_receiver_phone',})
  @ApiProperty({description: '收票人电话',})
  public billReceiverPhone: string  

  /**
   * 地址ID
   * 对应收货地址的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'receiver_address_id',})
  @ApiProperty({description: '地址ID',})
  public receiverAddressId: string  

  /**
   * 物流公司编码
   * 标识符名称来自微信小店
   */
  @Column({nullable: true, comment: '', name: 'delivery_company',})
  @ApiProperty({description: '物流公司编码,标识符名称来自微信小店',})
  public deliveryCompany: string  

  /**
   * 运费
   * 标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'post_fee', type: 'double',})
  @ApiProperty({description: '运费,标识符名称来自淘宝开放平台',})
  public postFee: number  

  /**
   * 省份/直辖市
   * 对应收货地址的省份或直辖市
   */
  @Column({nullable: true, comment: '', name: 'province',})
  @ApiProperty({description: '省份/直辖市',})
  public province: string  

  /**
   * 店铺备注
   * 对应卖家的店铺备注信息
   */
  @Column({nullable: true, comment: '', name: 'shop_memo',})
  @ApiProperty({description: '',})
  public shopMemo: string  

  /**
   * 确认收货时间
   * 对应订单的确认收货时间
   */
  @Column({nullable: true, comment: '', name: 'receive_time', type: "datetime",})
  @ApiProperty({description: '确认收货时间',})
  public receiveTime: any = null;

  /**
   * 发票类型
   * 0->不开发票；1->电子发票；2->纸质发票
   */
  @Column({nullable: true, comment: '', name: 'bill_type', type: 'integer',})
  @ApiProperty({description: '发票类型：0->不开发票；1->电子发票；2->纸质发票',})
  public billType: number  

  /**
   * 物流类型
   * delivery->需物流;eticket->电子凭证不需物流;默认值:eticket(电子凭证不需物流)
   */
  @Column({nullable: true, comment: '', name: 'delivery',})
  @ApiProperty({description: '物流类型：delivery->需物流;eticket->电子凭证不需物流;默认值:eticket(电子凭证不需物流)',})
  public delivery: string = 'eticket' 

  /**
   * 修改时间
   * 对应订单的最后修改时间
   */
  @Column({nullable: true, comment: '', name: 'modify_time', type: "datetime",})
  @ApiProperty({description: '修改时间',})
  public modifyTime: any = null;

  /**
   * 支付时间
   * 标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'pay_time', type: "datetime",})
  @ApiProperty({description: '支付时间,标识符名称来自淘宝开放平台',})
  public payTime: any = null;

  /**
   * 区
   * 对应收货地址的区
   */
  @Column({nullable: true, comment: '', name: 'region',})
  @ApiProperty({description: '区',})
  public region: string  

  /**
   * 订单状态
   * NOTPAY:待付款,SUCCESS:已付款,DELIVERY:已发货,3:已完成,CLOSED:已关闭,5:无效订单,REFUND:申请退款,VERIFICATION:已核销
   */
  @Column({nullable: true, comment: '', name: 'trade_state',})
  @ApiProperty({description: '订单状态：NOTPAY:待付款,SUCCESS:已付款,DELIVERY:已发货,3:已完成,CLOSED:已关闭,5:无效订单,REFUND:申请退款,VERIFICATION:已核销',})
  public tradeState: string  

  /**
   * 城市
   * 对应收货地址的城市
   */
  @Column({nullable: true, comment: '', name: 'city',})
  @ApiProperty({description: '城市',})
  public city: string  

  /**
   * 支付方式
   * 0->未支付；alipay->支付宝；wxpay->微信；balance->买家余额
   */
  @Column({nullable: true, comment: '', name: 'pay_type',})
  @ApiProperty({description: '支付方式：0->未支付；alipay->支付宝；wxpay->微信；balance->买家余额',})
  public payType: string  

  /**
   * 订单是否被商家已读
   * 0->未读；1->已读
   */
  @Column({nullable: true, comment: '', name: 'read_history', type: 'integer',})
  @ApiProperty({description: '订单是否被商家已读',})
  public readHistory: number  

  /**
   * 发票抬头
   * 对应发票的抬头信息
   */
  @Column({nullable: true, comment: '', name: 'bill_header',})
  @ApiProperty({description: '发票抬头',})
  public billHeader: string  

  /**
   * 收票人邮箱
   * 对应收票人的邮箱地址
   */
  @Column({nullable: true, comment: '', name: 'bill_receiver_email',})
  @ApiProperty({description: '收票人邮箱',})
  public billReceiverEmail: string  

  /**
   * 合计各项金额（元）
   * 对应订单中各项金额的合计，格式为JSON字符串
   */
  @Column({nullable: true, comment: '合计各项金额(元)', name: 'add_amount', })
  @ApiProperty({description: '合计各项金额(元)',})
  public addAmount: string = ' [ ] ';

  /**
   * 减免金额（元）
   * 对应订单中的减免金额，格式为JSON字符串
   */
  @Column({nullable: true, comment: '减免金额(元)', name: 'sub_amount', })
  @ApiProperty({description: '减免金额(元)',})
  public subAmount: string = ' [ ] ';

  /**
   * 
   * 对应订单中各项金额的合计，格式为JSON字符串
   */
  @Column({nullable: true, comment: '', name: 'total_amount', type: 'double',})
  @ApiProperty({description: '订单总金额(元)',})
  public totalAmount: number  

  @Column({nullable: true, comment: '', name: 'delivery_time', type: "datetime",})
  @ApiProperty({description: '发货时间',})
  public deliveryTime: any = null;

  @Column({nullable: true, comment: '', name: 'confirm_status',})
  @ApiProperty({description: '确认收货状态：0->未确认；1->已确认',})
  public confirmStatus: string  

  @Column({nullable: true, comment: '', name: 'delivery_id',})
  @ApiProperty({description: '运单ID,标识符名称来自微信小店',})
  public deliveryId: string  

  @Column({nullable: true, comment: '', name: 'true_name',})
  @ApiProperty({description: '收货人姓名',})
  public trueName: string  

  @Column({nullable: true, comment: '买家留言', })
  @ApiProperty({description: '',})
  public message: string  

  @Column({nullable: true, comment: '', name: 'shop_id',})
  @ApiProperty({description: '卖家ID',})
  public shopId: string  

  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  @Column({nullable: true, comment: '', name: 'phone_num',})
  @ApiProperty({description: '收货人电话',})
  public phoneNum: string  

}
