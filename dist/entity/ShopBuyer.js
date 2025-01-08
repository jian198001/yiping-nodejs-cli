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
exports.ShopBuyer = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 店铺买家实体类
 * 继承自BaseModel，包含店铺买家相关的各种信息
 */
let ShopBuyer = class ShopBuyer extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 卖家来控制买家自己是否可以修改自己的相关信息
         * 卖家控制买家是否可以修改自己的相关信息，默认为'0'
         */
        this.readonly = '0';
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'balance', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '余额', }),
    __metadata("design:type", Number)
], ShopBuyer.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bonus', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '积分', }),
    __metadata("design:type", Number)
], ShopBuyer.prototype, "bonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'freeze_amount_free', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '保证金-解冻', }),
    __metadata("design:type", Number)
], ShopBuyer.prototype, "freezeAmountFree", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'code', }),
    (0, swagger_1.ApiProperty)({ description: '会员卡号', }),
    __metadata("design:type", String)
], ShopBuyer.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    __metadata("design:type", String)
], ShopBuyer.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_id', }),
    __metadata("design:type", String)
], ShopBuyer.prototype, "buyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'freeze_amount_freezing', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '保证金-已冻结', }),
    __metadata("design:type", Number)
], ShopBuyer.prototype, "freezeAmountFreezing", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'scene', }),
    (0, swagger_1.ApiProperty)({ description: '场景', }),
    __metadata("design:type", String)
], ShopBuyer.prototype, "scene", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'readonly', }),
    (0, swagger_1.ApiProperty)({ description: '卖家来控制买家自己是否可以修改自己的相关信息', }),
    __metadata("design:type", String)
], ShopBuyer.prototype, "readonly", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'user_role', }),
    __metadata("design:type", String)
], ShopBuyer.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '小程序分销转介绍场景二维码', type: 'text', }),
    __metadata("design:type", String)
], ShopBuyer.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'parent_id', }),
    (0, swagger_1.ApiProperty)({ description: '转介绍人id', }),
    __metadata("design:type", String)
], ShopBuyer.prototype, "parentId", void 0);
ShopBuyer = __decorate([
    (0, typeorm_1.Entity)()
], ShopBuyer);
exports.ShopBuyer = ShopBuyer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hvcEJ1eWVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvU2hvcEJ1eWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVUsU0FBUSxxQkFBUztJQUF4Qzs7UUFnRUU7OztXQUdHO1FBR0ksYUFBUSxHQUFXLEdBQUcsQ0FBQztJQXdCaEMsQ0FBQztDQUFBLENBQUE7QUF0RkM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUM7SUFDdkUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksR0FBRSxDQUFDOzswQ0FDWjtBQVF0QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUUsQ0FBQztJQUN0RSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O3dDQUNkO0FBUXBCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUM7SUFDbEYsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLFFBQVEsR0FBRSxDQUFDOzttREFDUDtBQVEvQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFFLENBQUM7SUFDcEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzt1Q0FDakI7QUFPbkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDOzt5Q0FDbkM7QUFPckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDOzswQ0FDbkM7QUFRdEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQztJQUN0RixJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsU0FBUyxHQUFFLENBQUM7O3VEQUNKO0FBUW5DO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUUsQ0FBQztJQUNyRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O3dDQUNkO0FBUXBCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQztJQUN4RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsd0JBQXdCLEdBQUUsQ0FBQzs7MkNBQ3hCO0FBTzlCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQzs7MkNBQ25DO0FBT3ZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQzs7c0NBQ2pEO0FBUWxCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsUUFBUSxHQUFFLENBQUM7OzJDQUNmO0FBNUZaLFNBQVM7SUFEckIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksU0FBUyxDQThGckI7QUE5RlksOEJBQVMifQ==