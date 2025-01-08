import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商品实体类，继承自 BaseModel
 */
export declare class Goods extends BaseModel {
    /**
     * 商品质量，默认为克
     */
    mass: number;
    /**
     * 物流类型：delivery->需物流; eticket->电子兑换券-自动生成券码,线下到店核销,无需备货; 默认值: eticket(电子兑换券-自动生成券码,线下到店核销,无需备货)
     */
    delivery: string;
    /**
     * 库存预警值，默认值50
     */
    lowStock: number;
    /**
     * 商品所在地-国家，标识符名称来自微信小店
     */
    country: string;
    /**
     * 运费承担方式。可选值: shop（卖家承担）, buyer(买家承担); 默认值: shop。卖家承担不用设置邮费和postage_id. 买家承担的时候,必填邮费和postage_id 如果用户设置了运费模板会优先使用运费模板,否则要同步设置邮费（post_fee, express_fee, ems_fee）
     */
    freightPayer: string;
    /**
     * 体积-高度(米)
     */
    height: number;
    /**
     * 保证金金额(元),大于100,标识符名称来自淘宝开放平台
     */
    freezeAmount: number;
    /**
     * 商品所在地-省，标识符名称来自微信小店
     */
    province: string;
    /**
     * 物流模板全局ID
     */
    deliveryTemplateGlobalId: string;
    /**
     * 商品分类ID
     */
    goodsCategoryId: string;
    /**
     * 商品是否支持下单减库存: order支持; pay取消支持(付款减库存); delivery.出库减库存(电子凭证的话,下单即出库). 默认值: 2(付款减库存)。下单减库存：买家拍下商品即减少库存,存在恶拍风险,热销商品如需避免超卖可选此方式。付款减库存：买家拍下并完成付款方可减少库存,存在超卖风险,如需减少恶拍,提高汇款效率,可选此方式。发货减库存：卖家发货时减库存,如果库存充实,需要确保线上库存与线下库存保持一致,可选此方式
     */
    subStock: string;
    /**
     * 表示商品的体积,如果需要使用按体积计费的运费模板,一定要设置这个值。该值的单位为立方米（m3）,如果是其他单位,请转换成成立方米。该值支持两种格式的设置：格式1：bulk:3,单位为立方米(m3),表示直接设置为商品的体积。格式2：length:10;breadth:10;height:10,单位为米（m）。体积和长宽高都支持小数类型。在传入体积或长宽高时候,不能带单位。体积的单位默认为立方米（m3）,长宽高的单位默认为米(m)该值支持两种格式的设置：格式1：bulk:3,单位为立方米(m3),表示直接设置为商品的体积。格式2：length:10;breadth:10;height:10,单位为米（m）
     */
    itemSize: string;
    /**
     * 品牌名称
     */
    brandName: string;
    /**
     * 是否能单独销售,1,是；0,否；如果不能单独销售,则只能作为某商品的配件或者赠品销售
     */
    aloneSale: string;
    /**
     * 拍卖状态,0=即将开始;1=正在进行;2=竞买成功，等待法院确认;4=流拍,等待法院确认;5=法院确认成交;6=法院确认流拍;7=撤回;8=中止;10=交易未履行;3=其他;,标识符名称来自淘宝开放平台
     */
    auctionStatus: string;
    brandId: string;
    title: string;
    length: number;
    supportReplace: string;
    repeatTimes: number;
    deliveryTemplateLocaleValuation: string;
    shopId: string;
    barcode: string;
    subTitle: string;
    address: string;
    deliveryTemplateLocaleName: string;
    goodsCategoryName: string;
    goodsSn: string;
    quota: number;
    collectionId: string;
    startSaleNum: number;
    stuffStatus: string;
    linkMan: string;
    unit: string;
    city: string;
    deliveryTemplateLocaleId: string;
    approveStatus: string;
    breadth: number;
    sku: string;
    underGuaranty: string;
    desc: string;
}
