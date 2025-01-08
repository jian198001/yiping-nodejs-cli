import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商品实体类
 * 用于表示商品的基本信息
 */
export declare class Material extends BaseModel {
    /**
     * 商品质量
     * 商品的质量，默认单位为克
     */
    mass: number;
    /**
     * 增价拍封顶价
     * 增价拍的封顶价格，不设置表示无封顶价，标识符名称来自淘宝开放平台
     */
    ceilPrice: number;
    /**
     * 物流类型
     * 商品的物流类型，可选值为delivery（需物流）或eticket（电子兑换券-自动生成券码，线下到店核销，无需备货），默认值为eticket
     */
    delivery: string;
    /**
     * 库存预警值
     * 商品的库存预警值，默认值为50
     */
    lowStock: number;
    /**
     * 商品所在地-国家
     * 商品所在地的国家，标识符名称来自微信小店
     */
    country: string;
    /**
     * 运费承担方式
     * 商品的运费承担方式，可选值为shop（卖家承担）或buyer（买家承担），默认值为shop
     */
    freightPayer: string;
    /**
     * 体积-高度
     * 商品的体积高度，单位为米
     */
    height: number;
    /**
     * 保证金金额
     * 商品的保证金金额，单位为元，大于100，标识符名称来自淘宝开放平台
     */
    freezeAmount: number;
    /**
     * 商品所在地-省
     * 商品所在地的省份，标识符名称来自微信小店
     */
    province: string;
    /**
     * 运费模板全局ID
     * 商品的运费模板全局ID
     */
    deliveryTemplateGlobalId: string;
    /**
     * 商品分类ID
     * 商品所属的分类ID
     */
    materialCategoryId: string;
    /**
     * 商品是否支持下单减库存
     * 商品是否支持下单减库存，可选值为order（支持）、pay（取消支持，付款减库存）或delivery（出库减库存，电子凭证的话，下单即出库），默认值为order
     */
    subStock: string;
    /**
     * 市场价
     * 商品的市场价，标识符名称来自有赞
     */
    originPrice: number;
    /**
     * 商品体积
     * 商品的体积，支持两种格式设置：bulk:3（单位为立方米）或length:10;breadth:10;height:10（单位为米）
     */
    itemSize: string;
    /**
     * 品牌名称
     * 商品的品牌名称
     */
    brandName: string;
    /**
     * 是否能单独销售
     * 商品是否能单独销售，1表示是，0表示否，如果不能单独销售，则只能作为某商品的配件或者赠品销售
     */
    aloneSale: string;
    /**
     * 拍卖状态
     * 商品的拍卖状态，可选值为0（即将开始）、1（正在进行）、2（竞买成功，等待法院确认）、4（流拍，等待法院确认）、5（法院确认成交）、6（法院确认流拍）、7（撤回）、8（中止）、10（交易未履行）、3（其他），标识符名称来自淘宝开放平台
     */
    auctionStatus: string;
    /**
     * 商品价格和商品价格阶梯明细信息，标识符名称来自淘宝开放平台
     */
    price: number;
    /**
     * 降价拍专用，表示底价
     * 标识符名称来自淘宝开放平台
     */
    floorPrice: number;
    /**
     * 品牌ID，标识符名称来自淘宝开放平台
     */
    brandId: string;
    /**
     * 标题，标识符名称来自淘宝开放平台
     */
    title: string;
    /**
     * 体积-长度(米)
     */
    length: number;
    /**
     * 是否支持退换货
     * 标识符名称来自微信小店
     */
    supportReplace: string;
    /**
     * 重复上拍次数
     * 默认为0，0表示不自动重新上架,标识符名称来自淘宝开放平台
     */
    repeatTimes: number;
    /**
     * 运费模板本地计价方式
     */
    deliveryTemplateLocaleValuation: string;
    /**
     * 店铺ID，标识符名称来自淘宝开放平台
     */
    shopId: string;
    /**
     * 商品条形码
     */
    barcode: string;
    /**
     * 副标题
     */
    subTitle: string;
    /**
     * 商品所在地-地址
     * 标识符名称来自微信小店
     */
    address: string;
    /**
     * 评估价
     * 标识符名称来自淘宝开放平台
     */
    consultPrice: number;
    /**
     * 运费模板本地名称
     */
    deliveryTemplateLocaleName: string;
    /**
     * 商品分类名称
     */
    materialCategoryName: string;
    /**
     * 货号
     */
    materialSn: string;
    /**
     * 限购数
     * 0表示不限购,默认值为0,标识符名称来自有赞
     */
    quota: number;
    /**
     * 收藏ID
     */
    collectionId: string;
    /**
     * 起售数量
     * 默认值为1,标识符名称来自有赞
     */
    startSaleNum: number;
    /**
     * 商品新旧程度
     * 5:全新，6：二手，8:闲置,标识符名称来自淘宝开放平台
     */
    stuffStatus: string;
    /**
     * 联系人姓名
     * 最多30个字符,标识符名称来自淘宝开放平台
     */
    linkMan: string;
    /**
     * 库存
     */
    stock: number;
    /**
     * 单位
     * 默认值:件
     */
    unit: string;
    /**
     * 商品所在地-城市
     * 标识符名称来自微信小店
     */
    city: string;
    /**
     * 运费模板本地ID
     */
    deliveryTemplateLocaleId: string;
    /**
     * 商品上传后的状态
     * 可选值:onsale(出售中),instock(仓库中);默认值:instock
     */
    approveStatus: string;
    /**
     * 体积-宽度(米)
     */
    breadth: number;
    /**
     * SKU
     */
    sku: string;
    /**
     * 是否保修
     * 标识符名称来自微信小店
     */
    underGuaranty: string;
    /**
     * 宝贝描述
     * 字数要大于5个字符，小于25000个字符，受违禁词控制
     */
    exp: any;
    /**
     * 生产厂家
     */
    factoryId: string;
}
