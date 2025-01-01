import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class DeliveryList extends BaseModel { // 订单发货 标识符名称来自微信小商店

  @Column({nullable: true, comment: '', name: 'delivery_id',})
  @ApiProperty({description: '快递公司id，通过获取快递公司列表获取，快递配送必填，同城，线下自提不用填',})
  public deliveryId: string  

  @Column({nullable: true, comment: '', name: 'waybill_id',})
  @ApiProperty({description: '快递单号，快递配送必填，同城，线下自提不用填',})
  public waybillId: string  

  @Column({nullable: true, comment: '', name: 'goods_infos',})
  @ApiProperty({description: '商品',})
  public goodsInfos: string  

  @Column({nullable: true, comment: '', name: 'order_id',})
  @ApiProperty({description: '订单ID',})
  public orderId: string  

}
