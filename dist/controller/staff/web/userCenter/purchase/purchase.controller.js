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
const purchaseOrder_service_1 = require("../../../../../module/purchase/purchaseOrder.service");
const PurchaseOrder_1 = require("../../../../../entity/PurchaseOrder");
const Material_1 = require("../../../../../entity/Material");
const PurchaseOrderItem_1 = require("../../../../../entity/PurchaseOrderItem");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心采购订单控制器
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
         * 注入采购订单服务
         */
        this.purchaseOrderService = null;
    }
    /**
     * 获取采购订单分页列表
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
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '采购单分页列表controller');
        // 获取当前用户的ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用采购订单服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.purchaseOrderService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, staffId, '', query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取采购订单信息
     *
     * @param id - 采购订单ID
     * @returns 返回采购订单信息
     */
    async getById(id) {
        var _a, _b;
        // 调用采购订单服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.purchaseOrderService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 更新采购订单信息
     *
     * @param obj - 采购订单对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b, _c, _d, _e;
        // 设置采购订单的交易状态为编辑
        obj.tradeState = 'edit';
        // 获取当前用户的ID
        const staffId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 设置采购订单的创建用户ID
        obj.createUserId = staffId;
        // 调用采购订单服务的更新方法
        return await ((_e = (_d = this === null || this === void 0 ? void 0 : this.purchaseOrderService) === null || _d === void 0 ? void 0 : _d.update) === null || _e === void 0 ? void 0 : _e.call(_d, obj));
    }
    /**
     * 提交采购订单
     *
     * @param id - 采购订单ID
     * @returns 返回提交结果
     */
    async submit(id) {
        var _a;
        // 调用采购订单服务的提交方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.purchaseOrderService) === null || _a === void 0 ? void 0 : _a.submit(id));
    }
    /**
     * 更新采购订单项信息
     *
     * @param obj - 物料对象
     * @param purchaseOrderItem - 采购订单项对象
     * @param type - 更新类型
     * @returns 返回更新结果
     */
    async updateItem(obj, purchaseOrderItem, type) {
        var _a;
        // 调用采购订单服务的更新订单项方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.purchaseOrderService) === null || _a === void 0 ? void 0 : _a.updateItem(obj, purchaseOrderItem, type));
    }
    /**
     * 删除采购订单
     *
     * @param ids - 采购订单ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用采购订单服务的删除方法
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.purchaseOrderService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
        // 返回空值
        return null;
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
    __metadata("design:type", purchaseOrder_service_1.PurchaseOrderService)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "purchaseOrderService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('query')),
    __param(1, (0, decorator_1.Query)('params')),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReqParam_1.ReqParam,
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
    __metadata("design:paramtypes", [PurchaseOrder_1.PurchaseOrder]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "update", null);
__decorate([
    (0, decorator_1.All)('/submit.json'),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "submit", null);
__decorate([
    (0, decorator_1.All)('/updateItem.json'),
    __param(0, (0, decorator_1.Body)()),
    __param(1, (0, decorator_1.Body)()),
    __param(2, (0, decorator_1.Body)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Material_1.Material,
        PurchaseOrderItem_1.PurchaseOrderItem, String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "updateItem", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseOrderPurchaseOrderController.prototype, "del", null);
StaffWebUserCenterPurchaseOrderPurchaseOrderController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/purchaseOrder/purchaseOrder')
], StaffWebUserCenterPurchaseOrderPurchaseOrderController);
exports.StaffWebUserCenterPurchaseOrderPurchaseOrderController = StaffWebUserCenterPurchaseOrderPurchaseOrderController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyY2hhc2UuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvdXNlckNlbnRlci9wdXJjaGFzZS9wdXJjaGFzZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUU3QiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELGdHQUE0RjtBQUM1Rix1RUFBb0U7QUFDcEUsNkRBQTBEO0FBQzFELCtFQUE0RTtBQUc1RSwrRkFBMEY7QUFFMUY7O0dBRUc7QUFFSCxJQUFhLHNEQUFzRCxHQUFuRSxNQUFhLHNEQUFzRDtJQUFuRTtRQUNFOztXQUVHO1FBRUssUUFBRyxHQUFZLElBQUksQ0FBQztRQUM1Qjs7V0FFRztRQUVLLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDL0I7O1dBRUc7UUFFSyx5QkFBb0IsR0FBeUIsSUFBSSxDQUFDO0lBMEc1RCxDQUFDO0lBekdDOzs7Ozs7OztPQVFHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ1osTUFBVyxFQUNuQixRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsbUJBQW1CLENBQUMsQ0FBQztRQUMxQyxZQUFZO1FBQ1osTUFBTSxPQUFPLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUNuRCxnQkFBZ0I7UUFDaEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsb0JBQW9CLDBDQUFFLElBQUks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