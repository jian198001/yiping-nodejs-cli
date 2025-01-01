import { ApiProperty } from "@midwayjs/swagger";
import { Column } from "typeorm";
import { CardOfferBaseInfo } from "./CardOfferBaseInfo";

/**
 * 团购卡优惠实体类，继承自 CardOfferBaseInfo
 */
// @Entity()
export class GrouponCardOffer extends CardOfferBaseInfo {
  /**
   * 团购券专用，团购详情
   */
  @Column({ nullable: true, comment: '', name: 'deal_detail' })
  @ApiProperty({ description: '团购券专用,团购详情。' })
  public dealDetail: string;
}
