import { ApiProperty, } from "@midwayjs/swagger"
import { Column, Entity, } from "typeorm"
import { BaseModel, } from "../module/common/model/BaseModel";

/**
 * 用户角色映射实体类
 * 继承自BaseModel，包含用户与角色之间的映射关系
 */
@Entity()
export class UserRoleMap extends BaseModel {

  /**
   * 角色ID
   * 对应角色的唯一标识
   */
  @Column({ nullable: true, comment: '', name: 'role_id', })
  @ApiProperty({ description: '角色ID ', })
  roleId: string;

  /**
   * 用户ID
   * 对应用户的唯一标识
   */
  @Column({ nullable: true, comment: '', name: 'user_id', })
  @ApiProperty({ description: '用户ID ', })
  userId: string;
}
