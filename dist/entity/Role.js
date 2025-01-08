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
exports.Role = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 角色实体类
 * 继承自BaseModel，用于存储角色的相关信息
 */
let Role = class Role extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 菜单树选择项是否关联显示
         * 对应菜单树选择项的显示方式，0表示父子不互相关联显示，1表示父子互相关联显示
         */
        this.menuCheckStrictly = null;
        /**
         * 菜单ID列表
         * 对应角色拥有的菜单ID列表
         */
        this.menuIds = [];
        /**
         * 部门ID列表
         * 对应角色拥有的部门ID列表
         */
        this.deptIds = [];
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'role_key', }),
    (0, swagger_1.ApiProperty)({ description: '角色权限 ', }),
    __metadata("design:type", String)
], Role.prototype, "roleKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'data_scope', }),
    (0, swagger_1.ApiProperty)({ description: '数据范围（1：所有数据权限；2：自定义数据权限；3：本部门数据权限；4：本部门及以下数据权限；5：仅本人数据权限） ', }),
    __metadata("design:type", String)
], Role.prototype, "dataScope", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'menu_check_strictly', }),
    (0, swagger_1.ApiProperty)({ description: '菜单树选择项是否关联显示（ 0：父子不互相关联显示 1：父子互相关联显示） ', }),
    __metadata("design:type", Boolean)
], Role.prototype, "menuCheckStrictly", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'dept_check_strictly', }),
    (0, swagger_1.ApiProperty)({ description: '部门树选择项是否关联显示（0：父子不互相关联显示 1：父子互相关联显示 ） ', }),
    __metadata("design:type", String)
], Role.prototype, "deptCheckStrictly", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, }),
    (0, swagger_1.ApiProperty)({ description: '角色状态（0正常 1停用） ', }),
    __metadata("design:type", String)
], Role.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'del_flag', }),
    (0, swagger_1.ApiProperty)({ description: '删除标志（0代表存在 2代表删除） ', }),
    __metadata("design:type", String)
], Role.prototype, "delFlag", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, }),
    (0, swagger_1.ApiProperty)({ description: '用户是否存在此角色标识 默认不存在 ', }),
    __metadata("design:type", String)
], Role.prototype, "flag", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, }),
    (0, swagger_1.ApiProperty)({ description: '备注', }),
    __metadata("design:type", String)
], Role.prototype, "remark", void 0);
Role = __decorate([
    (0, typeorm_1.Entity)()
], Role);
exports.Role = Role;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L1JvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSyxTQUFRLHFCQUFTO0lBQW5DOztRQWtCRTs7O1dBR0c7UUFHSCxzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUEwQ2xDOzs7V0FHRztRQUNILFlBQU8sR0FBYSxFQUFFLENBQUM7UUFFdkI7OztXQUdHO1FBQ0gsWUFBTyxHQUFhLEVBQUUsQ0FBQztJQUV6QixDQUFDO0NBQUEsQ0FBQTtBQXRFQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7SUFDeEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE9BQU8sR0FBRSxDQUFDOztxQ0FDdEI7QUFRZjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxHQUFFLENBQUM7SUFDMUQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLDREQUE0RCxHQUFFLENBQUM7O3VDQUN6RTtBQVFqQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEdBQUUsQ0FBQztJQUNuRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsd0NBQXdDLEdBQUUsQ0FBQzs7K0NBQ3BDO0FBUWxDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxxQkFBcUIsR0FBRSxDQUFDO0lBQ25FLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSx3Q0FBd0MsR0FBRSxDQUFDOzsrQ0FDN0M7QUFRekI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxHQUFFLENBQUM7SUFDekIsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLGdCQUFnQixHQUFFLENBQUM7O29DQUNoQztBQVFkO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQztJQUN4RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsb0JBQW9CLEdBQUUsQ0FBQzs7cUNBQ25DO0FBUWY7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxHQUFFLENBQUM7SUFDekIsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLG9CQUFvQixHQUFFLENBQUM7O2tDQUN0QztBQVFaO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksR0FBRSxDQUFDO0lBQ3pCLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEdBQUUsQ0FBQzs7b0NBQ3BCO0FBaEVILElBQUk7SUFEaEIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksSUFBSSxDQThFaEI7QUE5RVksb0JBQUkifQ==