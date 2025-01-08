import { ObjectId } from 'mongoose';
/**
 * 商品分类实体类
 * 用于表示商品分类的基本信息
 */
export declare class GoodsCategory {
    /**
     * 商品分类ID
     * 唯一标识一个商品分类
     */
    id: ObjectId;
    /**
     * 商品分类名称
     * 商品分类的名称
     */
    name?: string;
    /**
     * 店铺ID
     * 商品分类所属的店铺ID
     */
    shopId?: string;
    /**
     * 商品分类层级
     * 商品分类的层级
     */
    level?: number;
    /**
     * 子分类列表
     * 商品分类的子分类列表
     */
    children?: GoodsCategory[];
}
