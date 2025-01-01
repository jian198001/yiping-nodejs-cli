import { App, Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../../common/service/base.service';
import { Application } from '@midwayjs/koa';
import { ILogger } from '@midwayjs/logger';
import { createWebSocketClient } from '@midwayjs/mock';
import { SocketMsg } from '../model/SocketMsg';

@Provide()
export class SocketService extends BaseService {
  
  @Logger()
  private logger: ILogger = null

  private webSocket: any = null;

  @App()
  private app: Application = null;

  private async createWebSocketClient(): Promise<void> {
    if (!this?.webSocket) {
      this?.logger?.info?.('createWebSocketClient');

      const port: number = this?.app?.getConfig().koa.port;

      this.webSocket = await createWebSocketClient(
        'ws://localhost:' + port + '/ws'
      );
    }
  }

  public async send(data: SocketMsg): Promise<void> {
    await this?.createWebSocketClient();

    this?.webSocket.send(JSON?.stringify(data));
  }
}
