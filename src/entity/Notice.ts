import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class Notice extends BaseModel {

  @Column({nullable: true, comment: '',})
  public title: string  

  @Column({nullable: true, comment: '', name: 'msg_type',})
  public msgType: string  

  @Column({nullable: true, comment: '', name: 'content', type: 'text',})
  public content: string  

  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  @Column({nullable: true, comment: '', name: 'read_history', type: 'integer',})
  @ApiProperty({description: '消息是否被已读',})
  public readHistory: number  

}
