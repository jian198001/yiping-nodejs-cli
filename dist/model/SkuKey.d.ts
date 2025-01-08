import { ObjectId } from 'mongoose';
/**
 * SkuKey实体类
 * 用于表示商品SKU键的基本信息
 */
export declare class SkuKey {
    /**
     * SkuKey ID
     * 唯一标识一个SkuKey
     */
    id: ObjectId;
    /**
     * Sku键名称
     * Sku键的名称
     */
    name: string;
    /**
     * Sku值列表
     * Sku键对应的Sku值列表
     */
    skuValues?: string[];
}
