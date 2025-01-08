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
exports.Address = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 地址实体类
 * 继承自BaseModel，包含商家地址相关的各种信息
 */
let Address = class Address extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'send_addr', }),
    (0, swagger_1.ApiProperty)({ description: '是否为发货地址(1是0否),标识符名称来自微信小商店', }),
    __metadata("design:type", String)
], Address.prototype, "sendAddr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'default_send', }),
    (0, swagger_1.ApiProperty)({ description: '是否为默认发货地址(1是0否),标识符名称来自微信小商店', }),
    __metadata("design:type", String)
], Address.prototype, "defaultSend", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'recv_addr', }),
    (0, swagger_1.ApiProperty)({ description: '是否为收货地址(1是0否),标识符名称来自微信小商店', }),
    __metadata("design:type", String)
], Address.prototype, "recvAddr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'default_recv', }),
    (0, swagger_1.ApiProperty)({ description: '是否为默认收货地址(1是0否),标识符名称来自微信小商店', }),
    __metadata("design:type", String)
], Address.prototype, "defaultRecv", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'same_city', }),
    (0, swagger_1.ApiProperty)({ description: '是否为同城配送地址(1是0否),标识符名称来自微信小商店', }),
    __metadata("design:type", String)
], Address.prototype, "sameCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'pickup', }),
    (0, swagger_1.ApiProperty)({ description: '是否为线下自提地址(1是0否),标识符名称来自微信小商店', }),
    __metadata("design:type", String)
], Address.prototype, "pickup", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'lat', }),
    (0, swagger_1.ApiProperty)({ description: '经度,标识符名称来自微信小商店', }),
    __metadata("design:type", String)
], Address.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'lng', }),
    (0, swagger_1.ApiProperty)({ description: '纬度,标识符名称来自微信小商店', }),
    __metadata("design:type", String)
], Address.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'area_code', }),
    (0, swagger_1.ApiProperty)({ description: '地区编码', }),
    __metadata("design:type", String)
], Address.prototype, "areaCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'phone_num', }),
    __metadata("design:type", String)
], Address.prototype, "phoneNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    __metadata("design:type", String)
], Address.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'true_name', }),
    __metadata("design:type", String)
], Address.prototype, "trueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'city', }),
    (0, swagger_1.ApiProperty)({ description: '城市', }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'region', }),
    (0, swagger_1.ApiProperty)({ description: '区', }),
    __metadata("design:type", String)
], Address.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'province', }),
    (0, swagger_1.ApiProperty)({ description: '省份/直辖市', }),
    __metadata("design:type", String)
], Address.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'post_code', }),
    (0, swagger_1.ApiProperty)({ description: '邮政编码', }),
    __metadata("design:type", String)
], Address.prototype, "postCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'default_status', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '是否为默认', }),
    __metadata("design:type", Number)
], Address.prototype, "defaultStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'detail_address', }),
    (0, swagger_1.ApiProperty)({ description: '详细地址(街道)', }),
    __metadata("design:type", String)
], Address.prototype, "detailAddress", void 0);
Address = __decorate([
    (0, typeorm_1.Entity)()
], Address);
exports.Address = Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0FkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBUSxTQUFRLHFCQUFTO0NBb0lyQyxDQUFBO0FBNUhDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsNEJBQTRCLEdBQUUsQ0FBQzs7eUNBQ25DO0FBUXZCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUUsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsOEJBQThCLEdBQUUsQ0FBQzs7NENBQ2xDO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsNEJBQTRCLEdBQUUsQ0FBQzs7eUNBQ25DO0FBUXZCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUUsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsOEJBQThCLEdBQUUsQ0FBQzs7NENBQ2xDO0FB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