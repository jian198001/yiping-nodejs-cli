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
exports.Inbill = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 入库单实体类
 * 用于表示入库单的基本信息
 */
let Inbill = class Inbill extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 买家角色
         * 入库单的买家角色，默认值为'buyer'
         */
        this.buyerRole = 'buyer';
        /**
         * 确认收货时间
         * 入库单的确认收货时间
         */
        this.receiveTime = null;
        /**
         * 修改时间
         * 入库单的最后修改时间
         */
        this.modifyTime = null;
        /**
         * 支付时间
         * 入库单的支付时间，标识符名称来自淘宝开放平台
         */
        this.payTime = null;
        /**
         * 发货时间
         * 入库单的发货时间
         */
        this.deliveryTime = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_role' }),
    __metadata("design:type", String)
], Inbill.prototype, "buyerRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cash' }),
    __metadata("design:type", String)
], Inbill.prototype, "cash", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_content' }),
    __metadata("design:type", String)
], Inbill.prototype, "billContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'out_trade_no' }),
    __metadata("design:type", String)
], Inbill.prototype, "outTradeNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'detail_address' }),
    __metadata("design:type", String)
], Inbill.prototype, "detailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'post_code' }),
    __metadata("design:type", String)
], Inbill.prototype, "postCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_receiver_phone' }),
    __metadata("design:type", String)
], Inbill.prototype, "billReceiverPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'receiver_address_id' }),
    __metadata("design:type", String)
], Inbill.prototype, "receiverAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_company' }),
    __metadata("design:type", String)
], Inbill.prototype, "deliveryCompany", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'post_fee', type: 'double' }),
    __metadata("design:type", Number)
], Inbill.prototype, "postFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'province' }),
    __metadata("design:type", String)
], Inbill.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_memo' }),
    __metadata("design:type", String)
], Inbill.prototype, "shopMemo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'receive_time', type: "datetime" }),
    __metadata("design:type", Object)
], Inbill.prototype, "receiveTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_type', type: 'integer' }),
    __metadata("design:type", Number)
], Inbill.prototype, "billType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery' }),
    __metadata("design:type", String)
], Inbill.prototype, "delivery", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'modify_time', type: "datetime" }),
    __metadata("design:type", Object)
], Inbill.prototype, "modifyTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'pay_time', type: "datetime" }),
    __metadata("design:type", Object)
], Inbill.prototype, "payTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'freight_payer' }),
    __metadata("design:type", String)
], Inbill.prototype, "freightPayer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'region' }),
    __metadata("design:type", String)
], Inbill.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'trade_state' }),
    __metadata("design:type", String)
], Inbill.prototype, "tradeState", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_sn' }),
    __metadata("design:type", String)
], Inbill.prototype, "deliverySn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'city' }),
    __metadata("design:type", String)
], Inbill.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'pay_type' }),
    __metadata("design:type", String)
], Inbill.prototype, "payType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'read_history', type: 'integer' }),
    __metadata("design:type", Number)
], Inbill.prototype, "readHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_header' }),
    __metadata("design:type", String)
], Inbill.prototype, "billHeader", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_receiver_email' }),
    __metadata("design:type", String)
], Inbill.prototype, "billReceiverEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'total_amount', type: 'double' }),
    __metadata("design:type", Number)
], Inbill.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_time', type: "datetime" }),
    __metadata("design:type", Object)
], Inbill.prototype, "deliveryTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'confirm_status' }),
    __metadata("design:type", String)
], Inbill.prototype, "confirmStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_id' }),
    __metadata("design:type", String)
], Inbill.prototype, "deliveryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'true_name' }),
    __metadata("design:type", String)
], Inbill.prototype, "trueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'message' }),
    __metadata("design:type", String)
], Inbill.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id' }),
    __metadata("design:type", String)
], Inbill.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'phone_num' }),
    __metadata("design:type", String)
], Inbill.prototype, "phoneNum", void 0);
Inbill = __decorate([
    (0, typeorm_1.Entity)()
], Inbill);
exports.Inbill = Inbill;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5iaWxsLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvSW5iaWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxNQUFNLEdBQW5CLE1BQWEsTUFBTyxTQUFRLHFCQUFTO0lBQXJDOztRQUNFOzs7V0FHRztRQUVJLGNBQVMsR0FBVyxPQUFPLENBQUM7UUErRW5DOzs7V0FHRztRQUVJLGdCQUFXLEdBQVEsSUFBSSxDQUFDO1FBZ0IvQjs7O1dBR0c7UUFFSSxlQUFVLEdBQVEsSUFBSSxDQUFDO1FBRTlCOzs7V0FHRztRQUVJLFlBQU8sR0FBUSxJQUFJLENBQUM7UUF3RTNCOzs7V0FHRztRQUVJLGlCQUFZLEdBQVEsSUFBSSxDQUFDO0lBNENsQyxDQUFDO0NBQUEsQ0FBQTtBQXpPQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFDLENBQUM7O3lDQUN2QjtBQU9uQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7O29DQUNoQztBQU9wQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUM7OzJDQUNqQztBQU8zQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUM7OzBDQUNsQztBQU8xQjtJQURDLElBQUEsZ0JBQU0s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