import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 角色部门映射实体类
 * 继承自BaseModel，用于存储角色和部门之间的映射关系
 */
@Entity()
export class RoleDeptMap extends BaseModel {

  /**
   * 角色ID
   * 对应角色的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'role_id',})
  @ApiProperty({description: '角色ID ',})
  roleId: string  

  /**
   * 部门ID
   * 对应部门的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'dept_id',})
  @ApiProperty({description: '部门ID ',})
  deptId: string  

}

