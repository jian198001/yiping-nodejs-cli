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
exports.GeneralCouponCard = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 通用优惠券实体类，继承自 BaseModel
 */
// @Entity()
class GeneralCouponCard extends BaseModel_1.BaseModel {
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '默认详情', name: 'default_detail' }),
    (0, swagger_1.ApiProperty)({ description: '默认详情' }),
    __metadata("design:type", String)
], GeneralCouponCard.prototype, "defaultDetail", void 0);
exports.GeneralCouponCard = GeneralCouponCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhbENvdXBvbkNhcmQuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9HZW5lcmFsQ291cG9uQ2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQscUNBQWlDO0FBQ2pDLGdFQUE2RDtBQUU3RDs7R0FFRztBQUNILFlBQVk7QUFDWixNQUFhLGlCQUFrQixTQUFRLHFCQUFTO0NBTy9DO0FBREM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUM7SUFDbkUsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDOzt3REFDUjtBQU4vQiw4Q0FPQyJ9