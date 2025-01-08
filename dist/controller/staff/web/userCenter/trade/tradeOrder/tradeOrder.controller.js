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
exports.StaffWebUserCenterTradeOrderTradeOrderController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../../module/common/model/Page");
const tradeOrder_service_1 = require("../../../../../../module/trade/tradeOrder.service");
const TradeOrder_1 = require("../../../../../../entity/TradeOrder");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 员工Web用户中心交易订单控制器
 * 处理与交易订单相关的HTTP请求，如创建订单、分页查询、根据ID查询、更新、审核退款和获取图表数据
 */
let StaffWebUserCenterTradeOrderTradeOrderController = class StaffWebUserCenterTradeOrderTradeOrderController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入TradeOrderService实例
        this.tradeOrderService = null;
    }
    /**
     * 创建订单
     * @param shopId - 店铺ID
     * @returns 返回创建订单的结果
     */
    async createOrder(shopId) {
        var _a, _b, _c;
        // 根据购物车信息生成订单
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 调用tradeOrderService的createOrder方法创建订单
        return await (this === null || this === void 0 ? void 0 : this.tradeOrderService.createOrder(shopBuyerId, shopId));
    }
    /**
     * 分页查询交易订单
     * @param tradeState - 交易状态
     * @param shopId - 店铺ID
     * @param shopBuyerId - 买家ID
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    async page(tradeState = '', shopId, shopBuyerId = '', query, params, reqParam, page) {
        var _a, _b, _c, _d;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 调用tradeOrderService的page方法进行分页查询
        const data = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _c === void 0 ? void 0 : _c.page) === null || _d === void 0 ? void 0 : _d.call(_c, tradeState, shopId, shopBuyerId, query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询交易订单
     * @param id - 订单ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用tradeOrderService的getById方法根据ID查询交易订单
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 更新交易订单
     * @param obj - 交易订单对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用tradeOrderService的update方法更新交易订单
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
    /**
     * 审核退款
     * @param orderId - 订单ID
     * @returns 返回审核退款的结果
     */
    async auditRefund(orderId) {
        var _a;
        // 调用tradeOrderService的auditRefund方法审核退款
        return await ((_a = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _a === void 0 ? void 0 : _a.auditRefund(orderId));
    }
    /**
     * 获取交易订单图表数据
     * @returns 返回图表数据
     */
    async chart() {
        var _a;
        // 调用tradeOrderService的chart方法获取图表数据
        return await ((_a = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _a === void 0 ? void 0 : _a.chart());
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterTradeOrderTradeOrderController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterTradeOrderTradeOrderController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", tradeOrder_service_1.TradeOrderService)
], StaffWebUserCenterTradeOrderTradeOrderController.prototype, "tradeOrderService", void 0);
__decorate([
    (0, decorator_1.All)('/createOrder.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderTradeOrderController.prototype, "createOrder", null);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('tradeState')),
    __param(1, (0, decorator_1.Query)('shopId')),
    __param(2, (0, decorator_1.Query)('shopBuyerId')),
    __param(3, (0, decorator_1.Query)('query')),
    __param(4, (0, decorator_1.Query)()),
    __param(5, (0, decorator_1.Query)()),
    __param(6, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderTradeOrderController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderTradeOrderController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TradeOrder_1.TradeOrder]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderTradeOrderController.prototype, "update", null);
__decorate([
    (0, decorator_1.All)('/auditRefund.json'),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderTradeOrderController.prototype, "auditRefund", null);
__decorate([
    (0, decorator_1.All)('/chart.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderTradeOrderController.prototype, "chart", null);
StaffWebUserCenterTradeOrderTradeOrderController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/trade/tradeOrder')
], StaffWebUserCenterTradeOrderTradeOrderController);
exports.StaffWebUserCenterTradeOrderTradeOrderController = StaffWebUserCenterTradeOrderTradeOrderController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGVPcmRlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi91c2VyQ2VudGVyL3RyYWRlL3RyYWRlT3JkZXIvdHJhZGVPcmRlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUU3Qiw2RUFBMEU7QUFDMUUscUVBQWtFO0FBRWxFLDBGQUFzRjtBQUN0RixvRUFBaUU7QUFJakUsa0dBQTZGO0FBRTdGOzs7R0FHRztBQUVILElBQWEsZ0RBQWdELEdBQTdELE1BQWEsZ0RBQWdEO0lBQTdEO1FBQ0UsY0FBYztRQUVOLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFFNUIsYUFBYTtRQUVMLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0Isd0JBQXdCO1FBRWhCLHNCQUFpQixHQUFzQixJQUFJLENBQUM7SUFnR3RELENBQUM7SUE5RkM7Ozs7T0FJRztJQUVJLEtBQUssQ0FBQyxXQUFXLENBQWtCLE1BQU07O1FBQzlDLGNBQWM7UUFDZCxNQUFNLFdBQVcsR0FBVyxNQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLElBQUksMENBQUUsRUFBRSxDQUFDO1FBRXZELHdDQUF3QztRQUN4QyxPQUFPLE1BQU0sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQSxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDTSxhQUFhLEVBQUUsRUFDbkIsTUFBTSxFQUNELGNBQWMsRUFBRSxFQUN0QixLQUFhLEVBQ3BCLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJ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