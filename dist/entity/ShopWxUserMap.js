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
exports.ShopWxUserMap = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 店铺微信用户映射实体类
 * 继承自BaseModel，用于关联店铺和微信用户的信息
 */
let ShopWxUserMap = class ShopWxUserMap extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    __metadata("design:type", String)
], ShopWxUserMap.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'user_role', }),
    __metadata("design:type", String)
], ShopWxUserMap.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'open_id', }),
    __metadata("design:type", String)
], ShopWxUserMap.prototype, "openId", void 0);
ShopWxUserMap = __decorate([
    (0, typeorm_1.Entity)()
], ShopWxUserMap);
exports.ShopWxUserMap = ShopWxUserMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hvcFd4VXNlck1hcC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L1Nob3BXeFVzZXJNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEscUJBQVM7Q0F1QjNDLENBQUE7QUFoQkM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDOzs2Q0FDbkM7QUFPckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsR0FBRSxDQUFDOzsrQ0FDbkM7QUFPdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDOzs2Q0FDbkM7QUFyQlYsYUFBYTtJQUR6QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxhQUFhLENBdUJ6QjtBQXZCWSxzQ0FBYSJ9