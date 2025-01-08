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
exports.StaffWebUserCenterPurchaseMaterialController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const material_service_1 = require("../../../../../module/purchase/material.service");
const Material_1 = require("../../../../../entity/Material");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心采购物料控制器
 */
let StaffWebUserCenterPurchaseMaterialController = class StaffWebUserCenterPurchaseMaterialController {
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
         * 注入物料服务
         */
        this.materialService = null;
    }
    /**
     * 获取物料分页列表
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
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户的ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(staffId);
        // 调用物料服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.materialService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取物料信息
     *
     * @param id - 物料ID
     * @returns 返回物料信息
     */
    async getById(id) {
        var _a, _b;
        // 调用物料服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.materialService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除物料
     *
     * @param ids - 物料ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用物料服务的删除方法
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.materialService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
        // 返回空值
        return null;
    }
    /**
     * 更新物料信息
     *
     * @param obj - 物料对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用物料服务的更新方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.materialService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
    /**
     * 上架物料
     *
     * @param id - 物料ID
     * @returns 返回上架结果
     */
    async onsale(id) {
        var _a;
        // 调用物料服务的上架方法
        await ((_a = this === null || this === void 0 ? void 0 : this.materialService) === null || _a === void 0 ? void 0 : _a.onsale(id));
        // 返回空值
        return null;
    }
    /**
     * 下架物料
     *
     * @param id - 物料ID
     * @returns 返回下架结果
     */
    async instock(id) {
        var _a;
        // 调用物料服务的下架方法
        await ((_a = this === null || this === void 0 ? void 0 : this.materialService) === null || _a === void 0 ? void 0 : _a.instock(id));
        // 返回空值
        return null;
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterPurchaseMaterialController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterPurchaseMaterialController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", material_service_1.MaterialService)
], StaffWebUserCenterPurchaseMaterialController.prototype, "materialService", void 0);
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
], StaffWebUserCenterPurchaseMaterialController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseMaterialController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseMaterialController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Material_1.Material]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseMaterialController.prototype, "update", null);
__decorate([
    (0, decorator_1.All)('/onsale.json'),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseMaterialController.prototype, "onsale", null);
__decorate([
    (0, decorator_1.All)('/instock.json'),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterPurchaseMaterialController.prototype, "instock", null);
StaffWebUserCenterPurchaseMaterialController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/purchase/material')
], StaffWebUserCenterPurchaseMaterialController);
exports.StaffWebUserCenterPurchaseMaterialController = StaffWebUserCenterPurchaseMaterialController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvdXNlckNlbnRlci9wdXJjaGFzZS9tYXRlcmlhbC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUU3QiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELHNGQUFrRjtBQUNsRiw2REFBMEQ7QUFHMUQsK0ZBQTBGO0FBRTFGOztHQUVHO0FBRUgsSUFBYSw0Q0FBNEMsR0FBekQsTUFBYSw0Q0FBNEM7SUFBekQ7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssb0JBQWUsR0FBb0IsSUFBSSxDQUFDO0lBeUZsRCxDQUFDO0lBeEZDOzs7Ozs7OztPQVFHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ1osTUFBVyxFQUNuQixRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxZQUFZO1FBQ1osTUFBTSxPQUFPLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUNuRCxZQUFZO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixjQUFjO1FBQ2QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENB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