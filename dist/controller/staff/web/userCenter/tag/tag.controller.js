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
exports.StaffWebUserCenterTagTagController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const tag_service_1 = require("../../../../../module/tag/tag.service");
const Tag_1 = require("../../../../../entity/Tag");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心标签控制器
 */
let StaffWebUserCenterTagTagController = class StaffWebUserCenterTagTagController {
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
         * 注入标签服务
         */
        this.tagService = null;
    }
    /**
     * 获取标签分页列表
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
        // 调用标签服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.tagService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取标签信息
     *
     * @param id - 标签ID
     * @returns 返回标签信息
     */
    async getById(id) {
        var _a, _b;
        // 调用标签服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.tagService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除标签
     *
     * @param ids - 标签ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用标签服务的删除方法
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.tagService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
        // 返回空值
        return null;
    }
    /**
     * 更新标签信息
     *
     * @param obj - 标签对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用标签服务的更新方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.tagService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterTagTagController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterTagTagController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", tag_service_1.TagService)
], StaffWebUserCenterTagTagController.prototype, "tagService", void 0);
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
], StaffWebUserCenterTagTagController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTagTagController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTagTagController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Tag_1.Tag]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTagTagController.prototype, "update", null);
StaffWebUserCenterTagTagController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/tag/tag')
], StaffWebUserCenterTagTagController);
exports.StaffWebUserCenterTagTagController = StaffWebUserCenterTagTagController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvc3RhZmYvd2ViL3VzZXJDZW50ZXIvdGFnL3RhZy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUU3QiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELHVFQUFtRTtBQUNuRSxtREFBZ0Q7QUFHaEQsK0ZBQTBGO0FBRTFGOztHQUVHO0FBRUgsSUFBYSxrQ0FBa0MsR0FBL0MsTUFBYSxrQ0FBa0M7SUFBL0M7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssZUFBVSxHQUFlLElBQUksQ0FBQztJQStEeEMsQ0FBQztJQTlEQzs7Ozs7Ozs7T0FRRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQ0MsS0FBYSxFQUNaLE1BQVcsRUFDbkIsUUFBa0IsRUFDbEIsSUFBVTs7UUFFbkIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGdCQUFnQixDQUFDLENBQUM7UUFDdkMsWUFBWTtRQUNaLE1BQU0sT0FBTyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFDbkQsWUFBWTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsY0FBYztRQUNkLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsSUFBSSxtREFBRyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDO1FBQzNFLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRDs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQWMsRUFBVTs7UUFDMUMsa0JBQWtCO1FBQ2xCLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsVUFBVSwwQ0FBRSxPQUFPLG1EQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUM7SUFDL0MsQ0FBQztJQUNEOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLEdBQUcsQ0FBUyxHQUFhOztRQUNwQyxjQUFjO1FBQ2QsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsVUFBVSwwQ0FBRSxHQUFHLG1EQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDbkMsT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNEOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLE1BQU0sQ0FBUyxHQUFROztRQUNsQyxjQUFjO1FBQ2QsT0FBTyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLDBDQUFFLE1BQU0sbURBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQztJQUMvQyxDQUFDO0NBQ0YsQ0FBQTtBQXpFQztJQURDLElBQUEsa0JBQU0sR0FBRTs7K0RBQ21CO0FBSzVCO0lBREMsSUFBQSxrQkFBTSxHQUFFOztrRUFDc0I7QUFLL0I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1csd0JBQVU7c0VBQVE7QUFXdEM7SUFEQyxJQUFBLGVBQUcsRUFBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFFeEQsV0FBQSxJQUFBLGlCQUFLLEVBQUMsT0FBTyxDQUFDLENBQUE7SUFDZCxXQUFBLElBQUEsaUJBQUssRUFBQyxRQUFRLENBQUMsQ0FBQTtJQUNmLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7SUFDUCxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBOztxREFEVyxtQkFBUTtRQUNaLFdBQUk7OzhEQVlwQjtBQVFEO0lBREMsSUFBQSxlQUFHLEVBQUMsZUFBZSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ3hDLFdBQUEsSUFBQSxpQkFBSyxFQUFDLElBQUksQ0FBQyxDQUFBOzs7O2lFQUdoQztBQVFEO0lBREMsSUFBQSxlQUFHLEVBQUMsV0FBVyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ3hDLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7Ozs7NkRBS3ZCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxjQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7cUNBQU0sU0FBRzs7Z0VBR25DO0FBN0VVLGtDQUFrQztJQUQ5QyxJQUFBLHNCQUFVLEVBQUMsK0JBQStCLENBQUM7R0FDL0Isa0NBQWtDLENBOEU5QztBQTlFWSxnRkFBa0MifQ==