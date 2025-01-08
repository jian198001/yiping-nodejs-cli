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
exports.SellerBuyMallMemberCard = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 卖家购买商城会员卡实体类
 * 继承自BaseModel，包含卖家购买商城会员卡相关的各种信息
 */
let SellerBuyMallMemberCard = class SellerBuyMallMemberCard extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'member_card_id', }),
    __metadata("design:type", String)
], SellerBuyMallMemberCard.prototype, "memberCardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'seller_id', }),
    __metadata("design:type", String)
], SellerBuyMallMemberCard.prototype, "sellerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    __metadata("design:type", String)
], SellerBuyMallMemberCard.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'order_id', }),
    __metadata("design:type", String)
], SellerBuyMallMemberCard.prototype, "orderId", void 0);
SellerBuyMallMemberCard = __decorate([
    (0, typeorm_1.Entity)()
], SellerBuyMallMemberCard);
exports.SellerBuyMallMemberCard = SellerBuyMallMemberCard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsbGVyQnV5TWFsbE1lbWJlckNhcmQuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9TZWxsZXJCdXlNYWxsTWVtYmVyQ2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEscUJBQVM7Q0E4QnJELENBQUE7QUF2QkM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixHQUFFLENBQUM7OzZEQUNwQztBQU8zQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFLENBQUM7O3lEQUNuQztBQU92QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFFLENBQUM7O3VEQUNuQztBQU9yQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7O3dEQUNuQztBQTVCWCx1QkFBdUI7SUFEbkMsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksdUJBQXVCLENBOEJuQztBQTlCWSwwREFBdUIifQ==