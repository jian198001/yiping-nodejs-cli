import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 标签商品映射实体类
 * 继承自BaseModel，用于存储标签和商品之间的映射关系
 */
@Entity()
export class TagGoodsMap extends BaseModel {

  /**
   * 商品ID
   * 对应商品的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'goods_id',})
  public goodsId: string  

  /**
   * 标签ID
   * 对应标签的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'tag_id',})
  public tagId: string  

}
