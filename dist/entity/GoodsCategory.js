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
exports.GoodsCategory = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商品分类实体类，继承自 BaseModel
 */
let GoodsCategory = class GoodsCategory extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'parent_id' }),
    (0, swagger_1.ApiProperty)({ description: '上级分类的编号：0表示一级分类' }),
    __metadata("design:type", String)
], GoodsCategory.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'level', type: 'integer' }),
    (0, swagger_1.ApiProperty)({ description: '分类级别：0->1级；1->2级' }),
    __metadata("design:type", Number)
], GoodsCategory.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id' }),
    (0, swagger_1.ApiProperty)({ description: '商家ID' }),
    __metadata("design:type", String)
], GoodsCategory.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '' }),
    __metadata("design:type", String)
], GoodsCategory.prototype, "code", void 0);
GoodsCategory = __decorate([
    (0, typeorm_1.Entity)()
], GoodsCategory);
exports.GoodsCategory = GoodsCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZHNDYXRlZ29yeS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0dvb2RzQ2F0ZWdvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBQ2hELHFDQUF5QztBQUN6QyxnRUFBNkQ7QUFFN0Q7O0dBRUc7QUFFSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEscUJBQVM7Q0EyQjNDLENBQUE7QUFyQkM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQzFELElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDOzsrQ0FDeEI7QUFPeEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDdkUsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLENBQUM7OzRDQUM1QjtBQU9yQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDeEQsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs2Q0FDZjtBQU10QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOzsyQ0FDcEI7QUExQlQsYUFBYTtJQUR6QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxhQUFhLENBMkJ6QjtBQTNCWSxzQ0FBYSJ9