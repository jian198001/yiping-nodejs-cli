import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 商品规格名实体类
 * 继承自BaseModel，用于存储商品规格名的信息
 */
@Entity()
export class SkuKey extends BaseModel {

  /**
   * 商品ID
   * 对应商品规格名所属商品的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'goods_id',})
  @ApiProperty({description: '商品ID',})
  public goodsId: string  

  /**
   * 规格类目名称
   * 对应商品规格名的名称，例如颜色、尺寸等
   */
  @Column({nullable: true, comment: '', name: 'sku_key_name',})
  @ApiProperty({description: '规格类目名称',})
  public skuKeyName: string  

  /**
   * 规格类目键
   * 对应商品规格名在SKU组合列表中的键值，用于关联规格名和规格值
   */
  @Column({nullable: true, comment: '', name: 'sku_key_str',})
  @ApiProperty({description: 'sku组合列表（下方list）中当前类目对应的key值,value值会是从属于当前类目的一个规格值id',})
  public skuKeyStr: string  

}
