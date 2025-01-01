import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class GoodsPropertiesKey extends BaseModel { // 可加价属性,标识符名称来自有赞

  @Column({nullable: true, comment: '', name: 'multiple',})
  @ApiProperty({description: '是否可多选',})
  public multiple: string  

  @Column({nullable: true, comment: '', name: 'goods_id',})
  @ApiProperty({description: '商品ID',})
  public goodsId: string  

}
