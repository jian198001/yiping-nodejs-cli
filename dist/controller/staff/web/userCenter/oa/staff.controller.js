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
exports.StaffWebUserCenterDeptStaffController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const staff_service_1 = require("../../../../../module/oa/staff.service");
const Staff_1 = require("../../../../../entity/Staff");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工Web用户中心OA员工控制器
 * 处理与员工相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
let StaffWebUserCenterDeptStaffController = class StaffWebUserCenterDeptStaffController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入StaffService实例
        this.staffService = null;
    }
    /**
     * 分页查询员工
     * @param deptId - 部门ID
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    async page(deptId = '', query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        console.log(staffId);
        // 调用staffService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.staffService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, deptId, query, params, reqParam, page));
        return data;
    }
    /**
     * 分页查询未分配员工
     * @param deptId - 部门ID
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    async unallocatedPage(deptId, query, params, reqParam, page) {
        var _a, _b;
        // 调用staffService的page方法进行分页查询
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.staffService) === null || _a === void 0 ? void 0 : _a.page) === null || _b === void 0 ? void 0 : _b.call(_a, deptId, query, params, reqParam, page));
    }
    /**
     * 根据ID查询员工
     * @param id - 员工ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用staffService的getById方法根据ID查询员工
        let data = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.staffService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
        // 如果查询结果为空，则返回一个空对象
        if (!data) {
            data = {};
        }
        // 初始化角色和授权角色数组
        data.roles = [];
        data.authRole = [];
        return data;
    }
    /**
     * 删除员工
     * @param ids - 员工ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用staffService的del方法删除员工
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.staffService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新员工
     * @param obj - 员工对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用staffService的update方法更新员工
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.staffService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterDeptStaffController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterDeptStaffController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", staff_service_1.StaffService)
], StaffWebUserCenterDeptStaffController.prototype, "staffService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('deptId')),
    __param(1, (0, decorator_1.Query)('query')),
    __param(2, (0, decorator_1.Query)('params')),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterDeptStaffController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/unallocatedPage.json'),
    __param(0, (0, decorator_1.Query)('deptId')),
    __param(1, (0, decorator_1.Query)('query')),
    __param(2, (0, decorator_1.Query)('params')),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterDeptStaffController.prototype, "unallocatedPage", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterDeptStaffController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterDeptStaffController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Staff_1.Staff]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterDeptStaffController.prototype, "update", null);
StaffWebUserCenterDeptStaffController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/oa/staff')
], StaffWebUserCenterDeptStaffController);
exports.StaffWebUserCenterDeptStaffController = StaffWebUserCenterDeptStaffController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZmYuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvdXNlckNlbnRlci9vYS9zdGFmZi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUU3QiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELDBFQUFzRTtBQUN0RSx1REFBb0Q7QUFHcEQsK0ZBQTBGO0FBRTFGOzs7R0FHRztBQUVILElBQWEscUNBQXFDLEdBQWxELE1BQWEscUNBQXFDO0lBQWxEO1FBQ0UsY0FBYztRQUVOLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFFNUIsYUFBYTtRQUVMLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0IsbUJBQW1CO1FBRVgsaUJBQVksR0FBaUIsSUFBSSxDQUFDO0lBdUc1QyxDQUFDO0lBckdDOzs7Ozs7OztPQVFHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDRSxTQUFTLEVBQUUsRUFDWixLQUFhLEVBQ1osTUFBVyxFQUNuQixRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUV2QyxXQUFXO1FBQ1gsTUFBTSxPQUFPLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUVuRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJCLDhCQUE4QjtRQUM5QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxZ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