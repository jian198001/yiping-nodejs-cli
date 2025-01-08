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
const buyer_service_1 = require("../../../../../module/trade/buyer.service");
const Buyer_1 = require("../../../../../entity/Buyer");
const captcha_1 = require("@midwayjs/captcha");
const jwt_1 = require("@midwayjs/jwt");
const GoogleCredentials_1 = require("../../../../../entity/GoogleCredentials");
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
    async buyerLogin(buyer, shopId) {
        var _a, _b, _c;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "登录controller");
        let token = null, data = null;
        // 调用买家服务的买家登录方法
        data = await ((_c = this === null || this === void 0 ? void 0 : this.buyerService) === null || _c === void 0 ? void 0 : _c.buyerLogin(buyer, shopId));
        // 生成JWT token
        token = this === null || this === void 0 ? void 0 : this.signSync(data.id);
        // 返回登录结果
        return {
            accessToken: token,
            refreshToken: token,
            expiresTime: 999999,
            token: token,
        };
        // 测试用例: curl --location --request GET 'http://localhost:7098/buyer/uni/frontPage/timeRes/passport/buyerLogin.json?shopId=1&username=gbbecabad&password=dfeadbbbec' \ --header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \ --header 'Accept: */*' \ --header 'Host: localhost:7098' \ --header 'Connection: keep-alive' \ --header 'Cookie: locale=en-us'
    }
    /**
     * 卖家登录
     *
     * @param buyer - 买家信息
     * @param shopId - 店铺ID
     * @returns 返回登录结果
     */
    async sellerLogin(buyer, shopId) {
        var _a, _b, _c;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "登录controller");
        let token = null, data = null;
        // 调用买家服务的卖家登录方法
        data = await ((_c = this === null || this === void 0 ? void 0 : this.buyerService) === null || _c === void 0 ? void 0 : _c.sellerLogin(buyer, shopId));
        // 生成JWT token
        token = this === null || this === void 0 ? void 0 : this.signSync(data.id);
        // 返回登录结果
        return {
            accessToken: token,
            refreshToken: token,
            expiresTime: 999999,
            token: token,
        };
        // 测试用例: curl --location --request GET 'http://localhost:7098/buyer/uni/frontPage/timeRes/passport/sellerLogin.json?shopId=1&username=aafecegegc&password=dddefba' \ --header 'User-Agent: Apifox/1.0.0 (https://apifox.com)'
    }
    /**
     * 微信小程序登录
     *
     * @param code - 微信小程序登录凭证
     * @param shopId - 店铺ID
     * @returns 返回登录结果
     */
    async loginWxma(code = "the code is a mock one", shopId) {
        var _a, _b, _c;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "登录controller");
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
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "登录controller");
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
    async reg(buyer, shopId = "") {
        var _a;
        // 调用买家服务的注册方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.buyerService) === null || _a === void 0 ? void 0 : _a.reg(shopId, buyer));
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
        var _a;
        // 调用验证码服务的生成图片方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.captchaService) === null || _a === void 0 ? void 0 : _a.image({
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
        var _a;
        // 调用验证码服务的生成公式方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.captchaService) === null || _a === void 0 ? void 0 : _a.formula({ noise: 1 }));
    }
    /**
     * 验证验证码
     *
     * @param id - 验证码ID
     * @param answer - 验证码答案
     * @returns 返回验证结果
     */
    async checkCaptcha(id, answer) {
        var _a;
        // 调用验证码服务的验证方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.captchaService) === null || _a === void 0 ? void 0 : _a.check(id, answer));
    }
    /**
     * 生成JWT token
     *
     * @param id - 用户ID
     * @returns 返回JWT token
     */
    signSync(id = "") {
        var _a;
        if (!id) {
            return "";
        }
        const payload = { id: id };
        // 调用JWT服务的签名方法
        return (_a = this === null || this === void 0 ? void 0 : this.jwtService) === null || _a === void 0 ? void 0 : _a.signSync(payload, "yiping", {
            expiresIn: "999999d",
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
    (0, decorator_1.All)("/buyerLogin.json"),
    __param(0, (0, decorator_1.Query)()),
    __param(1, (0, decorator_1.Query)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buyer_1.Buyer, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "buyerLogin", null);
__decorate([
    (0, decorator_1.All)("/sellerLogin.json"),
    __param(0, (0, decorator_1.Query)()),
    __param(1, (0, decorator_1.Query)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buyer_1.Buyer, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "sellerLogin", null);
__decorate([
    (0, decorator_1.All)("/loginWxma.json"),
    __param(0, (0, decorator_1.Query)("code")),
    __param(1, (0, decorator_1.Query)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "loginWxma", null);
__decorate([
    (0, decorator_1.All)("/loginGoogle.json"),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GoogleCredentials_1.GoogleCredentials]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "loginGoogle", null);
__decorate([
    (0, decorator_1.All)("/reg.json"),
    __param(0, (0, decorator_1.Body)()),
    __param(1, (0, decorator_1.Body)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buyer_1.Buyer, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "reg", null);
__decorate([
    (0, decorator_1.All)("/logout.json"),
    __param(0, (0, decorator_1.Query)("accessToken")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "logout", null);
__decorate([
    (0, decorator_1.All)("/captchaImage.json"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "captchaImage", null);
__decorate([
    (0, decorator_1.All)("/captchaFormula.json"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "captchaFormula", null);
__decorate([
    (0, decorator_1.All)("/checkCaptcha.json"),
    __param(0, (0, decorator_1.Query)("id")),
    __param(1, (0, decorator_1.Query)("answer")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePassportPassportController.prototype, "checkCaptcha", null);
BuyerUniFrontPagePassportPassportController = __decorate([
    (0, decorator_1.Controller)("/buyer/uni/frontPage/timeRes/passport")
], BuyerUniFrontPagePassportPassportController);
exports.BuyerUniFrontPagePassportPassportController = BuyerUniFrontPagePassportPassportController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9idXllci91bmkvZnJvbnRQYWdlL3RpbWVSZXMvcGFzc3BvcnQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFPNkI7QUFHN0IsNkVBQXlFO0FBQ3pFLHVEQUFvRDtBQUVwRCwrQ0FBbUQ7QUFDbkQsdUNBQTJDO0FBQzNDLCtFQUE0RTtBQUU1RTs7R0FFRztBQUVILElBQWEsMkNBQTJDLEdBQXhELE1BQWEsMkNBQTJDO0lBQXhEO1FBQ0U7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssaUJBQVksR0FBaUIsSUFBSSxDQUFDO1FBQzFDOztXQUVHO1FBRUssZUFBVSxHQUFlLElBQUksQ0FBQztRQUN0Qzs7V0FFRztRQUVLLG1CQUFjLEdBQW1CLElBQUksQ0FBQztJQWdOaEQsQ0FBQztJQS9NQzs7Ozs7O09BTUc7SUFFSSxLQUFLLENBQUMsVUFBVSxDQUNaLEtBQVksRUFDSixNQUFNOztRQUV2QixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsY0FBYyxDQUFDLENBQUM7UUFFckMsSUFBSSxLQUFLLEdBQVcsSUFBSSxFQUN0QixJQUFJLEdBQVEsSUFBSSxDQUFDO1FBRW5CLGdCQUFnQjtRQUNoQixJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFlBQVksMENBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQSxDQUFDO1FBRTNELGNBQWM7UUFDZCxLQUFLLEdBQUcsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEs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