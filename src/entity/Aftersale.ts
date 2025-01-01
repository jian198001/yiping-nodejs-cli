import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 售后单实体类
 * 继承自BaseModel，包含售后单相关的各种信息
 */
@Entity()
export class Aftersale extends BaseModel { // 售后单 标识符名称来自微信小商店

  /**
   * 商家自定义订单ID
   */
  @Column({nullable: true, comment: '', name: 'outOrderId',})
  @ApiProperty({description: '商家自定义订单ID',})
  public outOrderId: string  

  /**
   * 商家自定义售后ID
   */
  @Column({nullable: true, comment: '', name: 'out_aftersale_id',})
  @ApiProperty({description: '商家自定义售后ID',})
  public outAftersaleId: string  

  /**
   * 商家小程序该售后单的页面path
   * 不存在则使用订单path
   */
  @Column({nullable: true, comment: '', name: 'path',})
  @ApiProperty({description: '商家小程序该售后单的页面path，不存在则使用订单path',})
  public path: string  

  /**
   * 售后类型
   * 1:退款,2:退款退货,3:换货
   */
  @Column({nullable: true, comment: '', name: 'type',})
  @ApiProperty({description: '售后类型，1:退款,2:退款退货,3:换货',})
  public type: string  

  /**
   * 售后状态
   * 0:未受理,1:用户取消,2:商家受理中,3:商家逾期未处理,4:商家拒绝退款,5:商家拒绝退货退款,6:待买家退货,7:退货退款关闭,8:待商家收货,11:商家退款中,12:商家逾期未退款,13:退款完成,14:退货退款完成,15:换货完成,16:待商家发货,17:待用户确认收货,18:商家拒绝换货,19:商家已收到货
   */
  @Column({nullable: true, comment: '', name: 'status',})
  @ApiProperty({description: '0:未受理,1:用户取消,2:商家受理中,3:商家逾期未处理,4:商家拒绝退款,5:商家拒绝退货退款,6:待买家退货,7:退货退款关闭,8:待商家收货,11:商家退款中,12:商家逾期未退款,13:退款完成,14:退货退款完成,15:换货完成,16:待商家发货,17:待用户确认收货,18:商家拒绝换货,19:商家已收到货',})
  public status: string  

  /**
   * 订单所有商品售后完成状态
   * 0:订单存在可售后商品，1:订单所有商品售后完成（订单维度）
   */
  @Column({nullable: true, comment: '', name: 'finish_all_aftersale',})
  @ApiProperty({description: '0:订单存在可售后商品，1:订单所有商品售后完成（订单维度）',})
  public finishAllAftersale: string  

  /**
   * 退货相关商品列表
   */
  @Column({nullable: true, comment: '', name: 'goods_infos',})
  @ApiProperty({description: '退货相关商品列表',})
  public goodsInfos: string  

  /**
   * 退款原因
   */
  @Column({nullable: true, comment: '', name: 'refund_reason',})
  @ApiProperty({description: '退款原因',})
  public refundReason: string  

}
