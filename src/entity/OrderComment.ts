import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class OrderComment extends BaseModel {

  @Column({nullable: true, comment: '', name: 'order_id',})
  @ApiProperty({description: '订单id',})
  public orderId: string  

  @Column({nullable: true, comment: '', name: 'message',})
  @ApiProperty({description: '买家留言,标识符名称来自有赞',})
  public message: string  

}
