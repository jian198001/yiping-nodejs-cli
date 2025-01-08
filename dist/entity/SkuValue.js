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
exports.SkuValue = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商品规格值实体类
 * 继承自BaseModel，用于存储商品规格值的信息
 */
let SkuValue = class SkuValue extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'preview_img_url', }),
    (0, swagger_1.ApiProperty)({ description: '用于预览显示的规格类目图片', }),
    __metadata("design:type", String)
], SkuValue.prototype, "previewImgUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'img_url', }),
    (0, swagger_1.ApiProperty)({ description: '规格类目图片,只有第一个规格类目可以定义图片', }),
    __metadata("design:type", String)
], SkuValue.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_key_id', }),
    (0, swagger_1.ApiProperty)({ description: '规格名ID', }),
    __metadata("design:type", String)
], SkuValue.prototype, "skuKeyId", void 0);
SkuValue = __decorate([
    (0, typeorm_1.Entity)()
], SkuValue);
exports.SkuValue = SkuValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2t1VmFsdWUuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9Ta3VWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFDOUMscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFTLFNBQVEscUJBQVM7Q0EwQnRDLENBQUE7QUFsQkM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixHQUFFLENBQUM7SUFDL0QsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLGVBQWUsR0FBRSxDQUFDOzsrQ0FDakI7QUFRNUI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQ3ZELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSx3QkFBd0IsR0FBRSxDQUFDOzt3Q0FDakM7QUFRckI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksR0FBRSxDQUFDO0lBQzFELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxPQUFPLEdBQUUsQ0FBQzs7MENBQ2Q7QUF4QlosUUFBUTtJQURwQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxRQUFRLENBMEJwQjtBQTFCWSw0QkFBUSJ9