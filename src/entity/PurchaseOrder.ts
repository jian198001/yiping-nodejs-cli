import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class PurchaseOrder extends BaseModel {

  @Column({nullable: true, comment: '', })
  public title: string  

  @Column({nullable: true, comment: '', name: 'buyer_role',})
  public buyerRole: string = 'buyer';

  @Column({nullable: true, comment: '', name: 'cash',})
  @ApiProperty({description: '收银订单,与商品不绑定,1收银,0或null非收银',})
  public cash: string  

  @Column({nullable: true, comment: '', name: 'bill_content',})
  @ApiProperty({description: '发票内容',})
  public billContent: string  

  @Column({nullable: true, comment: '', name: 'out_trade_no',})
  @ApiProperty({description: '第三方商户系统内部订单号,要求32个字符内,只能是数字、大小写字母_-|*@ ,且在同一个商户号下唯一',})
  public outTradeNo: string  

  @Column({nullable: true, comment: '', name: 'detail_address',})
  @ApiProperty({description: '详细地址',})
  public detailAddress: string  

  @Column({nullable: true, comment: '', name: 'post_code',})
  @ApiProperty({description: '收货人邮编',})
  public postCode: string  

  @Column({nullable: true, comment: '', name: 'bill_receiver_phone',})
  @ApiProperty({description: '收票人电话',})
  public billReceiverPhone: string  

  @Column({nullable: true, comment: '', name: 'receiver_address_id',})
  @ApiProperty({description: '地址ID',})
  public receiverAddressId: string  

  @Column({nullable: true, comment: '', name: 'delivery_company',})
  @ApiProperty({description: '物流公司编码,标识符名称来自微信小店',})
  public deliveryCompany: string  

  @Column({nullable: true, comment: '', name: 'post_fee', type: 'double',})
  @ApiProperty({description: '运费,标识符名称来自淘宝开放平台',})
  public postFee: number  

  @Column({nullable: true, comment: '', name: 'province',})
  @ApiProperty({description: '省份/直辖市',})
  public province: string  

  @Column({nullable: true, comment: '', name: 'shop_memo',})
  @ApiProperty({description: '邮政编码',})
  public shopMemo: string  

  @Column({nullable: true, comment: '', name: 'receive_time', type: "datetime",})
  @ApiProperty({description: '确认收货时间',})
  public receiveTime: any = null;

  @Column({nullable: true, comment: '', name: 'bill_type', type: 'integer',})
  @ApiProperty({description: '发票类型：0->不开发票；1->电子发票；2->纸质发票',})
  public billType: number  

  @Column({nullable: true, comment: '', name: 'delivery',})
  @ApiProperty({description: '物流类型：delivery->需物流;eticket->电子凭证不需物流;默认值:eticket(电子凭证不需物流)',})
  public delivery: string  

  @Column({nullable: true, comment: '', name: 'modify_time', type: "datetime",})
  @ApiProperty({description: '修改时间',})
  public modifyTime: any = null;

  @Column({nullable: true, comment: '', name: 'pay_time', type: "datetime",})
  @ApiProperty({description: '支付时间,标识符名称来自淘宝开放平台',})
  public payTime: any = null;

  @Column({nullable: true, comment: '', name: 'freight_payer',})
  @ApiProperty({description: '运费承担方式。可选值:shop（卖家承担）,buyer(买家承担);默认值:shop。卖家承担不用设置邮费和postage_id.买家承担的时候,必填邮费和postage_id 如果用户设置了运费模板会优先使用运费模板,否则要同步设置邮费（post_fee,express_fee,ems_fee）',})
  public freightPayer: string  

  @Column({nullable: true, comment: '', name: 'region',})
  @ApiProperty({description: '区',})
  public region: string  

  @Column({nullable: true, comment: '', name: 'trade_state',})
  @ApiProperty({description: '订单状态：NOTPAY:待付款,SUCCESS:已付款,DELIVERY:已发货,3:已完成,CLOSED:已关闭,5:无效订单,REFUND:申请退款,VERIFICATION:已核销',})
  public tradeState: string  

  @Column({nullable: true, comment: '', name: 'city',})
  @ApiProperty({description: '城市',})
  public city: string  

  @Column({nullable: true, comment: '', name: 'pay_type',})
  @ApiProperty({description: '支付方式：0->未支付；alipay->支付宝；wxpay->微信；balance->买家余额',})
  public payType: string  

  @Column({nullable: true, comment: '', name: 'read_history', type: 'integer',})
  @ApiProperty({description: '订单是否被商家已读',})
  public readHistory: number  

  @Column({nullable: true, comment: '', name: 'bill_header',})
  @ApiProperty({description: '发票抬头',})
  public billHeader: string  

  @Column({nullable: true, comment: '', name: 'bill_receiver_email',})
  @ApiProperty({description: '收票人邮箱',})
  public billReceiverEmail: string  

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

  @Column({nullable: true, comment: '', name: 'message',})
  @ApiProperty({description: '邮政编码',})
  public message: string  

  @Column({nullable: true, comment: '', name: 'shop_id',})
  @ApiProperty({description: '卖家ID',})
  public shopId: string  

  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  @Column({nullable: true, comment: '', name: 'phone_num',})
  @ApiProperty({description: '收货人电话',})
  public phoneNum: string  

  @Column({nullable: true, comment: '', name: 'comment_time', type: "datetime",})
  @ApiProperty({description: '评价时间',})
  public commentTime: any = null;

  @Column({nullable: true, name: 'create_user_id', })
  public createUserId: string  

}