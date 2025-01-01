import { Column, Entity } from 'typeorm';
import { BaseModel } from './BaseModel';

/**
 * 用户模型类，继承自基础模型类
 */
@Entity()
export class User extends BaseModel {
  /**
   * 用户名，可为空
   */
  @Column({ nullable: true, comment: '用户名' })
  public username: string;

  /**
   * 密码，可为空
   */
  @Column({ nullable: true, comment: '密码' })
  public password: string;
}
