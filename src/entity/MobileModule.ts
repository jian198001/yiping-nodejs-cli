import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class MobileModule extends BaseModel {

  @Column({nullable: true, comment: '',})
  public path: string  

  @Column({nullable: true, comment: '', name: 'form_id',})
  public formId: string  

}
