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
exports.Auction = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 拍卖实体类
 * 继承自BaseModel，包含拍卖相关的各种信息
 */
let Auction = class Auction extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 拍卖结束时间
         * 对应拍卖活动的结束时间
         */
        this.endTime = null; // 拍卖结束时间,标识符名称来自淘宝开放平台
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_id', }),
    __metadata("design:type", String)
], Auction.prototype, "goodsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'start_price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '拍品起拍价,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Number)
], Auction.prototype, "startPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'comp', type: 'double', }),
    __metadata("design:type", Number)
], Auction.prototype, "comp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'approve', }),
    (0, swagger_1.ApiProperty)({ description: '审批 deny拒绝 permit同意', }),
    __metadata("design:type", String)
], Auction.prototype, "approve", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'msg', }),
    (0, swagger_1.ApiProperty)({ description: '审批拒绝理由', }),
    __metadata("design:type", String)
], Auction.prototype, "msg", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'auction_activity_id', }),
    __metadata("design:type", String)
], Auction.prototype, "auctionActivityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'end_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '拍卖结束时间,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Object)
], Auction.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_memo', }),
    (0, swagger_1.ApiProperty)({ description: '订单卖家备注,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", String)
], Auction.prototype, "shopMemo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'reserve_price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '保留价,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Number)
], Auction.prototype, "reservePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '会员最高价', }),
    __metadata("design:type", Number)
], Auction.prototype, "maxPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'increment_range', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '佣金比例(百分比)，例：123 即1.23%,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Number)
], Auction.prototype, "incrementRange", void 0);
Auction = __decorate([
    (0, typeorm_1.Entity)()
], Auction);
exports.Auction = Auction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0F1Y3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBUSxTQUFRLHFCQUFTO0lBQXRDOztRQThDRTs7O1dBR0c7UUFHSSxZQUFPLEdBQVEsSUFBSSxDQUFDLENBQUMsdUJBQXVCO0lBa0NyRCxDQUFDO0NBQUEsQ0FBQTtBQS9FQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7O3dDQUNuQztBQVF0QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQztJQUMzRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUscUJBQXFCLEdBQUUsQ0FBQzs7MkNBQzFCO0FBT3pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDOztxQ0FDbEQ7QUFRbkI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQ3ZELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxvQkFBb0IsR0FBRSxDQUFDOzt3Q0FDNUI7QUFPdEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRSxDQUFDO0lBQ25ELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxRQUFRLEdBQUUsQ0FBQzs7b0NBQ3BCO0FBT2xCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxxQkFBcUIsR0FBRSxDQUFDOztrREFDcEM7QUFRaEM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7SUFDMUUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHNCQUFzQixHQUFFLENBQUM7O3dDQUN6QjtBQVEzQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFLENBQUM7SUFDekQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHNCQUFzQixHQUFFLENBQUM7O3lDQUM3QjtBQVF2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQztJQUM3RSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEdBQUUsQ0FBQzs7NkNBQ3RCO0FBUTNCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDO0lBQ3pFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxPQUFPLEdBQUUsQ0FBQzs7eUNBQ2Q7QUFRdkI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQztJQUMvRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsc0NBQXNDLEdBQUUsQ0FBQzs7K0NBQ3ZDO0FBcEZsQixPQUFPO0lBRG5CLElBQUEsZ0JBQU0sR0FBRTtHQUNJLE9BQU8sQ0FzRm5CO0FBdEZZLDBCQUFPIn0=