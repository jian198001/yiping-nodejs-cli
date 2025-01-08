import { BaseModel } from '../module/common/model/BaseModel';
/**
 * 订单评论实体类
 * 用于表示订单评论的基本信息
 */
export declare class OrderComment extends BaseModel {
    /**
     * 订单ID
     * 评论所属的订单ID
     */
    orderId: string;
    /**
     * 买家留言
     * 买家对订单的留言
     */
    message: string;
}
