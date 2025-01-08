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
exports.GrouponCard = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 团购卡实体类
 * 用于表示团购卡的基本信息
 */
// @Entity()
class GrouponCard extends BaseModel_1.BaseModel {
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'outer_str', }),
    (0, swagger_1.ApiProperty)({ description: '领取场景值,用于领取渠道数据统计。可在生成二维码接口及添加Addcard接口中自定义该字段的字符串值。', }),
    __metadata("design:type", String)
], GrouponCard.prototype, "outerStr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id', }),
    __metadata("design:type", String)
], GrouponCard.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'friend_user_name', }),
    (0, swagger_1.ApiProperty)({ description: '当IsGiveByFriend为1时填入的字段,表示发起转赠用户的openid', }),
    __metadata("design:type", String)
], GrouponCard.prototype, "friendUserName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'deal_detail', }),
    (0, swagger_1.ApiProperty)({ description: '团购券专用,团购详情。', }),
    __metadata("design:type", String)
], GrouponCard.prototype, "dealDetail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'is_restore_member_card', }),
    (0, swagger_1.ApiProperty)({ description: '用户删除会员卡后可重新finder,当用户本次操作为finder时,该值为1,否则为0', }),
    __metadata("design:type", String)
], GrouponCard.prototype, "isRestoreMemberCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'is_give_by_friend', }),
    (0, swagger_1.ApiProperty)({ description: '是否为转赠领取,1代表是,0代表否。', }),
    __metadata("design:type", String)
], GrouponCard.prototype, "isGiveByFriend", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'user_card_status', }),
    (0, swagger_1.ApiProperty)({ description: '当前code对应卡券的状态 NORMAL 正常 CONSUMED 已核销 EXPIRE 已过期 GIFTING 转赠中 GIFT_TIMEOUT 转赠超时 DELETE 已删除 UNAVAILABLE 已失效 code未被添加或被转赠领取的情况则统一报错：invalid serial code', }),
    __metadata("design:type", String)
], GrouponCard.prototype, "userCardStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'user_card_code', }),
    __metadata("design:type", String)
], GrouponCard.prototype, "userCardCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'old_user_card_code', }),
    (0, swagger_1.ApiProperty)({ description: '为保证安全,微信会在转赠发生后变更该卡券的code号,该字段表示转赠前的code。', }),
    __metadata("design:type", String)
], GrouponCard.prototype, "oldUserCardCode", void 0);
exports.GrouponCard = GrouponCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBvbkNhcmQuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9Hcm91cG9uQ2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFDOUMscUNBQWlDO0FBQ2pDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFDSCxZQUFZO0FBQ1osTUFBYSxXQUFZLFNBQVEscUJBQVM7Q0F3RXpDO0FBaEVDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUscURBQXFELEdBQUUsQ0FBQzs7NkNBQzVEO0FBT3ZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQzs7Z0RBQ3BDO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsR0FBRSxDQUFDO0lBQ2hFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSx5Q0FBeUMsR0FBRSxDQUFDOzttREFDMUM7QUFRN0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsR0FBRSxDQUFDO0lBQzNELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxhQUFhLEdBQUUsQ0FBQzs7K0NBQ2xCO0FBUXpCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsR0FBRSxDQUFDO0lBQ3RFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSw2Q0FBNkMsR0FBRSxDQUFDOzt3REFDekM7QUFRbEM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixHQUFFLENBQUM7SUFDakUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLG9CQUFvQixHQUFFLENBQUM7O21EQUNyQjtBQVE3QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEdBQUUsQ0FBQztJQUNoRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUscUpBQXFKLEdBQUUsQ0FBQzs7bURBQ3RKO0FBTzdCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsR0FBRSxDQUFDOztpREFDcEM7QUFRM0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixHQUFFLENBQUM7SUFDbEUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLDJDQUEyQyxHQUFFLENBQUM7O29EQUMzQztBQXRFaEMsa0NBd0VDIn0=