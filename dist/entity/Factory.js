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
exports.Factory = void 0;
/**
 * 生产厂家实体类
 */
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 生产厂家实体类，继承自 BaseModel
 */
let Factory = class Factory extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'factory_site' }),
    (0, swagger_1.ApiProperty)({ description: '厂址,标识符名称来自淘宝开放平台' }),
    __metadata("design:type", String)
], Factory.prototype, "factorySite", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '' }),
    (0, swagger_1.ApiProperty)({ description: '厂家联系方式,标识符名称来自淘宝开放平台' }),
    __metadata("design:type", String)
], Factory.prototype, "contact", void 0);
Factory = __decorate([
    (0, typeorm_1.Entity)()
], Factory);
exports.Factory = Factory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCwrQ0FBZ0Q7QUFDaEQscUNBQXlDO0FBQ3pDLGdFQUE2RDtBQUU3RDs7R0FFRztBQUVILElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQVEsU0FBUSxxQkFBUztDQWNyQyxDQUFBO0FBUkM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDO0lBQzdELElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxDQUFDOzs0Q0FDdEI7QUFPM0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN2QyxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQzs7d0NBQzlCO0FBYlosT0FBTztJQURuQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxPQUFPLENBY25CO0FBZFksMEJBQU8ifQ==