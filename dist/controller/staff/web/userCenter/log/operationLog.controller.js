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
exports.StaffWebUserCenterLogOperationLogController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const operationLog_service_1 = require("../../../../../module/log/operationLog.service");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工Web用户中心操作日志控制器
 * 处理与操作日志相关的HTTP请求，如分页查询、根据ID查询、删除
 */
let StaffWebUserCenterLogOperationLogController = class StaffWebUserCenterLogOperationLogController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入OperationLogService实例
        this.operationLogService = null;
    }
    /**
     * 分页查询操作日志
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
        // 调用operationLogService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.operationLogService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询操作日志
     * @param id - 操作日志ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用operationLogService的getById方法根据ID查询操作日志
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.operationLogService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除操作日志
     * @param ids - 操作日志ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用operationLogService的del方法删除操作日志
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.operationLogService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterLogOperationLogController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterLogOperationLogController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", operationLog_service_1.OperationLogService)
], StaffWebUserCenterLogOperationLogController.prototype, "operationLogService", void 0);
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
], StaffWebUserCenterLogOperationLogController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterLogOperationLogController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterLogOperationLogController.prototype, "del", null);
StaffWebUserCenterLogOperationLogController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/log/operationLog')
], StaffWebUserCenterLogOperationLogController);
exports.StaffWebUserCenterLogOperationLogController = StaffWebUserCenterLogOperationLogController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9uTG9nLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvc3RhZmYvd2ViL3VzZXJDZW50ZXIvbG9nL29wZXJhdGlvbkxvZy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFtRjtBQUVuRiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELHlGQUFxRjtBQUdyRiwrRkFBMEY7QUFFMUY7OztHQUdHO0FBRUgsSUFBYSwyQ0FBMkMsR0FBeEQsTUFBYSwyQ0FBMkM7SUFBeEQ7UUFDRSxjQUFjO1FBRU4sUUFBRyxHQUFZLElBQUksQ0FBQztRQUM1QixhQUFhO1FBRUwsV0FBTSxHQUFZLElBQUksQ0FBQztRQUMvQiwwQkFBMEI7UUFFbEIsd0JBQW1CLEdBQXdCLElBQUksQ0FBQztJQW1EMUQsQ0FBQztJQWxEQzs7Ozs7OztPQU9HO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ1osTUFBVyxFQUNuQixRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUV2QyxXQUFXO1FBQ1gsTUFBTSxPQUFPLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUVuRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJCLHFDQUFxQztRQUNyQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxtQkFBbUIsMENBQUUsSUFBSSxtREFBRyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDO1FBRXBGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsT0FBTyxDQUFjLEVBQVU7O1FBQzFDLDRDQUE0QztRQUM1QyxPQUFPLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLG1CQUFtQiwwQ0FBRSxPQUFPLG1EQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsR0FBRyxDQUFTLEdBQWE7O1FBQ3BDLG9DQUFvQztRQUNwQyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxtQkFBbUIsMENBQUUsR0FBRyxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDO0lBQzlDLENBQUM7Q0FDRixDQUFBO0FBekRDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzt3RUFDbUI7QUFHNUI7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OzJFQUNzQjtBQUcvQjtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDb0IsMENBQW1CO3dGQUFRO0FBVXhEO0lBREMsSUFBQSxlQUFHLEVBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBRXhELFdBQUEsSUFBQSxpQkFBSyxFQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2QsV0FBQSxJQUFBLGlCQUFLLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFDZixXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7cURBRFcsbUJBQVE7UUFDWixXQUFJOzt1RUFjcEI7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLGVBQWUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUN4QyxXQUFBLElBQUEsaUJBQUssRUFBQyxJQUFJLENBQUMsQ0FBQTs7OzswRUFHaEM7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLFdBQVcsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUN4QyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O3NFQUd2QjtBQTNEVSwyQ0FBMkM7SUFEdkQsSUFBQSxzQkFBVSxFQUFDLHdDQUF3QyxDQUFDO0dBQ3hDLDJDQUEyQyxDQTREdkQ7QUE1RFksa0dBQTJDIn0=