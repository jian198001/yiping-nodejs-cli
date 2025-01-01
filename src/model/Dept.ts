import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';

@Entity('dept')
export class Dept {
  @ObjectIdColumn()
  public id: ObjectId;

  @prop()
  public name?: string = '';

  @prop() 
  public level?: number;

  @Prop(type => Dept)
  public children?: Dept[] = [];

}