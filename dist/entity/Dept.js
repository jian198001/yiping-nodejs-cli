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
exports.Dept = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 部门实体类
 *
 * 该类用于定义部门的基本信息，包括父部门ID、组织ID和部门代码。
 * 所有标识符名称均来自支付宝。
 */
let Dept = class Dept extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'parent_id' }),
    __metadata("design:type", String)
], Dept.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'org_id' }),
    __metadata("design:type", String)
], Dept.prototype, "orgId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '' }),
    __metadata("design:type", String)
], Dept.prototype, "code", void 0);
Dept = __decorate([
    (0, typeorm_1.Entity)()
], Dept);
exports.Dept = Dept;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVwdC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0RlcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXlDO0FBQ3pDLGdFQUE2RDtBQUU3RDs7Ozs7R0FLRztBQUVILElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUssU0FBUSxxQkFBUztDQTBCbEMsQ0FBQTtBQWxCQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7O3NDQUNuQztBQVF4QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7O21DQUNuQztBQVFyQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOztrQ0FDcEI7QUF4QlQsSUFBSTtJQURoQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxJQUFJLENBMEJoQjtBQTFCWSxvQkFBSSJ9