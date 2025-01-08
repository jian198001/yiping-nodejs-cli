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
var Menu_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
// 导入依赖项
const swagger_1 = require("@midwayjs/swagger");
const typegoose_1 = require("@typegoose/typegoose");
const typeorm_1 = require("typeorm");
/**
 * 菜单实体类
 * 用于表示菜单的基本信息
 */
let Menu = Menu_1 = class Menu {
    constructor() {
        /**
         * 父菜单ID
         * 菜单的父菜单ID
         */
        this.pid = '';
        /**
         * 菜单名称
         * 菜单的名称
         */
        this.name = '';
        /**
         * 菜单代码
         * 菜单的代码
         */
        this.code = '';
        /**
         * 菜单类型
         * 菜单的类型（1目录 2菜单 3按钮）
         */
        this.type = '';
        /**
         * 子菜单列表
         * 菜单的子菜单列表
         */
        this.children = [];
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", Object)
], Menu.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Menu.prototype, "pid", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Menu.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Menu.prototype, "code", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '类型（1目录 2菜单 3按钮） ' }),
    __metadata("design:type", String)
], Menu.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '' }),
    __metadata("design:type", String)
], Menu.prototype, "key", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '' }),
    __metadata("design:type", String)
], Menu.prototype, "url", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '' }),
    __metadata("design:type", String)
], Menu.prototype, "path", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '父菜单ID ' }),
    __metadata("design:type", String)
], Menu.prototype, "parentId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '组件路径 ' }),
    __metadata("design:type", String)
], Menu.prototype, "component", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '组件路径 ' }),
    __metadata("design:type", String)
], Menu.prototype, "componentName", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '路由参数 ' }),
    __metadata("design:type", String)
], Menu.prototype, "query", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '是否为外链（0是 1否） ' }),
    __metadata("design:type", String)
], Menu.prototype, "isFrame", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({
        description: '选择缓存时，则会被 `keep-alive` 缓存，必须填写「组件名称」字段',
    }),
    __metadata("design:type", String)
], Menu.prototype, "keepAlive", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({
        description: '选择隐藏时，路由将不会出现在侧边栏，但仍然可以访问',
    }),
    __metadata("design:type", String)
], Menu.prototype, "visible", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({
        description: '选择不是时，当该菜单只有一个子菜单时，不展示自己，直接展示子菜单',
    }),
    __metadata("design:type", String)
], Menu.prototype, "alwaysShow", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '菜单状态（0显示 1隐藏） ' }),
    __metadata("design:type", String)
], Menu.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '权限字符串 ' }),
    __metadata("design:type", String)
], Menu.prototype, "perms", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '菜单图标 ' }),
    __metadata("design:type", String)
], Menu.prototype, "icon", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: ' ' }),
    __metadata("design:type", String)
], Menu.prototype, "createBy", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: ' ' }),
    __metadata("design:type", String)
], Menu.prototype, "updateBy", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: ' ' }),
    __metadata("design:type", String)
], Menu.prototype, "remark", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: ' ' }),
    __metadata("design:type", Number)
], Menu.prototype, "level", void 0);
__decorate([
    (0, typegoose_1.Prop)(type => Menu_1),
    __metadata("design:type", Array)
], Menu.prototype, "children", void 0);
Menu = Menu_1 = __decorate([
    (0, typeorm_1.Entity)('Menu')
], Menu);
exports.Menu = Menu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kZWwvTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSLCtDQUFnRDtBQUNoRCxvREFBa0Q7QUFFbEQscUNBQWlEO0FBRWpEOzs7R0FHRztBQUVILElBQWEsSUFBSSxZQUFqQixNQUFhLElBQUk7SUFBakI7UUFRRTs7O1dBR0c7UUFFSSxRQUFHLEdBQVksRUFBRSxDQUFDO1FBRXpCOzs7V0FHRztRQUVJLFNBQUksR0FBWSxFQUFFLENBQUM7UUFFMUI7OztXQUdHO1FBRUksU0FBSSxHQUFZLEVBQUUsQ0FBQztRQUUxQjs7O1dBR0c7UUFHSSxTQUFJLEdBQVksRUFBRSxDQUFDO1FBMEoxQjs7O1dBR0c7UUFFSSxhQUFRLEdBQVksRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FBQSxDQUFBO0FBN0xDO0lBREMsSUFBQSx3QkFBYyxHQUFFOztnQ0FDRztBQU9wQjtJQURDLElBQUEsZ0JBQUksR0FBRTs7aUNBQ2tCO0FBT3pCO0lBREMsSUFBQSxnQkFBSSxHQUFFOztrQ0FDbUI7QUFPMUI7SUFEQyxJQUFBLGdCQUFJLEdBQUU7O2tDQUNtQjtBQVExQjtJQUZDLElBQUEsZ0JBQUksR0FBRTtJQUNOLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxDQUFDOztrQ0FDdkI7QUFRMUI7SUFGQyxJQUFBLGdCQUFJLEdBQUU7SUFDTixJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLENBQUM7O2lDQUNiO0FBUXBCO0lBRkMsSUFBQSxnQkFBSSxHQUFFO0lBQ04sSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxDQUFDOztpQ0FDYjtBQVFwQjtJQUZDLElBQUEsZ0JBQUksR0FBRTtJQUNOLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7a0NBQ1o7QUFRckI7SUFGQyxJQUFBLGdCQUFJLEdBQUU7SUFDTixJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUM7O3NDQUNkO0FBUXpCO0lBRkMsSUFBQSxnQkFBSSxHQUFFO0lBQ04sSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDOzt1Q0FDWjtBQVExQjtJQUZDLElBQUEsZ0JBQUksR0FBRTtJQUNOLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQzs7MkNBQ1I7QUFROUI7SUFGQyxJQUFBLGdCQUFJLEdBQUU7SUFDTixJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUM7O21DQUNoQjtBQVF0QjtJQUZDLElBQUEsZ0JBQUksR0FBRTtJQUNOLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsQ0FBQzs7cUNBQ3RCO0FBV3hCO0lBTEMsSUFBQSxnQkFBSSxHQUFFO0lBQ04sSUFBQSxxQkFBVyxFQUFDO1FBQ1gsV0FBVyxFQUNULHdDQUF3QztLQUMzQyxDQUFDOzt1Q0FDd0I7QUFVMUI7SUFKQyxJQUFBLGdCQUFJLEdBQUU7SUFDTixJQUFBLHFCQUFXLEVBQUM7UUFDWCxXQUFXLEVBQUUsMkJBQTJCO0tBQ3pDLENBQUM7O3FDQUNzQjtBQVd4QjtJQUxDLElBQUEsZ0JBQUksR0FBRTtJQUNOLElBQUEscUJBQVcsRUFBQztRQUNYLFdBQVcsRUFDVCxrQ0FBa0M7S0FDckMsQ0FBQzs7d0NBQ3lCO0FBUTNCO0lBRkMsSUFBQSxnQkFBSSxHQUFFO0lBQ04sSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLENBQUM7O29DQUN4QjtBQVF2QjtJQUZDLElBQUEsZ0JBQUksR0FBRTtJQUNOLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQzs7bUNBQ2pCO0FBUXRCO0lBRkMsSUFBQSxnQkFBSSxHQUFFO0lBQ04sSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDOztrQ0FDakI7QUFRckI7SUFGQyxJQUFBLGdCQUFJLEdBQUU7SUFDTixJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUM7O3NDQUNUO0FBUXpCO0lBRkMsSUFBQSxnQkFBSSxHQUFFO0lBQ04sSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDOztzQ0FDVDtBQVF6QjtJQUZDLElBQUEsZ0JBQUksR0FBRTtJQUNOLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7b0NBQ1g7QUFRdkI7SUFGQyxJQUFBLGdCQUFJLEdBQUU7SUFDTixJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUM7O21DQUNaO0FBT3RCO0lBREMsSUFBQSxnQkFBSSxFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBSSxDQUFDOztzQ0FDVztBQWxNbkIsSUFBSTtJQURoQixJQUFBLGdCQUFNLEVBQUMsTUFBTSxDQUFDO0dBQ0YsSUFBSSxDQW1NaEI7QUFuTVksb0JBQUkifQ==