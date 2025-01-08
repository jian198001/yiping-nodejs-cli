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
exports.Goods = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商品实体类，继承自 BaseModel
 */
let Goods = class Goods extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 物流类型：delivery->需物流; eticket->电子兑换券-自动生成券码,线下到店核销,无需备货; 默认值: eticket(电子兑换券-自动生成券码,线下到店核销,无需备货)
         */
        this.delivery = 'eticket';
        /**
         * 库存预警值，默认值50
         */
        this.lowStock = 50;
        /**
         * 运费承担方式。可选值: shop（卖家承担）, buyer(买家承担); 默认值: shop。卖家承担不用设置邮费和postage_id. 买家承担的时候,必填邮费和postage_id 如果用户设置了运费模板会优先使用运费模板,否则要同步设置邮费（post_fee, express_fee, ems_fee）
         */
        this.freightPayer = 'seller';
        /**
         * 商品是否支持下单减库存: order支持; pay取消支持(付款减库存); delivery.出库减库存(电子凭证的话,下单即出库). 默认值: 2(付款减库存)。下单减库存：买家拍下商品即减少库存,存在恶拍风险,热销商品如需避免超卖可选此方式。付款减库存：买家拍下并完成付款方可减少库存,存在超卖风险,如需减少恶拍,提高汇款效率,可选此方式。发货减库存：卖家发货时减库存,如果库存充实,需要确保线上库存与线下库存保持一致,可选此方式
         */
        this.subStock = 'order';
        /**
         * 拍卖状态,0=即将开始;1=正在进行;2=竞买成功，等待法院确认;4=流拍,等待法院确认;5=法院确认成交;6=法院确认流拍;7=撤回;8=中止;10=交易未履行;3=其他;,标识符名称来自淘宝开放平台
         */
        this.auctionStatus = 'eticket';
        this.quota = 1000000000;
        this.startSaleNum = 1;
        this.unit = 'item';
        this.approveStatus = "instock";
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'mass', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '商品质量,默认为克' }),
    __metadata("design:type", Number)
], Goods.prototype, "mass", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery' }),
    (0, swagger_1.ApiProperty)({ description: '物流类型：delivery->需物流;eticket->电子兑换券-自动生成券码,线下到店核销,无需备货;默认值:eticket(电子兑换券-自动生成券码,线下到店核销,无需备货)' }),
    __metadata("design:type", String)
], Goods.prototype, "delivery", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'low_stock' }),
    (0, swagger_1.ApiProperty)({ description: '库存预警值,默认值50' }),
    __metadata("design:type", Number)
], Goods.prototype, "lowStock", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'country' }),
    (0, swagger_1.ApiProperty)({ description: '商品所在地-国家,标识符名称来自微信小店' }),
    __metadata("design:type", String)
], Goods.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'freight_payer' }),
    (0, swagger_1.ApiProperty)({ description: '运费承担方式。可选值:shop（卖家承担）,buyer(买家承担);默认值:shop。卖家承担不用设置邮费和postage_id.买家承担的时候,必填邮费和postage_id 如果用户设置了运费模板会优先使用运费模板,否则要同步设置邮费（post_fee,express_fee,ems_fee）' }),
    __metadata("design:type", String)
], Goods.prototype, "freightPayer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'height', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '体积-高度(米)' }),
    __metadata("design:type", Number)
], Goods.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'freeze_amount', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '保证金金额(元),大于100,标识符名称来自淘宝开放平台' }),
    __metadata("design:type", Number)
], Goods.prototype, "freezeAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'province' }),
    (0, swagger_1.ApiProperty)({ description: '商品所在地-省,标识符名称来自微信小店' }),
    __metadata("design:type", String)
], Goods.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_template_global_id' }),
    __metadata("design:type", String)
], Goods.prototype, "deliveryTemplateGlobalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_category_id' }),
    __metadata("design:type", String)
], Goods.prototype, "goodsCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sub_stock' }),
    (0, swagger_1.ApiProperty)({ description: '商品是否支持下单减库存:order支持;pay取消支持(付款减库存);delivery.出库减库存(电子凭证的话,下单即出库).默认值:2(付款减库存)。下单减库存：买家拍下商品即减少库存,存在恶拍风险,热销商品如需避免超卖可选此方式。付款减库存：买家拍下并完成付款方可减少库存,存在超卖风险,如需减少恶拍,提高汇款效率,可选此方式。发货减库存：卖家发货时减库存,如果库存充实,需要确保线上库存与线下库存保持一致,可选此方式' }),
    __metadata("design:type", String)
], Goods.prototype, "subStock", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'item_size' }),
    (0, swagger_1.ApiProperty)({ description: '表示商品的体积,如果需要使用按体积计费的运费模板,一定要设置这个值。该值的单位为立方米（m3）,如果是其他单位,请转换成成立方米。该值支持两种格式的设置：格式1：bulk:3,单位为立方米(m3),表示直接设置为商品的体积。格式2：length:10;breadth:10;height:10,单位为米（m）。体积和长宽高都支持小数类型。在传入体积或长宽高时候,不能带单位。体积的单位默认为立方米（m3）,长宽高的单位默认为米(m)该值支持两种格式的设置：格式1：bulk:3,单位为立方米(m3),表示直接设置为商品的体积。格式2：length:10;breadth:10;height:10,单位为米（m）' }),
    __metadata("design:type", String)
], Goods.prototype, "itemSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'brand_name' }),
    (0, swagger_1.ApiProperty)({ description: '品牌名称' }),
    __metadata("design:type", String)
], Goods.prototype, "brandName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'alone_sale' }),
    (0, swagger_1.ApiProperty)({ description: '是否能单独销售,1,是；0,否；如果不能单独销售,则只能作为某商品的配件或者赠品销售' }),
    __metadata("design:type", String)
], Goods.prototype, "aloneSale", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'auction_status' }),
    (0, swagger_1.ApiProperty)({ description: '拍卖状态,0=即将开始;1=正在进行;2=竞买成功，等待法院确认;4=流拍,等待法院确认;5=法院确认成交;6=法院确认流拍;7=撤回;8=中止;10=交易未履行;3=其他;,标识符名称来自淘宝开放平台' }),
    __metadata("design:type", String)
], Goods.prototype, "auctionStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'brand_id' }),
    __metadata("design:type", String)
], Goods.prototype, "brandId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'title' }),
    (0, swagger_1.ApiProperty)({ description: '标题。不能超过30字符,受违禁词控制' }),
    __metadata("design:type", String)
], Goods.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'length', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '体积-长度(米)' }),
    __metadata("design:type", Number)
], Goods.prototype, "length", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'support_replace' }),
    (0, swagger_1.ApiProperty)({ description: '是否支持退换货,标识符名称来自微信小店' }),
    __metadata("design:type", String)
], Goods.prototype, "supportReplace", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'repeat_times' }),
    (0, swagger_1.ApiProperty)({ description: '重复上拍次数,默认为0，0表示不自动重新上架,标识符名称来自淘宝开放平台' }),
    __metadata("design:type", Number)
], Goods.prototype, "repeatTimes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_template_locale_valuation' }),
    __metadata("design:type", String)
], Goods.prototype, "deliveryTemplateLocaleValuation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id' }),
    __metadata("design:type", String)
], Goods.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'barcode' }),
    (0, swagger_1.ApiProperty)({ description: '商品条形码' }),
    __metadata("design:type", String)
], Goods.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sub_title' }),
    (0, swagger_1.ApiProperty)({ description: '副标题' }),
    __metadata("design:type", String)
], Goods.prototype, "subTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'address' }),
    (0, swagger_1.ApiProperty)({ description: '商品所在地-地址,标识符名称来自微信小店' }),
    __metadata("design:type", String)
], Goods.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_template_locale_name' }),
    __metadata("design:type", String)
], Goods.prototype, "deliveryTemplateLocaleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_category_name' }),
    (0, swagger_1.ApiProperty)({ description: '商品分类名称' }),
    __metadata("design:type", String)
], Goods.prototype, "goodsCategoryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_sn' }),
    (0, swagger_1.ApiProperty)({ description: '货号' }),
    __metadata("design:type", String)
], Goods.prototype, "goodsSn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'quota' }),
    (0, swagger_1.ApiProperty)({ description: '限购数,0表示不限购,默认值为0,标识符名称来自有赞' }),
    __metadata("design:type", Number)
], Goods.prototype, "quota", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'collection_id' }),
    __metadata("design:type", String)
], Goods.prototype, "collectionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'start_sale_num', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '起售数量,默认值为1,标识符名称来自有赞' }),
    __metadata("design:type", Number)
], Goods.prototype, "startSaleNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'stuff_status' }),
    (0, swagger_1.ApiProperty)({ description: '商品新旧程度：5:全新，6：二手，8:闲置,标识符名称来自淘宝开放平台' }),
    __metadata("design:type", String)
], Goods.prototype, "stuffStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'link_man' }),
    (0, swagger_1.ApiProperty)({ description: '联系人姓名,最多30个字符,标识符名称来自淘宝开放平台' }),
    __metadata("design:type", String)
], Goods.prototype, "linkMan", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'unit' }),
    (0, swagger_1.ApiProperty)({ description: '计量单位,默认值:item件,可选值:质量mass(kg),体积volume(毫升ml),时间time(分minute),距离length(公里km),面积area(平方米m2)' }),
    __metadata("design:type", String)
], Goods.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'city' }),
    (0, swagger_1.ApiProperty)({ description: '商品所在地-城市,标识符名称来自微信小店' }),
    __metadata("design:type", String)
], Goods.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_template_locale_id' }),
    __metadata("design:type", String)
], Goods.prototype, "deliveryTemplateLocaleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'approve_status' }),
    (0, swagger_1.ApiProperty)({ description: '商品上传后的状态。可选值:onsale(出售中),instock(仓库中);默认值:instock' }),
    __metadata("design:type", String)
], Goods.prototype, "approveStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'breadth', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '体积-宽度(米)' }),
    __metadata("design:type", Number)
], Goods.prototype, "breadth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku' }),
    __metadata("design:type", String)
], Goods.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'under_guaranty' }),
    (0, swagger_1.ApiProperty)({ description: '是否保修,标识符名称来自微信小店' }),
    __metadata("design:type", String)
], Goods.prototype, "underGuaranty", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'desc', type: 'text', }),
    (0, swagger_1.ApiProperty)({ description: '宝贝描述。字数要大于5个字符，小于25000个字符，受违禁词控制,标识符名称来自淘宝开放平台' }),
    __metadata("design:type", String)
], Goods.prototype, "desc", void 0);
Goods = __decorate([
    (0, typeorm_1.Entity)()
], Goods);
exports.Goods = Goods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZHMuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9Hb29kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQscUNBQXlDO0FBQ3pDLGdFQUE2RDtBQUU3RDs7R0FFRztBQUVILElBQWEsS0FBSyxHQUFsQixNQUFhLEtBQU0sU0FBUSxxQkFBUztJQUFwQzs7UUFRRTs7V0FFRztRQUdJLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFFcEM7O1dBRUc7UUFHSSxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBUzdCOztXQUVHO1FBR0ksaUJBQVksR0FBVyxRQUFRLENBQUM7UUFtQ3ZDOztXQUVHO1FBR0ksYUFBUSxHQUFXLE9BQU8sQ0FBQztRQXVCbEM7O1dBRUc7UUFHSSxrQkFBYSxHQUFXLFNBQVMsQ0FBQztRQXNDbEMsVUFBSyxHQUFXLFVBQVUsQ0FBQztRQUszQixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQVN6QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBUXRCLGtCQUFhLEdBQVcsU0FBUyxDQUFDO0lBWTNDLENBQUM7Q0FBQSxDQUFBO0FBeEtDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3JFLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQzs7bUNBQ3RCO0FBT3BCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsNEZBQTRGLEVBQUUsQ0FBQzs7dUNB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