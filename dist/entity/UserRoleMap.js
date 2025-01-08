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
exports.UserRoleMap = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 用户角色映射实体类
 * 继承自BaseModel，包含用户与角色之间的映射关系
 */
let UserRoleMap = class UserRoleMap extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'role_id', }),
    (0, swagger_1.ApiProperty)({ description: '角色ID ', }),
    __metadata("design:type", String)
], UserRoleMap.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'user_id', }),
    (0, swagger_1.ApiProperty)({ description: '用户ID ', }),
    __metadata("design:type", String)
], UserRoleMap.prototype, "userId", void 0);
UserRoleMap = __decorate([
    (0, typeorm_1.Entity)()
], UserRoleMap);
exports.UserRoleMap = UserRoleMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJvbGVNYXAuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9Vc2VyUm9sZU1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQscUNBQXlDO0FBQ3pDLGdFQUE4RDtBQUU5RDs7O0dBR0c7QUFFSCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEscUJBQVM7Q0FpQnpDLENBQUE7QUFUQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFHLENBQUM7SUFDekQsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sR0FBRyxDQUFDOzsyQ0FDeEI7QUFRZjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFHLENBQUM7SUFDekQsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sR0FBRyxDQUFDOzsyQ0FDeEI7QUFoQkosV0FBVztJQUR2QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxXQUFXLENBaUJ2QjtBQWpCWSxrQ0FBVyJ9