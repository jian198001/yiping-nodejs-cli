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
exports.StaffWebUserCenterAuthRoleController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const role_service_1 = require("../../../../../module/auth/role.service");
const Role_1 = require("../../../../../entity/Role");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工Web用户中心权限角色控制器
 * 负责处理与角色相关的HTTP请求，如分页查询、根据ID查询、删除、更新和更新数据范围
 */
let StaffWebUserCenterAuthRoleController = class StaffWebUserCenterAuthRoleController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入RoleService实例
        this.roleService = null;
    }
    /**
     * 分页查询角色
     * @param userId - 用户ID
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    async page(userId, query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        console.log(staffId);
        // 调用roleService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.roleService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, userId, true, query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询角色
     * @param id - 角色ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用roleService的getById方法根据ID查询角色
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.roleService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除角色
     * @param ids - 角色ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用roleService的del方法删除角色
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.roleService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新角色
     * @param obj - 角色对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用roleService的update方法更新角色
        const data = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.roleService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
        return data;
    }
    /**
     * 更新角色数据范围
     * @param obj - 角色对象
     * @returns 返回更新结果
     */
    async updateDataScope(obj) {
        var _a;
        // 调用roleService的updateDataScope方法更新角色数据范围
        const data = await ((_a = this === null || this === void 0 ? void 0 : this.roleService) === null || _a === void 0 ? void 0 : _a.updateDataScope(obj));
        return data;
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterAuthRoleController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterAuthRoleController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", role_service_1.RoleService)
], StaffWebUserCenterAuthRoleController.prototype, "roleService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('userId')),
    __param(1, (0, decorator_1.Query)('query')),
    __param(2, (0, decorator_1.Query)('params')),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterAuthRoleController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterAuthRoleController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterAuthRoleController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Role_1.Role]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterAuthRoleController.prototype, "update", null);
__decorate([
    (0, decorator_1.All)('/updateDataScope.json'),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Role_1.Role]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterAuthRoleController.prototype, "updateDataScope", null);
StaffWebUserCenterAuthRoleController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/auth/role')
], StaffWebUserCenterAuthRoleController);
exports.StaffWebUserCenterAuthRoleController = StaffWebUserCenterAuthRoleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi91c2VyQ2VudGVyL2F1dGgvcm9sZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUU3QiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELDBFQUFzRTtBQUN0RSxxREFBa0Q7QUFHbEQsK0ZBQTBGO0FBRTFGOzs7R0FHRztBQUVILElBQWEsb0NBQW9DLEdBQWpELE1BQWEsb0NBQW9DO0lBQWpEO1FBQ0UsY0FBYztRQUVOLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFFNUIsYUFBYTtRQUVMLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0Isa0JBQWtCO1FBRVYsZ0JBQVcsR0FBZ0IsSUFBSSxDQUFDO0lBa0YxQyxDQUFDO0lBaEZDOzs7Ozs7OztPQVFHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDRSxNQUFjLEVBQ2YsS0FBYSxFQUNaLE1BQVcsRUFDbkIsUUFBa0IsRUFDbEIsSUFBVTs7UUFFbkIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGdCQUFnQixDQUFDLENBQUM7UUFFdkMsV0FBVztRQUNYLE1BQU0sT0FBTyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFFbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyQiw2QkFBNkI7UUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsV0FBVyww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