"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtPassportMiddleware = void 0;
// 导入依赖项
const core_1 = require("@midwayjs/core");
const passport_1 = require("@midwayjs/passport");
const jwt_strategy_1 = require("../strategy/jwt.strategy");
/**
 * JWT认证中间件类
 * 继承自PassportMiddleware，并使用JwtStrategy进行JWT认证
 */
let JwtPassportMiddleware = class JwtPassportMiddleware extends (0, passport_1.PassportMiddleware)(jwt_strategy_1.JwtStrategy) {
    /**
     * 获取认证选项
     * @returns 认证选项对象
     */
    getAuthenticateOptions() {
        return {};
    }
};
JwtPassportMiddleware = __decorate([
    (0, core_1.Middleware)()
], JwtPassportMiddleware);
exports.JwtPassportMiddleware = JwtPassportMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LnBhc3Nwb3J0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1pZGRsZXdhcmUvand0LnBhc3Nwb3J0Lm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSLHlDQUE0QztBQUM1QyxpREFBNkU7QUFDN0UsMkRBQXVEO0FBRXZEOzs7R0FHRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsSUFBQSw2QkFBa0IsRUFBQywwQkFBVyxDQUFDO0lBQ3hFOzs7T0FHRztJQUNILHNCQUFzQjtRQUNwQixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Q0FDRixDQUFBO0FBUlkscUJBQXFCO0lBRGpDLElBQUEsaUJBQVUsR0FBRTtHQUNBLHFCQUFxQixDQVFqQztBQVJZLHNEQUFxQiJ9