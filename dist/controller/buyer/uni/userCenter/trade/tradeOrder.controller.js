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
exports.BuyerUniUserCenterTradeOrderTradeOrderController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const tradeOrder_service_1 = require("../../../../../module/trade/tradeOrder.service");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const TradeOrder_1 = require("../../../../../entity/TradeOrder");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家用户中心交易订单控制器
 */
let BuyerUniUserCenterTradeOrderTradeOrderController = class BuyerUniUserCenterTradeOrderTradeOrderController {
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
         * 注入交易订单服务
         */
        this.tradeOrderService = null;
    }
    /**
     * 获取交易订单分页列表
     *
     * @param tradeState - 交易状态
     * @param shopId - 店铺ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    async page(tradeState = '', shopId, query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用交易订单服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, tradeState, shopId, shopBuyerId, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 统计不同交易状态的订单数量
     *
     * @param shopId - 店铺ID
     * @returns 返回统计结果
     */
    async countTradeState(shopId) {
        var _a, _b, _c, _d;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 调用交易订单服务的统计方法
        return await ((_d = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _d === void 0 ? void 0 : _d.countTradeState(shopId, shopBuyerId));
    }
    /**
     * 根据ID获取交易订单
     *
     * @param id - 交易订单ID
     * @returns 返回交易订单信息
     */
    async getById(id) {
        var _a, _b;
        // 调用交易订单服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 更新交易订单
     *
     * @param obj - 交易订单对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b, _c, _d, _e;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 设置用户ID
        obj.shopBuyerId = shopBuyerId;
        // 调用交易订单服务的更新方法
        return await ((_e = (_d = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _d === void 0 ? void 0 : _d.update) === null || _e === void 0 ? void 0 : _e.call(_d, obj));
    }
    /**
     * 根据购物车信息创建订单
     *
     * @param cartItems - 购物车项
     * @param shopId - 店铺ID
     * @returns 返回创建结果
     */
    async createOrder(cartItems = [], shopId) {
        var _a, _b, _c, _d, _e, _f;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '根据购物车信息生成订单');
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用交易订单服务的创建订单方法
        return await ((_f = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _f === void 0 ? void 0 : _f.createOrder(shopBuyerId, shopId, cartItems));
    }
    /**
     * 立即购买
     *
     * @param totalAmount - 总金额
     * @param message - 留言
     * @returns 返回购买结果
     */
    async amountBuy(totalAmount = 0.0, message = '') {
        var _a, _b, _c, _d, _e, _f;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '商品详情-立即购买');
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用交易订单服务的立即购买方法
        return await ((_f = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _f === void 0 ? void 0 : _f.amountBuy(totalAmount, message, shopBuyerId, null));
    }
    /**
     * 立即购买
     *
     * @param map - 参数映射
     * @returns 返回购买结果
     */
    async buy(map) {
        var _a, _b, _c, _d, _e, _f;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '商品详情-立即购买');
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用交易订单服务的立即购买方法
        return await ((_f = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _f === void 0 ? void 0 : _f.buy(map, shopBuyerId, 0.01));
    }
    /**
     * 更新订单地址
     *
     * @param id - 订单ID
     * @param addressId - 地址ID
     * @returns 返回更新结果
     */
    async updateAddress(id, addressId) {
        var _a;
        // 调用交易订单服务的更新地址方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _a === void 0 ? void 0 : _a.updateAddress(id, addressId));
    }
    /**
     * 更新订单留言
     *
     * @param id - 订单ID
     * @param message - 留言
     * @returns 返回更新结果
     */
    async updateMessage(id, message) {
        var _a;
        // 调用交易订单服务的更新留言方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _a === void 0 ? void 0 : _a.updateMessage(id, message));
    }
    /**
     * 微信支付统一下单
     *
     * @param id - 订单ID
     * @returns 返回下单结果
     */
    async wxpayUnifiedOrder(id) {
        var _a;
        // 调用交易订单服务的微信支付统一下单方法
        return (_a = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _a === void 0 ? void 0 : _a.wxpayUnifiedOrder(id);
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", tradeOrder_service_1.TradeOrderService)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "tradeOrderService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('tradeState')),
    __param(1, (0, decorator_1.Query)('shopId')),
    __param(2, (0, decorator_1.Query)('query')),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __param(5, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/countTradeState.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "countTradeState", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TradeOrder_1.TradeOrder]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "update", null);
__decorate([
    (0, decorator_1.All)('/createOrder.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __param(1, (0, decorator_1.Query)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "createOrder", null);
__decorate([
    (0, decorator_1.All)('/amountBuy.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('totalAmount')),
    __param(1, (0, decorator_1.Query)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "amountBuy", null);
__decorate([
    (0, decorator_1.All)('/buy.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "buy", null);
__decorate([
    (0, decorator_1.All)('/updateAddress.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __param(1, (0, decorator_1.Query)('addressId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "updateAddress", null);
__decorate([
    (0, decorator_1.All)('/updateMessage.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __param(1, (0, decorator_1.Query)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "updateMessage", null);
__decorate([
    (0, decorator_1.All)('/wxpayUnifiedOrder.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTradeOrderTradeOrderController.prototype, "wxpayUnifiedOrder", null);
BuyerUniUserCenterTradeOrderTradeOrderController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/userCenter/trade/tradeOrder')
], BuyerUniUserCenterTradeOrderTradeOrderController);
exports.BuyerUniUserCenterTradeOrderTradeOrderController = BuyerUniUserCenterTradeOrderTradeOrderController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGVPcmRlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3VuaS91c2VyQ2VudGVyL3RyYWRlL3RyYWRlT3JkZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFPNkI7QUFFN0IsdUZBQW1GO0FBQ25GLDBFQUF1RTtBQUN2RSxrRUFBK0Q7QUFFL0QsaUVBQThEO0FBRTlELCtGQUEwRjtBQUkxRjs7R0FFRztBQUVILElBQWEsZ0RBQWdELEdBQTdELE1BQWEsZ0RBQWdEO0lBQTdEO1FBQ0U7O1dBRUc7UUFFSyxRQUFHLEdBQVksSUFBSSxDQUFDO1FBQzVCOztXQUVHO1FBRUssV0FBTSxHQUFZLElBQUksQ0FBQztRQUMvQjs7V0FFRztRQUVLLHNCQUFpQixHQUFzQixJQUFJLENBQUM7SUFvTXRELENBQUM7SUFuTUM7Ozs7Ozs7Ozs7T0FVRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQ00sYUFBYSxFQUFFLEVBQ25CLE1BQU0sRUFDUCxLQUFhLEVBQ3BCLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxZQUFZO1FBQ1osTUFBTSxXQUFXLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUN2RCxnQkFBZ0I7UUFDaEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsaUJBQWlCLDBDQUFFLElB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