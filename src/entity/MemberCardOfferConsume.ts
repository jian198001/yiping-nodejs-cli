import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class MemberCardOfferConsume extends BaseModel {

  @Column({nullable: true, comment: '', name: 'member_card_offer_id',})
  public memberCardOfferId: string  

  @Column({nullable: true, comment: '', name: 'code',})
  public code: string  

}
