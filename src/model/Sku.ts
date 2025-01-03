// 导入依赖项
import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';
import { SkuKey } from './SkuKey';

/**
 * Sku实体类
 * 用于表示商品SKU的基本信息
 */
@Entity('sku')
export class Sku {
  /**
   * Sku ID
   * 唯一标识一个Sku
   */
  @ObjectIdColumn()
  public id: ObjectId;

  /**
   * 商品ID
   * Sku所属的商品ID
   */
  @prop()
  public goodsId?: string = '';

  /**
   * Sku键列表
   * Sku的键列表
   */
  @Prop()
  public skuKey?: SkuKey[];
}
