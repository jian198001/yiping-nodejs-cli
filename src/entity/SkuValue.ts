import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 商品规格值实体类
 * 继承自BaseModel，用于存储商品规格值的信息
 */
@Entity()
export class SkuValue extends BaseModel {

  /**
   * 预览图片链接
   * 对应商品规格值的预览图片链接，用于在前端页面中显示规格的预览图片
   */
  @Column({nullable: true, comment: '', name: 'preview_img_url',})
  @ApiProperty({description: '用于预览显示的规格类目图片',})
  public previewImgUrl: string  

  /**
   * 规格图片链接
   * 对应商品规格值的图片链接，只有第一个规格类目可以定义图片，用于在前端页面中显示规格的详细图片
   */
  @Column({nullable: true, comment: '', name: 'img_url',})
  @ApiProperty({description: '规格类目图片,只有第一个规格类目可以定义图片',})
  public imgUrl: string  

  /**
   * 规格名ID
   * 对应商品规格值所属的规格名的唯一标识，用于关联规格名和规格值
   */
  @Column({nullable: true, comment: '', name: 'sku_key_id',})
  @ApiProperty({description: '规格名ID',})
  public skuKeyId: string  

}
