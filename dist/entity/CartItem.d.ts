import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 购物车项实体类
 *
 * 该类用于定义购物车中每个商品项的基本信息，包括是否已选、价格、商品ID、商品图片、SKU列表等。
 * 所有标识符名称均来自支付宝。
 */
export declare class CartItem extends BaseModel {
    /**
     * 是否已选
     *
     * 表示该商品项是否已被用户选中。
     */
    check: string;
    /**
     * 添加到购物车的价格（propertyPrice）
     *
     * 表示该商品项添加到购物车时的价格。
     */
    propertyPrice: number;
    /**
     * 添加到购物车的价格（price）
     *
     * 表示该商品项添加到购物车时的价格。
     */
    price: number;
    /**
     * 商品ID
     *
     * 表示该商品项对应的商品的唯一标识符。
     */
    goodsId: string;
    /**
     * 商品主图
     *
     * 表示该商品项对应的商品的主图。
     */
    img: string;
    /**
     * SKU列表
     *
     * 表示该商品项对应的商品的SKU列表。
     */
    skuList: string;
    /**
     * SKU列表（中文）
     *
     * 表示该商品项对应的商品的SKU列表（中文）。
     */
    skuListCn: string;
    /**
     * 购买数量
     *
     * 表示该商品项的购买数量。
     */
    quantity: number;
    /**
     * 商品名称
     *
     * 表示该商品项对应的商品的名称。
     */
    goodsName: string;
    /**
     * 商品编号
     *
     * 表示该商品项对应的商品的编号。
     */
    goodsSn: string;
    /**
     * 商品SKU条码
     *
     * 表示该商品项对应的商品的SKU条码。
     */
    goodsSkuCode: string;
    /**
     * 店铺ID
     *
     * 表示该商品项对应的店铺的唯一标识符。
     */
    shopId: string;
    /**
     * 店铺买家ID
     *
     * 表示该商品项对应的店铺的买家的唯一标识符。
     */
    shopBuyerId: string;
    /**
     * 购物车留言
     *
     * 表示该商品项的购物车留言。
     */
    cartMessages: string;
    /**
     * 留言
     *
     * 表示该商品项的留言。
     */
    messages: string;
    /**
     * 商品SKU ID
     *
     * 表示该商品项对应的商品的SKU的唯一标识符。
     */
    goodsSkuId: string;
    /**
     * 属性
     *
     * 表示该商品项的属性。
     */
    properties: string;
}
