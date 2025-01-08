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
exports.AlipayConfig = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 支付宝配置实体类
 * 继承自BaseModel，包含支付宝支付所需的各种配置信息
 */
let AlipayConfig = class AlipayConfig extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'protocol', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "protocol", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'gateway_host', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "gatewayHost", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'app_id', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "appId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sign_type', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "signType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'alipay_public_key', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "alipayPublicKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'merchant_private_key', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "merchantPrivateKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'merchant_cert_path', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "merchantCertPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'alipay_cert_path', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "alipayCertPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'alipay_root_cert_path', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "alipayRootCertPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'notify_url', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "notifyUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'encrypt_key', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "encryptKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sign_provider', }),
    __metadata("design:type", String)
], AlipayConfig.prototype, "signProvider", void 0);
AlipayConfig = __decorate([
    (0, typeorm_1.Entity)()
], AlipayConfig);
exports.AlipayConfig = AlipayConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxpcGF5Q29uZmlnLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvQWxpcGF5Q29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLHFCQUFTO0NBNkYxQyxDQUFBO0FBdEZDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUUsQ0FBQzs7NENBQ25DO0FBT3JCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQzs7OENBQ2xDO0FBT3ZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUUsQ0FBQzs7aURBQ25DO0FBTzFCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQzs7MkNBQ25DO0FBT3BCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQzs7OENBQ25DO0FBT3ZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxtQkFBbUIsR0FBRSxDQUFDOztxREFDcEM7QUFPOUI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixHQUFFLENBQUM7O3dEQUNwQztBQU9qQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEdBQUUsQ0FBQzs7c0RBQ3BDO0FBTy9CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsR0FBRSxDQUFDOztvREFDcEM7QUFPN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixHQUFFLENBQUM7O3dEQUNyQztBQU9qQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxHQUFFLENBQUM7OytDQUNuQztBQU94QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxHQUFFLENBQUM7O2dEQUNuQztBQU96QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFFLENBQUM7O2tEQUNuQztBQTNGaEIsWUFBWTtJQUR4QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxZQUFZLENBNkZ4QjtBQTdGWSxvQ0FBWSJ9