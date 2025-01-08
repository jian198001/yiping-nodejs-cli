import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商品规格名实体类
 * 继承自BaseModel，用于存储商品规格名的信息
 */
export declare class SkuKey extends BaseModel {
    /**
     * 商品ID
     * 对应商品规格名所属商品的唯一标识
     */
    goodsId: string;
    /**
     * 规格类目名称
     * 对应商品规格名的名称，例如颜色、尺寸等
     */
    skuKeyName: string;
    /**
     * 规格类目键
     * 对应商品规格名在SKU组合列表中的键值，用于关联规格名和规格值
     */
    skuKeyStr: string;
}
