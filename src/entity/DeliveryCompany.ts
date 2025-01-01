import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class DeliveryCompany extends BaseModel { // 快递公司 标识符名称来自微信小商店

  @Column({nullable: true, comment: '', name: 'delivery_id',})
  @ApiProperty({description: '快递公司id',})
  public deliveryId: string  

  @Column({nullable: true, comment: '', name: 'delivery_name',})
  @ApiProperty({description: '快递公司名称',})
  public deliveryName: string  

}
