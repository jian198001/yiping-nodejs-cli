import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';
import { SkuKey } from './SkuKey';

@Entity('sku')
export class Sku {
  @ObjectIdColumn()
  public id: ObjectId;

  @prop()
  public goodsId?: string = '';

  @Prop()
  public skuKey?: SkuKey[];
}
