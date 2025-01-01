import {ApiProperty,} from "@midwayjs/swagger"
import {Column,  } from "typeorm"
import {CardOfferBaseInfo,} from "./CardOfferBaseInfo";

// @Entity()
export class DiscountCardOffer extends CardOfferBaseInfo {

  @Column({nullable: true, comment: '', name: 'discount', type: 'integer',})
  @ApiProperty({description: '折扣券专用,表示打折额度（百分比）。填30就是七折。',})
  public discount: number  

}
