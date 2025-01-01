/**
 * 收藏实体类
 */
import { ApiProperty } from "@midwayjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 收藏实体类，继承自 BaseModel
 */
@Entity()
export class Favor extends BaseModel {
  /**
   * 商品id，标识符名称来自淘宝开放平台
   */
  @Column({ nullable: true, comment: '', name: 'goods_id' })
  @ApiProperty({ description: '商品id' })
  public goodsId: string;

  /**
   * 店铺买家id，标识符名称来自淘宝开放平台
   */
  @Column({ nullable: true, comment: '' })
  public shopBuyerId: string;
}
