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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 类别实体类
 *
 * 该类用于定义系统中的类别信息，包括类别的标题。
 * 所有标识符名称均来自淘宝开放平台。
 */
let Category = class Category extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '标题', }),
    __metadata("design:type", String)
], Category.prototype, "title", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9DYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7OztHQUtHO0FBRUgsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLHFCQUFTO0NBVXRDLENBQUE7QUFGQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksR0FBRSxDQUFDOzt1Q0FDckI7QUFSVCxRQUFRO0lBRHBCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLFFBQVEsQ0FVcEI7QUFWWSw0QkFBUSJ9