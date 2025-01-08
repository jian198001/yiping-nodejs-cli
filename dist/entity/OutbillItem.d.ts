import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 出库单商品项实体类
 * 用于表示出库单中的商品项信息
 */
export declare class OutbillItem extends BaseModel {
    /**
     * 商品数量
     * 该商品项的数量
     */
    quantity: number;
    /**
     * 商品SKU列表（中文）
     * 商品SKU的中文描述列表
     */
    skuListCn: string;
    /**
     * 商品SKU列表
     * 商品SKU的描述列表
     */
    skuList: string;
    /**
     * 商品图片
     * 商品的图片URL
     */
    img: string;
    /**
     * 商品分类ID
     * 商品所属的分类ID
     */
    materialCategoryId: string;
    /**
     * 商品ID
     * 商品的唯一标识
     */
    materialId: string;
    /**
     * 购物车留言
     * 买家在购物车中对商品的留言
     */
    cartMessages: string;
    /**
     * 店铺买家ID
     * 购买该商品的店铺买家ID
     */
    shopBuyerId: string;
    /**
     * 商品SKU条码
     * 商品SKU的条码
     */
    materialSkuCode: string;
    /**
     * 商品编号
     * 商品的编号
     */
    materialSn: string;
    /**
     * 商品名称
     * 商品的名称
     */
    materialName: string;
    /**
     * 商品属性
     * 商品的属性列表
     */
    properties: string;
    /**
     * 商品SKU ID
     * 商品SKU的唯一标识
     */
    materialSkuId: string;
    /**
     * 商品销售属性
     * 商品的销售属性列表
     */
    materialAttr: string;
    /**
     * 留言
     * 买家对商品的留言
     */
    messages: string;
    /**
     * 出库单ID
     * 该商品项所属的出库单ID
     */
    billId: string;
}