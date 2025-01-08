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
exports.FormSubmit = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 表单提交实体类，继承自 BaseModel
 */
let FormSubmit = class FormSubmit extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '表单id', name: 'form_id' }),
    __metadata("design:type", String)
], FormSubmit.prototype, "formId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '表单代码' }),
    __metadata("design:type", String)
], FormSubmit.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '表单内容', type: 'text' }),
    __metadata("design:type", String)
], FormSubmit.prototype, "content", void 0);
FormSubmit = __decorate([
    (0, typeorm_1.Entity)()
], FormSubmit);
exports.FormSubmit = FormSubmit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybVN1Ym1pdC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0Zvcm1TdWJtaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXlDO0FBQ3pDLGdFQUE2RDtBQUU3RDs7R0FFRztBQUVILElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxxQkFBUztDQWtCeEMsQ0FBQTtBQWJDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7MENBQ3ZDO0FBTXRCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O3dDQUN4QjtBQU1wQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7OzJDQUNuQztBQWpCWixVQUFVO0lBRHRCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLFVBQVUsQ0FrQnRCO0FBbEJZLGdDQUFVIn0=