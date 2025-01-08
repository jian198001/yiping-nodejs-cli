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
exports.OrderItem = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 订单商品项实体类
 * 用于表示订单中的商品项信息
 */
let OrderItem = class OrderItem extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 购买数量
         * 购买该商品的数量
         */
        this.quantity = 1;
        /**
         * 物流类型
         * 商品的物流类型（delivery->需物流;eticket->电子兑换券-自动生成券码,线下到店核销,无需备货;默认值:eticket）
         */
        this.delivery = 'eticket';
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '会员昵称', name: 'buyer_nickname' }),
    (0, swagger_1.ApiProperty)({ description: '会员昵称' }),
    __metadata("design:type", String)
], OrderItem.prototype, "buyerNickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_brand' }),
    __metadata("design:type", String)
], OrderItem.prototype, "goodsBrand", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'property_price', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '添加到购物车的价格' }),
    __metadata("design:type", Number)
], OrderItem.prototype, "propertyPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'quantity', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '购买数量,标识符名称来自支付宝' }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list_cn' }),
    __metadata("design:type", String)
], OrderItem.prototype, "skuListCn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list' }),
    __metadata("design:type", String)
], OrderItem.prototype, "skuList", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'img' }),
    (0, swagger_1.ApiProperty)({ description: '商品主图' }),
    __metadata("design:type", String)
], OrderItem.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '商品分类', name: 'goods_category_id' }),
    (0, swagger_1.ApiProperty)({ description: '商品分类' }),
    __metadata("design:type", String)
], OrderItem.prototype, "goodsCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '商品的编号,标识符名称来自支付宝', name: 'goods_id' }),
    __metadata("design:type", String)
], OrderItem.prototype, "goodsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'price', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '添加到购物车的价格,标识符名称来自支付宝' }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cart_messages' }),
    __metadata("design:type", String)
], OrderItem.prototype, "cartMessages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id' }),
    __metadata("design:type", String)
], OrderItem.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_sku_code' }),
    (0, swagger_1.ApiProperty)({ description: '商品sku条码' }),
    __metadata("design:type", String)
], OrderItem.prototype, "goodsSkuCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_sn' }),
    __metadata("design:type", String)
], OrderItem.prototype, "goodsSn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '商品名称,标识符名称来自支付宝', name: 'goods_name' }),
    (0, swagger_1.ApiProperty)({ description: '商品名称,标识符名称来自支付宝' }),
    __metadata("design:type", String)
], OrderItem.prototype, "goodsName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'properties' }),
    __metadata("design:type", String)
], OrderItem.prototype, "properties", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_sku_id' }),
    __metadata("design:type", String)
], OrderItem.prototype, "goodsSkuId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_attr' }),
    (0, swagger_1.ApiProperty)({ description: '商品销售属性:[{\'key\':\'颜色\',\'value\':\'颜色\'},{\'key\':\'容量\',\'value\':\'4G\'}' }),
    __metadata("design:type", String)
], OrderItem.prototype, "goodsAttr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'messages' }),
    __metadata("design:type", String)
], OrderItem.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'order_id' }),
    (0, swagger_1.ApiProperty)({ description: '订单id' }),
    __metadata("design:type", String)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery' }),
    (0, swagger_1.ApiProperty)({ description: '物流类型：delivery->需物流;eticket->电子兑换券-自动生成券码,线下到店核销,无需备货;默认值:eticket(电子兑换券-自动生成券码,线下到店核销,无需备货)' }),
    __metadata("design:type", String)
], OrderItem.prototype, "delivery", void 0);
OrderItem = __decorate([
    (0, typeorm_1.Entity)()
], OrderItem);
exports.OrderItem = OrderItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJJdGVtLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvT3JkZXJJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFnRDtBQUNoRCxxQ0FBeUM7QUFDekMsZ0VBQTZEO0FBRTdEOzs7R0FHRztBQUVILElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVUsU0FBUSxxQkFBUztJQUF4Qzs7UUF3QkU7OztXQUdHO1FBR0ksYUFBUSxHQUFXLENBQUMsQ0FBQztRQXlINUI7OztXQUdHO1FBR0ksYUFBUSxHQUFXLFNBQVMsQ0FBQztJQUN0QyxDQUFDO0NBQUEsQ0FBQTtBQXZKQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuRSxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7O2dEQUNSO0FBTzdCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQzs7NkNBQ25DO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDL0UsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDOztnREFDYjtBQVE3QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFB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