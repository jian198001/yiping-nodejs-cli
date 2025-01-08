import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商品属性键实体类
 * 用于表示商品属性的键及其相关信息
 */
export declare class GoodsPropertiesKey extends BaseModel {
    /**
     * 是否可多选
     * 该商品属性键是否支持多选，1表示是，0表示否
     */
    multiple: string;
    /**
     * 商品ID
     * 关联的商品的唯一标识
     */
    goodsId: string;
}
