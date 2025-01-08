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
exports.StaffWebUserCenterLogAccessLogController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工Web用户中心在线日志控制器
 * 处理与在线日志相关的HTTP请求，如分页查询、根据ID查询、删除
 */
let StaffWebUserCenterLogAccessLogController = class StaffWebUserCenterLogAccessLogController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
    }
    /**
     * 分页查询在线日志
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    async page(query, params, reqParam, page) {
        var _a, _b, _c, _d, _e;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        console.log(staffId);
        // 返回空对象，待实现具体逻辑
        return {};
    }
    /**
     * 根据ID查询在线日志
     * @param id - 在线日志ID
     * @returns 返回查询结果
     */
    async getById(id) {
        // 返回空对象，待实现具体逻辑
        return {};
    }
    /**
     * 删除在线日志
     * @param ids - 在线日志ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        // 待实现具体逻辑
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterLogAccessLogController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterLogAccessLogController.prototype, "logger", void 0);
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
], StaffWebUserCenterLogAccessLogController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterLogAccessLogController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterLogAccessLogController.prototype, "del", null);
StaffWebUserCenterLogAccessLogController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/log/online')
], StaffWebUserCenterLogAccessLogController);
exports.StaffWebUserCenterLogAccessLogController = StaffWebUserCenterLogAccessLogController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25saW5lLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvc3RhZmYvd2ViL3VzZXJDZW50ZXIvbG9nL29ubGluZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFtRjtBQUVuRiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBSS9ELCtGQUEwRjtBQUUxRjs7O0dBR0c7QUFFSCxJQUFhLHdDQUF3QyxHQUFyRCxNQUFhLHdDQUF3QztJQUFyRDtRQUNFLGNBQWM7UUFFTixRQUFHLEdBQVksSUFBSSxDQUFDO1FBRTVCLGFBQWE7UUFFTCxXQUFNLEdBQVksSUFBSSxDQUFDO0lBaURqQyxDQUFDO0lBL0NDOzs7Ozs7O09BT0c7SUFFSSxLQUFLLENBQUMsSUFBSSxDQUNDLEtBQWEsRUFDWixNQUFXLEVBQ25CLFFBQWtCLEVBQ2xCLElBQVU7O1FBRW5CLE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXZDLFdBQVc7UUFDWCxNQUFNLE9BQU8sR0FBVyxNQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLElBQUksMENBQUUsRUFBRSxDQUFDO1FBRW5ELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckIsZ0JBQWdCO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsT0FBTyxDQUFjLEVBQVU7UUFDMUMsZ0JBQWdCO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsR0FBRyxDQUFTLEdBQWE7UUFDcEMsVUFBVTtJQUNaLENBQUM7Q0FDRixDQUFBO0FBckRDO0lBREMsSUFBQSxrQkFBTSxHQUFFOztxRUFDbUI7QUFJNUI7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O3dFQUNzQjtBQVcvQjtJQURDLElBQUEsZUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUV4RCxXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxpQkFBSyxFQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2YsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTtJQUNQLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7O3FEQURXLG1CQUFRO1FBQ1osV0FBSTs7b0VBWXBCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7dUVBR2hDO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OzttRUFFdkI7QUF2RFUsd0NBQXdDO0lBRHBELElBQUEsc0JBQVUsRUFBQyxrQ0FBa0MsQ0FBQztHQUNsQyx3Q0FBd0MsQ0F3RHBEO0FBeERZLDRGQUF3QyJ9