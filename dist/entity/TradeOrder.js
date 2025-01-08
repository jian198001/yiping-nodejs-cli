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
exports.TradeOrder = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 交易订单实体类
 * 继承自BaseModel，用于存储交易订单的相关信息
 */
let TradeOrder = class TradeOrder extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 买家角色
         * 对应买家的角色，默认为'buyer'
         */
        this.buyerRole = 'buyer';
        /**
         * 确认收货时间
         * 对应订单的确认收货时间
         */
        this.receiveTime = null;
        /**
         * 物流类型
         * delivery->需物流;eticket->电子凭证不需物流;默认值:eticket(电子凭证不需物流)
         */
        this.delivery = 'eticket';
        /**
         * 修改时间
         * 对应订单的最后修改时间
         */
        this.modifyTime = null;
        /**
         * 支付时间
         * 标识符名称来自淘宝开放平台
         */
        this.payTime = null;
        /**
         * 合计各项金额（元）
         * 对应订单中各项金额的合计，格式为JSON字符串
         */
        this.addAmount = ' [ ] ';
        /**
         * 减免金额（元）
         * 对应订单中的减免金额，格式为JSON字符串
         */
        this.subAmount = ' [ ] ';
        this.deliveryTime = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_role', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "buyerRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_content', }),
    (0, swagger_1.ApiProperty)({ description: '发票内容', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "billContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'out_trade_no', }),
    (0, swagger_1.ApiProperty)({ description: '第三方商户系统内部订单号,要求32个字符内,只能是数字、大小写字母_-|*@ ,且在同一个商户号下唯一', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "outTradeNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'detail_address', }),
    (0, swagger_1.ApiProperty)({ description: '详细地址', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "detailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'post_code', }),
    (0, swagger_1.ApiProperty)({ description: '收货人邮编', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "postCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_receiver_phone', }),
    (0, swagger_1.ApiProperty)({ description: '收票人电话', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "billReceiverPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'receiver_address_id', }),
    (0, swagger_1.ApiProperty)({ description: '地址ID', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "receiverAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_company', }),
    (0, swagger_1.ApiProperty)({ description: '物流公司编码,标识符名称来自微信小店', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "deliveryCompany", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'post_fee', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '运费,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Number)
], TradeOrder.prototype, "postFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'province', }),
    (0, swagger_1.ApiProperty)({ description: '省份/直辖市', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_memo', }),
    (0, swagger_1.ApiProperty)({ description: '', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "shopMemo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'receive_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '确认收货时间', }),
    __metadata("design:type", Object)
], TradeOrder.prototype, "receiveTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_type', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '发票类型：0->不开发票；1->电子发票；2->纸质发票', }),
    __metadata("design:type", Number)
], TradeOrder.prototype, "billType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery', }),
    (0, swagger_1.ApiProperty)({ description: '物流类型：delivery->需物流;eticket->电子凭证不需物流;默认值:eticket(电子凭证不需物流)', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "delivery", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'modify_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '修改时间', }),
    __metadata("design:type", Object)
], TradeOrder.prototype, "modifyTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'pay_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '支付时间,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Object)
], TradeOrder.prototype, "payTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'region', }),
    (0, swagger_1.ApiProperty)({ description: '区', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'trade_state', }),
    (0, swagger_1.ApiProperty)({ description: '订单状态：NOTPAY:待付款,SUCCESS:已付款,DELIVERY:已发货,3:已完成,CLOSED:已关闭,5:无效订单,REFUND:申请退款,VERIFICATION:已核销', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "tradeState", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'city', }),
    (0, swagger_1.ApiProperty)({ description: '城市', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'pay_type', }),
    (0, swagger_1.ApiProperty)({ description: '支付方式：0->未支付；alipay->支付宝；wxpay->微信；balance->买家余额', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "payType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'read_history', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '订单是否被商家已读', }),
    __metadata("design:type", Number)
], TradeOrder.prototype, "readHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_header', }),
    (0, swagger_1.ApiProperty)({ description: '发票抬头', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "billHeader", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_receiver_email', }),
    (0, swagger_1.ApiProperty)({ description: '收票人邮箱', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "billReceiverEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '合计各项金额(元)', name: 'add_amount', }),
    (0, swagger_1.ApiProperty)({ description: '合计各项金额(元)', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "addAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '减免金额(元)', name: 'sub_amount', }),
    (0, swagger_1.ApiProperty)({ description: '减免金额(元)', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "subAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'total_amount', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '订单总金额(元)', }),
    __metadata("design:type", Number)
], TradeOrder.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '发货时间', }),
    __metadata("design:type", Object)
], TradeOrder.prototype, "deliveryTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'confirm_status', }),
    (0, swagger_1.ApiProperty)({ description: '确认收货状态：0->未确认；1->已确认', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "confirmStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_id', }),
    (0, swagger_1.ApiProperty)({ description: '运单ID,标识符名称来自微信小店', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "deliveryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'true_name', }),
    (0, swagger_1.ApiProperty)({ description: '收货人姓名', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "trueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '买家留言', }),
    (0, swagger_1.ApiProperty)({ description: '', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    (0, swagger_1.ApiProperty)({ description: '卖家ID', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'phone_num', }),
    (0, swagger_1.ApiProperty)({ description: '收货人电话', }),
    __metadata("design:type", String)
], TradeOrder.prototype, "phoneNum", void 0);
TradeOrder = __decorate([
    (0, typeorm_1.Entity)()
], TradeOrder);
exports.TradeOrder = TradeOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhZGVPcmRlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L1RyYWRlT3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLHFCQUFTO0lBQXpDOztRQUVFOzs7V0FHRztRQUVJLGNBQVMsR0FBVyxPQUFPLENBQUM7UUFrRm5DOzs7V0FHRztRQUdJLGdCQUFXLEdBQVEsSUFBSSxDQUFDO1FBVS9COzs7V0FHRztRQUdJLGFBQVEsR0FBVyxTQUFTLENBQUE7UUFFbkM7OztXQUdHO1FBR0ksZUFBVSxHQUFRLElBQUksQ0FBQztRQUU5Qjs7O1dBR0c7UUFHSSxZQUFPLEdBQVEsSUFBSSxDQUFDO1FBMEQzQjs7O1dBR0c7UUFHSSxjQUFTLEdBQVcsT0FBTyxDQUFDO1FBRW5DOzs7V0FHRztRQUdJLGNBQVMsR0FBVyxPQUFPLENBQUM7UUFZNUIsaUJBQVksR0FBUSxJQUFJLENBQUM7SUE2QmxDLENBQUM7Q0FBQSxDQUFBO0FBek9DO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEdBQUUsQ0FBQzs7NkNBQ3hCO0FBUW5DO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUUsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7OytDQUNWO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVB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