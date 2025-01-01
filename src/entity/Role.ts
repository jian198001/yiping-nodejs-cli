import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 角色实体类
 * 继承自BaseModel，用于存储角色的相关信息
 */
@Entity()
export class Role extends BaseModel {

  /**
   * 角色权限
   * 对应角色的权限标识
   */
  @Column({nullable: true, comment: '', name: 'role_key',})
  @ApiProperty({description: '角色权限 ',})
  roleKey: string  

  /**
   * 数据范围
   * 对应角色的数据访问范围，取值范围为1-5
   */
  @Column({nullable: true, comment: '', name: 'data_scope',})
  @ApiProperty({description: '数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限） ',})
  dataScope: string  

  /**
   * 菜单树选择项是否关联显示
   * 对应菜单树选择项的显示方式，0表示父子不互相关联显示，1表示父子互相关联显示
   */
  @Column({nullable: true, comment: '', name: 'menu_check_strictly',})
  @ApiProperty({description: '菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示） ',})
  menuCheckStrictly: boolean = null;

  /**
   * 部门树选择项是否关联显示
   * 对应部门树选择项的显示方式，0表示父子不互相关联显示，1表示父子互相关联显示
   */
  @Column({nullable: true, comment: '', name: 'dept_check_strictly',})
  @ApiProperty({description: '部门树选择项是否关联显示（0：父子不互相关联显示 1：父子互相关联显示 ） ',})
  deptCheckStrictly: string  

  /**
   * 角色状态
   * 对应角色的状态，0表示正常，1表示停用
   */
  @Column({nullable: true,})
  @ApiProperty({description: '角色状态（0正常 1停用） ',})
  status: string  

  /**
   * 删除标志
   * 对应角色的删除状态，0表示存在，2表示删除
   */
  @Column({nullable: true, comment: '', name: 'del_flag',})
  @ApiProperty({description: '删除标志（0代表存在 2代表删除） ',})
  delFlag: string  

  /**
   * 用户是否存在此角色标识
   * 对应用户是否拥有此角色的标识，默认不存在
   */
  @Column({nullable: true,})
  @ApiProperty({description: '用户是否存在此角色标识 默认不存在 ',})
  flag: string  

  /**
   * 备注
   * 对应角色的备注信息
   */
  @Column({nullable: true,})
  @ApiProperty({description: '备注',})
  remark: string  

  /**
   * 菜单ID列表
   * 对应角色拥有的菜单ID列表
   */
  menuIds: string[] = [];

  /**
   * 部门ID列表
   * 对应角色拥有的部门ID列表
   */
  deptIds: string[] = [];

}
