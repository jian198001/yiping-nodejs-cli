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
exports.PurchaseOrder = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 采购订单实体类
 * 用于表示采购订单的基本信息
 */
let PurchaseOrder = class PurchaseOrder extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 买家角色
         * 采购订单的买家角色，默认值为'buyer'
         */
        this.buyerRole = 'buyer';
        /**
         * 确认收货时间
         * 采购订单的确认收货时间
         */
        this.receiveTime = null;
        /**
         * 修改时间
         * 采购订单的最后修改时间
         */
        this.modifyTime = null;
        /**
         * 支付时间
         * 采购订单的支付时间，标识符名称来自淘宝开放平台
         */
        this.payTime = null;
        this.deliveryTime = null;
        this.commentTime = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_role' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "buyerRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cash' }),
    (0, swagger_1.ApiProperty)({ description: '收银订单,与商品不绑定,1收银,0或null非收银' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "cash", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_content' }),
    (0, swagger_1.ApiProperty)({ description: '发票内容' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "billContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'out_trade_no' }),
    (0, swagger_1.ApiProperty)({ description: '第三方商户系统内部订单号,要求32个字符内,只能是数字、大小写字母_-|*@ ,且在同一个商户号下唯一' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "outTradeNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'detail_address' }),
    (0, swagger_1.ApiProperty)({ description: '详细地址' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "detailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'post_code' }),
    (0, swagger_1.ApiProperty)({ description: '收货人邮编' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "postCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_receiver_phone' }),
    (0, swagger_1.ApiProperty)({ description: '收票人电话' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "billReceiverPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'receiver_address_id' }),
    (0, swagger_1.ApiProperty)({ description: '地址ID' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "receiverAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_company' }),
    (0, swagger_1.ApiProperty)({ description: '物流公司编码,标识符名称来自微信小店' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "deliveryCompany", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'post_fee', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '运费,标识符名称来自淘宝开放平台' }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "postFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'province' }),
    (0, swagger_1.ApiProperty)({ description: '省份/直辖市' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_memo' }),
    (0, swagger_1.ApiProperty)({ description: '邮政编码' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "shopMemo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'receive_time', type: "datetime" }),
    (0, swagger_1.ApiProperty)({ description: '确认收货时间' }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "receiveTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_type', type: 'integer' }),
    (0, swagger_1.ApiProperty)({ description: '发票类型：0->不开发票；1->电子发票；2->纸质发票' }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "billType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery' }),
    (0, swagger_1.ApiProperty)({ description: '物流类型：delivery->需物流;eticket->电子凭证不需物流;默认值:eticket(电子凭证不需物流)' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "delivery", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'modify_time', type: "datetime" }),
    (0, swagger_1.ApiProperty)({ description: '修改时间' }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "modifyTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'pay_time', type: "datetime" }),
    (0, swagger_1.ApiProperty)({ description: '支付时间,标识符名称来自淘宝开放平台' }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "payTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'freight_payer' }),
    (0, swagger_1.ApiProperty)({ description: '运费承担方式。可选值:shop（卖家承担）,buyer(买家承担);默认值:shop。卖家承担不用设置邮费和postage_id.买家承担的时候,必填邮费和postage_id 如果用户设置了运费模板会优先使用运费模板,否则要同步设置邮费（post_fee,express_fee,ems_fee）' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "freightPayer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'region' }),
    (0, swagger_1.ApiProperty)({ description: '区' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'trade_state' }),
    (0, swagger_1.ApiProperty)({ description: '订单状态：NOTPAY:待付款,SUCCESS:已付款,DELIVERY:已发货,3:已完成,CLOSED:已关闭,5:无效订单,REFUND:申请退款,VERIFICATION:已核销' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "tradeState", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'city' }),
    (0, swagger_1.ApiProperty)({ description: '城市' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'pay_type' }),
    (0, swagger_1.ApiProperty)({ description: '支付方式：0->未支付；alipay->支付宝；wxpay->微信；balance->买家余额' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "payType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'read_history', }),
    (0, swagger_1.ApiProperty)({ description: '订单阅读历史', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "readHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_header', }),
    (0, swagger_1.ApiProperty)({ description: '发票抬头', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "billHeader", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_receiver_email', }),
    (0, swagger_1.ApiProperty)({ description: '收票人邮箱', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "billReceiverEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'total_amount', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '订单总金额(元)', }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '发货时间', }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "deliveryTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'confirm_status', }),
    (0, swagger_1.ApiProperty)({ description: '确认收货状态：0->未确认；1->已确认', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "confirmStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_id', }),
    (0, swagger_1.ApiProperty)({ description: '运单ID,标识符名称来自微信小店', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "deliveryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'true_name', }),
    (0, swagger_1.ApiProperty)({ description: '收货人姓名', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "trueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'message', }),
    (0, swagger_1.ApiProperty)({ description: '邮政编码', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    (0, swagger_1.ApiProperty)({ description: '卖家ID', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'phone_num', }),
    (0, swagger_1.ApiProperty)({ description: '收货人电话', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "phoneNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'comment_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '评价时间', }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "commentTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'create_user_id', }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "createUserId", void 0);
PurchaseOrder = __decorate([
    (0, typeorm_1.Entity)()
], PurchaseOrder);
exports.PurchaseOrder = PurchaseOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVyY2hhc2VPcmRlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L1B1cmNoYXNlT3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBQ2hELHFDQUF5QztBQUN6QyxnRUFBNkQ7QUFFN0Q7OztHQUdHO0FBRUgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLHFCQUFTO0lBQTVDOztRQVFFOzs7V0FHRztRQUVJLGNBQVMsR0FBVyxPQUFPLENBQUM7UUEwRm5DOzs7V0FHRztRQUdJLGdCQUFXLEdBQVEsSUFBSSxDQUFDO1FBa0IvQjs7O1dBR0c7UUFHSSxlQUFVLEdBQVEsSUFBSSxDQUFDO1FBRTlCOzs7V0FHRztRQUdJLFlBQU8sR0FBUSxJQUFJLENBQUM7UUFnRXBCLGlCQUFZLEdBQVEsSUFBSSxDQUFDO1FBK0J6QixnQkFBVyxHQUFRLElBQUksQ0FBQztJQUtqQyxDQUFDO0NBQUEsQ0FBQTtBQTNPQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOzs0Q0FDbkI7QUFPckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDOztnREFDekI7QUFRbkM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3JELElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSwyQkFBMkIsRUFBRSxDQUFDOzsyQ0FDdEM7QUFRcEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFF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