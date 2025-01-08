import { BaseService } from '../../common/service/base.service';
import { SocketMsg } from '../model/SocketMsg';
/**
 * Socket服务类
 * 提供创建WebSocket客户端和发送消息的功能
 */
export declare class SocketService extends BaseService {
    private logger;
    private webSocket;
    private app;
    /**
     * 创建WebSocket客户端
     * @returns 无返回值
     */
    private createWebSocketClient;
    /**
     * 发送消息
     * @param data - 消息对象
     * @returns 无返回值
     */
    send(data: SocketMsg): Promise<void>;
}
