import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 标签用户列表实体类
 * 继承自BaseModel，用于存储标签和用户之间的关联关系
 */
@Entity()
export class TagListUser extends BaseModel {

  /**
   * 买家ID
   * 对应买家的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  /**
   * 标签ID
   * 对应标签的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'tag_id',})
  public tagId: string  

}
