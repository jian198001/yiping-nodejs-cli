import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 入库单实体类
 * 用于表示入库单的基本信息
 */
@Entity()
export class Inbill extends BaseModel {
  /**
   * 买家角色
   * 入库单的买家角色，默认值为'buyer'
   */
  @Column({nullable: true, comment: '', name: 'buyer_role'})
  public buyerRole: string = 'buyer';

  /**
   * 收银订单标识
   * 标识该订单是否为收银订单，1表示收银，0或null表示非收银
   */
  @Column({nullable: true, comment: '', name: 'cash'})
  public cash: string;

  /**
   * 发票内容
   * 入库单的发票内容
   */
  @Column({nullable: true, comment: '', name: 'bill_content'})
  public billContent: string;

  /**
   * 外部交易号
   * 第三方商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一
   */
  @Column({nullable: true, comment: '', name: 'out_trade_no'})
  public outTradeNo: string;

  /**
   * 详细地址
   * 入库单的详细收货地址
   */
  @Column({nullable: true, comment: '', name: 'detail_address'})
  public detailAddress: string;

  /**
   * 邮编
   * 入库单的收货地址邮编
   */
  @Column({nullable: true, comment: '', name: 'post_code'})
  public postCode: string;

  /**
   * 收票人电话
   * 入库单的收票人电话号码
   */
  @Column({nullable: true, comment: '', name: 'bill_receiver_phone'})
  public billReceiverPhone: string;

  /**
   * 收货地址ID
   * 入库单的收货地址唯一标识
   */
  @Column({nullable: true, comment: '', name: 'receiver_address_id'})
  public receiverAddressId: string;

  /**
   * 物流公司编码
   * 入库单的物流公司编码，标识符名称来自微信小店
   */
  @Column({nullable: true, comment: '', name: 'delivery_company'})
  public deliveryCompany: string;

  /**
   * 运费
   * 入库单的运费金额，标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'post_fee', type: 'double'})
  public postFee: number;

  /**
   * 省份
   * 入库单的收货地址省份/直辖市
   */
  @Column({nullable: true, comment: '', name: 'province'})
  public province: string;

  /**
   * 店铺备注
   * 入库单的店铺备注信息
   */
  @Column({nullable: true, comment: '', name: 'shop_memo'})
  public shopMemo: string;

  /**
   * 确认收货时间
   * 入库单的确认收货时间
   */
  @Column({nullable: true, comment: '', name: 'receive_time', type: "datetime"})
  public receiveTime: any = null;

  /**
   * 发票类型
   * 入库单的发票类型，0表示不开发票，1表示电子发票，2表示纸质发票
   */
  @Column({nullable: true, comment: '', name: 'bill_type', type: 'integer'})
  public billType: number;

  /**
   * 物流类型
   * 入库单的物流类型，delivery表示需物流，eticket表示电子凭证不需物流，默认值为eticket
   */
  @Column({nullable: true, comment: '', name: 'delivery'})
  public delivery: string;

  /**
   * 修改时间
   * 入库单的最后修改时间
   */
  @Column({nullable: true, comment: '', name: 'modify_time', type: "datetime"})
  public modifyTime: any = null;

  /**
   * 支付时间
   * 入库单的支付时间，标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'pay_time', type: "datetime"})
  public payTime: any = null;

  /**
   * 运费承担方式
   * 入库单的运费承担方式，可选值为shop（卖家承担）和buyer（买家承担），默认值为shop
   */
  @Column({nullable: true, comment: '', name: 'freight_payer'})
  public freightPayer: string;

  /**
   * 区
   * 入库单的收货地址区
   */
  @Column({nullable: true, comment: '', name: 'region'})
  public region: string;

  /**
   * 订单状态
   * 入库单的状态，NOTPAY表示待付款，SUCCESS表示已付款，DELIVERY表示已发货，3表示已完成，CLOSED表示已关闭，5表示无效订单，REFUND表示申请退款，VERIFICATION表示已核销
   */
  @Column({nullable: true, comment: '', name: 'trade_state'})
  public tradeState: string;

  /**
   * 物流单号
   * 入库单的物流单号
   */
  @Column({nullable: true, comment: '', name: 'delivery_sn'})
  public deliverySn: string;

  /**
   * 城市
   * 入库单的收货地址城市
   */
  @Column({nullable: true, comment: '', name: 'city'})
  public city: string;

  /**
   * 支付方式
   * 入库单的支付方式，0表示未支付，alipay表示支付宝，wxpay表示微信，balance表示买家余额
   */
  @Column({nullable: true, comment: '', name: 'pay_type'})
  public payType: string;

  /**
   * 订单阅读历史
   * 入库单是否被商家已读
   */
  @Column({nullable: true, comment: '', name: 'read_history', type: 'integer'})
  public readHistory: number;

  /**
   * 发票抬头
   * 入库单的发票抬头
   */
  @Column({nullable: true, comment: '', name: 'bill_header'})
  public billHeader: string;

  /**
   * 收票人邮箱
   * 入库单的收票人邮箱
   */
  @Column({nullable: true, comment: '', name: 'bill_receiver_email'})
  public billReceiverEmail: string;

  /**
   * 订单总金额
   * 入库单的订单总金额
   */
  @Column({nullable: true, comment: '', name: 'total_amount', type: 'double'})
  public totalAmount: number;

  /**
   * 发货时间
   * 入库单的发货时间
   */
  @Column({nullable: true, comment: '', name: 'delivery_time', type: "datetime"})
  public deliveryTime: any = null;

  /**
   * 确认状态
   * 入库单的确认状态
   */
  @Column({nullable: true, comment: '', name: 'confirm_status'})
  public confirmStatus: string;

  /**
   * 发货ID
   * 入库单的发货ID
   */
  @Column({nullable: true, comment: '', name: 'delivery_id'})
  public deliveryId: string;

  /**
   * 收货人姓名
   * 入库单的收货人姓名
   */
  @Column({nullable: true, comment: '', name: 'true_name'})
  public trueName: string;

  /**
   * 留言
   * 入库单的留言信息
   */
  @Column({nullable: true, comment: '', name: 'message'})
  public message: string;

  /**
   * 店铺买家ID
   * 入库单的店铺买家ID
   */
  @Column({nullable: true, comment: '', name: 'shop_buyer_id'})
  public shopBuyerId: string;

  /**
   * 电话号码
   * 入库单的电话号码
   */
  @Column({nullable: true, comment: '', name: 'phone_num'})
  public phoneNum: string;
 
}
