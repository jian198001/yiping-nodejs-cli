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
exports.SkuList = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商品SKU列表实体类
 * 继承自BaseModel，用于存储商品的SKU列表信息
 */
let SkuList = class SkuList extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '价格', }),
    __metadata("design:type", Number)
], SkuList.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_id', }),
    (0, swagger_1.ApiProperty)({ description: '商品ID', }),
    __metadata("design:type", String)
], SkuList.prototype, "goodsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'list', }),
    (0, swagger_1.ApiProperty)({ description: '多个规格值组合,用JSON数组保存', }),
    __metadata("design:type", String)
], SkuList.prototype, "list", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'initial_sku', }),
    (0, swagger_1.ApiProperty)({ description: '多规格商品的默认SKU规格价格信息', }),
    __metadata("design:type", String)
], SkuList.prototype, "initialSku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'stock_num', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '库存', }),
    __metadata("design:type", Number)
], SkuList.prototype, "stockNum", void 0);
SkuList = __decorate([
    (0, typeorm_1.Entity)()
], SkuList);
exports.SkuList = SkuList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2t1TGlzdC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L1NrdUxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBUSxTQUFRLHFCQUFTO0NBMENyQyxDQUFBO0FBbENDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDO0lBQ3JFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEdBQUUsQ0FBQzs7c0NBQ2Q7QUFRcEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDO0lBQ3hELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7d0NBQ2Q7QUFRdEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRSxDQUFDO0lBQ3BELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsR0FBRSxDQUFDOztxQ0FDOUI7QUFRbkI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsR0FBRSxDQUFDO0lBQzNELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsR0FBRSxDQUFDOzsyQ0FDeEI7QUFRekI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUM7SUFDekUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksR0FBRSxDQUFDOzt5Q0FDWDtBQXhDWixPQUFPO0lBRG5CLElBQUEsZ0JBQU0sR0FBRTtHQUNJLE9BQU8sQ0EwQ25CO0FBMUNZLDBCQUFPIn0=