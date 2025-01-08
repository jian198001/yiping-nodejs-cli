import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 线下自提模板实体类
 * 用于表示线下自提的相关模板信息
 */
export declare class PickupTemplate extends BaseModel {
    /**
     * 营业时间
     * 线下自提的营业时间，默认值为00:00-23:59
     */
    businessHours: string;
    /**
     * 备货时间（分钟）
     * 准备商品所需的时间，单位为分钟
     */
    promiseDeliveryMinutes: number;
    /**
     * 可预定时间（分钟）
     * 允许预定的时间范围，单位为分钟
     */
    bookTime: number;
}
