// 导入typeorm库中的Column和Entity装饰器，用于定义数据库实体和字段
import {Column, Entity,} from "typeorm"
// 导入BaseModel类，该类定义了实体的通用属性和方法
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 用户OpenID实体类
 * 继承自BaseModel，包含用户OpenID相关的各种信息
 */
@Entity()
export class UserOpenId extends BaseModel {
  /**
   * 应用ID
   * 对应微信公众号或小程序的应用ID
   */
  @Column({nullable: true, comment: '', name: 'app_id',})
  public appId: string  

  /**
   * 用户OpenID
   * 对应微信用户的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'open_id',})
  public openId: string  

  /**
   * 用户角色
   * 对应用户的角色
   */
  @Column({nullable: true, comment: '', name: 'user_role',})
  public userRole: string  

  /**
   * 命名空间
   * 对应用户OpenID的命名空间
   */
  @Column({nullable: true, comment: '', name: 'namespace',})
  public namespace: string  

  /**
   * 用户ID
   * 对应用户的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'user_id',})
  public userId: string  

}
