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
exports.CashCard = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 现金卡实体类
 *
 * 该类用于定义现金卡的基本信息，包括减免金额和起用金额。
 * 所有标识符名称均来自微信支付平台。
 */
// @Entity()
class CashCard extends BaseModel_1.BaseModel {
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '代金券专用,表示减免金额。（单位为分）', name: 'reduce_cost' }),
    (0, swagger_1.ApiProperty)({ description: '代金券专用,表示减免金额。（单位为分）' }),
    __metadata("design:type", Number)
], CashCard.prototype, "reduceCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '代金券专用,表示起用金额（单位为分）,如果无起用门槛则填0。', name: 'least_cost', type: 'integer' }),
    (0, swagger_1.ApiProperty)({ description: '代金券专用,表示起用金额（单位为分）,如果无起用门槛则填0。' }),
    __metadata("design:type", Number)
], CashCard.prototype, "leastCost", void 0);
exports.CashCard = CashCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FzaENhcmQuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9DYXNoQ2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQscUNBQWlDO0FBQ2pDLGdFQUE2RDtBQUU3RDs7Ozs7R0FLRztBQUNILFlBQVk7QUFDWixNQUFhLFFBQVMsU0FBUSxxQkFBUztDQW9CdEM7QUFYQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQztJQUMvRSxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsQ0FBQzs7NENBQzFCO0FBUzFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDMUcsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLGdDQUFnQyxFQUFFLENBQUM7OzJDQUN0QztBQWxCM0IsNEJBb0JDIn0=