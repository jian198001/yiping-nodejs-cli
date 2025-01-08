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
exports.MemberCardOfferConsume = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 会员卡优惠消费实体类
 * 用于表示会员卡优惠消费的基本信息
 */
let MemberCardOfferConsume = class MemberCardOfferConsume extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'member_card_offer_id', }),
    __metadata("design:type", String)
], MemberCardOfferConsume.prototype, "memberCardOfferId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'code', }),
    __metadata("design:type", String)
], MemberCardOfferConsume.prototype, "code", void 0);
MemberCardOfferConsume = __decorate([
    (0, typeorm_1.Entity)()
], MemberCardOfferConsume);
exports.MemberCardOfferConsume = MemberCardOfferConsume;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyQ2FyZE9mZmVyQ29uc3VtZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L01lbWJlckNhcmRPZmZlckNvbnN1bWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLHFCQUFTO0NBZ0JwRCxDQUFBO0FBVEM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixHQUFFLENBQUM7O2lFQUNyQztBQU9oQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFFLENBQUM7O29EQUNsQztBQWRSLHNCQUFzQjtJQURsQyxJQUFBLGdCQUFNLEdBQUU7R0FDSSxzQkFBc0IsQ0FnQmxDO0FBaEJZLHdEQUFzQiJ9