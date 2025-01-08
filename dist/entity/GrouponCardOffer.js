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
exports.GrouponCardOffer = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const CardOfferBaseInfo_1 = require("./CardOfferBaseInfo");
/**
 * 团购卡优惠实体类，继承自 CardOfferBaseInfo
 */
// @Entity()
class GrouponCardOffer extends CardOfferBaseInfo_1.CardOfferBaseInfo {
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'deal_detail' }),
    (0, swagger_1.ApiProperty)({ description: '团购券专用,团购详情。' }),
    __metadata("design:type", String)
], GrouponCardOffer.prototype, "dealDetail", void 0);
exports.GrouponCardOffer = GrouponCardOffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBvbkNhcmRPZmZlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0dyb3Vwb25DYXJkT2ZmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBQ2hELHFDQUFpQztBQUNqQywyREFBd0Q7QUFFeEQ7O0dBRUc7QUFDSCxZQUFZO0FBQ1osTUFBYSxnQkFBaUIsU0FBUSxxQ0FBaUI7Q0FPdEQ7QUFEQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUM7SUFDNUQsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxDQUFDOztvREFDbEI7QUFONUIsNENBT0MifQ==