import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class Password extends BaseModel {

  @Column({nullable: true, comment: '', name: 'minlength', type: 'integer',})
  public minlength: number  

  @Column({nullable: true, comment: '', name: 'maxlength', type: 'integer',})
  public maxlength: number  

}
