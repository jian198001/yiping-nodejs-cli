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
exports.AuctionActivity = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 拍卖活动实体类
 * 继承自BaseModel，包含拍卖活动相关的各种信息
 */
let AuctionActivity = class AuctionActivity extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 拍卖开始时间
         * 对应拍卖活动的开始时间
         */
        this.startTime = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    __metadata("design:type", String)
], AuctionActivity.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'title', }),
    __metadata("design:type", String)
], AuctionActivity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'start_time', type: "datetime", }),
    (0, swagger_1.ApiProperty)({ description: '拍卖开始时间,标识符名称来自淘宝开放平台', }),
    __metadata("design:type", Object)
], AuctionActivity.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_category_id', }),
    __metadata("design:type", String)
], AuctionActivity.prototype, "goodsCategoryId", void 0);
AuctionActivity = __decorate([
    (0, typeorm_1.Entity)()
], AuctionActivity);
exports.AuctionActivity = AuctionActivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVjdGlvbkFjdGl2aXR5LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvQXVjdGlvbkFjdGl2aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEscUJBQVM7SUFBOUM7O1FBZ0JFOzs7V0FHRztRQUdJLGNBQVMsR0FBUSxJQUFJLENBQUM7SUFTL0IsQ0FBQztDQUFBLENBQUE7QUF4QkM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDOzsrQ0FDbkM7QUFPckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRSxDQUFDOzs4Q0FDbEM7QUFRcEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7SUFDNUUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHNCQUFzQixHQUFFLENBQUM7O2tEQUN2QjtBQU83QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEdBQUUsQ0FBQzs7d0RBQ3BDO0FBN0JuQixlQUFlO0lBRDNCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLGVBQWUsQ0ErQjNCO0FBL0JZLDBDQUFlIn0=