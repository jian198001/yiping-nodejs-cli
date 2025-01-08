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
exports.DiscountCardOffer = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const CardOfferBaseInfo_1 = require("./CardOfferBaseInfo");
/**
 * 折扣卡券优惠实体类
 *
 * 该类用于定义折扣卡券优惠的基本信息，包括折扣额度。
 * 所有标识符名称均来自微信支付平台。
 */
// @Entity()
class DiscountCardOffer extends CardOfferBaseInfo_1.CardOfferBaseInfo {
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'discount', type: 'integer' }),
    (0, swagger_1.ApiProperty)({ description: '折扣券专用,表示打折额度（百分比）。填30就是七折。' }),
    __metadata("design:type", Number)
], DiscountCardOffer.prototype, "discount", void 0);
exports.DiscountCardOffer = DiscountCardOffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY291bnRDYXJkT2ZmZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9EaXNjb3VudENhcmRPZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQscUNBQWlDO0FBQ2pDLDJEQUF3RDtBQUV4RDs7Ozs7R0FLRztBQUNILFlBQVk7QUFDWixNQUFhLGlCQUFrQixTQUFRLHFDQUFpQjtDQVd2RDtBQUZDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQzFFLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSw0QkFBNEIsRUFBRSxDQUFDOzttREFDbkM7QUFUMUIsOENBV0MifQ==