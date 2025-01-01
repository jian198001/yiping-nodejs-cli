import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class Category extends BaseModel {

  @Column({nullable: true, comment: '标题',})
  public title: string  

}
