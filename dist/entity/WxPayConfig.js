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
exports.WxPayConfig = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 微信支付配置实体类
 * 继承自BaseModel，包含微信支付所需的各种配置信息
 */
let WxPayConfig = class WxPayConfig extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '店铺ID', name: 'shop_id' }),
    __metadata("design:type", String)
], WxPayConfig.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '应用ID', name: 'app_id' }),
    __metadata("design:type", String)
], WxPayConfig.prototype, "appId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '应用密钥', name: 'app_secret' }),
    __metadata("design:type", String)
], WxPayConfig.prototype, "appSecret", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '商户号', name: 'mch_id' }),
    __metadata("design:type", String)
], WxPayConfig.prototype, "mchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '商户密钥', name: 'mch_key' }),
    __metadata("design:type", String)
], WxPayConfig.prototype, "mchKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '证书路径', name: 'key_path' }),
    __metadata("design:type", String)
], WxPayConfig.prototype, "keyPath", void 0);
WxPayConfig = __decorate([
    (0, typeorm_1.Entity)()
], WxPayConfig);
exports.WxPayConfig = WxPayConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3hQYXlDb25maWcuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9XeFBheUNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBeUM7QUFDekMsZ0VBQTZEO0FBRTdEOzs7R0FHRztBQUVILElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxxQkFBUztDQTBDekMsQ0FBQTtBQXBDQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7OzJDQUN2QztBQU90QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7OzBDQUN2QztBQU9yQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7OzhDQUN2QztBQU96QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7OzBDQUN0QztBQU9yQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7OzJDQUN2QztBQU90QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7OzRDQUN2QztBQXpDWixXQUFXO0lBRHZCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLFdBQVcsQ0EwQ3ZCO0FBMUNZLGtDQUFXIn0=