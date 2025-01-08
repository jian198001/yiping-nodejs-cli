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
exports.StaffWebUserCenterCardGrouponCardController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../../module/common/model/Page");
const grouponCard_service_1 = require("../../../../../../module/trade/grouponCard.service");
const GrouponCard_1 = require("../../../../../../entity/GrouponCard");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心团购卡控制器
 */
let StaffWebUserCenterCardGrouponCardController = class StaffWebUserCenterCardGrouponCardController {
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
         * 注入团购卡服务
         */
        this.grouponCardService = null;
    }
    /**
     * 获取团购卡分页列表
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
        // 调用团购卡服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.grouponCardService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取团购卡信息
     *
     * @param id - 团购卡ID
     * @returns 返回团购卡信息
     */
    async getById(id) {
        var _a, _b;
        // 调用团购卡服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.grouponCardService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除团购卡
     *
     * @param ids - 团购卡ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用团购卡服务的删除方法
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.grouponCardService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
        // 返回空值
        return null;
    }
    /**
     * 更新团购卡信息
     *
     * @param obj - 团购卡对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用团购卡服务的更新方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.grouponCardService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterCardGrouponCardController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterCardGrouponCardController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", grouponCard_service_1.GrouponCardService)
], StaffWebUserCenterCardGrouponCardController.prototype, "grouponCardService", void 0);
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
], StaffWebUserCenterCardGrouponCardController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterCardGrouponCardController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterCardGrouponCardController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GrouponCard_1.GrouponCard]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterCardGrouponCardController.prototype, "update", null);
StaffWebUserCenterCardGrouponCardController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/card/grouponCard')
], StaffWebUserCenterCardGrouponCardController);
exports.StaffWebUserCenterCardGrouponCardController = StaffWebUserCenterCardGrouponCardController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBvbkNhcmQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvdXNlckNlbnRlci90cmFkZS9jYXJkL2dyb3Vwb25DYXJkLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBTzZCO0FBRTdCLDZFQUEwRTtBQUMxRSxxRUFBa0U7QUFFbEUsNEZBQXdGO0FBQ3hGLHNFQUFtRTtBQUluRSxrR0FBNkY7QUFFN0Y7O0dBRUc7QUFFSCxJQUFhLDJDQUEyQyxHQUF4RCxNQUFhLDJDQUEyQztJQUF4RDtRQUNFOztXQUVHO1FBRUssUUFBRyxHQUFZLElBQUksQ0FBQztRQUM1Qjs7V0FFRztRQUVLLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDL0I7O1dBRUc7UUFFSyx1QkFBa0IsR0FBdUIsSUFBSSxDQUFDO0lBK0R4RCxDQUFDO0lBOURDOzs7Ozs7OztPQVFHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ1osTUFBVyxFQUNuQixRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxZQUFZO1FBQ1osTUFBTSxPQUFPLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUNuRCxZQUFZO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixlQUFlO1FBQ2YsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFB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