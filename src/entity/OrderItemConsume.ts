import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class OrderItemConsume extends BaseModel {

  @Column({nullable: true, comment: '', name: 'order_item_id',})
  @ApiProperty({description: '',})
  public orderItemId: string  

  @Column({nullable: true, comment: '核销码', })
  public consume: string  
 
  @Column({nullable: true, comment: '', })
  public status: string  

}
