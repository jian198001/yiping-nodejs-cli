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
exports.ProfitSharing = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 分账实体类
 * 用于表示分账的基本信息
 */
let ProfitSharing = class ProfitSharing extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '分账金额(元),标识符名称来自微信支付商户平台', }),
    __metadata("design:type", Number)
], ProfitSharing.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '分账描述,标识符名称来自微信支付商户平台', }),
    __metadata("design:type", String)
], ProfitSharing.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '分账接收方账号,标识符名称来自微信支付商户平台', }),
    __metadata("design:type", String)
], ProfitSharing.prototype, "account", void 0);
ProfitSharing = __decorate([
    (0, typeorm_1.Entity)()
], ProfitSharing);
exports.ProfitSharing = ProfitSharing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZml0U2hhcmluZy5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L1Byb2ZpdFNoYXJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEscUJBQVM7Q0F1QjNDLENBQUE7QUFoQkM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsR0FBRyxDQUFDOzs2Q0FDMUM7QUFPckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsR0FBSSxDQUFDOztrREFDbkM7QUFPMUI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsR0FBRyxDQUFDOzs4Q0FDekM7QUFyQlgsYUFBYTtJQUR6QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxhQUFhLENBdUJ6QjtBQXZCWSxzQ0FBYSJ9