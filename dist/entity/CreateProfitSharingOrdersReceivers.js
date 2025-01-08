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
exports.CreateProfitSharingOrdersReceivers = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 分账接收方实体类
 *
 * 该类用于定义分账接收方的基本信息，包括接收方类型、账号、姓名、分账金额和分账描述。
 * 所有标识符名称均来自微信支付商户平台。
 */
let CreateProfitSharingOrdersReceivers = class CreateProfitSharingOrdersReceivers extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 分账接收方类型
         *
         * 可选值为 'MERCHANT_ID' 或 'PERSONAL_OPENID'，默认为 'PERSONAL_OPENID'。
         */
        this.type = 'PERSONAL_OPENID';
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '分账接收方类型' }),
    __metadata("design:type", String)
], CreateProfitSharingOrdersReceivers.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '分账接收方账号' }),
    __metadata("design:type", String)
], CreateProfitSharingOrdersReceivers.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '分账个人接收方姓名' }),
    __metadata("design:type", String)
], CreateProfitSharingOrdersReceivers.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '分账金额（元）' }),
    __metadata("design:type", Number)
], CreateProfitSharingOrdersReceivers.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '分账描述' }),
    __metadata("design:type", String)
], CreateProfitSharingOrdersReceivers.prototype, "description", void 0);
CreateProfitSharingOrdersReceivers = __decorate([
    (0, typeorm_1.Entity)()
], CreateProfitSharingOrdersReceivers);
exports.CreateProfitSharingOrdersReceivers = CreateProfitSharingOrdersReceivers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlUHJvZml0U2hhcmluZ09yZGVyc1JlY2VpdmVycy5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0NyZWF0ZVByb2ZpdFNoYXJpbmdPcmRlcnNSZWNlaXZlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXlDO0FBQ3pDLGdFQUE2RDtBQUU3RDs7Ozs7R0FLRztBQUVILElBQWEsa0NBQWtDLEdBQS9DLE1BQWEsa0NBQW1DLFNBQVEscUJBQVM7SUFBakU7O1FBQ0k7Ozs7V0FJRztRQUVJLFNBQUksR0FBc0MsaUJBQWlCLENBQUM7SUFpQ3ZFLENBQUM7Q0FBQSxDQUFBO0FBakNHO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7O2dFQUNvQjtBQVFuRTtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDOzttRUFDeEI7QUFRdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQzs7Z0VBQzdCO0FBUXBCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7O2tFQUN6QjtBQVF0QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzt1RUFDakI7QUF2Q2xCLGtDQUFrQztJQUQ5QyxJQUFBLGdCQUFNLEdBQUU7R0FDSSxrQ0FBa0MsQ0F3QzlDO0FBeENZLGdGQUFrQyJ9