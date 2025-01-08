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
exports.StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../../module/common/model/Page");
const deliveryTemplateLocale_service_1 = require("../../../../../../module/trade/deliveryTemplateLocale.service");
const DeliveryTemplateLocale_1 = require("../../../../../../entity/DeliveryTemplateLocale");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心配送模板地区控制器
 */
let StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController = class StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController {
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
         * 注入配送模板地区服务
         */
        this.deliveryTemplateLocaleService = null;
    }
    /**
     * 获取配送模板地区分页列表
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
        // 调用配送模板地区服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.deliveryTemplateLocaleService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取配送模板地区信息
     *
     * @param id - 配送模板地区ID
     * @returns 返回配送模板地区信息
     */
    async getById(id) {
        var _a, _b;
        // 调用配送模板地区服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.deliveryTemplateLocaleService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除配送模板地区
     *
     * @param ids - 配送模板地区ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用配送模板地区服务的删除方法
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.deliveryTemplateLocaleService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
        // 返回空值
        return null;
    }
    /**
     * 更新配送模板地区信息
     *
     * @param obj - 配送模板地区对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用配送模板地区服务的更新方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.deliveryTemplateLocaleService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", deliveryTemplateLocale_service_1.DeliveryTemplateLocaleService)
], StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController.prototype, "deliveryTemplateLocaleService", void 0);
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
], StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeliveryTemplateLocale_1.DeliveryTemplateLocale]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController.prototype, "update", null);
StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/deliveryTemplate/deliveryTemplateLocale')
], StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController);
exports.StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController = StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnlUZW1wbGF0ZUxvY2FsZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi91c2VyQ2VudGVyL3RyYWRlL2RlbGl2ZXJ5VGVtcGxhdGUvZGVsaXZlcnlUZW1wbGF0ZUxvY2FsZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUU3Qiw2RUFBMEU7QUFDMUUscUVBQWtFO0FBRWxFLGtIQUE4RztBQUM5Ryw0RkFBeUY7QUFJekYsa0dBQTZGO0FBRTdGOztHQUVHO0FBRUgsSUFBYSxrRUFBa0UsR0FBL0UsTUFBYSxrRUFBa0U7SUFBL0U7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssa0NBQTZCLEdBQWtDLElBQUksQ0FBQztJQTRFOUUsQ0FBQztJQTNFQzs7Ozs7Ozs7T0FRRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQ0MsS0FBYSxFQUNaLE1BQVcsRUFDbkIsUUFBa0IsRUFDbEIsSUFBVTs7UUFFbkIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGdCQUFnQixDQUFDLENBQUM7UUFFdkMsWUFBWTtRQUNaLE1BQU0sT0FBTyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFFbkQsWUFBWTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckIsa0JBQWtCO1FBQ2xCLE1BQU0sSUFBSSxHQUFHLE1B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