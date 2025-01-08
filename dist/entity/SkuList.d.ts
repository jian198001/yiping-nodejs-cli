import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商品SKU列表实体类
 * 继承自BaseModel，用于存储商品的SKU列表信息
 */
export declare class SkuList extends BaseModel {
    /**
     * 价格
     * 对应商品SKU的价格
     */
    price: number;
    /**
     * 商品ID
     * 对应商品SKU所属商品的唯一标识
     */
    goodsId: string;
    /**
     * 规格值组合
     * 对应商品SKU的多个规格值组合，使用JSON数组保存
     */
    list: string;
    /**
     * 默认SKU规格价格信息
     * 对应商品的默认SKU规格价格信息
     */
    initialSku: string;
    /**
     * 库存数量
     * 对应商品SKU的库存数量
     */
    stockNum: number;
}
