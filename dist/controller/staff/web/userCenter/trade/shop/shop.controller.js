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
exports.StaffWebUserCenterShopShopController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../../module/common/model/Page");
const shop_service_1 = require("../../../../../../module/trade/shop.service");
const Shop_1 = require("../../../../../../entity/Shop");
const AlipayConfig_1 = require("../../../../../../entity/AlipayConfig");
const WxPayConfig_1 = require("../../../../../../entity/WxPayConfig");
const Address_1 = require("../../../../../../entity/Address");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心店铺控制器
 */
let StaffWebUserCenterShopShopController = class StaffWebUserCenterShopShopController {
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
         * 注入店铺服务
         */
        this.shopService = null;
    }
    /**
     * 获取店铺分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    async page(query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "分页列表controller");
        // 获取当前用户的ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(staffId);
        // 调用店铺服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.shopService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取店铺信息
     *
     * @param id - 店铺ID
     * @returns 返回店铺信息
     */
    async getById(id) {
        var _a, _b;
        // 调用店铺服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.shopService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 更新店铺信息
     *
     * @param obj - 店铺对象
     * @param address - 地址对象
     * @param wxPayConfig - 微信支付配置对象
     * @param alipayConfig - 支付宝支付配置对象
     * @param appIdWxpay - 微信支付AppID
     * @param appIdAlipay - 支付宝支付AppID
     * @returns 返回更新结果
     */
    async update(obj = null, address = null, wxPayConfig = null, alipayConfig = null, appIdWxpay = "", appIdAlipay = "") {
        var _a;
        // 设置微信支付AppID
        wxPayConfig.appId = appIdWxpay;
        // 设置支付宝支付AppID
        alipayConfig.appId = appIdAlipay;
        // 调用店铺服务的更新方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.shopService) === null || _a === void 0 ? void 0 : _a.update(obj, address, wxPayConfig, alipayConfig));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterShopShopController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterShopShopController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", shop_service_1.ShopService)
], StaffWebUserCenterShopShopController.prototype, "shopService", void 0);
__decorate([
    (0, decorator_1.All)("/page.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("query")),
    __param(1, (0, decorator_1.Query)("params")),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterShopShopController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)("/getById.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterShopShopController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)("/update.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)()),
    __param(1, (0, decorator_1.Query)()),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)("appIdWxpay")),
    __param(5, (0, decorator_1.Query)("appIdAlipay")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Shop_1.Shop,
        Address_1.Address,
        WxPayConfig_1.WxPayConfig,
        AlipayConfig_1.AlipayConfig, Object, Object]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterShopShopController.prototype, "update", null);
StaffWebUserCenterShopShopController = __decorate([
    (0, decorator_1.Controller)("/staff/web/userCenter/shop/shop")
], StaffWebUserCenterShopShopController);
exports.StaffWebUserCenterShopShopController = StaffWebUserCenterShopShopController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi91c2VyQ2VudGVyL3RyYWRlL3Nob3Avc2hvcC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE2RTtBQUU3RSw2RUFBMEU7QUFDMUUscUVBQWtFO0FBRWxFLDhFQUEwRTtBQUMxRSx3REFBcUQ7QUFDckQsd0VBQXFFO0FBQ3JFLHNFQUFtRTtBQUNuRSw4REFBMkQ7QUFJM0Qsa0dBQTZGO0FBRTdGOztHQUVHO0FBRUgsSUFBYSxvQ0FBb0MsR0FBakQsTUFBYSxvQ0FBb0M7SUFBakQ7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssZ0JBQVcsR0FBZ0IsSUFBSSxDQUFDO0lBdUUxQyxDQUFDO0lBdEVDOzs7Ozs7OztPQVFHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ1osTUFBVyxFQUNuQixRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxZQUFZO1FBQ1osTUFBTSxPQUFPLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUNuRCxZQUFZO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixjQUFjO1FBQ2QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEs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