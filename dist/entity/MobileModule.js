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
exports.MobileModule = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
const swagger_1 = require("@midwayjs/swagger");
/**
 * 移动端模块实体类
 * 用于表示移动端模块的基本信息
 */
let MobileModule = class MobileModule extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', }),
    (0, swagger_1.ApiProperty)({ description: '模块路径', }),
    __metadata("design:type", String)
], MobileModule.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'form_id', }),
    (0, swagger_1.ApiProperty)({ description: '表单ID', }),
    __metadata("design:type", String)
], MobileModule.prototype, "formId", void 0);
MobileModule = __decorate([
    (0, typeorm_1.Entity)()
], MobileModule);
exports.MobileModule = MobileModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9iaWxlTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvTW9iaWxlTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFDNUQsK0NBQWdEO0FBRWhEOzs7R0FHRztBQUVILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxxQkFBUztDQWtCMUMsQ0FBQTtBQVZDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFFLENBQUM7SUFDdEMsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzswQ0FDakI7QUFRbkI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQ3ZELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7NENBQ2Y7QUFoQlYsWUFBWTtJQUR4QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxZQUFZLENBa0J4QjtBQWxCWSxvQ0FBWSJ9