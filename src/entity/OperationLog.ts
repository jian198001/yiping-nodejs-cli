import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class OperationLog extends BaseModel {

  @Column({nullable: true, comment: '操作者',})
  public sub: string

  @Column({nullable: true, comment: '目标对象',})
  public obj: string

  @Column({nullable: true, comment: '动作',})
  public act: string

}
