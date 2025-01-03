// 导入依赖项
import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';

/**
 * 部门实体类
 * 用于表示部门的基本信息
 */
@Entity('dept')
export class Dept {
  /**
   * 部门ID
   * 唯一标识一个部门
   */
  @ObjectIdColumn()
  public id: ObjectId;

  /**
   * 部门名称
   * 部门的名称
   */
  @prop()
  public name?: string = '';

  /**
   * 部门层级
   * 部门的层级
   */
  @prop() 
  public level?: number;

  /**
   * 子部门列表
   * 部门的子部门列表
   */
  @Prop(type => Dept)
  public children?: Dept[] = [];

}