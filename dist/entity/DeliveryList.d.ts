import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 发货清单实体类
 *
 * 该类用于定义发货清单的基本信息，包括快递公司ID、快递单号、商品信息和订单ID。
 * 所有标识符名称均来自微信小商店。
 */
export declare class DeliveryList extends BaseModel {
    /**
     * 快递公司ID
     *
     * 表示发货所使用的快递公司的唯一标识符，通过获取快递公司列表获取。快递配送必填，同城、线下自提不用填。
     */
    deliveryId: string;
    /**
     * 快递单号
     *
     * 表示发货所使用的快递单号。快递配送必填，同城、线下自提不用填。
     */
    waybillId: string;
    /**
     * 商品信息
     *
     * 表示发货清单中的商品信息。
     */
    goodsInfos: string;
    /**
     * 订单ID
     *
     * 表示发货清单所对应的订单的唯一标识符。
     */
    orderId: string;
}
