import { BaseModel } from '../../common/model/BaseModel';
/**
 * Socket消息模型类
 * 用于定义Socket消息的结构
 */
export declare class SocketMsg extends BaseModel {
    sender: string;
    receiver: string;
    title: string;
    content: string;
}
