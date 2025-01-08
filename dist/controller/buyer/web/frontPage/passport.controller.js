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
/**
 * 买家Web前端页面认证控制器
 * 处理与买家认证相关的HTTP请求，如登录、注册、登出、验证码生成和验证等
 */
let BuyerUniFrontPagePassportPassportController = class BuyerUniFrontPagePassportPassportController {
    constructor() {
        // 注入Logger实例
        this.logger = null;
        // 注入BuyerService实例
        this.buyerService = null;
        // 注入JwtService实例
        this.jwtService = null;
        // 注入CaptchaService实例
        this.captchaService = null;
    }
    /**
     * 买家登录
     * @param buyer - 买家对象
     * @param shopId - 店铺ID
     * @returns 返回登录结果，包括访问令牌、刷新令牌等
     */
    async login(buyer, shopId = '') {
        var _a, _b, _c;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '登录controller');
        let token = null, data = null;
        // 调用buyerService的login方法进行登录验证
        data = await ((_c = this === null || this === void 0 ? void 0 : this.buyerService) === null || _c === void 0 ? void 0 : _c.login(buyer, shopId));
        // 生成JWT令牌
        token = this === null || this === void 0 ? void 0 : this.signSync(data.id);
        return {
            accessToken: token,
            refreshToken: token,
            expiresTime: 999999,
            token: token,
        };
    }
    /**
     * 微信小程序买家登录
     * @param code - 微信小程序登录凭证
     * @param shopId - 店铺ID
     * @returns 返回登录结果，包括访问令牌、刷新令牌等
     */
    async loginWxma(code = 'the code is a mock one', shopId) {
        var _a, _b, _c;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '登录controller');
        let token = null, data = null;
        // 调用buyerService的loginWxma方法进行微信小程序登录验证
        data = await ((_c = this === null || this === void 0 ? void 0 : this.buyerService) === null || _c === void 0 ? void 0 : _c.loginWxma(code, shopId));
        // 生成JWT令牌
        token = this === null || this === void 0 ? void 0 : this.signSync(data.id);
        return {
            accessToken: token,
            refreshToken: token,
            expiresTime: 999999,
            token: token,
        };
    }
    /**
     * 买家注册
     * @param buyer - 买家对象
     * @param shopId - 店铺ID
     * @returns 返回注册结果
     */
    async reg(buyer, shopId = '') {
        var _a;
        // 调用buyerService的reg方法进行注册
        return await ((_a = this === null || this === void 0 ? void 0 : this.buyerService) === null || _a === void 0 ? void 0 : _a.reg(shopId, buyer));
    }
    /**
     * 买家登出
     * @param accessToken - 访问令牌
     * @returns 返回登出结果
     */
    async logout(accessToken) {
        return null;
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
    /**
     * 同步生成JWT令牌
     * @param id - 用户ID
     * @returns 返回生成的JWT令牌
     */
    signSync(id = '') {
        var _a;
        if (!id) {
            return '';
        }
        const payload = { id: id };
        // 调用jwtService的signSync方法生成JWT令牌
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
    __param(0, (0, decorator_1.Body)()),
    __param(1, (0, decorator_1.Body)('shopId')),
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
    (0, decorator_1.All)('/regjson'),
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
    (0, decorator_1.Controller)('/buyer/web/frontPage/passport')
], BuyerUniFrontPagePassportPassportController);
exports.BuyerUniFrontPagePassportPassportController = BuyerUniFrontPagePassportPassportController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9idXllci93ZWIvZnJvbnRQYWdlL3Bhc3Nwb3J0LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBTzZCO0FBRzdCLDBFQUFzRTtBQUN0RSxvREFBaUQ7QUFFakQsK0NBQW1EO0FBQ25ELHVDQUEyQztBQUUzQzs7O0dBR0c7QUFFSCxJQUFhLDJDQUEyQyxHQUF4RCxNQUFhLDJDQUEyQztJQUF4RDtRQUNFLGFBQWE7UUFFTCxXQUFNLEdBQVksSUFBSSxDQUFDO1FBRS9CLG1CQUFtQjtRQUVYLGlCQUFZLEdBQWlCLElBQUksQ0FBQztRQUUxQyxpQkFBaUI7UUFFVCxlQUFVLEdBQWUsSUFBSSxDQUFDO1FBRXRDLHFCQUFxQjtRQUViLG1CQUFjLEdBQW1CLElBQUksQ0FBQztJQWdKaEQsQ0FBQztJQTlJQzs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxLQUFLLENBQ1IsS0FBWSxFQUNKLFNBQVMsRUFBRTs7UUFFM0IsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGNBQWMsQ0FBQyxDQUFDO1FBRXJDLElBQUksS0FBSyxHQUFXLElBQUksRUFDdEIsSUFBSSxHQUFRLElBQUksQ0FBQztRQUVuQiwrQkFBK0I7UUFDL0IsSUFBSSxHQUFHLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxZQUFZLDBDQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUEsQ0FBQztRQUV0RCxVQUFVO1FBQ1YsS0FBSyxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFD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