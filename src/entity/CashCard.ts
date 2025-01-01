import {ApiProperty,} from "@midwayjs/swagger"
import {Column,  } from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

// @Entity()
export class CashCard extends BaseModel {

  @Column({nullable: true, comment: '', name: 'reduce_cost',})
  @ApiProperty({description: '代金券专用,表示减免金额。（单位为分）',})
  public reduceCost: number  

  @Column({nullable: true, comment: '', name: 'least_cost', type: 'integer',})
  @ApiProperty({description: '代金券专用,表示起用金额（单位为分）,如果无起用门槛则填0。',})
  public leastCost: number  

}
