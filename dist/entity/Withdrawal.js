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
exports.Withdrawal = void 0;
// 导入@midwayjs/swagger库中的ApiProperty装饰器，用于在Swagger文档中描述属性
// import {ApiProperty,} from "@midwayjs/swagger"
// 导入typeorm库中的Column和Entity装饰器，用于定义数据库实体和字段
const typeorm_1 = require("typeorm");
// 导入BaseModel类，该类定义了实体的通用属性和方法
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 提现实体类
 * 继承自BaseModel，包含提现所需的各种信息
 */
let Withdrawal = class Withdrawal extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '用户ID', name: 'shop_buyer_id' }),
    __metadata("design:type", String)
], Withdrawal.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '提现金额' }),
    __metadata("design:type", Number)
], Withdrawal.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '商户订单号', name: 'out_trade_no', }),
    __metadata("design:type", String)
], Withdrawal.prototype, "outTradeNo", void 0);
Withdrawal = __decorate([
    (0, typeorm_1.Entity)()
], Withdrawal);
exports.Withdrawal = Withdrawal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2l0aGRyYXdhbC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L1dpdGhkcmF3YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseURBQXlEO0FBQ3pELGlEQUFpRDtBQUNqRCw0Q0FBNEM7QUFDNUMscUNBQXVDO0FBQ3ZDLCtCQUErQjtBQUMvQixnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLHFCQUFTO0NBc0J4QyxDQUFBO0FBZkc7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDOzsrQ0FDeEM7QUFPM0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7MENBQ3RCO0FBT3RCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUUsQ0FBQzs7OENBQ3pDO0FBckJoQixVQUFVO0lBRHRCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLFVBQVUsQ0FzQnRCO0FBdEJZLGdDQUFVIn0=