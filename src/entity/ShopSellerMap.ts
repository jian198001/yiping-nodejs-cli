import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 店铺卖家映射实体类
 * 继承自BaseModel，用于关联店铺和卖家的信息
 */
@Entity()
export class ShopSellerMap extends BaseModel {

  /**
   * 店铺ID
   * 对应卖家所属店铺的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  /**
   * 用户角色
   * 对应卖家在店铺中的角色
   */
  @Column({nullable: true, comment: '', name: 'user_role',})
  public userRole: string  

  /**
   * 卖家ID
   * 对应卖家的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'seller_id',})
  public sellerId: string  

}
