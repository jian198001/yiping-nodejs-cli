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
exports.ContainerLifeCycle = void 0;
// 导入依赖项
const decorator_1 = require("@midwayjs/decorator");
const koa = require("@midwayjs/koa");
const validate = require("@midwayjs/validate");
const info = require("@midwayjs/info");
const orm = require("@midwayjs/typeorm");
const jwt = require("@midwayjs/jwt");
const swagger = require("@midwayjs/swagger");
const path_1 = require("path");
const captcha = require("@midwayjs/captcha");
const staticFile = require("@midwayjs/static-file");
const upload = require("@midwayjs/upload");
const view = require("@midwayjs/view-ejs");
const ws = require("@midwayjs/ws");
const cron = require("@midwayjs/cron");
const passport = require("@midwayjs/passport");
const crossDomain = require("@midwayjs/cross-domain");
const format_middleware_1 = require("./middleware/format.middleware");
const redis = require("@midwayjs/redis");
/**
 * 应用配置类
 * 导入各种MidwayJS组件和自定义中间件
 */
let ContainerLifeCycle = class ContainerLifeCycle {
    /**
     * 应用启动时执行的钩子函数
     * 注册自定义中间件
     */
    async onReady() {
        // 使用FormatMiddleware中间件
        this === null || this === void 0 ? void 0 : this.app.useMiddleware([format_middleware_1.FormatMiddleware]);
    }
};
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], ContainerLifeCycle.prototype, "app", void 0);
ContainerLifeCycle = __decorate([
    (0, decorator_1.Configuration)({
        // 导入的组件列表
        imports: [
            koa,
            validate,
            staticFile,
            {
                component: info,
                enabledEnvironment: ['local'],
            },
            upload,
            view,
            orm,
            jwt,
            swagger,
            captcha,
            ws,
            cron,
            passport,
            crossDomain,
            redis, // 导入 redis 组件
        ],
        // 导入配置文件的路径
        importConfigs: [(0, path_1.join)(__dirname, './config')],
    })
], ContainerLifeCycle);
exports.ContainerLifeCycle = ContainerLifeCycle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29uZmlndXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxRQUFRO0FBQ1IsbURBQXlEO0FBQ3pELHFDQUFxQztBQUNyQywrQ0FBK0M7QUFDL0MsdUNBQXVDO0FBQ3ZDLHlDQUF5QztBQUN6QyxxQ0FBcUM7QUFDckMsNkNBQTZDO0FBQzdDLCtCQUE0QjtBQUM1Qiw2Q0FBNkM7QUFDN0Msb0RBQW9EO0FBRXBELDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0MsbUNBQW1DO0FBQ25DLHVDQUF1QztBQUN2QywrQ0FBK0M7QUFDL0Msc0RBQXNEO0FBQ3RELHNFQUFrRTtBQUNsRSx5Q0FBeUM7QUFFekM7OztHQUdHO0FBMEJILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBSTdCOzs7T0FHRztJQUNILEtBQUssQ0FBQyxPQUFPO1FBQ1gsd0JBQXdCO1FBQ3hCLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsb0NBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FDRixDQUFBO0FBVkM7SUFEQyxJQUFBLGVBQUcsR0FBRTs7K0NBQ2U7QUFGVixrQkFBa0I7SUF6QjlCLElBQUEseUJBQWEsRUFBQztRQUNiLFVBQVU7UUFDVixPQUFPLEVBQUU7WUFDUCxHQUFHO1lBQ0gsUUFBUTtZQUNSLFVBQVU7WUFDVjtnQkFDRSxTQUFTLEVBQUUsSUFBSTtnQkFDZixrQkFBa0IsRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUM5QjtZQUNELE1BQU07WUFDTixJQUFJO1lBQ0osR0FBRztZQUNILEdBQUc7WUFDSCxPQUFPO1lBQ1AsT0FBTztZQUNQLEVBQUU7WUFDRixJQUFJO1lBQ0osUUFBUTtZQUNSLFdBQVc7WUFDWCxLQUFLLEVBQVEsY0FBYztTQUM1QjtRQUNELFlBQVk7UUFDWixhQUFhLEVBQUUsQ0FBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDN0MsQ0FBQztHQUNXLGtCQUFrQixDQVk5QjtBQVpZLGdEQUFrQiJ9