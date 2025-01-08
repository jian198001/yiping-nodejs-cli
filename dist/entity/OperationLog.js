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
exports.OperationLog = void 0;
// 导入依赖项
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 操作日志实体类
 * 用于记录系统中的操作日志
 */
let OperationLog = class OperationLog extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '操作者' }),
    __metadata("design:type", String)
], OperationLog.prototype, "sub", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '目标对象' }),
    __metadata("design:type", String)
], OperationLog.prototype, "obj", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '动作' }),
    __metadata("design:type", String)
], OperationLog.prototype, "act", void 0);
OperationLog = __decorate([
    (0, typeorm_1.Entity)()
], OperationLog);
exports.OperationLog = OperationLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlcmF0aW9uTG9nLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvT3BlcmF0aW9uTG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDUixxQ0FBeUM7QUFDekMsZ0VBQTZEO0FBRTdEOzs7R0FHRztBQUVILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxxQkFBUztDQXFCMUMsQ0FBQTtBQWZDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O3lDQUN4QjtBQU9uQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzt5Q0FDekI7QUFPbkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7eUNBQ3ZCO0FBcEJSLFlBQVk7SUFEeEIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksWUFBWSxDQXFCeEI7QUFyQlksb0NBQVkifQ==