import { ObjectId } from 'mongoose';
import { SkuKey } from './SkuKey';
/**
 * Sku实体类
 * 用于表示商品SKU的基本信息
 */
export declare class Sku {
    /**
     * Sku ID
     * 唯一标识一个Sku
     */
    id: ObjectId;
    /**
     * 商品ID
     * Sku所属的商品ID
     */
    goodsId?: string;
    /**
     * Sku键列表
     * Sku的键列表
     */
    skuKey?: SkuKey[];
}
