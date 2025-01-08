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
exports.Staff = void 0;
const typeorm_1 = require("typeorm");
const Human_1 = require("../module/common/model/Human");
/**
 * 员工实体类
 * 继承自Human类，包含员工的基本信息和联系方式
 */
let Staff = class Staff extends Human_1.Human {
};
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '手机号码。企业内必须唯一,mobile/email二者不能同时为空',
    }),
    __metadata("design:type", String)
], Staff.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '邮箱。长度6~64个字节,且为有效的email格式。企业内必须唯一,mobile/email二者不能同时为空',
    }),
    __metadata("design:type", String)
], Staff.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '头像url。 第三方仅通讯录应用可获取；对于非第三方创建的成员,第三方通讯录应用也不可获取',
    }),
    __metadata("design:type", String)
], Staff.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '头像缩略图url。第三方仅通讯录应用可获取；对于非第三方创建的成员,第三方通讯录应用也不可获取',
        name: 'thumb_avatar',
    }),
    __metadata("design:type", String)
], Staff.prototype, "thumbAvatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '地址。长度最大128个字符' }),
    __metadata("design:type", String)
], Staff.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '成员别名。长度1~32个utf8字符' }),
    __metadata("design:type", String)
], Staff.prototype, "alias", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'english_name' }),
    __metadata("design:type", String)
], Staff.prototype, "englishName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '座机。32字节以内,由纯数字或’-‘号组成' }),
    __metadata("design:type", String)
], Staff.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '员工个人二维码,扫描可添加为外部联系人(注意返回的是一个url,可在浏览器上打开该url以展示二维码)；第三方仅通讯录应用可获取；对于非第三方创建的成员,第三方通讯录应用也不可获取',
        name: 'qr_code',
    }),
    __metadata("design:type", String)
], Staff.prototype, "qrCode", void 0);
Staff = __decorate([
    (0, typeorm_1.Entity)()
], Staff);
exports.Staff = Staff;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhZmYuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9TdGFmZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBeUM7QUFDekMsd0RBQXFEO0FBRXJEOzs7R0FHRztBQUVILElBQWEsS0FBSyxHQUFsQixNQUFhLEtBQU0sU0FBUSxhQUFLO0NBc0YvQixDQUFBO0FBNUVDO0lBSkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsbUNBQW1DO0tBQzdDLENBQUM7O3FDQUNvQjtBQVd0QjtJQUxDLElBQUEsZ0JBQU0sRUFBQztRQUNOLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUNMLHdEQUF3RDtLQUMzRCxDQUFDOztvQ0FDbUI7QUFXckI7SUFMQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFDTCwrQ0FBK0M7S0FDbEQsQ0FBQzs7cUNBQ29CO0FBWXRCO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQ0wsaURBQWlEO1FBQ25ELElBQUksRUFBRSxjQUFjO0tBQ3JCLENBQUM7OzBDQUN5QjtBQU8zQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDOztzQ0FDOUI7QUFPdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDOztvQ0FDckM7QUFPckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDOzswQ0FDbkM7QUFPM0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDOzt3Q0FDcEM7QUFZekI7SUFOQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFDTCw0RkFBNEY7UUFDOUYsSUFBSSxFQUFFLFNBQVM7S0FDaEIsQ0FBQzs7cUNBQ29CO0FBcEZYLEtBQUs7SUFEakIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksS0FBSyxDQXNGakI7QUF0Rlksc0JBQUsifQ==