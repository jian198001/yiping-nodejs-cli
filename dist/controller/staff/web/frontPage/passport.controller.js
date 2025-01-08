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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffWebFrontPagePassportController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@midwayjs/core");
const captcha_1 = require("@midwayjs/captcha");
const Staff_1 = require("../../../../entity/Staff");
const local_passport_middleware_1 = require("../../../../middleware/local.passport.middleware");
const Zero0Error_1 = require("../../../../module/common/model/Zero0Error");
const staff_service_1 = require("../../../../module/oa/staff.service");
/**
 * 员工Web前端页面认证控制器
 * 处理与员工认证相关的HTTP请求，如登录、注册、登出、验证码生成和验证等
 */
let StaffWebFrontPagePassportController = class StaffWebFrontPagePassportController {
    constructor() {
        // 注入Logger实例
        this.logger = null;
        // 注入CaptchaService实例
        this.captchaService = null;
        // 注入StaffService实例
        this.staffService = null;
        // 注入Context实例
        this.ctx = null;
    }
    /**
     * 处理登录错误的请求
     * @returns 返回一个Zero0Error对象，表示用户名或密码错误
     */
    async loginError() {
        // 创建一个Zero0Error对象，表示用户名或密码错误
        const zero0Error = new Zero0Error_1.Zero0Error('用户名或密码错误', '401');
        // 抛出错误
        throw zero0Error;
    }
    /**
     * 处理员工登录的请求
     * @param staff - 包含员工登录信息的Staff对象
     * @returns 返回一个包含访问令牌、刷新令牌、过期时间和令牌的对象
     */
    async login(staff) {
        var _a, _b;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '登录controller');
        // 从上下文中获取用户信息
        let token = this === null || this === void 0 ? void 0 : this.ctx.state.user;
        // 如果用户信息中包含令牌，则使用该令牌
        if (token === null || token === void 0 ? void 0 : token.token) {
            token = token === null || token === void 0 ? void 0 : token.token;
        }
        // 返回包含访问令牌、刷新令牌、过期时间和令牌的对象
        return {
            accessToken: token,
            refreshToken: token,
            expiresTime: 999999,
            token: token,
        };
    }
    /**
     * 处理员工注册的请求
     * @param staff - 包含员工注册信息的Staff对象
     * @returns 返回注册结果
     */
    async reg(staff) {
        // 调用staffService的reg方法进行注册
        return await (this === null || this === void 0 ? void 0 : this.staffService.reg(staff));
    }
    /**
     * 处理员工登出的请求
     * @returns 返回一个空对象
     */
    async logout() {
        // 返回一个空对象
        return {};
    }
    /**
     * 生成验证码图片
     * @returns 返回验证码图片数据
     */
    async captchaImage() {
        var _a;
        // 调用captchaService的image方法生成验证码图片
        return await ((_a = this === null || this === void 0 ? void 0 : this.captchaService) === null || _a === void 0 ? void 0 : _a.image({
            width: 120,
            height: 40,
        }));
    }
    /**
     * 生成验证码公式
     * @returns 返回验证码公式数据
     */
    async captchaFormula() {
        var _a;
        // 调用captchaService的formula方法生成验证码公式
        return await ((_a = this === null || this === void 0 ? void 0 : this.captchaService) === null || _a === void 0 ? void 0 : _a.formula({ noise: 1 }));
    }
    /**
     * 验证验证码
     * @param id - 验证码ID
     * @param answer - 验证码答案
     * @returns 返回验证结果
     */
    async checkCaptcha(id, answer) {
        var _a;
        // 调用captchaService的check方法验证验证码
        return await ((_a = this === null || this === void 0 ? void 0 : this.captchaService) === null || _a === void 0 ? void 0 : _a.check(id, answer));
    }
};
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebFrontPagePassportController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", captcha_1.CaptchaService)
], StaffWebFrontPagePassportController.prototype, "captchaService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", staff_service_1.StaffService)
], StaffWebFrontPagePassportController.prototype, "staffService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebFrontPagePassportController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.All)('/loginError.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffWebFrontPagePassportController.prototype, "loginError", null);
__decorate([
    (0, decorator_1.All)('/login.json', { middleware: [local_passport_middleware_1.LocalPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Staff_1.Staff]),
    __metadata("design:returntype", Promise)
], StaffWebFrontPagePassportController.prototype, "login", null);
__decorate([
    (0, decorator_1.All)('/regjson'),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Staff_1.Staff]),
    __metadata("design:returntype", Promise)
], StaffWebFrontPagePassportController.prototype, "reg", null);
__decorate([
    (0, decorator_1.All)('/logout.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffWebFrontPagePassportController.prototype, "logout", null);
__decorate([
    (0, decorator_1.All)('/captchaImage.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffWebFrontPagePassportController.prototype, "captchaImage", null);
__decorate([
    (0, decorator_1.All)('/captchaFormula.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffWebFrontPagePassportController.prototype, "captchaFormula", null);
__decorate([
    (0, decorator_1.All)('/checkCaptcha.json'),
    __param(0, (0, decorator_1.Query)('id')),
    __param(1, (0, decorator_1.Query)('answer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StaffWebFrontPagePassportController.prototype, "checkCaptcha", null);
StaffWebFrontPagePassportController = __decorate([
    (0, core_1.Controller)('/staff/web/frontPage/passport')
], StaffWebFrontPagePassportController);
exports.StaffWebFrontPagePassportController = StaffWebFrontPagePassportController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvZnJvbnRQYWdlL3Bhc3Nwb3J0LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXVFO0FBQ3ZFLHlDQUE0QztBQUU1QywrQ0FBbUQ7QUFHbkQsb0RBQWlEO0FBRWpELGdHQUEyRjtBQUMzRiwyRUFBd0U7QUFDeEUsdUVBQW1FO0FBRW5FOzs7R0FHRztBQUVILElBQWEsbUNBQW1DLEdBQWhELE1BQWEsbUNBQW1DO0lBQWhEO1FBQ0UsYUFBYTtRQUVMLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0IscUJBQXFCO1FBRWIsbUJBQWMsR0FBbUIsSUFBSSxDQUFDO1FBRTlDLG1CQUFtQjtRQUVYLGlCQUFZLEdBQWlCLElBQUksQ0FBQztRQUUxQyxjQUFjO1FBRU4sUUFBRyxHQUFZLElBQUksQ0FBQztJQW9HOUIsQ0FBQztJQWxHQzs7O09BR0c7SUFFSSxLQUFLLENBQUMsVUFBVTtRQUNyQiw4QkFBOEI7UUFDOUIsTUFBTSxVQUFVLEdBQWUsSUFBSSx1QkFBVSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVqRSxPQUFPO1FBQ1AsTUFBTSxVQUFVLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsS0FBSyxDQUFTLEtBQVk7O1FBQ3JDLE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxjQUFjLENBQUMsQ0FBQztRQUVyQyxjQUFjO1FBQ2QsSUFBSSxLQUFLLEdBQVEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRXRDLHFCQUFxQjtRQUNyQixJQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxLQUFLLEVBQUU7WUFDaEIsS0FBSyxHQUFHLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxLQUFLLENBQUM7U0FDdEI7UUFFRCwyQkFBMkI7UUFDM0IsT0FBTztZQUNMLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFdBQVcsRUFBRSxNQUFNO1lBQ25CLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBRUksS0FBSyxDQUFDLEdBQUcsQ0FBUyxLQUFZO1FBQ25DLDJCQUEyQjtRQUMzQixPQUFPLE1BQU0sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFFSSxLQUFLLENBQUMsTUFBTTtRQUNqQixVQUFVO1FBQ1YsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLFlBQVk7O1FBQ3ZCLGtDQUFrQztRQUNsQyxPQUFPLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxjQUFjLDBDQUFFLEtBQUssQ0FBQztZQUN2QyxLQUFLLEVBQUUsR0FBRztZQUNWLE1BQU0sRUFBRSxFQUFFO1NBQ1gsQ0FBQyxDQUFBLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLGNBQWM7O1FBQ3pCLG9DQUFvQztRQUNwQyxPQUFPLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxjQUFjLDBDQUFFLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLFlBQVksQ0FDVixFQUFVLEVBQ04sTUFBYzs7UUFFL0IsZ0NBQWdDO1FBQ2hDLE9BQU8sTUFBTSxDQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGNBQWMsMENBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQSxDQUFDO0lBQ3ZELENBQUM7Q0FDRixDQUFBO0FBaEhDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzttRUFDc0I7QUFJL0I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ2Usd0JBQWM7MkVBQVE7QUFJOUM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ2EsNEJBQVk7eUVBQVE7QUFJMUM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O2dFQUNtQjtBQU81QjtJQURDLElBQUEsZUFBRyxFQUFDLGtCQUFrQixDQUFDOzs7O3FFQU92QjtBQVFEO0lBREMsSUFBQSxlQUFHLEVBQUMsYUFBYSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsbURBQXVCLENBQUMsRUFBRSxDQUFDO0lBQzFDLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7O3FDQUFRLGFBQUs7O2dFQW1CdEM7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLFVBQVUsQ0FBQztJQUNFLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7O3FDQUFRLGFBQUs7OzhEQUdwQztBQU9EO0lBREMsSUFBQSxlQUFHLEVBQUMsY0FBYyxDQUFDOzs7O2lFQUluQjtBQU9EO0lBREMsSUFBQSxlQUFHLEVBQUMsb0JBQW9CLENBQUM7Ozs7dUVBT3pCO0FBT0Q7SUFEQyxJQUFBLGVBQUcsRUFBQyxzQkFBc0IsQ0FBQzs7Ozt5RUFJM0I7QUFTRDtJQURDLElBQUEsZUFBRyxFQUFDLG9CQUFvQixDQUFDO0lBRXZCLFdBQUEsSUFBQSxpQkFBSyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQ1gsV0FBQSxJQUFBLGlCQUFLLEVBQUMsUUFBUSxDQUFDLENBQUE7Ozs7dUVBSWpCO0FBbEhVLG1DQUFtQztJQUQvQyxJQUFBLGlCQUFVLEVBQUMsK0JBQStCLENBQUM7R0FDL0IsbUNBQW1DLENBbUgvQztBQW5IWSxrRkFBbUMifQ==