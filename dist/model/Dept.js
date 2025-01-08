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
var Dept_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dept = void 0;
// 导入依赖项
const typegoose_1 = require("@typegoose/typegoose");
const typeorm_1 = require("typeorm");
/**
 * 部门实体类
 * 用于表示部门的基本信息
 */
let Dept = Dept_1 = class Dept {
    constructor() {
        /**
         * 部门名称
         * 部门的名称
         */
        this.name = '';
        /**
         * 子部门列表
         * 部门的子部门列表
         */
        this.children = [];
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", Object)
], Dept.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Dept.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Dept.prototype, "level", void 0);
__decorate([
    (0, typegoose_1.Prop)(type => Dept_1),
    __metadata("design:type", Array)
], Dept.prototype, "children", void 0);
Dept = Dept_1 = __decorate([
    (0, typeorm_1.Entity)('dept')
], Dept);
exports.Dept = Dept;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVwdC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kZWwvRGVwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSLG9EQUFrRDtBQUVsRCxxQ0FBaUQ7QUFFakQ7OztHQUdHO0FBRUgsSUFBYSxJQUFJLFlBQWpCLE1BQWEsSUFBSTtJQUFqQjtRQVFFOzs7V0FHRztRQUVJLFNBQUksR0FBWSxFQUFFLENBQUM7UUFTMUI7OztXQUdHO1FBRUksYUFBUSxHQUFZLEVBQUUsQ0FBQztJQUVoQyxDQUFDO0NBQUEsQ0FBQTtBQXZCQztJQURDLElBQUEsd0JBQWMsR0FBRTs7Z0NBQ0c7QUFPcEI7SUFEQyxJQUFBLGdCQUFJLEdBQUU7O2tDQUNtQjtBQU8xQjtJQURDLElBQUEsZ0JBQUksR0FBRTs7bUNBQ2U7QUFPdEI7SUFEQyxJQUFBLGdCQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFJLENBQUM7O3NDQUNXO0FBM0JuQixJQUFJO0lBRGhCLElBQUEsZ0JBQU0sRUFBQyxNQUFNLENBQUM7R0FDRixJQUFJLENBNkJoQjtBQTdCWSxvQkFBSSJ9