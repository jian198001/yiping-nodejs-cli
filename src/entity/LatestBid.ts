import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class LatestBid extends BaseModel {

  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  @ApiProperty({description: '买家id',})
  public shopBuyerId: string  

  @Column({nullable: true, comment: '', name: 'bid_time', type: "datetime",})
  @ApiProperty({description: '出价时间',})
  public bidTime: any = null;

  @Column({nullable: true, comment: '', name: 'bid_type',})
  public bidType: string  

  @Column({nullable: true, comment: '', name: 'auction_id',})
  public auctionId: string  

  @Column({nullable: true, comment: '', name: 'bid_price', type: 'double',})
  @ApiProperty({description: '出价金额(元为单位)',})
  public bidPrice: number  

}
