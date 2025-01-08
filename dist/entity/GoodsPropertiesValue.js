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
exports.GoodsPropertiesValue = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商品属性值实体类
 * 用于表示商品属性的具体值及其相关信息
 */
let GoodsPropertiesValue = class GoodsPropertiesValue extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_properties_key_id', }),
    (0, swagger_1.ApiProperty)({ description: '加价属性名ID', }),
    __metadata("design:type", String)
], GoodsPropertiesValue.prototype, "goodsPropertiesKeyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '加价', }),
    __metadata("design:type", Number)
], GoodsPropertiesValue.prototype, "price", void 0);
GoodsPropertiesValue = __decorate([
    (0, typeorm_1.Entity)()
], GoodsPropertiesValue);
exports.GoodsPropertiesValue = GoodsPropertiesValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZHNQcm9wZXJ0aWVzVmFsdWUuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9Hb29kc1Byb3BlcnRpZXNWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFDOUMscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLHFCQUFTO0NBa0JsRCxDQUFBO0FBVkM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixHQUFFLENBQUM7SUFDdkUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLFNBQVMsR0FBRSxDQUFDOztrRUFDSjtBQVFuQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQztJQUNyRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O21EQUNkO0FBaEJULG9CQUFvQjtJQURoQyxJQUFBLGdCQUFNLEdBQUU7R0FDSSxvQkFBb0IsQ0FrQmhDO0FBbEJZLG9EQUFvQiJ9