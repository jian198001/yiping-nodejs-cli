// 导入依赖项
import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';

/**
 * SkuKey实体类
 * 用于表示商品SKU键的基本信息
 */
@Entity('skuKey')
export class SkuKey {
  /**
   * SkuKey ID
   * 唯一标识一个SkuKey
   */
  @ObjectIdColumn()
  public id: ObjectId;

  /**
   * Sku键名称
   * Sku键的名称
   */
  @prop()
  public name: string;

  /**
   * Sku值列表
   * Sku键对应的Sku值列表
   */
  @Prop()
  public skuValues?: string[];
}
