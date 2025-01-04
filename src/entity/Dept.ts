import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 部门实体类
 * 
 * 该类用于定义部门的基本信息，包括父部门ID、组织ID和部门代码。
 * 所有标识符名称均来自支付宝。
 */
@Entity()
export class Dept extends BaseModel {
  
  /**
   * 父部门ID
   * 
   * 表示该部门的父部门的唯一标识符。
   */
  @Column({ nullable: true, comment: '', name: 'parent_id' })
  public parentId: string;
  
  /**
   * 组织ID
   * 
   * 表示该部门所属组织的唯一标识符。
   */
  @Column({ nullable: true, comment: '', name: 'org_id' })
  public orgId: string;
  
  /**
   * 部门代码
   * 
   * 表示该部门的代码或编号。
   */
  @Column({ nullable: true, comment: '' })
  public code: string;

}
