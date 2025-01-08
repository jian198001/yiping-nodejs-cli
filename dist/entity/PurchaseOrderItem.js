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
exports.PurchaseOrderItem = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 采购订单项实体类
 * 用于表示采购订单中的商品项信息
 */
let PurchaseOrderItem = class PurchaseOrderItem extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 商品数量
         * 购买该商品的数量
         */
        this.quantity = 1;
        /**
         * 失效日期
         * 商品的失效日期
         */
        this.exp = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_nickname' }),
    (0, swagger_1.ApiProperty)({ description: '会员昵称' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "buyerNickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_brand' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "materialBrand", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'property_price', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '添加到购物车的价格' }),
    __metadata("design:type", Number)
], PurchaseOrderItem.prototype, "propertyPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'quantity', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '购买数量,标识符名称来自支付宝' }),
    __metadata("design:type", Number)
], PurchaseOrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list_cn' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "skuListCn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "skuList", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'img' }),
    (0, swagger_1.ApiProperty)({ description: '物料主图' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_category_id' }),
    (0, swagger_1.ApiProperty)({ description: '物料分类' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "materialCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_id' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "materialId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'price', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '添加到购物车的价格' }),
    __metadata("design:type", Number)
], PurchaseOrderItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cart_messages' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "cartMessages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sku_code' }),
    (0, swagger_1.ApiProperty)({ description: '物料sku条码' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "materialSkuCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sn' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "materialSn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_name' }),
    (0, swagger_1.ApiProperty)({ description: '物料名称' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "materialName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'properties' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "properties", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sku_id' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "materialSkuId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_attr' }),
    (0, swagger_1.ApiProperty)({ description: '物料销售属性:[{\'key\':\'颜色\',\'value\':\'颜色\'},{\'key\':\'容量\',\'value\':\'4G\'}' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "materialAttr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'messages' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'order_id' }),
    (0, swagger_1.ApiProperty)({ description: '订单id' }),
    __metadata("design:type", String)
], PurchaseOrderItem.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'datetime' }),
    (0, swagger_1.ApiProperty)({ description: '失效日期' }),
    __metadata("design:type", Object)
], PurchaseOrderItem.prototype, "exp", void 0);
PurchaseOrderItem = __decorate([
    (0, typeorm_1.Entity)()
], PurchaseOrderItem);
exports.PurchaseOrderItem = PurchaseOrderItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVyY2hhc2VPcmRlckl0ZW0uanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9QdXJjaGFzZU9yZGVySXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQscUNBQXlDO0FBQ3pDLGdFQUE2RDtBQUU3RDs7O0dBR0c7QUFFSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLHFCQUFTO0lBQWhEOztRQXdCRTs7O1dBR0c7UUFHSSxhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBeUg1Qjs7O1dBR0c7UUFHSSxRQUFHLEdBQVEsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Q0FBQSxDQUFBO0FBdkpDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0lBQy9ELElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQzs7d0RBQ1I7QUFPN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUM7O3dEQUNuQztBQVE3QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQy9FLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQzs7d0RBQ2I7QUFRN0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxF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