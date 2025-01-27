import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 岗位实体类
 * 用于表示岗位的基本信息
 */
@Entity()
export class Post extends BaseModel {
  /**
   * 岗位代码
   * 岗位的唯一标识代码
   */
  @Column({nullable: true, comment: '',})
  public code: string;

  /**
   * 组织ID
   * 岗位所属组织的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'org_id',})
  public orgId: string;
}
