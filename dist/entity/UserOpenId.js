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
exports.UserOpenId = void 0;
// 导入typeorm库中的Column和Entity装饰器，用于定义数据库实体和字段
const typeorm_1 = require("typeorm");
// 导入BaseModel类，该类定义了实体的通用属性和方法
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 用户OpenID实体类
 * 继承自BaseModel，包含用户OpenID相关的各种信息
 */
let UserOpenId = class UserOpenId extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'app_id', }),
    __metadata("design:type", String)
], UserOpenId.prototype, "appId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'open_id', }),
    __metadata("design:type", String)
], UserOpenId.prototype, "openId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'user_role', }),
    __metadata("design:type", String)
], UserOpenId.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'namespace', }),
    __metadata("design:type", String)
], UserOpenId.prototype, "namespace", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'user_id', }),
    __metadata("design:type", String)
], UserOpenId.prototype, "userId", void 0);
UserOpenId = __decorate([
    (0, typeorm_1.Entity)()
], UserOpenId);
exports.UserOpenId = UserOpenId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlck9wZW5JZC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L1VzZXJPcGVuSWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLHFDQUF1QztBQUN2QywrQkFBK0I7QUFDL0IsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxxQkFBUztDQW9DeEMsQ0FBQTtBQTlCQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUM7O3lDQUNuQztBQU9wQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFFLENBQUM7OzBDQUNuQztBQU9yQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFLENBQUM7OzRDQUNuQztBQU92QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFLENBQUM7OzZDQUNsQztBQU94QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFFLENBQUM7OzBDQUNuQztBQWxDVixVQUFVO0lBRHRCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLFVBQVUsQ0FvQ3RCO0FBcENZLGdDQUFVIn0=