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
exports.JwtStrategy = void 0;
// 导入依赖项
const passport_1 = require("@midwayjs/passport");
const passport_jwt_1 = require("passport-jwt");
const core_1 = require("@midwayjs/core");
/**
 * JWT策略类
 * 用于处理JWT认证
 */
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor() {
        super(...arguments);
        // 注入JWT配置
        this.jwtConfig = null;
    }
    /**
     * 验证JWT令牌
     * @param payload - JWT令牌的有效负载
     * @returns JWT令牌的有效负载
     */
    async validate(payload) {
        // 返回JWT令牌的有效负载
        return payload;
    }
    /**
     * 获取策略选项
     * @returns 策略选项对象
     */
    getStrategyOptions() {
        var _a, _b;
        return {
            // 使用JWT配置中的密钥
            secretOrKey: (_a = this === null || this === void 0 ? void 0 : this.jwtConfig) === null || _a === void 0 ? void 0 : _a.secret,
            // 从请求头中提取JWT令牌
            jwtFromRequest: (_b = passport_jwt_1.ExtractJwt === null || passport_jwt_1.ExtractJwt === void 0 ? void 0 : passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken) === null || _b === void 0 ? void 0 : _b.call(passport_jwt_1.ExtractJwt),
        };
    }
};
__decorate([
    (0, core_1.Config)('jwt'),
    __metadata("design:type", Object)
], JwtStrategy.prototype, "jwtConfig", void 0);
JwtStrategy = __decorate([
    (0, passport_1.CustomStrategy)()
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJzdHJhdGVneS9qd3Quc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSLGlEQUFzRTtBQUN0RSwrQ0FBb0Q7QUFDcEQseUNBQXdDO0FBRXhDOzs7R0FHRztBQUVILElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxJQUFBLDJCQUFnQixFQUFDLHVCQUFRLEVBQUUsS0FBSyxDQUFDO0lBQWxFOztRQUNFLFVBQVU7UUFFRixjQUFTLEdBQUcsSUFBSSxDQUFDO0lBd0IzQixDQUFDO0lBdEJDOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU87UUFDcEIsZUFBZTtRQUNmLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxrQkFBa0I7O1FBQ2hCLE9BQU87WUFDTCxjQUFjO1lBQ2QsV0FBVyxFQUFFLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFNBQVMsMENBQUUsTUFBTTtZQUNwQyxlQUFlO1lBQ2YsY0FBYyxFQUFFLE1BQUEseUJBQVUsYUFBVix5QkFBVSx1QkFBVix5QkFBVSxDQUFFLDJCQUEyQix5RUFBSTtTQUM1RCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUF4QkM7SUFEQyxJQUFBLGFBQU0sRUFBQyxLQUFLLENBQUM7OzhDQUNXO0FBSGQsV0FBVztJQUR2QixJQUFBLHlCQUFjLEdBQUU7R0FDSixXQUFXLENBMkJ2QjtBQTNCWSxrQ0FBVyJ9