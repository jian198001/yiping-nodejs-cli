import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class Inbill extends BaseModel {

  @Column({nullable: true, comment: '', name: 'buyer_role',})
  public buyerRole: string  

  @Column({nullable: true, comment: '', name: 'cash',})
  public cash: string  

  @Column({nullable: true, comment: '', name: 'bill_content',})
  public billContent: string  

  @Column({nullable: true, comment: '', name: 'out_trade_no',})
  public outTradeNo: string  

  @Column({nullable: true, comment: '', name: 'detail_address',})
  public detailAddress: string  

  @Column({nullable: true, comment: '', name: 'post_code',})
  public postCode: string  

  @Column({nullable: true, comment: '', name: 'bill_receiver_phone',})
  public billReceiverPhone: string  

  @Column({nullable: true, comment: '', name: 'receiver_address_id',})
  public receiverAddressId: string  

  @Column({nullable: true, comment: '', name: 'delivery_company',})
  public deliveryCompany: string  

  @Column({nullable: true, comment: '', name: 'post_fee', type: 'double',})
  public postFee: number  

  @Column({nullable: true, comment: '', name: 'province',})
  public province: string  

  @Column({nullable: true, comment: '', name: 'shop_memo',})
  public shopMemo: string  

  @Column({nullable: true, comment: '', name: 'receive_time', type: "datetime",})
  public receiveTime: any = null;

  @Column({nullable: true, comment: '', name: 'bill_type', type: 'integer',})
  public billType: number  

  @Column({nullable: true, comment: '', name: 'delivery',})
  public delivery: string  

  @Column({nullable: true, comment: '', name: 'modify_time', type: "datetime",})
  public modifyTime: any = null;

  @Column({nullable: true, comment: '', name: 'pay_time', type: "datetime",})
  public payTime: any = null;

  @Column({nullable: true, comment: '', name: 'freight_payer',})
  public freightPayer: string  

  @Column({nullable: true, comment: '', name: 'region',})
  public region: string  

  @Column({nullable: true, comment: '', name: 'trade_state',})
  public tradeState: string  

  @Column({nullable: true, comment: '', name: 'delivery_sn',})
  public deliverySn: string  

  @Column({nullable: true, comment: '', name: 'city',})
  public city: string  

  @Column({nullable: true, comment: '', name: 'pay_type',})
  public payType: string  

  @Column({nullable: true, comment: '', name: 'read_history', type: 'integer',})
  public readHistory: number  

  @Column({nullable: true, comment: '', name: 'bill_header',})
  public billHeader: string  

  @Column({nullable: true, comment: '', name: 'bill_receiver_email',})
  public billReceiverEmail: string  

  @Column({nullable: true, comment: '', name: 'total_amount', type: 'double',})
  public totalAmount: number  

  @Column({nullable: true, comment: '', name: 'delivery_time', type: "datetime",})
  public deliveryTime: any = null;

  @Column({nullable: true, comment: '', name: 'confirm_status',})
  public confirmStatus: string  

  @Column({nullable: true, comment: '', name: 'delivery_id',})
  public deliveryId: string  

  @Column({nullable: true, comment: '', name: 'true_name',})
  public trueName: string  

  @Column({nullable: true, comment: '', name: 'message',})
  public message: string  

  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  @Column({nullable: true, comment: '', name: 'phone_num',})
  public phoneNum: string  

  @Column({nullable: true, comment: '', name: 'comment_time', type: "datetime",})
  public commentTime: any = null;

}
