import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 店铺微信用户映射实体类
 * 继承自BaseModel，用于关联店铺和微信用户的信息
 */
@Entity()
export class ShopWxUserMap extends BaseModel {

  /**
   * 店铺ID
   * 对应微信用户所属店铺的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  /**
   * 用户角色
   * 对应微信用户在店铺中的角色
   */
  @Column({nullable: true, comment: '', name: 'user_role',})
  public userRole: string  

  /**
   * 微信用户OpenID
   * 对应微信用户的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'open_id',})
  public openId: string  

}
