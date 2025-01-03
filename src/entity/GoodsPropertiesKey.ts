import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 商品属性键实体类
 * 用于表示商品属性的键及其相关信息
 */
@Entity()
export class GoodsPropertiesKey extends BaseModel { // 可加价属性,标识符名称来自有赞

  /**
   * 是否可多选
   * 该商品属性键是否支持多选，1表示是，0表示否
   */
  @Column({nullable: true, comment: '', name: 'multiple',})
  @ApiProperty({description: '是否可多选',})
  public multiple: string  

  /**
   * 商品ID
   * 关联的商品的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'goods_id',})
  @ApiProperty({description: '商品ID',})
  public goodsId: string  

}
