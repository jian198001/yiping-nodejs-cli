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
exports.GiftCard = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 礼品卡实体类，继承自 BaseModel
 */
// @Entity()
class GiftCard extends BaseModel_1.BaseModel {
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'gift' }),
    (0, swagger_1.ApiProperty)({ description: '兑换券专用,填写兑换内容的名称。' }),
    __metadata("design:type", String)
], GiftCard.prototype, "gift", void 0);
exports.GiftCard = GiftCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2lmdENhcmQuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9HaWZ0Q2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQscUNBQWlDO0FBQ2pDLGdFQUE2RDtBQUU3RDs7R0FFRztBQUNILFlBQVk7QUFDWixNQUFhLFFBQVMsU0FBUSxxQkFBUztDQU90QztBQURDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNyRCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQzs7c0NBQzdCO0FBTnRCLDRCQU9DIn0=