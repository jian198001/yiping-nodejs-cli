import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 对话框实体类
 * 
 * 该类用于定义对话框的基本信息，包括路径和表单ID。
 * 所有标识符名称均来自支付宝。
 */
@Entity()
export class Dlg extends BaseModel {

  /**
   * 路径
   * 
   * 对话框的路径或URL。
   */
  @Column({nullable: true, comment: '',})
  public path: string  

  /**
   * 表单ID
   * 
   * 对话框关联的表单的唯一标识符。
   */
  @Column({nullable: true, comment: 'form_id', name: 'form_id',})
  public formId: string  

}
