import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';

@Entity('goodsCategory')
export class GoodsCategory {
  @ObjectIdColumn()
  public id: ObjectId;

  @prop()
  public name?: string = '';

  @prop()
  public shopId?: string = '';

  @prop() 
  public level?: number;

  @Prop(type => GoodsCategory)
  public children?: GoodsCategory[] = [];

}