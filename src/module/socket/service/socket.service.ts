// 导入依赖项
import { App, Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../../common/service/base.service';
import { Application } from '@midwayjs/koa';
import { ILogger } from '@midwayjs/logger';
import { createWebSocketClient } from '@midwayjs/mock';
import { SocketMsg } from '../model/SocketMsg';

/**
 * Socket服务类
 * 提供创建WebSocket客户端和发送消息的功能
 */
@Provide()
export class SocketService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;
  // WebSocket客户端实例
  private webSocket: any = null;
  // 应用实例
  @App()
  private app: Application = null;
  /**
   * 创建WebSocket客户端
   * @returns 无返回值
   */
  private async createWebSocketClient(): Promise<void> {
    if (!this?.webSocket) {
      this?.logger?.info?.('createWebSocketClient');

      const port: number = this?.app?.getConfig().koa.port;

      this.webSocket = await createWebSocketClient(
        'ws://localhost:' + port + '/ws'
      );
    }
  }

  /**
   * 发送消息
   * @param data - 消息对象
   * @returns 无返回值
   */
  public async send(data: SocketMsg): Promise<void> {
    await this?.createWebSocketClient();

    this?.webSocket.send(JSON?.stringify(data));
  }
}
