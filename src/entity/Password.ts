import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 密码实体类
 * 用于表示密码的基本信息
 */
@Entity()
export class Password extends BaseModel {
  /**
   * 最小长度
   * 密码的最小长度
   */
  @Column({nullable: true, comment: '', name: 'minlength', type: 'integer',})
  public minlength: number;

  /**
   * 最大长度
   * 密码的最大长度
   */
  @Column({nullable: true, comment: '', name: 'maxlength', type: 'integer',})
  public maxlength: number;
}
