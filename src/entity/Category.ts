import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 类别实体类
 * 
 * 该类用于定义系统中的类别信息，包括类别的标题。
 * 所有标识符名称均来自淘宝开放平台。
 */
@Entity()
export class Category extends BaseModel {

  /**
   * 类别的标题
   * 
   * 类别的名称或描述。
   */
  @Column({nullable: true, comment: '标题',})
  public title: string  

}
