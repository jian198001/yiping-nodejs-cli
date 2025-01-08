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
exports.StaffWebUserCenterInventoryInventoryController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const inventory_service_1 = require("../../../../../module/inventory/inventory.service");
const Inventory_1 = require("../../../../../entity/Inventory");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工Web用户中心库存控制器
 * 处理与库存相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
let StaffWebUserCenterInventoryInventoryController = class StaffWebUserCenterInventoryInventoryController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入InventoryService实例
        this.inventoryService = null;
    }
    /**
     * 分页查询库存记录
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
        // 调用inventoryService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.inventoryService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询库存记录
     * @param id - 库存记录ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用inventoryService的getById方法根据ID查询库存记录
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.inventoryService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除库存记录
     * @param ids - 库存记录ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用inventoryService的del方法删除库存记录
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.inventoryService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新库存记录
     * @param obj - 库存记录对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用inventoryService的update方法更新库存记录
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.inventoryService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterInventoryInventoryController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterInventoryInventoryController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", inventory_service_1.InventoryService)
], StaffWebUserCenterInventoryInventoryController.prototype, "inventoryService", void 0);
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
], StaffWebUserCenterInventoryInventoryController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterInventoryInventoryController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterInventoryInventoryController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Inventory_1.Inventory]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterInventoryInventoryController.prototype, "update", null);
StaffWebUserCenterInventoryInventoryController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/inventory/inventory')
], StaffWebUserCenterInventoryInventoryController);
exports.StaffWebUserCenterInventoryInventoryController = StaffWebUserCenterInventoryInventoryController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvc3RhZmYvd2ViL3VzZXJDZW50ZXIvaW52ZW50b3J5L2ludmVudG9yeS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUU3QiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELHlGQUFxRjtBQUNyRiwrREFBNEQ7QUFHNUQsK0ZBQTBGO0FBRTFGOzs7R0FHRztBQUVILElBQWEsOENBQThDLEdBQTNELE1BQWEsOENBQThDO0lBQTNEO1FBQ0UsY0FBYztRQUVOLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFFNUIsYUFBYTtRQUVMLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0IsdUJBQXVCO1FBRWYscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQThEcEQsQ0FBQztJQTVEQzs7Ozs7OztPQU9HO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ1osTUFBVyxFQUNuQixRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUV2QyxXQUFXO1FBQ1gsTUFBTSxPQUFPLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUVuRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJCLGtDQUFrQztRQUNsQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxnQkFBZ0IsMENBQUUsSUFBSSxtREFBRyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDO1FBQ2pGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsT0FBTyxDQUFjLEVBQVU7O1FBQzFDLHlDQUF5QztRQUN6QyxPQUFPLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGdCQUFnQiwwQ0FBRSxPQUFPLG1EQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsR0FBRyxDQUFTLEdBQWE7O1FBQ3BDLGlDQUFpQztRQUNqQyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxnQkFBZ0IsMENBQUUsR0FBRyxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBRUksS0FBSyxDQUFDLE1BQU0sQ0FBUyxHQUFjOztRQUN4QyxvQ0FBb0M7UUFDcEMsT0FBTyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxnQkFBZ0IsMENBQUUsTUFBTSxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDO0lBQ3JELENBQUM7Q0FDRixDQUFBO0FBdEVDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzsyRUFDbUI7QUFJNUI7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OzhFQUNzQjtBQUkvQjtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDaUIsb0NBQWdCO3dGQUFRO0FBV2xEO0lBREMsSUFBQSxlQUFHLEVBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBRXhELFdBQUEsSUFBQSxpQkFBSyxFQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2QsV0FBQSxJQUFBLGlCQUFLLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFDZixXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7cURBRFcsbUJBQVE7UUFDWixXQUFJOzswRUFhcEI7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLGVBQWUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUN4QyxXQUFBLElBQUEsaUJBQUssRUFBQyxJQUFJLENBQUMsQ0FBQTs7Ozs2RUFHaEM7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLFdBQVcsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUN4QyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O3lFQUd2QjtBQVFEO0lBREMsSUFBQSxlQUFHLEVBQUMsY0FBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ3hDLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7O3FDQUFNLHFCQUFTOzs0RUFHekM7QUF4RVUsOENBQThDO0lBRDFELElBQUEsc0JBQVUsRUFBQywyQ0FBMkMsQ0FBQztHQUMzQyw4Q0FBOEMsQ0F5RTFEO0FBekVZLHdHQUE4QyJ9