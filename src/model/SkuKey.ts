import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';

@Entity('skuKey')
export class SkuKey {
  @ObjectIdColumn()
  public id: ObjectId;

  @prop()
  public name: string;

  @Prop()
  public skuValues?: string[];
}
