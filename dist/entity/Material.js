"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商品实体类
 * 用于表示商品的基本信息
 */
let Material = class Material extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 物流类型
         * 商品的物流类型，可选值为delivery（需物流）或eticket（电子兑换券-自动生成券码，线下到店核销，无需备货），默认值为eticket
         */
        this.delivery = 'eticket';
        /**
         * 库存预警值
         * 商品的库存预警值，默认值为50
         */
        this.lowStock = 50;
        /**
         * 运费承担方式
         * 商品的运费承担方式，可选值为shop（卖家承担）或buyer（买家承担），默认值为shop
         */
        this.freightPayer = 'seller';
        /**
         * 商品是否支持下单减库存
         * 商品是否支持下单减库存，可选值为order（支持）、pay（取消支持，付款减库存）或delivery（出库减库存，电子凭证的话，下单即出库），默认值为order
         */
        this.subStock = 'order';
        /**
         * 限购数
         * 0表示不限购,默认值为0,标识符名称来自有赞
         */
        this.quota = 1000000000;
        /**
         * 起售数量
         * 默认值为1,标识符名称来自有赞
         */
        this.startSaleNum = 1;
        /**
         * 单位
         * 默认值:件
         */
        this.unit = '件';
        /**
         * 商品上传后的状态
         * 可选值:onsale(出售中),instock(仓库中);默认值:instock
         */
        this.approveStatus = "instock";
        /**
         * 宝贝描述
         * 字数要大于5个字符，小于25000个字符，受违禁词控制
         */
        this.exp = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'mass', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '商品质量,默认为克', }),
    __metadata("design:type", Number)
], Material.prototype, "mass", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'ceil_price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '增价拍封顶价，不设置表示无封顶价,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Number)
], Material.prototype, "ceilPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery', }),
    (0, swagger_1.ApiProperty)({ description: '物流类型：delivery->需物流;eticket->电子兑换券-自动生成券码,线下到店核销,无需备货;默认值:eticket(电子兑换券-自动生成券码,线下到店核销,无需备货)', }),
    __metadata("design:type", String)
], Material.prototype, "delivery", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'low_stock', }),
    (0, swagger_1.ApiProperty)({ description: '库存预警值,默认值50', }),
    __metadata("design:type", Number)
], Material.prototype, "lowStock", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'country', }),
    (0, swagger_1.ApiProperty)({ description: '商品所在地-国家,标识符名称来自微信小店', }),
    __metadata("design:type", String)
], Material.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'freight_payer', }),
    (0, swagger_1.ApiProperty)({ description: '运费承担方式。可选值:shop（卖家承担）,buyer(买家承担);默认值:shop。卖家承担不用设置邮费和postage_id.买家承担的时候,必填邮费和postage_id 如果用户设置了运费模板会优先使用运费模板,否则要同步设置邮费（post_fee,express_fee,ems_fee）', }),
    __metadata("design:type", String)
], Material.prototype, "freightPayer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'height', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '体积-高度(米)', }),
    __metadata("design:type", Number)
], Material.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'freeze_amount', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '保证金金额(元),大于100,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Number)
], Material.prototype, "freezeAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'province', }),
    (0, swagger_1.ApiProperty)({ description: '商品所在地-省,标识符名称来自微信小店', }),
    __metadata("design:type", String)
], Material.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_template_global_id', }),
    __metadata("design:type", String)
], Material.prototype, "deliveryTemplateGlobalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_category_id', }),
    __metadata("design:type", String)
], Material.prototype, "materialCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sub_stock', }),
    (0, swagger_1.ApiProperty)({ description: '商品是否支持下单减库存:order支持;pay取消支持(付款减库存);delivery.出库减库存(电子凭证的话,下单即出库).默认值:2(付款减库存)。下单减库存：买家拍下商品即减少库存,存在恶拍风险,热销商品如需避免超卖可选此方式。付款减库存：买家拍下并完成付款方可减少库存,存在超卖风险,如需减少恶拍,提高汇款效率,可选此方式。发货减库存：卖家发货时减库存,如果库存充实,需要确保线上库存与线下库存保持一致,可选此方式', }),
    __metadata("design:type", String)
], Material.prototype, "subStock", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'origin_price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '市场价,标识符名称来自有赞', }),
    __metadata("design:type", Number)
], Material.prototype, "originPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'item_size', }),
    (0, swagger_1.ApiProperty)({ description: '表示商品的体积,如果需要使用按体积计费的运费模板,一定要设置这个值。该值的单位为立方米（m3）,如果是其他单位,请转换成成立方米。该值支持两种格式的设置：格式1：bulk:3,单位为立方米(m3),表示直接设置为商品的体积。格式2：length:10;breadth:10;height:10,单位为米（m）。体积和长宽高都支持小数类型。在传入体积或长宽高时候,不能带单位。体积的单位默认为立方米（m3）,长宽高的单位默认为米(m)该值支持两种格式的设置：格式1：bulk:3,单位为立方米(m3),表示直接设置为商品的体积。格式2：length:10;breadth:10;height:10,单位为米（m）', }),
    __metadata("design:type", String)
], Material.prototype, "itemSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'brand_name', }),
    (0, swagger_1.ApiProperty)({ description: '品牌名称', }),
    __metadata("design:type", String)
], Material.prototype, "brandName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'alone_sale', }),
    (0, swagger_1.ApiProperty)({ description: '是否能单独销售,1,是；0,否；如果不能单独销售,则只能作为某商品的配件或者赠品销售', }),
    __metadata("design:type", String)
], Material.prototype, "aloneSale", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'auction_status', }),
    (0, swagger_1.ApiProperty)({ description: '拍卖状态,0=即将开始;1=正在进行;2=竞买成功，等待法院确认;4=流拍,等待法院确认;5=法院确认成交;6=法院确认流拍;7=撤回;8=中止;10=交易未履行;3=其他;,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", String)
], Material.prototype, "auctionStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'price', type: 'double', }),
    __metadata("design:type", Number)
], Material.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'floor_price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '降价拍专用，表示底价,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Number)
], Material.prototype, "floorPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'brand_id', }),
    __metadata("design:type", String)
], Material.prototype, "brandId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'title', }),
    (0, swagger_1.ApiProperty)({ description: '标题。不能超过30字符,受违禁词控制', }),
    __metadata("design:type", String)
], Material.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'length', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '体积-长度(米)', }),
    __metadata("design:type", Number)
], Material.prototype, "length", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'support_replace', }),
    (0, swagger_1.ApiProperty)({ description: '是否支持退换货,标识符名称来自微信小店', }),
    __metadata("design:type", String)
], Material.prototype, "supportReplace", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'repeat_times', }),
    (0, swagger_1.ApiProperty)({ description: '重复上拍次数,默认为0，0表示不自动重新上架,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Number)
], Material.prototype, "repeatTimes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_template_locale_valuation', }),
    __metadata("design:type", String)
], Material.prototype, "deliveryTemplateLocaleValuation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    __metadata("design:type", String)
], Material.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'barcode', }),
    (0, swagger_1.ApiProperty)({ description: '商品条形码', }),
    __metadata("design:type", String)
], Material.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sub_title', }),
    (0, swagger_1.ApiProperty)({ description: '副标题', }),
    __metadata("design:type", String)
], Material.prototype, "subTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'address', }),
    (0, swagger_1.ApiProperty)({ description: '商品所在地-地址,标识符名称来自微信小店', }),
    __metadata("design:type", String)
], Material.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'consult_price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '评估价,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Number)
], Material.prototype, "consultPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_template_locale_name', }),
    __metadata("design:type", String)
], Material.prototype, "deliveryTemplateLocaleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_category_name', }),
    (0, swagger_1.ApiProperty)({ description: '商品分类名称', }),
    __metadata("design:type", String)
], Material.prototype, "materialCategoryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sn', }),
    (0, swagger_1.ApiProperty)({ description: '货号', }),
    __metadata("design:type", String)
], Material.prototype, "materialSn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'quota', }),
    (0, swagger_1.ApiProperty)({ description: '限购数,0表示不限购,默认值为0,标识符名称来自有赞', }),
    __metadata("design:type", Number)
], Material.prototype, "quota", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'collection_id', }),
    __metadata("design:type", String)
], Material.prototype, "collectionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'start_sale_num', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '起售数量,默认值为1,标识符名称来自有赞', }),
    __metadata("design:type", Number)
], Material.prototype, "startSaleNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'stuff_status', }),
    (0, swagger_1.ApiProperty)({ description: '商品新旧程度：5:全新，6：二手，8:闲置,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", String)
], Material.prototype, "stuffStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'link_man', }),
    (0, swagger_1.ApiProperty)({ description: '联系人姓名,最多30个字符,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", String)
], Material.prototype, "linkMan", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'stock', }),
    (0, swagger_1.ApiProperty)({ description: '库存', }),
    __metadata("design:type", Number)
], Material.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'unit', }),
    (0, swagger_1.ApiProperty)({ description: '单位,默认值:件', }),
    __metadata("design:type", String)
], Material.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'city', }),
    (0, swagger_1.ApiProperty)({ description: '商品所在地-城市,标识符名称来自微信小店', }),
    __metadata("design:type", String)
], Material.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_template_locale_id', }),
    __metadata("design:type", String)
], Material.prototype, "deliveryTemplateLocaleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'approve_status', }),
    (0, swagger_1.ApiProperty)({ description: '商品上传后的状态。可选值:onsale(出售中),instock(仓库中);默认值:instock', }),
    __metadata("design:type", String)
], Material.prototype, "approveStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'breadth', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '体积-宽度(米)', }),
    __metadata("design:type", Number)
], Material.prototype, "breadth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku', }),
    __metadata("design:type", String)
], Material.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'under_guaranty', }),
    (0, swagger_1.ApiProperty)({ description: '是否保修,标识符名称来自微信小店', }),
    __metadata("design:type", String)
], Material.prototype, "underGuaranty", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', type: 'datetime', }),
    (0, swagger_1.ApiProperty)({ description: '失效日期', }),
    __metadata("design:type", Object)
], Material.prototype, "exp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'factory_id', }),
    (0, swagger_1.ApiProperty)({ description: '生产厂家', }),
    __metadata("design:type", String)
], Material.prototype, "factoryId", void 0);
Material = __decorate([
    (0, typeorm_1.Entity)()
], Material);
exports.Material = Material;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0ZXJpYWwuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9NYXRlcmlhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFDOUMscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFTLFNBQVEscUJBQVM7SUFBdkM7O1FBaUJFOzs7V0FHRztRQUdJLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFFcEM7OztXQUdHO1FBR0ksYUFBUSxHQUFXLEVBQUUsQ0FBQztRQVU3Qjs7O1dBR0c7UUFHSSxpQkFBWSxHQUFXLFFBQVEsQ0FBQztRQXdDdkM7OztXQUdHO1FBR0ksYUFBUSxHQUFXLE9BQU8sQ0FBQztRQTBKbEM7OztXQUdHO1FBR0ksVUFBSyxHQUFXLFVBQVUsQ0FBQztRQVFsQzs7O1dBR0c7UUFHSSxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQXlCaEM7OztXQUdHO1FBR0ksU0FBSSxHQUFXLEdBQUcsQ0FBQztRQWdCMUI7OztXQUdHO1FBR0ksa0JBQWEsR0FBVyxTQUFTLENBQUM7UUF1QnpDOzs7V0FHRztRQUdJLFFBQUcsR0FBUSxJQUFJLENBQUE7SUFTeEIsQ0FBQztDQUFBLENBQUE7QUEvVkM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUM7SUFDcEUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLFdBQVcsR0FBRSxDQUFDOztzQ0FDdEI7QUFRbkI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJ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