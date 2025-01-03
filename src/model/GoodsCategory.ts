// 导入依赖项
import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';

/**
 * 商品分类实体类
 * 用于表示商品分类的基本信息
 */
@Entity('goodsCategory')
export class GoodsCategory {
  /**
   * 商品分类ID
   * 唯一标识一个商品分类
   */
  @ObjectIdColumn()
  public id: ObjectId;

  /**
   * 商品分类名称
   * 商品分类的名称
   */
  @prop()
  public name?: string = '';

  /**
   * 店铺ID
   * 商品分类所属的店铺ID
   */
  @prop()
  public shopId?: string = '';

  /**
   * 商品分类层级
   * 商品分类的层级
   */
  @prop() 
  public level?: number;

  /**
   * 子分类列表
   * 商品分类的子分类列表
   */
  @Prop(type => GoodsCategory)
  public children?: GoodsCategory[] = [];

}