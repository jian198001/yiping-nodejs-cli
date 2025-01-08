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
exports.CashCardOffer = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const CardOfferBaseInfo_1 = require("./CardOfferBaseInfo");
/**
 * 现金券优惠实体类
 *
 * 该类用于定义现金券优惠的基本信息，包括起用金额和减免金额。
 * 所有标识符名称均来自微信支付平台。
 */
// @Entity()
class CashCardOffer extends CardOfferBaseInfo_1.CardOfferBaseInfo {
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '代金券专用,表示起用金额（单位为分）,如果无起用门槛则填0。', name: 'least_cost', }),
    (0, swagger_1.ApiProperty)({ description: '代金券专用,表示起用金额（单位为分）,如果无起用门槛则填0。', }),
    __metadata("design:type", Number)
], CashCardOffer.prototype, "leastCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '代金券专用,表示减免金额。（单位为分）', name: 'reduce_cost', }),
    (0, swagger_1.ApiProperty)({ description: '代金券专用,表示减免金额。（单位为分）', }),
    __metadata("design:type", Number)
], CashCardOffer.prototype, "reduceCost", void 0);
exports.CashCardOffer = CashCardOffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FzaENhcmRPZmZlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0Nhc2hDYXJkT2ZmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUFpQztBQUNqQywyREFBdUQ7QUFFdkQ7Ozs7O0dBS0c7QUFDSCxZQUFZO0FBQ1osTUFBYSxhQUFjLFNBQVEscUNBQWlCO0NBb0JuRDtBQVhDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsSUFBSSxFQUFFLFlBQVksR0FBRSxDQUFDO0lBQ3hGLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxnQ0FBZ0MsR0FBRSxDQUFDOztnREFDdEM7QUFTeEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsYUFBYSxHQUFFLENBQUM7SUFDOUUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHFCQUFxQixHQUFFLENBQUM7O2lEQUMxQjtBQWxCM0Isc0NBb0JDIn0=