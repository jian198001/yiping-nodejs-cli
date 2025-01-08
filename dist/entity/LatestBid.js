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
exports.LatestBid = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 最新出价实体类
 * 用于表示最新出价的相关信息
 */
let LatestBid = class LatestBid extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 出价时间
         * 出价的时间
         */
        this.bidTime = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id', }),
    (0, swagger_1.ApiProperty)({ description: '买家id', }),
    __metadata("design:type", String)
], LatestBid.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bid_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '出价时间', }),
    __metadata("design:type", Object)
], LatestBid.prototype, "bidTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bid_type', }),
    __metadata("design:type", String)
], LatestBid.prototype, "bidType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'auction_id', }),
    __metadata("design:type", String)
], LatestBid.prototype, "auctionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bid_price', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '出价金额(元为单位)', }),
    __metadata("design:type", Number)
], LatestBid.prototype, "bidPrice", void 0);
LatestBid = __decorate([
    (0, typeorm_1.Entity)()
], LatestBid);
exports.LatestBid = LatestBid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0ZXN0QmlkLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvTGF0ZXN0QmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVUsU0FBUSxxQkFBUztJQUF4Qzs7UUFTRTs7O1dBR0c7UUFHSSxZQUFPLEdBQVEsSUFBSSxDQUFDO0lBd0I3QixDQUFDO0NBQUEsQ0FBQTtBQWhDQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFFLENBQUM7SUFDN0QsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzs4Q0FDVjtBQVExQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQztJQUMxRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7OzBDQUNUO0FBTzNCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQzs7MENBQ25DO0FBT3RCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEdBQUUsQ0FBQzs7NENBQ25DO0FBUXhCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDO0lBQ3pFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUUsQ0FBQzs7MkNBQ25CO0FBckNaLFNBQVM7SUFEckIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksU0FBUyxDQXVDckI7QUF2Q1ksOEJBQVMifQ==