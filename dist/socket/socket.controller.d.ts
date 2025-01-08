/**
 * WebSocket控制器类
 * 处理WebSocket连接和消息
 */
export declare class SocketController {
    /**
     * 处理WebSocket消息
     * @param data - 接收到的消息数据
     * @returns 返回接收到的消息数据
     */
    message(data: string): Promise<string>;
}
