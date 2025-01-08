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
exports.MemberCard = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 会员卡实体类
 * 用于表示会员卡的基本信息
 */
let MemberCard = class MemberCard extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 激活类型
         * 会员卡的激活类型，可选值为use（首次使用时激活）或pay（付款即激活），默认值为use
         */
        this.activateType = "use";
        /**
         * 买家角色
         * 会员卡的买家角色，默认值为buyer
         */
        this.buyerRole = "buyer";
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'activate_type', }),
    (0, swagger_1.ApiProperty)({ description: 'use:首次使用时激活,pay:付款即激活', }),
    __metadata("design:type", String)
], MemberCard.prototype, "activateType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_pause_day', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '单次最长暂停天数', }),
    __metadata("design:type", Number)
], MemberCard.prototype, "maxPauseDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'background_pic_url', }),
    __metadata("design:type", String)
], MemberCard.prototype, "backgroundPicUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bonus_url', }),
    __metadata("design:type", String)
], MemberCard.prototype, "bonusUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bonus_rules', }),
    __metadata("design:type", String)
], MemberCard.prototype, "bonusRules", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'activate_app_brand_pass', }),
    __metadata("design:type", String)
], MemberCard.prototype, "activateAppBrandPass", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bonus_cleared', }),
    __metadata("design:type", String)
], MemberCard.prototype, "bonusCleared", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'activate_app_brand_user_name', }),
    __metadata("design:type", String)
], MemberCard.prototype, "activateAppBrandUserName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_role', }),
    __metadata("design:type", String)
], MemberCard.prototype, "buyerRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_id', }),
    __metadata("design:type", String)
], MemberCard.prototype, "goodsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'consume', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '可核销次数', }),
    __metadata("design:type", Number)
], MemberCard.prototype, "consume", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_month', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '每月最多核销次数', }),
    __metadata("design:type", Number)
], MemberCard.prototype, "maxMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_day', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '每天最多核销次数', }),
    __metadata("design:type", Number)
], MemberCard.prototype, "maxDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'supply_balance', }),
    __metadata("design:type", String)
], MemberCard.prototype, "supplyBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'supply_bonus', }),
    __metadata("design:type", String)
], MemberCard.prototype, "supplyBonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'prerogative', }),
    __metadata("design:type", String)
], MemberCard.prototype, "prerogative", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'activate_url', }),
    __metadata("design:type", String)
], MemberCard.prototype, "activateUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'auto_activate', }),
    __metadata("design:type", String)
], MemberCard.prototype, "autoActivate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_week', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '每周最多核销次数', }),
    __metadata("design:type", Number)
], MemberCard.prototype, "maxWeek", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'discount', type: 'integer', }),
    __metadata("design:type", Number)
], MemberCard.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'balance_rules', }),
    __metadata("design:type", String)
], MemberCard.prototype, "balanceRules", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'balance_url', }),
    __metadata("design:type", String)
], MemberCard.prototype, "balanceUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_pause', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '可暂停次数', }),
    __metadata("design:type", Number)
], MemberCard.prototype, "maxPause", void 0);
MemberCard = __decorate([
    (0, typeorm_1.Entity)()
], MemberCard);
exports.MemberCard = MemberCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L01lbWJlckNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLHFCQUFTO0lBQXpDOztRQUVFOzs7V0FHRztRQUdJLGlCQUFZLEdBQVcsS0FBSyxDQUFDO1FBb0RwQzs7O1dBR0c7UUFFSSxjQUFTLEdBQVcsT0FBTyxDQUFDO0lBeUdyQyxDQUFDO0NBQUEsQ0FBQTtBQWxLQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFFLENBQUM7SUFDN0QsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHVCQUF1QixHQUFFLENBQUM7O2dEQUNqQjtBQVFwQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUUsQ0FBQztJQUM5RSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsVUFBVSxHQUFFLENBQUM7OytDQUNkO0FBTzFCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBb0IsR0FBRSxDQUFDOztvREFDcEM7QUFPL0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsR0FBRSxDQUFD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