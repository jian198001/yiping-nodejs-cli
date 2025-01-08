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
exports.CartItem = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 购物车项实体类
 *
 * 该类用于定义购物车中每个商品项的基本信息，包括是否已选、价格、商品ID、商品图片、SKU列表等。
 * 所有标识符名称均来自支付宝。
 */
let CartItem = class CartItem extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 购买数量
         *
         * 表示该商品项的购买数量。
         */
        this.quantity = 1;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '是否已选', }),
    __metadata("design:type", String)
], CartItem.prototype, "check", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'property_price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '添加到购物车的价格', }),
    __metadata("design:type", Number)
], CartItem.prototype, "propertyPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '添加到购物车的价格,标识符名称来自支付宝', }),
    __metadata("design:type", Number)
], CartItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '商品id,标识符名称来自支付宝', name: 'goods_id', }),
    __metadata("design:type", String)
], CartItem.prototype, "goodsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'img', }),
    (0, swagger_1.ApiProperty)({ description: '商品主图', }),
    __metadata("design:type", String)
], CartItem.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list', }),
    __metadata("design:type", String)
], CartItem.prototype, "skuList", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list_cn', }),
    __metadata("design:type", String)
], CartItem.prototype, "skuListCn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '购买数量,标识符名称来自支付宝', }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_name', }),
    (0, swagger_1.ApiProperty)({ description: '商品名称,标识符名称来自支付宝', }),
    __metadata("design:type", String)
], CartItem.prototype, "goodsName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_sn', }),
    __metadata("design:type", String)
], CartItem.prototype, "goodsSn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_sku_code', }),
    (0, swagger_1.ApiProperty)({ description: '商品sku条码', }),
    __metadata("design:type", String)
], CartItem.prototype, "goodsSkuCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    __metadata("design:type", String)
], CartItem.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id', }),
    __metadata("design:type", String)
], CartItem.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cart_messages', }),
    __metadata("design:type", String)
], CartItem.prototype, "cartMessages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'messages', }),
    __metadata("design:type", String)
], CartItem.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_sku_id', }),
    __metadata("design:type", String)
], CartItem.prototype, "goodsSkuId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'properties', }),
    __metadata("design:type", String)
], CartItem.prototype, "properties", void 0);
CartItem = __decorate([
    (0, typeorm_1.Entity)()
], CartItem);
exports.CartItem = CartItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FydEl0ZW0uanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9DYXJ0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFDOUMscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7Ozs7R0FLRztBQUVILElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVMsU0FBUSxxQkFBUztJQUF2Qzs7UUE2REU7Ozs7V0FJRztRQUdJLGFBQVEsR0FBVyxDQUFDLENBQUE7SUE0RTdCLENBQUM7Q0FBQSxDQUFBO0FBeElDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxHQUFHLENBQUM7O3VDQUN4QjtBQVNwQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDO0lBQzlFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxXQUFXLEdBQUUsQ0FBQzs7K0NBQ2I7QUFTNUI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUM7SUFDckUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHNCQUFzQixHQUFFLENBQUM7O3VDQUNoQztBQVFwQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQzs7eUNBQ2xEO0FBU3RCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVB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