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
exports.StaffWebUserCenterTradeOrderBuyerBuyerController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../../module/common/model/Page");
const shopBuyer_service_1 = require("../../../../../../module/trade/shopBuyer.service");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心买家控制器
 */
let StaffWebUserCenterTradeOrderBuyerBuyerController = class StaffWebUserCenterTradeOrderBuyerBuyerController {
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
     * @param id - 用户ID
     * @returns 返回父关联用户信息
     */
    async getParent(id) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '取得当前用户的父关联用户');
        // 获取当前用户的ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(staffId);
        // 调用店铺买家服务的获取父关联用户方法
        return await ((_g = (_f = this === null || this === void 0 ? void 0 : this.shopBuyerService) === null || _f === void 0 ? void 0 : _f.getParent) === null || _g === void 0 ? void 0 : _g.call(_f, id));
    }
    /**
     * 获取当前用户的子一级关联用户
     *
     * @param id - 用户ID
     * @returns 返回子一级关联用户信息
     */
    async getChildren(id) {
        var _a, _b, _c;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '取得当前用户的子一级关联用户');
        // 调用店铺买家服务的获取子一级关联用户方法
        return await ((_c = this === null || this === void 0 ? void 0 : this.shopBuyerService) === null || _c === void 0 ? void 0 : _c.getChildren(id));
    }
    /**
     * 获取买家分页列表
     *
     * @param parentShopBuyerId - 父店铺买家ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    async page(parentShopBuyerId = '', query, params, reqParam, page) {
        var _a, _b, _c, _d;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 调用店铺买家服务的分页方法
        const data = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.shopBuyerService) === null || _c === void 0 ? void 0 : _c.page) === null || _d === void 0 ? void 0 : _d.call(_c, parentShopBuyerId, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取买家信息
     *
     * @param id - 买家ID
     * @returns 返回买家信息
     */
    async getById(id) {
        var _a, _b;
        // 调用店铺买家服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.shopBuyerService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterTradeOrderBuyerBuyerController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterTradeOrderBuyerBuyerController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", shopBuyer_service_1.ShopBuyerService)
], StaffWebUserCenterTradeOrderBuyerBuyerController.prototype, "shopBuyerService", void 0);
__decorate([
    (0, decorator_1.All)('/getParent.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderBuyerBuyerController.prototype, "getParent", null);
__decorate([
    (0, decorator_1.All)('/getChildren.json'),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderBuyerBuyerController.prototype, "getChildren", null);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('parentShopBuyerId')),
    __param(1, (0, decorator_1.Query)('query')),
    __param(2, (0, decorator_1.Query)('params')),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderBuyerBuyerController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderBuyerBuyerController.prototype, "getById", null);
StaffWebUserCenterTradeOrderBuyerBuyerController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/trade/buyer/buyer')
], StaffWebUserCenterTradeOrderBuyerBuyerController);
exports.StaffWebUserCenterTradeOrderBuyerBuyerController = StaffWebUserCenterTradeOrderBuyerBuyerController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5ZXIuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvdXNlckNlbnRlci90cmFkZS9idXllci9idXllci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE2RTtBQUU3RSw2RUFBMEU7QUFDMUUscUVBQWtFO0FBR2xFLHdGQUFvRjtBQUdwRixrR0FBNkY7QUFFN0Y7O0dBRUc7QUFFSCxJQUFhLGdEQUFnRCxHQUE3RCxNQUFhLGdEQUFnRDtJQUE3RDtRQUNFOztXQUVHO1FBRUssUUFBRyxHQUFZLElBQUksQ0FBQztRQUU1Qjs7V0FFRztRQUVLLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0I7O1dBRUc7UUFFSyxxQkFBZ0IsR0FBcUIsSUFBSSxDQUFDO0lBbUZwRCxDQUFDO0lBakZDOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLFNBQVMsQ0FBYyxFQUFVOztRQUM1QyxPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsY0FBYyxDQUFDLENBQUM7UUFFckMsWUFBWTtRQUNaLE1BQU0sT0FBTyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFFbkQsWUFBWTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckIscUJBQXFCO1FBQ3JCLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZ0JBQWdCLDBDQUFFLFNBQVMsbURBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQztJQUN2RCxDQUFDO0lB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