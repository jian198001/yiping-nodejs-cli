import { ApiProperty } from "@midwayjs/swagger";
import { Column } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 通用优惠券实体类，继承自 BaseModel
 */
// @Entity()
export class GeneralCouponCard extends BaseModel {
  /**
   * 默认详情，标识符名称来自淘宝开放平台
   */
  @Column({ nullable: true, comment: '默认详情', name: 'default_detail' })
  @ApiProperty({ description: '默认详情' })
  public defaultDetail: string;
}
