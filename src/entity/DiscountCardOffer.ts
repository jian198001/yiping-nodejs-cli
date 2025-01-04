import { ApiProperty } from "@midwayjs/swagger";
import { Column } from "typeorm";
import { CardOfferBaseInfo } from "./CardOfferBaseInfo";

/**
 * 折扣卡券优惠实体类
 * 
 * 该类用于定义折扣卡券优惠的基本信息，包括折扣额度。
 * 所有标识符名称均来自微信支付平台。
 */
// @Entity()
export class DiscountCardOffer extends CardOfferBaseInfo {

  /**
   * 折扣券专用，表示打折额度（百分比）
   * 
   * 例如，填30就是七折。
   */
  @Column({ nullable: true, comment: '', name: 'discount', type: 'integer' })
  @ApiProperty({ description: '折扣券专用,表示打折额度（百分比）。填30就是七折。' })
  public discount: number;

}
