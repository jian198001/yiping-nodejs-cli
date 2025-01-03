// 导入依赖项
import { ApiProperty } from '@midwayjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../module/common/model/BaseModel';

/**
 * 订单评论实体类
 * 用于表示订单评论的基本信息
 */
@Entity()
export class OrderComment extends BaseModel {
  /**
   * 订单ID
   * 评论所属的订单ID
   */
  @Column({ nullable: true, comment: '订单id', name: 'order_id' })
  @ApiProperty({ description: '订单id' })
  public orderId: string;

  /**
   * 买家留言
   * 买家对订单的留言
   */
  @Column({ nullable: true, comment: '买家留言,标识符名称来自有赞', name: 'message' })
  @ApiProperty({ description: '买家留言,标识符名称来自有赞' })
  public message: string;
}
