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
exports.BuyerUniUserCenterTimeResTimeResJobController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const timeResJob_service_1 = require("../../../../../module/timeRes/timeResJob.service");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const TimeResJob_1 = require("../../../../../entity/TimeResJob");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家用户中心可预约时间段管理控制器
 */
let BuyerUniUserCenterTimeResTimeResJobController = class BuyerUniUserCenterTimeResTimeResJobController {
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
         * 注入可预约时间段管理服务
         */
        this.timeResJobService = null;
    }
    /**
     * 获取可预约时间段分页列表
     *
     * @param user - 用户信息
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    async page(user, query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "分页列表controller");
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用可预约时间段管理服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.timeResJobService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, shopBuyerId, user, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取可预约时间段信息
     *
     * @param id - 可预约时间段ID
     * @returns 返回可预约时间段信息
     */
    async getById(id) {
        var _a, _b;
        // 调用可预约时间段管理服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.timeResJobService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 更新可预约时间段信息
     *
     * @param obj - 可预约时间段对象
     * @param timestartStr - 开始时间字符串
     * @param timeEndStr - 结束时间字符串
     * @param day - 日期
     * @returns 返回更新结果
     */
    async update(obj, timestartStr, timeEndStr, day) {
        var _a, _b, _c, _d;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 打印当前用户的ID
        console.log(shopBuyerId);
        // 调用可预约时间段管理服务的更新方法
        return await ((_d = this === null || this === void 0 ? void 0 : this.timeResJobService) === null || _d === void 0 ? void 0 : _d.update(obj, timestartStr, timeEndStr, day, shopBuyerId));
    }
    /**
     * 更新场景信息
     *
     * @param username - 用户名
     * @returns 返回更新结果
     */
    async updateScene(username) {
        var _a, _b, _c, _d;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 调用可预约时间段管理服务的更新场景方法
        return await ((_d = this === null || this === void 0 ? void 0 : this.timeResJobService) === null || _d === void 0 ? void 0 : _d.updateScene(username, shopBuyerId));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterTimeResTimeResJobController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterTimeResTimeResJobController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", timeResJob_service_1.TimeResJobService)
], BuyerUniUserCenterTimeResTimeResJobController.prototype, "timeResJobService", void 0);
__decorate([
    (0, decorator_1.All)("/page.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("user")),
    __param(1, (0, decorator_1.Query)("query")),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTimeResTimeResJobController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)("/getById.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTimeResTimeResJobController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)("/update.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)()),
    __param(1, (0, decorator_1.Query)("timeStartStr")),
    __param(2, (0, decorator_1.Query)("timeEndStr")),
    __param(3, (0, decorator_1.Query)("day")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TimeResJob_1.TimeResJob, String, String, String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTimeResTimeResJobController.prototype, "update", null);
__decorate([
    (0, decorator_1.All)("/updateScene.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTimeResTimeResJobController.prototype, "updateScene", null);
BuyerUniUserCenterTimeResTimeResJobController = __decorate([
    (0, decorator_1.Controller)("/buyer/uni/userCenter/timeRes/timeResJob")
], BuyerUniUserCenterTimeResTimeResJobController);
exports.BuyerUniUserCenterTimeResTimeResJobController = BuyerUniUserCenterTimeResTimeResJobController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVJlc0pvYi5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3VuaS91c2VyQ2VudGVyL3RpbWVSZXMvdGltZVJlc0pvYi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE2RTtBQUU3RSx5RkFBcUY7QUFDckYsMEVBQXVFO0FBQ3ZFLGtFQUErRDtBQUUvRCxpRUFBOEQ7QUFFOUQsK0ZBQTBGO0FBSTFGOztHQUVHO0FBRUgsSUFBYSw2Q0FBNkMsR0FBMUQsTUFBYSw2Q0FBNkM7SUFBMUQ7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssc0JBQWlCLEdBQXNCLElBQUksQ0FBQztJQXdGdEQsQ0FBQztJQXZGQzs7Ozs7Ozs7O09BU0c7SUFFSSxLQUFLLENBQUMsSUFBSSxDQUNBLElBQUksRUFDSCxLQUFhLEVBQ3BCLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxZQUFZO1FBQ1osTUFBTSxXQUFXLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUN2RCxvQkFBb0I7UUFDcEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsaUJBQWlCLDBDQUFFLElBQUksbURBQzlDLFdBQVcs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