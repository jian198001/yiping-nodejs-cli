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
exports.Outbill = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 出库单实体类
 * 用于表示出库单的基本信息
 */
let Outbill = class Outbill extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 收货时间
         * 预计的收货时间
         */
        this.receiveTime = null;
        /**
         * 修改时间
         * 出库单的最后修改时间
         */
        this.modifyTime = null;
        /**
         * 支付时间
         * 订单的支付时间
         */
        this.payTime = null;
        /**
         * 发货时间
         * 订单的发货时间
         */
        this.deliveryTime = null;
        /**
         * 评论时间
         * 订单的评论时间
         */
        this.commentTime = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '出库单内容', name: 'bill_content', }),
    __metadata("design:type", String)
], Outbill.prototype, "billContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '详细地址', name: 'detail_address', }),
    __metadata("design:type", String)
], Outbill.prototype, "detailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '邮编', name: 'post_code', }),
    __metadata("design:type", String)
], Outbill.prototype, "postCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '收货人电话', name: 'bill_receiver_phone', }),
    __metadata("design:type", String)
], Outbill.prototype, "billReceiverPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '收货地址ID', name: 'receiver_address_id', }),
    __metadata("design:type", String)
], Outbill.prototype, "receiverAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '快递公司', name: 'delivery_company', }),
    __metadata("design:type", String)
], Outbill.prototype, "deliveryCompany", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '邮费', name: 'post_fee', type: 'double', }),
    __metadata("design:type", Number)
], Outbill.prototype, "postFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '省份', name: 'province', }),
    __metadata("design:type", String)
], Outbill.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '店铺备注', name: 'shop_memo', }),
    __metadata("design:type", String)
], Outbill.prototype, "shopMemo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '收货时间', name: 'receive_time', type: "datetime", }),
    __metadata("design:type", Object)
], Outbill.prototype, "receiveTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '单据类型', name: 'bill_type', type: 'integer', }),
    __metadata("design:type", Number)
], Outbill.prototype, "billType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '配送方式', name: 'delivery', }),
    __metadata("design:type", String)
], Outbill.prototype, "delivery", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '修改时间', name: 'modify_time', type: "datetime", }),
    __metadata("design:type", Object)
], Outbill.prototype, "modifyTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '支付时间', name: 'pay_time', type: "datetime", }),
    __metadata("design:type", Object)
], Outbill.prototype, "payTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '运费支付方', name: 'freight_payer', }),
    __metadata("design:type", String)
], Outbill.prototype, "freightPayer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '地区', name: 'region', }),
    __metadata("design:type", String)
], Outbill.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '交易状态', name: 'trade_state', }),
    __metadata("design:type", String)
], Outbill.prototype, "tradeState", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '物流单号', name: 'delivery_sn', }),
    __metadata("design:type", String)
], Outbill.prototype, "deliverySn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '城市', name: 'city', }),
    __metadata("design:type", String)
], Outbill.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '支付类型', name: 'pay_type', }),
    __metadata("design:type", String)
], Outbill.prototype, "payType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '阅读历史', name: 'read_history', type: 'integer', }),
    __metadata("design:type", Number)
], Outbill.prototype, "readHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '单据抬头', name: 'bill_header', }),
    __metadata("design:type", String)
], Outbill.prototype, "billHeader", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '收货人邮箱', name: 'bill_receiver_email', }),
    __metadata("design:type", String)
], Outbill.prototype, "billReceiverEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '总金额', name: 'total_amount', type: 'double', }),
    __metadata("design:type", Number)
], Outbill.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '发货时间', name: 'delivery_time', type: "datetime", }),
    __metadata("design:type", Object)
], Outbill.prototype, "deliveryTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '确认状态', name: 'confirm_status', }),
    __metadata("design:type", String)
], Outbill.prototype, "confirmStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '发货ID', name: 'delivery_id', }),
    __metadata("design:type", String)
], Outbill.prototype, "deliveryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '真实姓名', name: 'true_name', }),
    __metadata("design:type", String)
], Outbill.prototype, "trueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '留言', name: 'message', }),
    __metadata("design:type", String)
], Outbill.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '店铺买家ID', name: 'shop_buyer_id', }),
    __metadata("design:type", String)
], Outbill.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '电话号码', name: 'phone_num', }),
    __metadata("design:type", String)
], Outbill.prototype, "phoneNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '评论时间', name: 'comment_time', type: "datetime", }),
    __metadata("design:type", Object)
], Outbill.prototype, "commentTime", void 0);
Outbill = __decorate([
    (0, typeorm_1.Entity)()
], Outbill);
exports.Outbill = Outbill;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3V0YmlsbC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L091dGJpbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXdDO0FBQ3hDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFRLFNBQVEscUJBQVM7SUFBdEM7O1FBaUVFOzs7V0FHRztRQUVJLGdCQUFXLEdBQVEsSUFBSSxDQUFDO1FBZ0IvQjs7O1dBR0c7UUFFSSxlQUFVLEdBQVEsSUFBSSxDQUFDO1FBRTlCOzs7V0FHRztRQUVJLFlBQU8sR0FBUSxJQUFJLENBQUM7UUF3RTNCOzs7V0FHRztRQUVJLGlCQUFZLEdBQVEsSUFBSSxDQUFDO1FBNENoQzs7O1dBR0c7UUFFSSxnQkFBVyxHQUFRLElBQUksQ0FBQztJQUVqQyxDQUFDO0NBQUEsQ0FBQTtBQTNOQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsY0FBYyxHQUFFLENBQUM7OzRDQUN4QztBQU8xQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEdBQUUsQ0FBQzs7OENBQ3ZDO0FBTzVCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQzs7eUNBQ3JDO0FBT3ZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxxQkFBcUIsR0FBRSxDQUFDOztrREFDekM7QUFPaEM7SUFEQyxJQUFB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