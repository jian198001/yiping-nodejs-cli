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
exports.SysParams = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 系统参数实体类
 * 继承自BaseModel，用于存储系统参数的信息
 */
let SysParams = class SysParams extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'label', }),
    __metadata("design:type", String)
], SysParams.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'input_type', }),
    (0, swagger_1.ApiProperty)({ description: 'text:字符串,number:浮点数,int:整数', }),
    __metadata("design:type", String)
], SysParams.prototype, "inputType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'value', }),
    __metadata("design:type", String)
], SysParams.prototype, "value", void 0);
SysParams = __decorate([
    (0, typeorm_1.Entity)()
], SysParams);
exports.SysParams = SysParams;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzUGFyYW1zLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvU3lzUGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVUsU0FBUSxxQkFBUztDQXdCdkMsQ0FBQTtBQWpCQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFFLENBQUM7O3dDQUNsQztBQVFwQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxHQUFFLENBQUM7SUFDMUQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLDRCQUE0QixHQUFFLENBQUM7OzRDQUNsQztBQU94QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFFLENBQUM7O3dDQUNsQztBQXRCVCxTQUFTO0lBRHJCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLFNBQVMsQ0F3QnJCO0FBeEJZLDhCQUFTIn0=