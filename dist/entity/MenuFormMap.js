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
exports.MenuFormMap = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 菜单表单映射实体类
 * 用于表示菜单与表单之间的映射关系
 */
let MenuFormMap = class MenuFormMap extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'menu_id', }),
    (0, swagger_1.ApiProperty)({ description: '菜单ID ', }),
    __metadata("design:type", String)
], MenuFormMap.prototype, "menuId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'form_id', }),
    (0, swagger_1.ApiProperty)({ description: '表单ID ', }),
    __metadata("design:type", String)
], MenuFormMap.prototype, "formId", void 0);
MenuFormMap = __decorate([
    (0, typeorm_1.Entity)()
], MenuFormMap);
exports.MenuFormMap = MenuFormMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudUZvcm1NYXAuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9NZW51Rm9ybU1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFDOUMscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEscUJBQVM7Q0FrQnpDLENBQUE7QUFWQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFFLENBQUM7SUFDdkQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE9BQU8sR0FBRSxDQUFDOzsyQ0FDdkI7QUFRZDtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFFLENBQUM7SUFDdkQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE9BQU8sR0FBRSxDQUFDOzsyQ0FDdkI7QUFoQkgsV0FBVztJQUR2QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxXQUFXLENBa0J2QjtBQWxCWSxrQ0FBVyJ9