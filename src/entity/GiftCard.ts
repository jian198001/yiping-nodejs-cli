import { ApiProperty } from "@midwayjs/swagger";
import { Column } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 礼品卡实体类，继承自 BaseModel
 */
// @Entity()
export class GiftCard extends BaseModel {
  /**
   * 礼品名称，兑换券专用，填写兑换内容的名称
   */
  @Column({ nullable: true, comment: '', name: 'gift' })
  @ApiProperty({ description: '兑换券专用,填写兑换内容的名称。' })
  public gift: string;
}
