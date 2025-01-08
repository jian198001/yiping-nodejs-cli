import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商品分类实体类，继承自 BaseModel
 */
export declare class GoodsCategory extends BaseModel {
    /**
     * 上级分类的编号：0表示一级分类
     */
    parentId: string;
    /**
     * 分类级别：0->1级；1->2级
     */
    level: number;
    /**
     * 商家ID
     */
    shopId: string;
    /**
     * 商品分类代码
     */
    code: string;
}
