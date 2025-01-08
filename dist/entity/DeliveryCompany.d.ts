import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 快递公司实体类
 *
 * 该类用于定义快递公司的基本信息，包括快递公司ID和快递公司名称。
 * 所有标识符名称均来自微信小商店。
 */
export declare class DeliveryCompany extends BaseModel {
    /**
     * 快递公司ID
     *
     * 表示快递公司的唯一标识符。
     */
    deliveryId: string;
    /**
     * 快递公司名称
     *
     * 表示快递公司的名称。
     */
    deliveryName: string;
}
