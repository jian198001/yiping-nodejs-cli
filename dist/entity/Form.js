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
exports.Form = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 表单实体类，继承自 BaseModel
 */
let Form = class Form extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '表单标题' }),
    __metadata("design:type", String)
], Form.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '表单代码' }),
    __metadata("design:type", String)
], Form.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '表单内容', type: 'text' }),
    __metadata("design:type", String)
], Form.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '表单选项', type: 'text' }),
    __metadata("design:type", String)
], Form.prototype, "option", void 0);
Form = __decorate([
    (0, typeorm_1.Entity)()
], Form);
exports.Form = Form;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXlDO0FBQ3pDLGdFQUE2RDtBQUU3RDs7R0FFRztBQUVILElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUssU0FBUSxxQkFBUztDQXdCbEMsQ0FBQTtBQW5CQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzttQ0FDdkI7QUFNckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7a0NBQ3hCO0FBTXBCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7cUNBQ25DO0FBTXZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7b0NBQ3BDO0FBdkJYLElBQUk7SUFEaEIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksSUFBSSxDQXdCaEI7QUF4Qlksb0JBQUkifQ==