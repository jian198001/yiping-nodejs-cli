import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class Post extends BaseModel {
  
  @Column({nullable: true, comment: '',  })
  public code: string  

  @Column({nullable: true, comment: '', name: 'org_id',})
  public orgId: string  

}
