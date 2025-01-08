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
exports.BuyerUniUserCenterUserController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const shopBuyer_service_1 = require("../../../../../module/trade/shopBuyer.service");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家用户中心用户控制器
 */
let BuyerUniUserCenterUserController = class BuyerUniUserCenterUserController {
    constructor() {
        /**
         * 注入上下文对象
         */
        this.ctx = null;
        /**
         * 注入日志记录器
         */
        this.logger = null;
        /**
         * 注入店铺买家服务
         */
        this.shopBuyerService = null;
    }
    /**
     * 获取用户二维码
     *
     * @param shopId - 店铺ID
     * @returns 返回二维码信息
     */
    async qrcode(shopId) {
        var _a, _b, _c, _d, _e;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '获取用户二维码controller');
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用店铺买家服务的获取二维码方法
        return await (this === null || this === void 0 ? void 0 : this.shopBuyerService.getQrcode(shopId, shopBuyerId));
    }
    /**
     * 根据Token获取用户信息
     *
     * @returns 返回用户信息
     */
    async getByToken() {
        var _a, _b, _c, _d, _e;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '根据Token获取用户信息controller');
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用店铺买家服务的根据ID获取方法
        return await (this === null || this === void 0 ? void 0 : this.shopBuyerService.getById(shopBuyerId));
    }
    /**
     * 根据ID获取用户信息
     *
     * @param id - 用户ID
     * @returns 返回用户信息
     */
    async getById(id) {
        var _a, _b;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '根据ID获取用户信息controller');
        // 调用店铺买家服务的根据ID获取方法
        return await (this === null || this === void 0 ? void 0 : this.shopBuyerService.getById(id));
    }
    /**
     * 更新用户场景
     *
     * @param scene - 场景信息
     * @returns 返回更新结果
     */
    async updateScene(scene) {
        var _a, _b, _c, _d, _e;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '更新用户场景controller');
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 检查用户ID是否为空
        if (!shopBuyerId) {
            return 'tokenIsEmpty';
        }
        // 调用店铺买家服务的更新场景方法
        return await (this === null || this === void 0 ? void 0 : this.shopBuyerService.updateScene(scene, shopBuyerId));
    }
    /**
     * 根据用户名查找用户
     *
     * @param username - 用户名
     * @param shopId - 店铺ID
     * @returns 返回用户信息
     */
    async findByUsername(username, shopId) {
        var _a, _b;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '根据用户名查找用户controller');
        // 调用店铺买家服务的根据用户名查找方法
        return await (this === null || this === void 0 ? void 0 : this.shopBuyerService.findByUsername(username, shopId));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterUserController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterUserController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", shopBuyer_service_1.ShopBuyerService)
], BuyerUniUserCenterUserController.prototype, "shopBuyerService", void 0);
__decorate([
    (0, decorator_1.All)('/qrcode.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterUserController.prototype, "qrcode", null);
__decorate([
    (0, decorator_1.All)('/getByToken.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterUserController.prototype, "getByToken", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterUserController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/updateScene.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('scene')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterUserController.prototype, "updateScene", null);
__decorate([
    (0, decorator_1.All)('/findByUsername.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('username')),
    __param(1, (0, decorator_1.Query)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterUserController.prototype, "findByUsername", null);
BuyerUniUserCenterUserController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/userCenter/user')
], BuyerUniUserCenterUserController);
exports.BuyerUniUserCenterUserController = BuyerUniUserCenterUserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3VuaS91c2VyQ2VudGVyL3VzZXIvdXNlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE2RTtBQUc3RSxxRkFBaUY7QUFDakYsK0ZBQTBGO0FBSTFGOztHQUVHO0FBRUgsSUFBYSxnQ0FBZ0MsR0FBN0MsTUFBYSxnQ0FBZ0M7SUFBN0M7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUsscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQTBGcEQsQ0FBQztJQXpGQzs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxNQUFNLENBQWtCLE1BQU07O1FBQ3pDLE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTFDLFlBQVk7UUFDWixNQUFNLFdBQVcsR0FBVyxNQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLElBQUksMENBQUUsRUFBRSxDQUFDO1FBRXZELG1CQUFtQjtRQUNuQixPQUFPLE1BQU0sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQSxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7OztPQUlHO0lBRUksS0FBSyxDQUFDLFVBQVU7O1FBQ3JCLE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxD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