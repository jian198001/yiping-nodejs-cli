import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class Org extends BaseModel {
  
  @Column({nullable: true, comment: '', name: 'parent_id',})
  public parentId: string  
 
  @Column({nullable: true, comment: '', })
  public code: string  

}
