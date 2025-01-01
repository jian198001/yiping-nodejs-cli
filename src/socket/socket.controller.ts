import { WSController, OnWSMessage, WSBroadCast } from '@midwayjs/core';

@WSController('/ws')
export class SocketController {

  @OnWSMessage('message')
  @WSBroadCast()
  public async message(data: string): Promise<string> {
    return data?.toString?.();
  }
  
}
