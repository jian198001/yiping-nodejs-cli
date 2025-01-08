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
exports.SignIn = void 0;
// import {ApiProperty,} from "@midwayjs/swagger"
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 签到实体类
 * 继承自BaseModel，用于存储签到相关的信息
 */
let SignIn = class SignIn extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id' }),
    __metadata("design:type", String)
], SignIn.prototype, "shopBuyerId", void 0);
SignIn = __decorate([
    (0, typeorm_1.Entity)()
], SignIn);
exports.SignIn = SignIn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbkluLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvU2lnbkluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFpRDtBQUNqRCxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU8sU0FBUSxxQkFBUztDQVNwQyxDQUFBO0FBRkc7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDOzsyQ0FDcEM7QUFQbEIsTUFBTTtJQURsQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxNQUFNLENBU2xCO0FBVFksd0JBQU0ifQ==