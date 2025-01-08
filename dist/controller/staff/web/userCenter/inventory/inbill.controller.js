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
exports.StaffWebUserCenterInventoryInbillController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const purchaseOrder_service_1 = require("../../../../../module/purchase/purchaseOrder.service");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
const inbill_service_1 = require("../../../../../module/inventory/inbill.service");
/**
 * 员工Web用户中心库存入库单控制器
 * 处理与库存入库单相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
let StaffWebUserCenterInventoryInbillController = class StaffWebUserCenterInventoryInbillController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入PurchaseOrderService实例
        this.purchaseOrderService = null;
        // 注入InbillService实例
        this.inbillService = null;
    }
    /**
     * 分页查询库存入库单
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    async page(query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        console.log(staffId);
        // 获取当前用户角色ID
        const roleId = staffId;
        // 调用purchaseOrderService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.purchaseOrderService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, roleId, 'DELIVERY', query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询库存入库单
     * @param id - 库存入库单ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用purchaseOrderService的getById方法根据ID查询库存入库单
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.purchaseOrderService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除库存入库单
     * @param ids - 库存入库单ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用purchaseOrderService的del方法删除库存入库单
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.purchaseOrderService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 采购入库
     * @param data - 采购入库数据
     * @returns 返回采购入库结果
     */
    async purchaseInstock(data) {
        var _a, _b;
        // 调用purchaseOrderService的purchaseInstock方法进行采购入库
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.purchaseOrderService) === null || _a === void 0 ? void 0 : _a.purchaseInstock) === null || _b === void 0 ? void 0 : _b.call(_a, data));
    }
    /**
     * 消费入库
     * @param data - 消费入库数据
     * @returns 返回消费入库结果
     */
    async consumeInstock(data) {
        var _a, _b;
        // 构造入库单列表
        const list = [{
                id: data === null || data === void 0 ? void 0 : data.id,
                instockQuantity: data === null || data === void 0 ? void 0 : data.instockQuantity,
                materialId: data === null || data === void 0 ? void 0 : data.materialId,
                billId: data === null || data === void 0 ? void 0 : data.id,
            }];
        // 调用inbillService的consumeInbill方法进行消费入库
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.inbillService) === null || _a === void 0 ? void 0 : _a.consumeInbill) === null || _b === void 0 ? void 0 : _b.call(_a, data, list));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterInventoryInbillController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterInventoryInbillController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", purchaseOrder_service_1.PurchaseOrderService)
], StaffWebUserCenterInventoryInbillController.prototype, "purchaseOrderService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", inbill_service_1.InbillService)
], StaffWebUserCenterInventoryInbillController.prototype, "inbillService", void 0);
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
], StaffWebUserCenterInventoryInbillController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterInventoryInbillController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterInventoryInbillController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/purchaseInstock.json'),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterInventoryInbillController.prototype, "purchaseInstock", null);
__decorate([
    (0, decorator_1.All)('/consumeInstock.json'),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterInventoryInbillController.prototype, "consumeInstock", null);
StaffWebUserCenterInventoryInbillController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/inventory/inbill')
], StaffWebUserCenterInventoryInbillController);
exports.StaffWebUserCenterInventoryInbillController = StaffWebUserCenterInventoryInbillController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5iaWxsLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvc3RhZmYvd2ViL3VzZXJDZW50ZXIvaW52ZW50b3J5L2luYmlsbC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUNxQztBQUVyQywwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELGdHQUE0RjtBQUU1RiwrRkFBMEY7QUFDMUYsbUZBQStFO0FBRS9FOzs7R0FHRztBQUVILElBQWEsMkNBQTJDLEdBQXhELE1BQWEsMkNBQTJDO0lBQXhEO1FBQ0UsY0FBYztRQUVOLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFFNUIsYUFBYTtRQUVMLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0IsMkJBQTJCO1FBRW5CLHlCQUFvQixHQUF5QixJQUFJLENBQUM7UUFFMUQsb0JBQW9CO1FBRVosa0JBQWEsR0FBa0IsSUFBSSxDQUFDO0lBdUY5QyxDQUFDO0lBckZDOzs7Ozs7O09BT0c7SUFFSSxLQUFLLENBQUMsSUFBSSxDQUNDLEtBQWEsRUFDWixNQUFXLEVBQ25CLFFBQWtCLEVBQ2xCLElBQVU7O1FBRW5CLE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXZDLFdBQVc7UUFDWCxNQUFNLE9BQU8sR0FBVyxNQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLElBQUksMENBQUUsRUFBRSxDQUFDO1FBRW5ELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckIsYUFBYTtRQUNiLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUV2QixzQ0FB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