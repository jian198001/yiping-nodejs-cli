"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalPassportMiddleware = void 0;
// 导入依赖项
const core_1 = require("@midwayjs/core");
const passport_1 = require("@midwayjs/passport");
const local_strategy_1 = require("../strategy/local.strategy");
/**
 * 本地认证中间件类
 * 继承自PassportMiddleware，并使用LocalStrategy进行本地认证
 */
let LocalPassportMiddleware = class LocalPassportMiddleware extends (0, passport_1.PassportMiddleware)(local_strategy_1.LocalStrategy) {
    /**
     * 获取认证选项
     * @returns 认证选项对象
     */
    getAuthenticateOptions() {
        return {
            // 认证失败时重定向的URL
            failureRedirect: '/staff/web/frontPage/passport/loginError.json',
        };
    }
};
LocalPassportMiddleware = __decorate([
    (0, core_1.Middleware)()
], LocalPassportMiddleware);
exports.LocalPassportMiddleware = LocalPassportMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwucGFzc3BvcnQubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibWlkZGxld2FyZS9sb2NhbC5wYXNzcG9ydC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDUix5Q0FBNEM7QUFDNUMsaURBQTZFO0FBQzdFLCtEQUEyRDtBQUUzRDs7O0dBR0c7QUFFSCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLElBQUEsNkJBQWtCLEVBQUMsOEJBQWEsQ0FBQztJQUM1RTs7O09BR0c7SUFDSCxzQkFBc0I7UUFDcEIsT0FBTztZQUNMLGVBQWU7WUFDZixlQUFlLEVBQUUsK0NBQStDO1NBQ2pFLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQVhZLHVCQUF1QjtJQURuQyxJQUFBLGlCQUFVLEdBQUU7R0FDQSx1QkFBdUIsQ0FXbkM7QUFYWSwwREFBdUIifQ==