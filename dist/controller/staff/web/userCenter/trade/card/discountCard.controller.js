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
exports.StaffWebUserCenterCardDiscountCardController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../../module/common/model/Page");
const discountCard_service_1 = require("../../../../../../module/trade/discountCard.service");
const DiscountCard_1 = require("../../../../../../entity/DiscountCard");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心折扣卡控制器
 */
let StaffWebUserCenterCardDiscountCardController = class StaffWebUserCenterCardDiscountCardController {
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
         * 注入折扣卡服务
         */
        this.discountCardService = null;
    }
    /**
     * 获取折扣卡分页列表
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
        // 调用折扣卡服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.discountCardService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取折扣卡信息
     *
     * @param id - 折扣卡ID
     * @returns 返回折扣卡信息
     */
    async getById(id) {
        var _a, _b;
        // 调用折扣卡服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.discountCardService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除折扣卡
     *
     * @param ids - 折扣卡ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用折扣卡服务的删除方法
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.discountCardService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
        // 返回空值
        return null;
    }
    /**
     * 更新折扣卡信息
     *
     * @param obj - 折扣卡对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用折扣卡服务的更新方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.discountCardService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterCardDiscountCardController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterCardDiscountCardController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", discountCard_service_1.DiscountCardService)
], StaffWebUserCenterCardDiscountCardController.prototype, "discountCardService", void 0);
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
], StaffWebUserCenterCardDiscountCardController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterCardDiscountCardController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterCardDiscountCardController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DiscountCard_1.DiscountCard]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterCardDiscountCardController.prototype, "update", null);
StaffWebUserCenterCardDiscountCardController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/card/discountCard')
], StaffWebUserCenterCardDiscountCardController);
exports.StaffWebUserCenterCardDiscountCardController = StaffWebUserCenterCardDiscountCardController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY291bnRDYXJkLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvc3RhZmYvd2ViL3VzZXJDZW50ZXIvdHJhZGUvY2FyZC9kaXNjb3VudENhcmQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFPNkI7QUFFN0IsNkVBQTBFO0FBQzFFLHFFQUFrRTtBQUVsRSw4RkFBMEY7QUFDMUYsd0VBQXFFO0FBSXJFLGtHQUE2RjtBQUU3Rjs7R0FFRztBQUVILElBQWEsNENBQTRDLEdBQXpELE1BQWEsNENBQTRDO0lBQXpEO1FBQ0U7O1dBRUc7UUFFSyxRQUFHLEdBQVksSUFBSSxDQUFDO1FBQzVCOztXQUVHO1FBRUssV0FBTSxHQUFZLElBQUksQ0FBQztRQUMvQjs7V0FFRztRQUVLLHdCQUFtQixHQUF3QixJQUFJLENBQUM7SUF1RTFELENBQUM7SUF0RUM7Ozs7Ozs7O09BUUc7SUFFSSxLQUFLLENBQUMsSUFBSSxDQUNDLEtBQWEsRUFDWixNQUFXLEVBQ25CLFFBQWtCLEVBQ2xCLElBQVU7O1FBRW5CLE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXZDLFlBQVk7UUFDWixNQUFNLE9BQU8sR0FBVyxNQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLElBQUksMENBQUUsRUFBRSxDQUFDO1FBRW5ELFlBQVk7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJCLGVBQWU7UUFDZixNQUFNLElBQUksR0FBRyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVC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