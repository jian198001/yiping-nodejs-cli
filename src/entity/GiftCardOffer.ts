import { ApiProperty } from "@midwayjs/swagger";
import { Column } from "typeorm";
import { CardOfferBaseInfo } from "./CardOfferBaseInfo";

/**
 * 礼品卡优惠实体类，继承自 CardOfferBaseInfo
 */
// @Entity()
export class GiftCardOffer extends CardOfferBaseInfo {
  /**
   * 兑换券专用，填写兑换内容的名称
   */
  @Column({ nullable: true, comment: '', name: 'gift' })
  @ApiProperty({ description: '兑换券专用,填写兑换内容的名称。' })
  public gift: string;
}
