import { ApiProperty } from "@midwayjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 订单商品消费实体类
 * 用于表示订单中商品的消费信息
 */
@Entity()
export class OrderItemConsume extends BaseModel {
  /**
   * 订单商品项ID
   * 与订单商品项关联的ID
   */
  @Column({ nullable: true, comment: '', name: 'order_item_id' })
  @ApiProperty({ description: '' })
  public orderItemId: string;

  /**
   * 核销码
   * 用于核销订单商品的码
   */
  @Column({ nullable: true, comment: '核销码' })
  public consume: string;

  /**
   * 状态
   * 订单商品消费的状态
   */
  @Column({ nullable: true, comment: '' })
  public status: string;
}
