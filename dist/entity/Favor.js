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
exports.Favor = void 0;
/**
 * 收藏实体类
 */
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 收藏实体类，继承自 BaseModel
 */
let Favor = class Favor extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_id' }),
    (0, swagger_1.ApiProperty)({ description: '商品id' }),
    __metadata("design:type", String)
], Favor.prototype, "goodsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '' }),
    __metadata("design:type", String)
], Favor.prototype, "shopBuyerId", void 0);
Favor = __decorate([
    (0, typeorm_1.Entity)()
], Favor);
exports.Favor = Favor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmF2b3IuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9GYXZvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILCtDQUFnRDtBQUNoRCxxQ0FBeUM7QUFDekMsZ0VBQTZEO0FBRTdEOztHQUVHO0FBRUgsSUFBYSxLQUFLLEdBQWxCLE1BQWEsS0FBTSxTQUFRLHFCQUFTO0NBYW5DLENBQUE7QUFQQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDekQsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDOztzQ0FDZDtBQU12QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOzswQ0FDYjtBQVpoQixLQUFLO0lBRGpCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLEtBQUssQ0FhakI7QUFiWSxzQkFBSyJ9