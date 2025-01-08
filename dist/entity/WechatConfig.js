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
exports.wechatConfig = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 微信配置实体类
 * 继承自BaseModel，包含微信相关的各种配置信息
 */
let wechatConfig = class wechatConfig extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'wechat_redirect_url', }),
    (0, swagger_1.ApiProperty)({ description: '网页授权回调地址', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "wechatRedirectUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'wechat_token', }),
    (0, swagger_1.ApiProperty)({ description: '第一次在微信控制台保存开发者配置信息时使用', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "wechatToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'app_id', }),
    (0, swagger_1.ApiProperty)({ description: '', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "appId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'app_secret', }),
    (0, swagger_1.ApiProperty)({ description: '', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "appSecret", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'merchant_id', }),
    (0, swagger_1.ApiProperty)({ description: '商户ID', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "merchantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'payment_key', }),
    (0, swagger_1.ApiProperty)({ description: '', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "paymentKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'payment_certificate_pfx', }),
    (0, swagger_1.ApiProperty)({ description: 'pfx 证书', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "paymentCertificatePfx", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'payment_notify_url', }),
    (0, swagger_1.ApiProperty)({ description: '默认微信支付通知地址', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "paymentNotifyUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'mini_program_app_id', }),
    (0, swagger_1.ApiProperty)({ description: '小程序配置', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "miniProgramAppId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'mini_program_app_secret', }),
    (0, swagger_1.ApiProperty)({ description: '小程序配置', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "miniProgramAppSecret", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    (0, swagger_1.ApiProperty)({ description: '', }),
    __metadata("design:type", String)
], wechatConfig.prototype, "shopId", void 0);
wechatConfig = __decorate([
    (0, typeorm_1.Entity)()
], wechatConfig);
exports.wechatConfig = wechatConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2VjaGF0Q29uZmlnLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvV2VjaGF0Q29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFnRDtBQUNoRCxxQ0FBeUM7QUFDekMsZ0VBQThEO0FBRTlEOzs7R0FHRztBQUVILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxxQkFBUztDQXdGMUMsQ0FBQTtBQWpGQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEdBQUcsQ0FBQztJQUNyRSxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsVUFBVSxHQUFHLENBQUM7O3VEQUNUO0FBUWpDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUcsQ0FBQztJQUM5RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEdBQUcsQ0FBQzs7aURBQzVCO0FBUTNCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUcsQ0FBQztJQUN4RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxHQUFHLENBQUM7OzJDQUNiO0FBUXJCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEdBQUcsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxHQUFHLENBQUM7OytDQUNUO0FBUXpCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUcsQ0FBQztJQUM3RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxHQUFHLENBQUM7O2dEQUNaO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUcsQ0FBQztJQUM3RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxHQUFHLENBQUM7O2dEQUNSO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSx5QkFBeUIsR0FBRyxDQUFDO0lBQ3pFLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxRQUFRLEdBQUcsQ0FBQzs7MkRBQ0g7QUFRckM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixHQUFHLENBQUM7SUFDcEUsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLFlBQVksR0FBRyxDQUFDOztzREFDWjtBQVFoQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEdBQUcsQ0FBQztJQUNyRSxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsT0FBTyxHQUFHLENBQUM7O3NEQUNQO0FBUWhDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSx5QkFBeUIsR0FBRyxDQUFDO0lBQ3pFLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLEdBQUcsQ0FBQzs7MERBQ0g7QUFRcEM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRyxDQUFDO0lBQ3pELElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEdBQUcsQ0FBQzs7NENBQ1o7QUF2RlgsWUFBWTtJQUR4QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxZQUFZLENBd0Z4QjtBQXhGWSxvQ0FBWSJ9