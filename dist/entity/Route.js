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
exports.Route = void 0;
const swagger_1 = require("@midwayjs/swagger");
/**
 * 路由实体类
 * 用于定义路由的相关属性和配置
 */
class Route {
    constructor() {
        /**
         * 是否隐藏路由
         * 当设置为true时，该路由不会在侧边栏出现
         */
        this.hidden = null;
        /**
         * 是否总是显示子路由
         * 当一个路由下面的children声明的路由大于1个时，自动会变成嵌套的模式，如组件页面
         */
        this.alwaysShow = null;
        /**
         * 其他元素
         * 用于存储其他与路由相关的元数据
         */
        this.meta = null;
        /**
         * 子路由列表
         * 用于存储当前路由的子路由信息
         */
        this.children = [];
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '路由名字', }),
    __metadata("design:type", String)
], Route.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '路由地址', }),
    __metadata("design:type", String)
], Route.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '是否隐藏路由，当设置 true 的时候该路由不会再侧边栏出现', }),
    __metadata("design:type", Boolean)
], Route.prototype, "hidden", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '重定向地址，当设置 noRedirect 的时候该路由在面包屑导航中不可被点击', }),
    __metadata("design:type", String)
], Route.prototype, "redirect", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '组件地址', }),
    __metadata("design:type", String)
], Route.prototype, "component", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '路由参数：如 {"id": 1, "name": "ry"}', }),
    __metadata("design:type", String)
], Route.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面', }),
    __metadata("design:type", Boolean)
], Route.prototype, "alwaysShow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '其他元素', }),
    __metadata("design:type", Object)
], Route.prototype, "meta", void 0);
exports.Route = Route;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGUuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9Sb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBK0M7QUFFL0M7OztHQUdHO0FBQ0gsTUFBYSxLQUFLO0lBQWxCO1FBZ0JFOzs7V0FHRztRQUVILFdBQU0sR0FBWSxJQUFJLENBQUM7UUF1QnZCOzs7V0FHRztRQUVILGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0I7OztXQUdHO1FBRUgsU0FBSSxHQUFRLElBQUksQ0FBQztRQUVqQjs7O1dBR0c7UUFDSCxhQUFRLEdBQVUsRUFBRSxDQUFDO0lBRXZCLENBQUM7Q0FBQTtBQXpEQztJQURDLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7bUNBQ3ZCO0FBT2I7SUFEQyxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7O21DQUN2QjtBQU9iO0lBREMsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLGdDQUFnQyxHQUFFLENBQUM7O3FDQUN2QztBQU92QjtJQURDLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSx5Q0FBeUMsR0FBRSxDQUFDOzt1Q0FDdEQ7QUFPakI7SUFEQyxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7O3dDQUNsQjtBQU9sQjtJQURDLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxnQ0FBZ0MsR0FBRSxDQUFDOztvQ0FDaEQ7QUFPZDtJQURDLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxpREFBaUQsR0FBRSxDQUFDOzt5Q0FDcEQ7QUFPM0I7SUFEQyxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7O21DQUNuQjtBQXhEbkIsc0JBZ0VDIn0=