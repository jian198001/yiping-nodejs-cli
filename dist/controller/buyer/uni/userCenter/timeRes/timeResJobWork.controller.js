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
exports.BuyerUniUserCenterTimeResTimeResJobWorkController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const timeResJobWork_service_1 = require("../../../../../module/timeRes/timeResJobWork.service");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const TimeResJobWork_1 = require("../../../../../entity/TimeResJobWork");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家用户中心工作时间管理控制器
 */
let BuyerUniUserCenterTimeResTimeResJobWorkController = class BuyerUniUserCenterTimeResTimeResJobWorkController {
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
         * 注入工作时间管理服务
         */
        this.timeResJobWorkService = null;
    }
    /**
     * 获取工作时间分页列表
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
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(shopBuyerId);
        // 调用工作时间管理服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.timeResJobWorkService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取工作时间信息
     *
     * @param id - 工作时间ID
     * @returns 返回工作时间信息
     */
    async getById(id) {
        var _a, _b;
        // 调用工作时间管理服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.timeResJobWorkService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 预约工作时间
     *
     * @param obj - 工作时间对象
     * @returns 返回预约结果
     */
    async work(obj) {
        var _a, _b, _c, _d;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 设置用户ID
        obj.userId = shopBuyerId;
        // 调用工作时间管理服务的预约方法
        return await ((_d = this === null || this === void 0 ? void 0 : this.timeResJobWorkService) === null || _d === void 0 ? void 0 : _d.work(obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterTimeResTimeResJobWorkController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterTimeResTimeResJobWorkController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", timeResJobWork_service_1.TimeResJobWorkService)
], BuyerUniUserCenterTimeResTimeResJobWorkController.prototype, "timeResJobWorkService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('query')),
    __param(1, (0, decorator_1.Query)()),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTimeResTimeResJobWorkController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTimeResTimeResJobWorkController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/work.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TimeResJobWork_1.TimeResJobWork]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterTimeResTimeResJobWorkController.prototype, "work", null);
BuyerUniUserCenterTimeResTimeResJobWorkController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/userCenter/timeRes/timeResJobWork')
], BuyerUniUserCenterTimeResTimeResJobWorkController);
exports.BuyerUniUserCenterTimeResTimeResJobWorkController = BuyerUniUserCenterTimeResTimeResJobWorkController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVJlc0pvYldvcmsuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9idXllci91bmkvdXNlckNlbnRlci90aW1lUmVzL3RpbWVSZXNKb2JXb3JrLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTZFO0FBRTdFLGlHQUE2RjtBQUM3RiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELHlFQUFzRTtBQUV0RSwrRkFBMEY7QUFJMUY7O0dBRUc7QUFFSCxJQUFhLGlEQUFpRCxHQUE5RCxNQUFhLGlEQUFpRDtJQUE5RDtRQUNFOztXQUVHO1FBRUssUUFBRyxHQUFZLElBQUksQ0FBQztRQUM1Qjs7V0FFRztRQUVLLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDL0I7O1dBRUc7UUFFSywwQkFBcUIsR0FBMEIsSUFBSSxDQUFDO0lBc0Q5RCxDQUFDO0lBckRDOzs7Ozs7OztPQVFHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ3BCLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxZQUFZO1FBQ1osTUFBTSxXQUFXLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUN2RCxZQUFZO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QixrQkFBa0I7UUFDbEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUscUJBQXFCLDBDQUFFLElBQUksbURBQUcsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQztRQUN0RixTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsT0FBTyxDQUFjLEVBQVU7O1FBQzFDLHNCQUFzQjtRQUN0QixPQUFPLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLHFCQUFxQiwwQ0FBRSxPQUFPLG1EQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUM7SUFDMUQsQ0FBQztJQUNEOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FBVSxHQUFtQjs7UUFDNUMsWUFBWTtRQUNaLE1BQU0sV0FBVyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFDdkQsU0FBUztRQUNULEdBQUcsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQ3pCLGtCQUFrQjtRQUNsQixPQUFPLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxxQkFBcUIsMENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7SUFDdEQsQ0FBQztDQUNGLENBQUE7QUFoRUM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OzhFQUNtQjtBQUs1QjtJQURDLElBQUEsa0JBQU0sR0FBRTs7aUZBQ3NCO0FBSy9CO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNzQiw4Q0FBcUI7Z0dBQVE7QUFXNUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFFeEQsV0FBQSxJQUFBLGlCQUFLLEVBQUMsT0FBTyxDQUFDLENBQUE7SUFDZCxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTtJQUNQLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7O3FEQURXLG1CQUFRO1FBQ1osV0FBSTs7NkVBWXBCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7Z0ZBR2hDO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7cUNBQU0sK0JBQWM7OzZFQU83QztBQXBFVSxpREFBaUQ7SUFEN0QsSUFBQSxzQkFBVSxFQUFDLDhDQUE4QyxDQUFDO0dBQzlDLGlEQUFpRCxDQXFFN0Q7QUFyRVksOEdBQWlEIn0=