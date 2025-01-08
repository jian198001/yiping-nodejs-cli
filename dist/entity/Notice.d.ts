import { BaseModel } from '../module/common/model/BaseModel';
/**
 * 通知实体类
 * 用于表示通知的基本信息
 */
export declare class Notice extends BaseModel {
    /**
     * 通知标题
     * 通知的标题
     */
    title: string;
    /**
     * 消息类型
     * 通知的消息类型
     */
    msgType: string;
    /**
     * 通知内容
     * 通知的内容
     */
    content: string;
    /**
     * 店铺买家ID
     * 通知所属的店铺买家ID
     */
    shopBuyerId: string;
    /**
     * 阅读历史
     * 通知的阅读历史（0未读 1已读）
     */
    readHistory: number;
}
