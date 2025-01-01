import { Column, Entity } from 'typeorm';
import { BaseModel } from '../module/common/model/BaseModel';

/**
 * 表单实体类，继承自 BaseModel
 */
@Entity()
export class Form extends BaseModel {
  /**
   * 表单标题
   */
  @Column({ nullable: true, comment: '表单标题' })
  public title: string;

  /**
   * 表单代码
   */
  @Column({ nullable: true, comment: '表单代码' })
  public code: string;

  /**
   * 表单内容
   */
  @Column({ nullable: true, comment: '表单内容', type: 'text' })
  public content: string;
  
  /**
   * 表单选项
   */
  @Column({ nullable: true, comment: '表单选项', type: 'text' })
  public option: string;
}
