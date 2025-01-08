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
exports.TagGoodsMap = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 标签商品映射实体类
 * 继承自BaseModel，用于存储标签和商品之间的映射关系
 */
let TagGoodsMap = class TagGoodsMap extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_id', }),
    __metadata("design:type", String)
], TagGoodsMap.prototype, "goodsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'tag_id', }),
    __metadata("design:type", String)
], TagGoodsMap.prototype, "tagId", void 0);
TagGoodsMap = __decorate([
    (0, typeorm_1.Entity)()
], TagGoodsMap);
exports.TagGoodsMap = TagGoodsMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFnR29vZHNNYXAuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9UYWdHb29kc01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxxQkFBUztDQWdCekMsQ0FBQTtBQVRDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQzs7NENBQ25DO0FBT3RCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQzs7MENBQ25DO0FBZFQsV0FBVztJQUR2QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxXQUFXLENBZ0J2QjtBQWhCWSxrQ0FBVyJ9