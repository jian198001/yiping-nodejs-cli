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
exports.StaffWebFrontPageWxpayController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const tradeOrder_service_1 = require("../../../../module/trade/tradeOrder.service");
const buyer_service_1 = require("../../../../module/trade/buyer.service");
/**
 * 员工Web前端页面微信支付控制器
 * 处理与微信支付相关的HTTP请求，如支付通知和批量转账
 */
let StaffWebFrontPageWxpayController = class StaffWebFrontPageWxpayController {
    constructor() {
        // 注入TradeOrderService实例
        this.tradeOrderService = null;
        // 注入BuyerService实例
        this.buyerService = null;
    }
    /**
     * 处理微信支付通知的请求
     * @param data - 包含支付通知数据的对象
     * @param shopId - 店铺ID
     * @returns 返回支付通知处理结果
     */
    async paymentNotice(data, shopId) {
        // shopId = 'YIgOhFMdQssHi6Ol6C8sbFVrIfSZHP5D'
        // 调用tradeOrderService的paymentNotice方法处理支付通知
        return await (this === null || this === void 0 ? void 0 : this.tradeOrderService.paymentNotice(data, shopId));
    }
    /**
     * 处理批量转账的请求
     * @returns 返回批量转账处理结果
     */
    async batchesTransfer() {
        const shopId = 'YIgOhFMdQssHi6Ol6C8sbFVrIfSZHP5D';
        // 调用buyerService的batchesTransfer方法进行批量转账
        return await (this === null || this === void 0 ? void 0 : this.buyerService.batchesTransfer(shopId, null));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", tradeOrder_service_1.TradeOrderService)
], StaffWebFrontPageWxpayController.prototype, "tradeOrderService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", buyer_service_1.BuyerService)
], StaffWebFrontPageWxpayController.prototype, "buyerService", void 0);
__decorate([
    (0, decorator_1.All)('/paymentNotice/:shopId'),
    __param(0, (0, decorator_1.Body)()),
    __param(1, (0, decorator_1.Param)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StaffWebFrontPageWxpayController.prototype, "paymentNotice", null);
__decorate([
    (0, decorator_1.All)('/batchesTransfer.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffWebFrontPageWxpayController.prototype, "batchesTransfer", null);
StaffWebFrontPageWxpayController = __decorate([
    (0, decorator_1.Controller)('/staff/web/frontPage/wxpay')
], StaffWebFrontPageWxpayController);
exports.StaffWebFrontPageWxpayController = StaffWebFrontPageWxpayController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hwYXkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvZnJvbnRQYWdlL3d4cGF5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTJFO0FBRTNFLG9GQUFnRjtBQUNoRiwwRUFBc0U7QUFFdEU7OztHQUdHO0FBRUgsSUFBYSxnQ0FBZ0MsR0FBN0MsTUFBYSxnQ0FBZ0M7SUFBN0M7UUFDRSx3QkFBd0I7UUFFaEIsc0JBQWlCLEdBQXNCLElBQUksQ0FBQztRQUVwRCxtQkFBbUI7UUFFWCxpQkFBWSxHQUFpQixJQUFJLENBQUM7SUE4QjVDLENBQUM7SUE1QkM7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsYUFBYSxDQUNoQixJQUFTLEVBQ0EsTUFBYztRQUUvQiw4Q0FBOEM7UUFFOUMsNENBQTRDO1FBQzVDLE9BQU8sTUFBTSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxlQUFlO1FBQzFCLE1BQU0sTUFBTSxHQUFHLGtDQUFrQyxDQUFDO1FBRWxELHlDQUF5QztRQUN6QyxPQUFPLE1BQU0sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsWUFBWSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQztJQUNoRSxDQUFDO0NBQ0YsQ0FBQTtBQWxDQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDa0Isc0NBQWlCOzJFQUFRO0FBSXBEO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNhLDRCQUFZO3NFQUFRO0FBUzFDO0lBREMsSUFBQSxlQUFHLEVBQUMsd0JBQXdCLENBQUM7SUFFM0IsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTtJQUNOLFdBQUEsSUFBQSxpQkFBSyxFQUFDLFFBQVEsQ0FBQyxDQUFBOzs7O3FFQU1qQjtBQU9EO0lBREMsSUFBQSxlQUFHLEVBQUMsdUJBQXVCLENBQUM7Ozs7dUVBTTVCO0FBcENVLGdDQUFnQztJQUQ1QyxJQUFBLHNCQUFVLEVBQUMsNEJBQTRCLENBQUM7R0FDNUIsZ0NBQWdDLENBcUM1QztBQXJDWSw0RUFBZ0MifQ==