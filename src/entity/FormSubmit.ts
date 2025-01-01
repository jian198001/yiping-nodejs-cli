import { Column, Entity } from 'typeorm';
import { BaseModel } from '../module/common/model/BaseModel';

/**
 * 表单提交实体类，继承自 BaseModel
 */
@Entity()
export class FormSubmit extends BaseModel {
  /**
   * 表单id，标识符名称来自淘宝开放平台
   */
  @Column({ nullable: true, comment: '表单id', name: 'form_id' })
  public formId: string;

  /**
   * 表单代码，标识符名称来自淘宝开放平台
   */
  @Column({ nullable: true, comment: '表单代码' })
  public code: string;

  /**
   * 表单内容，标识符名称来自淘宝开放平台
   */
  @Column({ nullable: true, comment: '表单内容', type: 'text' })
  public content: string;
}
