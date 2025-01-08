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
exports.Mall = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商城实体类
 * 用于表示商城的基本信息
 */
let Mall = class Mall extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 最后登录时间
         * 商城的最后登录时间
         */
        this.loginTime = null;
        /**
         * 营业开始时间
         * 商城的营业开始时间，默认值：00:00
         */
        this.startTime = null;
        /**
         * 营业结束时间
         * 商城的营业结束时间，默认值：23:59
         */
        this.endTime = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'i_rate2', type: 'double', }),
    __metadata("design:type", Number)
], Mall.prototype, "iRate2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'i_rate1', type: 'double', }),
    __metadata("design:type", Number)
], Mall.prototype, "iRate1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'note', }),
    (0, swagger_1.ApiProperty)({ description: '备注信息', }),
    __metadata("design:type", String)
], Mall.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_order', }),
    (0, swagger_1.ApiProperty)({ description: '买家能看到本商家的订单还是能看到所有商家的订单', }),
    __metadata("design:type", String)
], Mall.prototype, "buyerOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cart', }),
    (0, swagger_1.ApiProperty)({ description: '是否支持购物车：0->不支持；1->支持', }),
    __metadata("design:type", String)
], Mall.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'refund', }),
    (0, swagger_1.ApiProperty)({ description: '0任何状态下都需要人工审核才可以退款1如订单是已支付状态下,不需人工审核可直接退款2\'已支付未核销\'订单不需人工审核直接退款,3不允许申请退款默认值0', }),
    __metadata("design:type", String)
], Mall.prototype, "refund", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'business_hours', }),
    (0, swagger_1.ApiProperty)({ description: '营业时间:默认值：00:00-23:59', }),
    __metadata("design:type", String)
], Mall.prototype, "businessHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'region', }),
    (0, swagger_1.ApiProperty)({ description: '联系地址：店铺的具体位置,需要经纬度获取,用于手机端店铺街调取店铺精准位置', }),
    __metadata("design:type", String)
], Mall.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'province', }),
    (0, swagger_1.ApiProperty)({ description: '省份/直辖市', }),
    __metadata("design:type", String)
], Mall.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'non_business_hours_show', }),
    (0, swagger_1.ApiProperty)({ description: '非营业时间内网店可进行的操作：goods->展示商品,但无法下单；order->可下单支付,但暂缓配送', }),
    __metadata("design:type", String)
], Mall.prototype, "nonBusinessHoursShow", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_area', }),
    (0, swagger_1.ApiProperty)({ description: '物流范围,是同城还是支持全国', }),
    __metadata("design:type", String)
], Mall.prototype, "deliveryArea", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'email', }),
    (0, swagger_1.ApiProperty)({ description: '邮箱', }),
    __metadata("design:type", String)
], Mall.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'wxpay_notify_url', }),
    __metadata("design:type", String)
], Mall.prototype, "wxpayNotifyUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_sales', }),
    (0, swagger_1.ApiProperty)({ description: '是否开启分销', }),
    __metadata("design:type", String)
], Mall.prototype, "buyerSales", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'obs', }),
    (0, swagger_1.ApiProperty)({ description: '门店是否支持门店自提,：0->不支持；1->支持', }),
    __metadata("design:type", String)
], Mall.prototype, "obs", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'pay_type', }),
    (0, swagger_1.ApiProperty)({ description: '商户是使用本商户的微信支付宝收款信息进行收款,还是使用商城的收款信息进行收款:shop:本商户,mall:商城,默认mall', }),
    __metadata("design:type", String)
], Mall.prototype, "payType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'status', }),
    (0, swagger_1.ApiProperty)({ description: '营业状态', }),
    __metadata("design:type", String)
], Mall.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'city', }),
    (0, swagger_1.ApiProperty)({ description: '城市', }),
    __metadata("design:type", String)
], Mall.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'area_id', }),
    __metadata("design:type", String)
], Mall.prototype, "areaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'wxpay_refund_notify_url', }),
    __metadata("design:type", String)
], Mall.prototype, "wxpayRefundNotifyUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_sales_rule', }),
    __metadata("design:type", String)
], Mall.prototype, "buyerSalesRule", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'nick_name', }),
    (0, swagger_1.ApiProperty)({ description: '昵称', }),
    __metadata("design:type", String)
], Mall.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'initial_sku', }),
    (0, swagger_1.ApiProperty)({ description: '多规格商品的默认SKU规格价格信息', }),
    __metadata("design:type", String)
], Mall.prototype, "initialSku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'login_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '最后登录时间', }),
    __metadata("design:type", Object)
], Mall.prototype, "loginTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'address', }),
    __metadata("design:type", String)
], Mall.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'start_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '营业开始时间:默认值：00:00', }),
    __metadata("design:type", Object)
], Mall.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'end_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '营业结束时间:默认值：23:59', }),
    __metadata("design:type", Object)
], Mall.prototype, "endTime", void 0);
Mall = __decorate([
    (0, typeorm_1.Entity)()
], Mall);
exports.Mall = Mall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFsbC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L01hbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSyxTQUFRLHFCQUFTO0lBQW5DOztRQW9MRTs7O1dBR0c7UUFHSSxjQUFTLEdBQVEsSUFBSSxDQUFDO1FBUzdCOzs7V0FHRztRQUdJLGNBQVMsR0FBUSxJQUFJLENBQUM7UUFFN0I7OztXQUdHO1FBR0ksWUFBTyxHQUFRLElBQUksQ0FBQztJQUU3QixDQUFDO0NBQUEsQ0FBQTtBQTVNQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQzs7b0NBQ25EO0FBT3JCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDOztvQ0FDbkQ7QUFRckI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRSxDQUFDO0lBQ3BELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7a0NBQ2pCO0FBUW5CO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQztJQUMzRCxJQUFB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