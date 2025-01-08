import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 订单商品消费实体类
 * 用于表示订单中商品的消费信息
 */
export declare class OrderItemConsume extends BaseModel {
    /**
     * 订单商品项ID
     * 与订单商品项关联的ID
     */
    orderItemId: string;
    /**
     * 核销码
     * 用于核销订单商品的码
     */
    consume: string;
    /**
     * 状态
     * 订单商品消费的状态
     */
    status: string;
}
