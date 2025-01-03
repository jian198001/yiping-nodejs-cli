// 导入依赖项
import { ApiProperty } from '@midwayjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../module/common/model/BaseModel';

/**
 * 通知实体类
 * 用于表示通知的基本信息
 */
@Entity()
export class Notice extends BaseModel {
  /**
   * 通知标题
   * 通知的标题
   */
  @Column({ nullable: true, comment: '通知标题' })
  public title: string;

  /**
   * 消息类型
   * 通知的消息类型
   */
  @Column({ nullable: true, comment: '消息类型', name: 'msg_type' })
  public msgType: string;

  /**
   * 通知内容
   * 通知的内容
   */
  @Column({ nullable: true, comment: '通知内容', name: 'content', type: 'text' })
  public content: string;

  /**
   * 店铺买家ID
   * 通知所属的店铺买家ID
   */
  @Column({ nullable: true, comment: '店铺买家ID', name: 'shop_buyer_id' })
  public shopBuyerId: string;

  /**
   * 阅读历史
   * 通知的阅读历史（0未读 1已读）
   */
  @Column({ nullable: true, comment: '阅读历史', name: 'read_history', type: 'integer' })
  @ApiProperty({ description: '消息是否被已读' })
  public readHistory: number;
}
