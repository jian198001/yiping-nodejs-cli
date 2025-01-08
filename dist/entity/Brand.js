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
exports.Brand = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 品牌实体类
 * 继承自BaseModel，包含品牌相关的各种信息
 */
let Brand = class Brand extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'big_pic', }),
    (0, swagger_1.ApiProperty)({ description: '专区大图', }),
    __metadata("design:type", String)
], Brand.prototype, "bigPic", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'logo', }),
    (0, swagger_1.ApiProperty)({ description: '品牌logo', }),
    __metadata("design:type", String)
], Brand.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'brand_story', }),
    (0, swagger_1.ApiProperty)({ description: '品牌故事', }),
    __metadata("design:type", String)
], Brand.prototype, "brandStory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    __metadata("design:type", String)
], Brand.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'factory_status', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '是否为品牌制造商：0->不是；1->是', }),
    __metadata("design:type", Number)
], Brand.prototype, "factoryStatus", void 0);
Brand = __decorate([
    (0, typeorm_1.Entity)()
], Brand);
exports.Brand = Brand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJhbmQuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9CcmFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFDOUMscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLEtBQUssR0FBbEIsTUFBYSxLQUFNLFNBQVEscUJBQVM7Q0F5Q25DLENBQUE7QUFqQ0M7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQ3ZELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7cUNBQ2Y7QUFRckI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRSxDQUFDO0lBQ3BELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxRQUFRLEdBQUUsQ0FBQzs7bUNBQ25CO0FBUW5CO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQztJQUMzRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7O3lDQUNYO0FBT3pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUUsQ0FBQzs7cUNBQ25DO0FBUXJCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFFLENBQUM7SUFDL0UsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHFCQUFxQixHQUFFLENBQUM7OzRDQUN2QjtBQXZDakIsS0FBSztJQURqQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxLQUFLLENBeUNqQjtBQXpDWSxzQkFBSyJ9