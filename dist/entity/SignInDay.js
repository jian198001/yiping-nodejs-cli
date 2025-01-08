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
exports.SignInDay = void 0;
// import {ApiProperty,} from "@midwayjs/swagger"
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 连续签到天数实体类
 * 继承自BaseModel，用于存储用户连续签到天数的信息
 */
let SignInDay = class SignInDay extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 连续签到天数
         * 对应用户的连续签到天数，默认为1
         */
        this.day = 1; // 连续签到天数
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id' }),
    __metadata("design:type", String)
], SignInDay.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', }),
    __metadata("design:type", Number)
], SignInDay.prototype, "day", void 0);
SignInDay = __decorate([
    (0, typeorm_1.Entity)()
], SignInDay);
exports.SignInDay = SignInDay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbkluRGF5LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvU2lnbkluRGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFpRDtBQUNqRCxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVUsU0FBUSxxQkFBUztJQUF4Qzs7UUFTSTs7O1dBR0c7UUFFSSxRQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUztJQUVyQyxDQUFDO0NBQUEsQ0FBQTtBQVRHO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQzs7OENBQ3BDO0FBTzNCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLENBQUM7O3NDQUNsQjtBQWRkLFNBQVM7SUFEckIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksU0FBUyxDQWdCckI7QUFoQlksOEJBQVMifQ==