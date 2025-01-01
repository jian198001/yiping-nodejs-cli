import { ApiProperty } from '@midwayjs/swagger';
import { BaseModel } from '../../common/model/BaseModel';

export class SocketMsg extends BaseModel {
  @ApiProperty({ description: '消息发送者' })
  public sender = '';

  @ApiProperty({ description: '消息接收者' })
  public receiver = '';

  @ApiProperty({ description: '消息标题' })
  public title = '';

  @ApiProperty({ description: '消息内容' })
  public content = '';
}
