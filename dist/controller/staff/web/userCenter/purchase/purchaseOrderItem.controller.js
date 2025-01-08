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
exports.StaffWebUserCenterPurchaseOrderPurchaseOrderController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const purchaseOrderItem_service_1 = require("../../../../../module/purchase/purchaseOrderItem.service");
const PurchaseOrderItem_1 = require("../../../../../entity/PurchaseOrderItem");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心采购订单项控制器
 */
let StaffWebUserCenterPurchaseOrderPurchaseOrderController = class StaffWebUserCenterPurchaseOrderPurchaseOrderController {
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
         * 注入采购订单项服务
         */
        this.purchaseOrderItemService = null;
    }
    /**
     * 获取采购订单项分页列表
     *
     * @param orderId - 订单ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    async page(orderId = '', query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户的ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(staffId);
        // 调用采购订单项服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.purchaseOrderItemService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, orderId, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取采购订单项信息
     *
     * @param id - 采购订单项ID
     * @returns 返回采购订单项信息
     */
    async getById(id) {
        var _a, _b;
        // 调用采购订单项服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.purchaseOrderItemService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 更新采购订单项信息
     *
     * @param obj - 采购订单项对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用采购订单项服务的更新方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.purchaseOrderItemService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", purchaseOrderItem_service_1.PurchaseOrderItemService)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "purchaseOrderItemService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('orderId')),
    __param(1, (0, decorator_1.Query)('query')),
    __param(2, (0, decorator_1.Query)('params')),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PurchaseOrderItem_1.PurchaseOrderItem]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "update", null);
StaffWebUserCenterPurchaseOrderPurchaseOrderController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/purchaseOrder/purchaseOrderItem')
], StaffWebUserCenterPurchaseOrderPurchaseOrderController);
exports.StaffWebUserCenterPurchaseOrderPurchaseOrderController = StaffWebUserCenterPurchaseOrderPurchaseOrderController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyY2hhc2VPcmRlckl0ZW0uY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvdXNlckNlbnRlci9wdXJjaGFzZS9wdXJjaGFzZU9yZGVySXRlbS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUU3QiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELHdHQUFvRztBQUNwRywrRUFBNEU7QUFHNUUsK0ZBQTBGO0FBRTFGOztHQUVHO0FBRUgsSUFBYSxzREFBc0QsR0FBbkUsTUFBYSxzREFBc0Q7SUFBbkU7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssNkJBQXdCLEdBQTZCLElBQUksQ0FBQztJQTBEcEUsQ0FBQztJQXpEQzs7Ozs7Ozs7O09BU0c7SUFFSSxLQUFLLENBQUMsSUFBSSxDQUNHLFVBQVUsRUFBRSxFQUNkLEtBQWEsRUFDWixNQUFXLEVBQ25CLFFBQWtCLEVBQ2xCLElBQVU7O1FBRW5CLE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVk7UUFDWixNQUFNLE9BQU8sR0FBVyxNQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLElBQUksMENBQUUsRUFBRSxDQUFDO1FBQ25ELFlBQVk7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLGlCQUFpQjtRQUNqQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSx3QkFBd0IsMENBQUUsSUFBSSxtREFDckQsT0FBTyxFQUNQLEtBQUssRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLElBQUksQ0FDTCxDQUFBLENBQUM7UUFDRixTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsT0FBTyxDQUFjLEVBQVU7O1FBQzFDLHFCQUFxQjtRQUNyQixPQUFPLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLHdCQUF3QiwwQ0FBRSxPQUFPLG1EQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUM7SUFDN0QsQ0FBQztJQUNEOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLE1BQU0sQ0FBUyxHQUFzQjs7UUFDaEQsaUJBQWlCO1FBQ2pCLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsd0JBQXdCLDBDQUFFLE1BQU0sbURBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQztJQUM3RCxDQUFDO0NBQ0YsQ0FBQTtBQXBFQztJQURDLElBQUEsa0JBQU0sR0FBRTs7bUZBQ21CO0FBSzVCO0lBREMsSUFBQSxrQkFBTSxHQUFFOztzRkFDc0I7QUFLL0I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ3lCLG9EQUF3Qjt3R0FBUTtBQVlsRTtJQURDLElBQUEsZUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUV4RCxXQUFBLElBQUEsaUJBQUssRUFBQyxTQUFTLENBQUMsQ0FBQTtJQUNoQixXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxpQkFBSyxFQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2YsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTtJQUNQLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7OzZEQURXLG1CQUFRO1FBQ1osV0FBSTs7a0ZBa0JwQjtBQVFEO0lBREMsSUFBQSxlQUFHLEVBQUMsZUFBZSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ3hDLFdBQUEsSUFBQSxpQkFBSyxFQUFDLElBQUksQ0FBQyxDQUFBOzs7O3FGQUdoQztBQVFEO0lBREMsSUFBQSxlQUFHLEVBQUMsY0FBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ3hDLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7O3FDQUFNLHFDQUFpQjs7b0ZBR2pEO0FBeEVVLHNEQUFzRDtJQURsRSxJQUFBLHNCQUFVLEVBQUMsdURBQXVELENBQUM7R0FDdkQsc0RBQXNELENBeUVsRTtBQXpFWSx3SEFBc0QifQ==