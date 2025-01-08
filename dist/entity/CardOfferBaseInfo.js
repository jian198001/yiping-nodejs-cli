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
exports.CardOfferBaseInfo = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const CardBaseInfo_1 = require("./CardBaseInfo");
/**
 * 卡券优惠基础信息实体类
 * 继承自CardBaseInfo，包含卡券优惠相关的各种基础信息
 */
// @Entity()
class CardOfferBaseInfo extends CardBaseInfo_1.CardBaseInfo {
    constructor() {
        super(...arguments);
        /**
         * 结束时间
         * 对应卡券优惠的结束时间
         */
        this.endTime = null;
        /**
         * 开始时间
         * 对应卡券优惠的开始时间
         */
        this.beginTime = null;
    }
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'card_id', }),
    __metadata("design:type", String)
], CardOfferBaseInfo.prototype, "cardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'end_time', type: "datetime", }),
    __metadata("design:type", Object)
], CardOfferBaseInfo.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'is_give_by_friend', }),
    (0, swagger_1.ApiProperty)({ description: '是否为转赠领取,1代表是,0代表否。', }),
    __metadata("design:type", String)
], CardOfferBaseInfo.prototype, "isGiveByFriend", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'user_card_status', }),
    (0, swagger_1.ApiProperty)({ description: '当前code对应卡券的状态 NORMAL 正常 CONSUMED 已核销 EXPIREL 已过期 GIFTING 转赠中 GIFT_TIMEOUT 转赠超时 DELETE 已删除 UNAVAILABLE 已失效 code未被添加或被转赠领取的情况则统一报错：invalid serial code', }),
    __metadata("design:type", String)
], CardOfferBaseInfo.prototype, "userCardStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'begin_time', type: "datetime", }),
    __metadata("design:type", Object)
], CardOfferBaseInfo.prototype, "beginTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'old_user_card_code', }),
    (0, swagger_1.ApiProperty)({ description: '为保证安全,微信会在转赠发生后变更该卡券的code号,该字段表示转赠前的code。', }),
    __metadata("design:type", String)
], CardOfferBaseInfo.prototype, "oldUserCardCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'outer_str', }),
    (0, swagger_1.ApiProperty)({ description: '领取场景值,用于领取渠道数据统计。可在生成二维码接口及添加Addcard接口中自定义该字段的字符串值。', }),
    __metadata("design:type", String)
], CardOfferBaseInfo.prototype, "outerStr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id', }),
    __metadata("design:type", String)
], CardOfferBaseInfo.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'friend_user_name', }),
    (0, swagger_1.ApiProperty)({ description: '当IsGiveByFriend为1时填入的字段,表示发起转赠用户的openid', }),
    __metadata("design:type", String)
], CardOfferBaseInfo.prototype, "friendUserName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'is_restore_member_card', }),
    (0, swagger_1.ApiProperty)({ description: '用户删除会员卡后可重新finder,当用户本次操作为finder时,该值为1,否则为0', }),
    __metadata("design:type", String)
], CardOfferBaseInfo.prototype, "isRestoreMemberCard", void 0);
exports.CardOfferBaseInfo = CardOfferBaseInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZE9mZmVyQmFzZUluZm8uanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9DYXJkT2ZmZXJCYXNlSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFDOUMscUNBQWlDO0FBQ2pDLGlEQUE2QztBQUU3Qzs7O0dBR0c7QUFDSCxZQUFZO0FBQ1osTUFBYSxpQkFBa0IsU0FBUSwyQkFBWTtJQUFuRDs7UUFTRTs7O1dBR0c7UUFFSSxZQUFPLEdBQVEsSUFBSSxDQUFDO1FBa0IzQjs7O1dBR0c7UUFFSSxjQUFTLEdBQVEsSUFBSSxDQUFDO0lBeUMvQixDQUFDO0NBQUE7QUF2RUM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDOztpREFDbkM7QUFPckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7O2tEQUNoRDtBQVEzQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEdBQUUsQ0FBQztJQUNqRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsb0JBQW9CLEdBQUUsQ0FBQzs7eURBQ3JCO0FBUTdCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsR0FBRSxDQUFDO0lBQ2hFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxzSkFBc0osR0FBRSxDQUFDOzt5REFDdko7QUFPN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7O29EQUNoRDtBQVE3QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEdBQUUsQ0FBQztJQUNsRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsMkNBQTJDLEdBQUUsQ0FBQzs7MERBQzNDO0FBUTlCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUscURBQXFELEdBQUUsQ0FBQzs7bURBQzVEO0FBT3ZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQzs7c0RBQ3BDO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsR0FBRSxDQUFDO0lBQ2hFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSx5Q0FBeUMsR0FBRSxDQUFDOzt5REFDMUM7QUFRN0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixHQUFFLENBQUM7SUFDdEUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLDZDQUE2QyxHQUFFLENBQUM7OzhEQUN6QztBQTVFcEMsOENBOEVDIn0=