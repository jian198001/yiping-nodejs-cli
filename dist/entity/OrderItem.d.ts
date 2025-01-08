import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 订单商品项实体类
 * 用于表示订单中的商品项信息
 */
export declare class OrderItem extends BaseModel {
    /**
     * 买家昵称
     * 购买该商品的买家昵称
     */
    buyerNickname: string;
    /**
     * 商品品牌
     * 商品的品牌名称
     */
    goodsBrand: string;
    /**
     * 商品属性价格
     * 商品属性对应的价格
     */
    propertyPrice: number;
    /**
     * 购买数量
     * 购买该商品的数量
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
     * 商品主图
     * 商品的主图URL
     */
    img: string;
    /**
     * 商品分类ID
     * 商品所属的分类ID
     */
    goodsCategoryId: string;
    /**
     * 商品ID
     * 商品的唯一标识
     */
    goodsId: string;
    /**
     * 商品价格
     * 商品的价格
     */
    price: number;
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
    goodsSkuCode: string;
    /**
     * 商品编号
     * 商品的编号
     */
    goodsSn: string;
    /**
     * 商品名称
     * 商品的名称
     */
    goodsName: string;
    /**
     * 商品属性
     * 商品的属性列表
     */
    properties: string;
    /**
     * 商品SKU ID
     * 商品SKU的唯一标识
     */
    goodsSkuId: string;
    /**
     * 商品销售属性
     * 商品的销售属性列表
     */
    goodsAttr: string;
    /**
     * 留言
     * 买家对商品的留言
     */
    messages: string;
    /**
     * 订单ID
     * 该商品项所属的订单ID
     */
    orderId: string;
    /**
     * 物流类型
     * 商品的物流类型（delivery->需物流;eticket->电子兑换券-自动生成券码,线下到店核销,无需备货;默认值:eticket）
     */
    delivery: string;
}
