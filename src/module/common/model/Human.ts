import { Column } from 'typeorm';
import { BaseModel } from './BaseModel';

/**
 * 人类模型类，继承自基础模型类
 */
export class Human extends BaseModel {
  /**
   * 性别，可为空，1表示男性，2表示女性
   */
  @Column({ nullable: true, comment: '性别。1表示男性,2表示女性' })
  public gender: string;

  /**
   * 出生日期，可为空
   */
  @Column({ nullable: true, comment: '出生日期', name: 'birth_date', })
  public birthDate: Date;
}
