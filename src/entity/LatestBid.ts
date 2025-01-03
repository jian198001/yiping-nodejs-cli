import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 最新出价实体类
 * 用于表示最新出价的相关信息
 */
@Entity()
export class LatestBid extends BaseModel {
  /**
   * 买家ID
   * 出价的买家的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  @ApiProperty({description: '买家id',})
  public shopBuyerId: string  
  
  /**
   * 出价时间
   * 出价的时间
   */
  @Column({nullable: true, comment: '', name: 'bid_time', type: "datetime",})
  @ApiProperty({description: '出价时间',})
  public bidTime: any = null;
  
  /**
   * 出价类型
   * 出价的类型
   */
  @Column({nullable: true, comment: '', name: 'bid_type',})
  public bidType: string  
  
  /**
   * 拍卖ID
   * 出价所属的拍卖的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'auction_id',})
  public auctionId: string  
  
  /**
   * 出价金额
   * 出价的金额，以元为单位
   */
  @Column({nullable: true, comment: '', name: 'bid_price', type: 'double',})
  @ApiProperty({description: '出价金额(元为单位)',})
  public bidPrice: number  
  
}
