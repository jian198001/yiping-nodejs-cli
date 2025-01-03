// 导入依赖项
import { WSController, OnWSMessage, WSBroadCast } from '@midwayjs/core';

/**
 * WebSocket控制器类
 * 处理WebSocket连接和消息
 */
@WSController('/ws')
export class SocketController {
  /**
   * 处理WebSocket消息
   * @param data - 接收到的消息数据
   * @returns 返回接收到的消息数据
   */
  @OnWSMessage('message')
  @WSBroadCast()
  public async message(data: string): Promise<string> {
    // 将接收到的数据转换为字符串并返回
    return data?.toString?.();
  }
}
