import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 商品属性值实体类
 * 用于表示商品属性的具体值及其相关信息
 */
@Entity()
export class GoodsPropertiesValue extends BaseModel {

  /**
   * 商品属性键ID
   * 关联的商品属性键的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'goods_properties_key_id',})
  @ApiProperty({description: '加价属性名ID',})
  public goodsPropertiesKeyId: string  

  /**
   * 加价价格
   * 该商品属性值对应的加价价格
   */
  @Column({nullable: true, comment: '', name: 'price', type: 'double',})
  @ApiProperty({description: '加价',})
  public price: number  

}
