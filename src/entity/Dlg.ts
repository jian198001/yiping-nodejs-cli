import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class Dlg extends BaseModel {

  @Column({nullable: true, comment: '',})
  public path: string  

  @Column({nullable: true, comment: 'form_id', name: 'form_id',})
  public formId: string  

}
