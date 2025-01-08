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
exports.GoodsPropertiesKey = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商品属性键实体类
 * 用于表示商品属性的键及其相关信息
 */
let GoodsPropertiesKey = class GoodsPropertiesKey extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'multiple', }),
    (0, swagger_1.ApiProperty)({ description: '是否可多选', }),
    __metadata("design:type", String)
], GoodsPropertiesKey.prototype, "multiple", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_id', }),
    (0, swagger_1.ApiProperty)({ description: '商品ID', }),
    __metadata("design:type", String)
], GoodsPropertiesKey.prototype, "goodsId", void 0);
GoodsPropertiesKey = __decorate([
    (0, typeorm_1.Entity)()
], GoodsPropertiesKey);
exports.GoodsPropertiesKey = GoodsPropertiesKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZHNQcm9wZXJ0aWVzS2V5LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvR29vZHNQcm9wZXJ0aWVzS2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEscUJBQVM7Q0FrQmhELENBQUE7QUFWQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7SUFDeEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE9BQU8sR0FBRSxDQUFDOztvREFDZDtBQVF2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7SUFDeEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzttREFDZDtBQWhCWCxrQkFBa0I7SUFEOUIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksa0JBQWtCLENBa0I5QjtBQWxCWSxnREFBa0IifQ==