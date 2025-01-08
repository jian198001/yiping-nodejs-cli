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
exports.BuyerUniUserCenterTradeOrderDistributionUserController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const shopBuyer_service_1 = require("../../../../../../module/trade/shopBuyer.service");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 买家用户中心交易订单分销用户控制器
 */
let BuyerUniUserCenterTradeOrderDistributionUserController = class BuyerUniUserCenterTradeOrderDistributionUserController {
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
     * 获取当前用户的父关联用户
     *
     * @returns 返回父关联用户信息
     */
    async getParent() {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '取得当前用户的父关联用户');
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用店铺买家服务的获取父关联用户方法
        return await ((_g = (_f = this === null || this === void 0 ? void 0 : this.shopBuyerService) === null || _f === void 0 ? void 0 : _f.getParent) === null || _g === void 0 ? void 0 : _g.call(_f, shopBuyerId));
    }
    /**
     * 获取当前用户的子一级关联用户
     *
     * @returns 返回子一级关联用户信息
     */
    async getChildren() {
        var _a, _b, _c, _d, _e, _f;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '取得当前用户的子一级关联用户');
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用店铺买家服务的获取子一级关联用户方法
        return await ((_f = this === null || this === void 0 ? void 0 : this.shopBuyerService) === null || _f === void 0 ? void 0 : _f.getChildren(shopBuyerId));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterTradeOrderDistributionUserController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterTradeOrderDistributionUserController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", shopBuyer_service_1.ShopBuyerService)
], BuyerUniUserCenterTradeOrderDistributionUserController.prototype, "shopBuyerService", void 0);
__decorate([
    (0, decorator_1.All)('/getParent.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderDistributionUserController.prototype, "getParent", null);
__decorate([
    (0, decorator_1.All)('/getChildren.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderDistributionUserController.prototype, "getChildren", null);
BuyerUniUserCenterTradeOrderDistributionUserController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/userCenter/trade/distribution/user')
], BuyerUniUserCenterTradeOrderDistributionUserController);
exports.BuyerUniUserCenterTradeOrderDistributionUserController = BuyerUniUserCenterTradeOrderDistributionUserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3VuaS91c2VyQ2VudGVyL3RyYWRlL2Rpc3RyaWJ1dGlvbi91c2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNFO0FBR3RFLHdGQUFvRjtBQUNwRixrR0FBNkY7QUFJN0Y7O0dBRUc7QUFFSCxJQUFhLHNEQUFzRCxHQUFuRSxNQUFhLHNEQUFzRDtJQUFuRTtRQUNFOztXQUVHO1FBRUssUUFBRyxHQUFZLElBQUksQ0FBQztRQUM1Qjs7V0FFRztRQUVLLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDL0I7O1dBRUc7UUFFSyxxQkFBZ0IsR0FBcUIsSUFBSSxDQUFDO0lBNkJwRCxDQUFDO0lBNUJDOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsU0FBUzs7UUFDcEIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGNBQWMsQ0FBQyxDQUFDO1FBQ3JDLFlBQVk7UUFDWixNQUFNLFdBQVcsR0FBVyxNQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLElBQUksMENBQUUsRUFBRSxDQUFDO1FBQ3ZELHFCQUFxQjtRQUNyQixPQUFPLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGdCQUFnQiwwQ0FBRSxTQUFTLG1EQUFHLFdBQVcsQ0FBQyxDQUFBLENBQUM7SUFDaEUsQ0FBQztJQUNEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsV0FBVzs7UUFDdEIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGdCQUFnQixDQUFDLENBQUM7UUFDdkMsWUFBWTtRQUNaLE1BQU0sV0FBVyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFDdkQsdUJBQXVCO1FBQ3ZCLE9BQU8sTUFBTSxDQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGdCQUFnQiwwQ0FBRSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQztJQUNoRSxDQUFDO0NBQ0YsQ0FBQTtBQXZDQztJQURDLElBQUEsa0JBQU0sR0FBRTs7bUZBQ21CO0FBSzVCO0lBREMsSUFBQSxrQkFBTSxHQUFFOztzRkFDc0I7QUFLL0I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ2lCLG9DQUFnQjtnR0FBUTtBQU9sRDtJQURDLElBQUEsZUFBRyxFQUFDLGlCQUFpQixFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDOzs7O3VGQVEvRDtBQU9EO0lBREMsSUFBQSxlQUFHLEVBQUMsbUJBQW1CLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7Ozs7eUZBUWpFO0FBM0NVLHNEQUFzRDtJQURsRSxJQUFBLHNCQUFVLEVBQUMsK0NBQStDLENBQUM7R0FDL0Msc0RBQXNELENBNENsRTtBQTVDWSx3SEFBc0QifQ==