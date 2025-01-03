import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 页面浏览实体类
 * 用于记录页面浏览信息
 */
@Entity()
export class PageView extends BaseModel {
  /**
   * 店铺ID
   * 浏览页面的店铺ID
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string;

  /**
   * 用户ID
   * 浏览页面的用户ID
   */
  @Column({nullable: true, comment: '', name: 'user_id',})
  public userId: string;

  /**
   * 用户角色
   * 浏览页面的用户角色
   */
  @Column({nullable: true, comment: '', name: 'user_role',})
  public userRole: string;

  /**
   * 页面名称
   * 被浏览的页面名称
   */
  @Column({nullable: true, comment: '', name: 'page',})
  public page: string;
}
