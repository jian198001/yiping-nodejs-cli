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
exports.InviteCode = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 邀请码实体类
 * 用于表示邀请码的基本信息
 */
let InviteCode = class InviteCode extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'code_type', }),
    (0, swagger_1.ApiProperty)({ description: '邀请码类型，1 - 渠道邀请，2 - 渠道裂变，3 - 会员邀请', }),
    __metadata("design:type", String)
], InviteCode.prototype, "codeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'invite_code', }),
    (0, swagger_1.ApiProperty)({ description: '邀请码', }),
    __metadata("design:type", String)
], InviteCode.prototype, "inviteCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id', }),
    (0, swagger_1.ApiProperty)({ description: '主动邀请的买家id', }),
    __metadata("design:type", String)
], InviteCode.prototype, "shopBuyerId", void 0);
InviteCode = __decorate([
    (0, typeorm_1.Entity)()
], InviteCode);
exports.InviteCode = InviteCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlQ29kZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0ludml0ZUNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLHFCQUFTO0NBMEJ4QyxDQUFBO0FBbEJDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsa0NBQWtDLEdBQUUsQ0FBQzs7NENBQ3pDO0FBUXZCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQztJQUMzRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsS0FBSyxHQUFFLENBQUM7OzhDQUNWO0FBUXpCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQztJQUM3RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsV0FBVyxHQUFFLENBQUM7OytDQUNmO0FBeEJmLFVBQVU7SUFEdEIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksVUFBVSxDQTBCdEI7QUExQlksZ0NBQVUifQ==