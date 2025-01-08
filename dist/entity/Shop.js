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
exports.Shop = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 店铺实体类
 * 继承自BaseModel，包含店铺相关的各种信息
 */
let Shop = class Shop extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 非营业时间内网店可进行的操作
         * 非营业时间内网店可进行的操作：goods->展示商品,但无法下单；order->可下单支付预订,但延时配送，默认为'order'
         */
        this.nonBusinessHoursShow = 'order';
        /**
         * 课程消费类型
         * 课程的消费类型，默认为'courseShift'
         */
        this.courseConsumeType = 'courseShift';
        /**
         * 是否支持购物车
         * 是否支持购物车：0->不支持；1->支持，默认为'1'
         */
        this.cart = '1';
        /**
         * 有效期结束时间
         * 对应店铺的有效期结束时间
         */
        this.endTimeValid = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', }),
    (0, swagger_1.ApiProperty)({ description: '编码', }),
    __metadata("design:type", String)
], Shop.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'email', }),
    (0, swagger_1.ApiProperty)({ description: '邮箱', }),
    __metadata("design:type", String)
], Shop.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'region_code', }),
    __metadata("design:type", String)
], Shop.prototype, "regionCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'non_business_hours_show', }),
    (0, swagger_1.ApiProperty)({ description: '非营业时间内网店可进行的操作：goods->展示商品,但无法下单；order->可下单支付预订,但延时配送', }),
    __metadata("design:type", String)
], Shop.prototype, "nonBusinessHoursShow", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'course_consume_type', }),
    __metadata("design:type", String)
], Shop.prototype, "courseConsumeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'express', }),
    (0, swagger_1.ApiProperty)({ description: '物流范围,是同城还是支持全国,是否开启快递配送', }),
    __metadata("design:type", String)
], Shop.prototype, "express", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'same_city', }),
    (0, swagger_1.ApiProperty)({ description: '物流范围,是同城还是支持全国,是否开启同城配送', }),
    __metadata("design:type", String)
], Shop.prototype, "sameCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'pickup', }),
    (0, swagger_1.ApiProperty)({ description: '物流范围,是同城还是支持全国,是否开启线下自提', }),
    __metadata("design:type", String)
], Shop.prototype, "pickup", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'province', }),
    (0, swagger_1.ApiProperty)({ description: '省份/直辖市', }),
    __metadata("design:type", String)
], Shop.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'city', }),
    (0, swagger_1.ApiProperty)({ description: '市', }),
    __metadata("design:type", String)
], Shop.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'region', }),
    (0, swagger_1.ApiProperty)({ description: '区', }),
    __metadata("design:type", String)
], Shop.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'business_hours', }),
    (0, swagger_1.ApiProperty)({ description: '营业时间:默认值：00:00-23:59', }),
    __metadata("design:type", String)
], Shop.prototype, "businessHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'region_postcode', }),
    __metadata("design:type", String)
], Shop.prototype, "regionPostcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'refund', }),
    (0, swagger_1.ApiProperty)({ description: '0任何状态下都需要人工审核才可以退款1如订单是已支付状态下,不需人工审核可直接退款2\'已支付未核销\'订单不需人工审核直接退款,默认值0', }),
    __metadata("design:type", String)
], Shop.prototype, "refund", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'phone', }),
    __metadata("design:type", String)
], Shop.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cart', }),
    (0, swagger_1.ApiProperty)({ description: '是否支持购物车：0->不支持；1->支持', }),
    __metadata("design:type", String)
], Shop.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_order', }),
    (0, swagger_1.ApiProperty)({ description: '买家能看到本商家的订单还是能看到所有商家的订单', }),
    __metadata("design:type", String)
], Shop.prototype, "buyerOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'note', }),
    (0, swagger_1.ApiProperty)({ description: '备注信息', }),
    __metadata("design:type", String)
], Shop.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'end_time_valid', type: 'datetime', }),
    __metadata("design:type", Object)
], Shop.prototype, "endTimeValid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'i_rate1', type: 'double', }),
    __metadata("design:type", Number)
], Shop.prototype, "iRate1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'i_rate2', type: 'double', }),
    __metadata("design:type", Number)
], Shop.prototype, "iRate2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'seller_id', }),
    __metadata("design:type", String)
], Shop.prototype, "sellerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'address', }),
    (0, swagger_1.ApiProperty)({ description: '联系地址：店铺的具体位置,需要经纬度获取,用于手机端店铺街调取店铺精准位置', }),
    __metadata("design:type", String)
], Shop.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'nickname', }),
    (0, swagger_1.ApiProperty)({ description: '昵称', }),
    __metadata("design:type", String)
], Shop.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'region_value', }),
    __metadata("design:type", String)
], Shop.prototype, "regionValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'initial_sku', }),
    (0, swagger_1.ApiProperty)({ description: '多规格商品的默认SKU规格价格信息', }),
    __metadata("design:type", String)
], Shop.prototype, "initialSku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'wxpay_refund_notify_url', }),
    __metadata("design:type", String)
], Shop.prototype, "wxpayRefundNotifyUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_sales_rule', }),
    __metadata("design:type", String)
], Shop.prototype, "buyerSalesRule", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', }),
    (0, swagger_1.ApiProperty)({ description: '本店铺对应的运营区域', name: 'delivery_area' }),
    __metadata("design:type", String)
], Shop.prototype, "deliveryArea", void 0);
Shop = __decorate([
    (0, typeorm_1.Entity)()
], Shop);
exports.Shop = Shop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hvcC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L1Nob3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBMkQ7QUFFM0Q7OztHQUdHO0FBRUgsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSyxTQUFRLHFCQUFTO0lBQW5DOztRQXlCRTs7O1dBR0c7UUFHSSx5QkFBb0IsR0FBVyxPQUFPLENBQUM7UUFFOUM7OztXQUdHO1FBRUksc0JBQWlCLEdBQVcsYUFBYSxDQUFDO1FBNEVqRDs7O1dBR0c7UUFHSSxTQUFJLEdBQVcsR0FBRyxDQUFDO1FBa0IxQjs7O1dBR0c7UUFFSSxpQkFBWSxHQUFRLElBQUksQ0FBQztJQXlFbEMsQ0FBQztDQUFBLENBQUE7QUFoTkM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQztJQUN2QyxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O2tDQUNmO0FBUW5CO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUUsQ0FBQztJQUNyRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O21DQUNkO0FBT3BCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQzs7d0NBQ25DO0FBUXpCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSx5QkFBeUIsR0FBRSxDQUFDO0lBQ3ZFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSx1REFBdUQsR0FBRSxDQUFDOztrREFDdkM7QUFPOUM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixHQUFFLENBQUM7OytDQUNuQjtBQVFqRDtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFFLENBQUM7SUFDdkQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHlCQUF5QixHQUFFLENBQUM7O3FDQUNqQztBQVF0QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFLENBQUM7SUFDekQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHlCQUF5QixHQUFFLENBQUM7O3NDQUNoQztBQVF2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUM7SUFDdEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHlCQUF5QixHQUFFLENBQUM7O29DQUNsQztBQVFyQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7SUFDeEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLFFBQVEsR0FBRSxDQUFDOztzQ0FDZjtBQUl2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFFLENBQUM7SUFDcEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRSxDQUFDOztrQ0FDZDtBQVFuQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUM7SUFDdEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRSxDQUFDOztvQ0FDWjtBQVFyQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEdBQUUsQ0FBQztJQUM5RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsc0JBQXNCLEdBQUUsQ0FBQzs7MkNBQ3hCO0FBTzVCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsR0FBRSxDQUFDOzs0Q0FDbkM7QUFRN0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDO0lBQ3RELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSx1RUFBdUUsR0FBRSxDQUFDOztvQ0FDaEY7QUFPckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRSxDQUFDOzttQ0FDbEM7QUFRcEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRSxDQUFDO0lBQ3BELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxzQkFBc0IsR0FBRSxDQUFDOztrQ0FDMUI7QUFRMUI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsR0FBRSxDQUFDO0lBQzNELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSx5QkFBeUIsR0FBRSxDQUFDOzt3Q0FDOUI7QUFRekI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRSxDQUFDO0lBQ3BELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7a0NBQ2pCO0FBT25CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7OzBDQUNqRDtBQU9oQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQzs7b0NBQ25EO0FBT3JCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDOztvQ0FDbkQ7QUFPckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsR0FBRSxDQUFDOztzQ0FDbkM7QUFRdkI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQ3ZELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSx1Q0FBdUMsR0FBRSxDQUFDOztxQ0FDL0M7QUFRdEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDO0lBQ3hELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEdBQUUsQ0FBQzs7c0NBQ1g7QUFPdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsR0FBRSxDQUFDOzt5Q0FDbkM7QUFRMUI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsR0FBRSxDQUFDO0lBQzNELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsR0FBRSxDQUFDOzt3Q0FDeEI7QUFPekI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixHQUFFLENBQUM7O2tEQUNyQztBQU9uQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEdBQUUsQ0FBQzs7NENBQ3BDO0FBSzdCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLENBQUM7SUFDdkMsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQUM7OzBDQUNyQztBQXROaEIsSUFBSTtJQURoQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxJQUFJLENBd05oQjtBQXhOWSxvQkFBSSJ9