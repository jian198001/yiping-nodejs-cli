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
exports.BuyerUniFrontPagePassportPassportController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const buyer_service_1 = require("../../../../module/trade/buyer.service");
const Buyer_1 = require("../../../../entity/Buyer");
const captcha_1 = require("@midwayjs/captcha");
const jwt_1 = require("@midwayjs/jwt");
const GoogleCredentials_1 = require("../../../../entity/GoogleCredentials");
/**
 * 买家前端页面通行证控制器
 */
let BuyerUniFrontPagePassportPassportController = class BuyerUniFrontPagePassportPassportController {
    constructor() {
        /**
         * 注入日志记录器
         */
        this.logger = null;
        /**
         * 注入买家服务
         */
        this.buyerService = null;
        /**
         * 注入JWT服务
         */
        this.jwtService = null;
        /**
         * 注入验证码服务
         */
        this.captchaService = null;
    }
    /**
     * 买家登录
     *
     * @param buyer - 买家信息
     * @param shopId - 店铺ID
     * @returns 返回登录结果
     */
    async login(buyer, shopId = '') {
        var _a, _b, _c;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '登录controller');
        let token = null, data = null;
        // 调用买家服务的登录方法
        data = await ((_c = this === null || this === void 0 ? void 0 : this.buyerService) === null || _c === void 0 ? void 0 : _c.login(buyer, shopId));
        // 生成JWT token
        token = this === null || this === void 0 ? void 0 : this.signSync(data.id);
        // 返回登录结果
        return {
            accessToken: token,
            refreshToken: token,
            expiresTime: 999999,
            token: token,
        };
    }
    /**
     * 微信小程序登录
     *
     * @param code - 微信小程序登录凭证
     * @param shopId - 店铺ID
     * @returns 返回登录结果
     */
    async loginWxma(code = 'the code is a mock one', shopId) {
        var _a, _b, _c;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '登录controller');
        let token = null, data = null;
        // 调用买家服务的微信小程序登录方法
        data = await ((_c = this === null || this === void 0 ? void 0 : this.buyerService) === null || _c === void 0 ? void 0 : _c.loginWxma(code, shopId));
        // 生成JWT token
        token = this === null || this === void 0 ? void 0 : this.signSync(data.id);
        // 返回登录结果
        return {
            accessToken: token,
            refreshToken: token,
            expiresTime: 999999,
            token: token,
        };
    }
    /**
     * Google登录
     *
     * @param body - Google登录凭证
     * @returns 返回登录结果
     */
    async loginGoogle(body) {
        var _a, _b, _c;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '登录controller');
        let token = null, data = await ((_c = this === null || this === void 0 ? void 0 : this.buyerService) === null || _c === void 0 ? void 0 : _c.loginGoogle(body));
        // 生成JWT token
        token = this === null || this === void 0 ? void 0 : this.signSync(data === null || data === void 0 ? void 0 : data.id);
        // 返回登录结果
        return {
            accessToken: token,
            refreshToken: token,
            expiresTime: 999999,
            token: token,
        };
    }
    /**
     * 注册
     *
     * @param buyer - 买家信息
     * @param shopId - 店铺ID
     * @returns 返回注册结果
     */
    async reg(buyer, shopId = '') {
        var _a, _b;
        // 调用买家服务的注册方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.buyerService) === null || _a === void 0 ? void 0 : _a.reg) === null || _b === void 0 ? void 0 : _b.call(_a, shopId, buyer));
    }
    /**
     * 注销
     *
     * @param accessToken - 访问令牌
     * @returns 返回注销结果
     */
    async logout(accessToken) {
        // 返回注销结果
        return null;
    }
    /**
     * 获取验证码图片
     *
     * @returns 返回验证码图片
     */
    async captchaImage() {
        var _a, _b;
        // 调用验证码服务的生成图片方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.captchaService) === null || _a === void 0 ? void 0 : _a.image) === null || _b === void 0 ? void 0 : _b.call(_a, {
            width: 120,
            height: 40,
        }));
    }
    /**
     * 获取验证码公式
     *
     * @returns 返回验证码公式
     */
    async captchaFormula() {
        var _a, _b;
        // 调用验证码服务的生成公式方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.captchaService) === null || _a === void 0 ? void 0 : _a.formula) === null || _b === void 0 ? void 0 : _b.call(_a, { noise: 1 }));
    }
    /**
     * 验证验证码
     *
     * @param id - 验证码ID
     * @param answer - 验证码答案
     * @returns 返回验证结果
     */
    async checkCaptcha(id, answer) {
        var _a, _b;
        // 调用验证码服务的验证方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.captchaService) === null || _a === void 0 ? void 0 : _a.check) === null || _b === void 0 ? void 0 : _b.call(_a, id, answer));
    }
    /**
     * 生成JWT token
     *
     * @param id - 用户ID
     * @returns 返回JWT token
     */
    signSync(id = '') {
        var _a;
        if (!id) {
            return '';
        }
        const payload = { id: id };
        // 调用JWT服务的签名方法
        return (_a = this === null || this === void 0 ? void 0 : this.jwtService) === null || _a === void 0 ? void 0 : _a.signSync(payload, 'yiping', {
            expiresIn: '999999d',
        });
    }
};
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniFrontPagePassportPassportController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", buyer_service_1.BuyerService)
], BuyerUniFrontPagePassportPassportController.prototype, "buyerService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", jwt_1.JwtService)
], BuyerUniFrontPagePassportPassportController.prototype, "jwtService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", captcha_1.CaptchaService)
], BuyerUniFrontPagePassportPassportController.prototype, "captchaService", void 0);
__decorate([
    (0, decorator_1.All)('/login.json'),
    __param(0, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buyer_1.Buyer, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "login", null);
__decorate([
    (0, decorator_1.All)('/loginWxma.json'),
    __param(0, (0, decorator_1.Query)('code')),
    __param(1, (0, decorator_1.Query)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "loginWxma", null);
__decorate([
    (0, decorator_1.All)('/loginGoogle.json'),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GoogleCredentials_1.GoogleCredentials]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "loginGoogle", null);
__decorate([
    (0, decorator_1.All)('/reg.json'),
    __param(0, (0, decorator_1.Body)()),
    __param(1, (0, decorator_1.Body)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buyer_1.Buyer, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "reg", null);
__decorate([
    (0, decorator_1.All)('/logout.json'),
    __param(0, (0, decorator_1.Query)('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "logout", null);
__decorate([
    (0, decorator_1.All)('/captchaImage.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "captchaImage", null);
__decorate([
    (0, decorator_1.All)('/captchaFormula.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "captchaFormula", null);
__decorate([
    (0, decorator_1.All)('/checkCaptcha.json'),
    __param(0, (0, decorator_1.Query)('id')),
    __param(1, (0, decorator_1.Query)('answer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "checkCaptcha", null);
BuyerUniFrontPagePassportPassportController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/frontPage/passport')
], BuyerUniFrontPagePassportPassportController);
exports.BuyerUniFrontPagePassportPassportController = BuyerUniFrontPagePassportPassportController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9idXllci91bmkvZnJvbnRQYWdlL3Bhc3Nwb3J0LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBTzZCO0FBRzdCLDBFQUFzRTtBQUN0RSxvREFBaUQ7QUFFakQsK0NBQW1EO0FBQ25ELHVDQUEyQztBQUMzQyw0RUFBeUU7QUFFekU7O0dBRUc7QUFFSCxJQUFhLDJDQUEyQyxHQUF4RCxNQUFhLDJDQUEyQztJQUF4RDtRQUNFOztXQUVHO1FBRUssV0FBTSxHQUFZLElBQUksQ0FBQztRQUMvQjs7V0FFRztRQUVLLGlCQUFZLEdBQWlCLElBQUksQ0FBQztRQUMxQzs7V0FFRztRQUVLLGVBQVUsR0FBZSxJQUFJLENBQUM7UUFDdEM7O1dBRUc7UUFFSyxtQkFBYyxHQUFtQixJQUFJLENBQUM7SUFnS2hELENBQUM7SUEvSkM7Ozs7OztPQU1HO0lBRUksS0FBSyxDQUFDLEtBQUssQ0FBVSxLQUFZLEVBQUUsTUFBTSxHQUFHLEVBQUU7O1FBQ25ELE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxjQUFjLENBQUMsQ0FBQztRQUNyQyxJQUFJLEtBQUssR0FBVyxJQUFJLEVBQ3RCLElBQUksR0FBUSxJQUFJLENBQUM7UUFDbkIsY0FBYztRQUNkLElBQUksR0FBRyxNQUFNLENBQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsWUFBWSwwQ0FBRSxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBLENBQUM7UUFDdEQsY0FBYztRQUNkLEtBQUssR0FBRyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUSxD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