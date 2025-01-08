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
exports.MemberCardOffer = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const CardOfferBaseInfo_1 = require("./CardOfferBaseInfo");
/**
 * 会员卡优惠实体类
 * 用于表示会员卡优惠的基本信息
 */
let MemberCardOffer = class MemberCardOffer extends CardOfferBaseInfo_1.CardOfferBaseInfo {
    constructor() {
        super(...arguments);
        /**
         * 买家角色
         * 会员卡优惠的买家角色，默认值为buyer
         */
        this.buyerRole = 'buyer';
        /**
         * 激活类型
         * 会员卡优惠的激活类型，可选值为use（首次使用时激活）或pay（付款即激活），默认值为use
         */
        this.activateType = "use";
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_pause', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '可暂停次数', }),
    __metadata("design:type", Number)
], MemberCardOffer.prototype, "maxPause", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_week', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '每周最多核销次数', }),
    __metadata("design:type", Number)
], MemberCardOffer.prototype, "maxWeek", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'auto_activate', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "autoActivate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'discount', type: 'integer', }),
    __metadata("design:type", Number)
], MemberCardOffer.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'balance_rules', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "balanceRules", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'balance_url', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "balanceUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'prerogative', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "prerogative", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'activate_url', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "activateUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_month', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '每月最多核销次数', }),
    __metadata("design:type", Number)
], MemberCardOffer.prototype, "maxMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_day', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '每天最多核销次数', }),
    __metadata("design:type", Number)
], MemberCardOffer.prototype, "maxDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'order_item_id', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "orderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'supply_balance', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "supplyBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'supply_bonus', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "supplyBonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'seller_id', }),
    (0, swagger_1.ApiProperty)({ description: '销售人员', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "sellerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'activate_app_brand_user_name', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "activateAppBrandUserName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'member_card_id', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "memberCardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_role', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "buyerRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'consume', type: 'integer', }),
    __metadata("design:type", Number)
], MemberCardOffer.prototype, "consume", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bonus_rules', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "bonusRules", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bonus_url', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "bonusUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bonus_cleared', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "bonusCleared", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'activate_app_brand_pass', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "activateAppBrandPass", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'activate_type', }),
    (0, swagger_1.ApiProperty)({ description: 'use:首次使用时激活,pay:付款即激活', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "activateType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'background_pic_url', }),
    __metadata("design:type", String)
], MemberCardOffer.prototype, "backgroundPicUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'max_pause_day', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '单次最长暂停天数', }),
    __metadata("design:type", Number)
], MemberCardOffer.prototype, "maxPauseDay", void 0);
MemberCardOffer = __decorate([
    (0, typeorm_1.Entity)()
], MemberCardOffer);
exports.MemberCardOffer = MemberCardOffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyQ2FyZE9mZmVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvTWVtYmVyQ2FyZE9mZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBdUM7QUFDdkMsMkRBQXVEO0FBRXZEOzs7R0FHRztBQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEscUNBQWlCO0lBQXREOztRQXVIRTs7O1dBR0c7UUFFSSxjQUFTLEdBQVcsT0FBTyxDQUFDO1FBcUNuQzs7O1dBR0c7UUFHSSxpQkFBWSxHQUFXLEtBQUssQ0FBQztJQWlCdEMsQ0FBQztDQUFBLENBQUE7QUFoTEM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFFLENBQUM7SUFDMUUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE9BQU8sR0FBRSxDQUFDOztpREFDZDtBQVF2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUUsQ0FBQztJQUN6RSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsVUFBVSxHQUFFLENBQUM7O2dEQUNsQjtBQU90QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFFLENBQUM7O3FEQUNuQztBQU8zQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUUsQ0FBQzs7aURBQ25EO0FBT3ZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQzs7cURBQ25DO0FBTzNCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQzs7bURBQ25DO0FBT3pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQzs7b0RBQ2xDO0FBTzFCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUUsQ0FBQzs7b0RBQ25DO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQzFFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxVQUFVLEdBQUUsQ0FBQzs7aURBQ2pCO0FBUXZCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQ3hFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxVQUFVLEdBQUUsQ0FBQzs7K0NBQ25CO0FBT3JCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxF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