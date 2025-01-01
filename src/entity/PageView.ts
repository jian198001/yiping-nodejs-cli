import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class PageView extends BaseModel {

  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  @Column({nullable: true, comment: '', name: 'user_id',})
  public userId: string  

  @Column({nullable: true, comment: '', name: 'user_role',})
  public userRole: string  

  @Column({nullable: true, comment: '', name: 'page',})
  public page: string  

}
