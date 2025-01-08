import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 标签商品映射实体类
 * 继承自BaseModel，用于存储标签和商品之间的映射关系
 */
export declare class TagGoodsMap extends BaseModel {
    /**
     * 商品ID
     * 对应商品的唯一标识
     */
    goodsId: string;
    /**
     * 标签ID
     * 对应标签的唯一标识
     */
    tagId: string;
}
