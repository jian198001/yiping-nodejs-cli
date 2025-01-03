// 导入依赖项
import { ApiProperty } from '@midwayjs/swagger';
import { BaseModel } from '../../common/model/BaseModel';

/**
 * Socket消息模型类
 * 用于定义Socket消息的结构
 */
export class SocketMsg extends BaseModel {
  // 消息发送者
  @ApiProperty({ description: '消息发送者' })
  public sender = '';
  // 消息接收者
  @ApiProperty({ description: '消息接收者' })
  public receiver = '';
  // 消息标题
  @ApiProperty({ description: '消息标题' })
  public title = '';
  // 消息内容
  @ApiProperty({ description: '消息内容' })
  public content = '';
}
