import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商品属性值实体类
 * 用于表示商品属性的具体值及其相关信息
 */
export declare class GoodsPropertiesValue extends BaseModel {
    /**
     * 商品属性键ID
     * 关联的商品属性键的唯一标识
     */
    goodsPropertiesKeyId: string;
    /**
     * 加价价格
     * 该商品属性值对应的加价价格
     */
    price: number;
}
