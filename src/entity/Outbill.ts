import {Column, Entity,} from "typeorm";
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 出库单实体类
 * 用于表示出库单的基本信息
 */
@Entity()
export class Outbill extends BaseModel { // 出库单
  
  /**
   * 出库单内容
   * 出库单的详细内容
   */
  @Column({nullable: true, comment: '出库单内容', name: 'bill_content',})
  public billContent: string  
  
  /**
   * 详细地址
   * 收货人的详细地址
   */
  @Column({nullable: true, comment: '详细地址', name: 'detail_address',})
  public detailAddress: string  

  /**
   * 邮编
   * 收货人的邮编
   */
  @Column({nullable: true, comment: '邮编', name: 'post_code',})
  public postCode: string  

  /**
   * 收货人电话
   * 收货人的电话号码
   */
  @Column({nullable: true, comment: '收货人电话', name: 'bill_receiver_phone',})
  public billReceiverPhone: string  

  /**
   * 收货地址ID
   * 收货地址的唯一标识
   */
  @Column({nullable: true, comment: '收货地址ID', name: 'receiver_address_id',})
  public receiverAddressId: string  

  /**
   * 快递公司
   * 负责配送的快递公司名称
   */
  @Column({nullable: true, comment: '快递公司', name: 'delivery_company',})
  public deliveryCompany: string  

  /**
   * 邮费
   * 订单的邮费金额
   */
  @Column({nullable: true, comment: '邮费', name: 'post_fee', type: 'double',})
  public postFee: number  

  /**
   * 省份
   * 收货地址所在的省份
   */
  @Column({nullable: true, comment: '省份', name: 'province',})
  public province: string  

  /**
   * 店铺备注
   * 店铺对该订单的备注信息
   */
  @Column({nullable: true, comment: '店铺备注', name: 'shop_memo',})
  public shopMemo: string  

  /**
   * 收货时间
   * 预计的收货时间
   */
  @Column({nullable: true, comment: '收货时间', name: 'receive_time', type: "datetime",})
  public receiveTime: any = null;

  /**
   * 单据类型
   * 出库单的类型
   */
  @Column({nullable: true, comment: '单据类型', name: 'bill_type', type: 'integer',})
  public billType: number  

  /**
   * 配送方式
   * 订单的配送方式
   */
  @Column({nullable: true, comment: '配送方式', name: 'delivery',})
  public delivery: string  

  /**
   * 修改时间
   * 出库单的最后修改时间
   */
  @Column({nullable: true, comment: '修改时间', name: 'modify_time', type: "datetime",})
  public modifyTime: any = null;

  /**
   * 支付时间
   * 订单的支付时间
   */
  @Column({nullable: true, comment: '支付时间', name: 'pay_time', type: "datetime",})
  public payTime: any = null;

  /**
   * 运费支付方
   * 承担运费的一方
   */
  @Column({nullable: true, comment: '运费支付方', name: 'freight_payer',})
  public freightPayer: string  

  /**
   * 地区
   * 收货地址所在的地区
   */
  @Column({nullable: true, comment: '地区', name: 'region',})
  public region: string  

  /**
   * 交易状态
   * 订单的交易状态
   */
  @Column({nullable: true, comment: '交易状态', name: 'trade_state',})
  public tradeState: string  

  /**
   * 物流单号
   * 快递公司提供的物流单号
   */
  @Column({nullable: true, comment: '物流单号', name: 'delivery_sn',})
  public deliverySn: string  

  /**
   * 城市
   * 收货地址所在的城市
   */
  @Column({nullable: true, comment: '城市', name: 'city',})
  public city: string  

  /**
   * 支付类型
   * 订单的支付方式类型
   */
  @Column({nullable: true, comment: '支付类型', name: 'pay_type',})
  public payType: string  

  /**
   * 阅读历史
   * 订单的阅读历史状态
   */
  @Column({nullable: true, comment: '阅读历史', name: 'read_history', type: 'integer',})
  public readHistory: number  

  /**
   * 单据抬头
   * 出库单的抬头信息
   */
  @Column({nullable: true, comment: '单据抬头', name: 'bill_header',})
  public billHeader: string  

  /**
   * 收货人邮箱
   * 收货人的邮箱地址
   */
  @Column({nullable: true, comment: '收货人邮箱', name: 'bill_receiver_email',})
  public billReceiverEmail: string  

  /**
   * 总金额
   * 订单的总金额
   */
  @Column({nullable: true, comment: '总金额', name: 'total_amount', type: 'double',})
  public totalAmount: number  

  /**
   * 发货时间
   * 订单的发货时间
   */
  @Column({nullable: true, comment: '发货时间', name: 'delivery_time', type: "datetime",})
  public deliveryTime: any = null;

  /**
   * 确认状态
   * 订单的确认状态
   */
  @Column({nullable: true, comment: '确认状态', name: 'confirm_status',})
  public confirmStatus: string  

  /**
   * 发货ID
   * 发货记录的唯一标识
   */
  @Column({nullable: true, comment: '发货ID', name: 'delivery_id',})
  public deliveryId: string  

  /**
   * 真实姓名
   * 收货人的真实姓名
   */
  @Column({nullable: true, comment: '真实姓名', name: 'true_name',})
  public trueName: string  

  /**
   * 留言
   * 买家对订单的留言信息
   */
  @Column({nullable: true, comment: '留言', name: 'message',})
  public message: string  

  /**
   * 店铺买家ID
   * 购买该订单的店铺买家ID
   */
  @Column({nullable: true, comment: '店铺买家ID', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  /**
   * 电话号码
   * 收货人的电话号码
   */
  @Column({nullable: true, comment: '电话号码', name: 'phone_num',})
  public phoneNum: string  

  /**
   * 评论时间
   * 订单的评论时间
   */
  @Column({nullable: true, comment: '评论时间', name: 'comment_time', type: "datetime",})
  public commentTime: any = null;

}
