import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class GoodsPropertiesValue extends BaseModel {

  @Column({nullable: true, comment: '', name: 'goods_properties_key_id',})
  @ApiProperty({description: '加价属性名ID',})
  public goodsPropertiesKeyId: string  

  @Column({nullable: true, comment: '', name: 'price', type: 'double',})
  @ApiProperty({description: '加价',})
  public price: number  

}
