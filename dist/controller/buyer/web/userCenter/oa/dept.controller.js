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
exports.BuyerWebUserCenterDeptDeptController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const dept_service_1 = require("../../../../../module/oa/dept.service");
const Dept_1 = require("../../../../../entity/Dept");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家Web用户中心OA部门控制器
 * 处理与部门相关的HTTP请求，如分页查询、根据ID查询和更新
 */
let BuyerWebUserCenterDeptDeptController = class BuyerWebUserCenterDeptDeptController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入DeptService实例
        this.deptService = null;
    }
    /**
     * 分页查询部门
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
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        console.log(shopBuyerId);
        // 调用deptService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.deptService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询部门
     * @param id - 部门ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用deptService的getById方法根据ID查询部门
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.deptService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 更新部门
     * @param obj - 部门对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用deptService的update方法更新部门
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.deptService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerWebUserCenterDeptDeptController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerWebUserCenterDeptDeptController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", dept_service_1.DeptService)
], BuyerWebUserCenterDeptDeptController.prototype, "deptService", void 0);
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
], BuyerWebUserCenterDeptDeptController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterDeptDeptController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Dept_1.Dept]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterDeptDeptController.prototype, "update", null);
BuyerWebUserCenterDeptDeptController = __decorate([
    (0, decorator_1.Controller)('/buyer/web/userCenter/oa/dept')
], BuyerWebUserCenterDeptDeptController);
exports.BuyerWebUserCenterDeptDeptController = BuyerWebUserCenterDeptDeptController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3dlYi91c2VyQ2VudGVyL29hL2RlcHQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFPNkI7QUFFN0IsMEVBQXVFO0FBQ3ZFLGtFQUErRDtBQUUvRCx3RUFBb0U7QUFDcEUscURBQWtEO0FBRWxELCtGQUEwRjtBQUkxRjs7O0dBR0c7QUFFSCxJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztJQUFqRDtRQUNFLGNBQWM7UUFFTixRQUFHLEdBQVksSUFBSSxDQUFDO1FBQzVCLGFBQWE7UUFFTCxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9CLGtCQUFrQjtRQUVWLGdCQUFXLEdBQWdCLElBQUksQ0FBQztJQW1EMUMsQ0FBQztJQWxEQzs7Ozs7OztPQU9HO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ3BCLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUV2QyxXQUFXO1FBQ1gsTUFBTSxXQUFXLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUV2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXpCLDZCQUE2QjtRQUM3QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxXQUFXLDBDQUFFLElBQUksbURBQUcsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQztRQUU1RSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBRUksS0FBSyxDQUFDLE9BQU8sQ0FBYyxFQUFVOztRQUMxQyxrQ0FBa0M7UUFDbEMsT0FBTyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxXQUFXLDBDQUFFLE9BQU8sbURBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVJLEtBQUssQ0FBQyxNQUFNLENBQVMsR0FBUzs7UUFDbkMsNkJBQTZCO1FBQzdCLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsV0FBVywwQ0FBRSxNQUFNLG1EQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUM7SUFDaEQsQ0FBQztDQUNGLENBQUE7QUF6REM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O2lFQUNtQjtBQUc1QjtJQURDLElBQUEsa0JBQU0sR0FBRTs7b0VBQ3NCO0FBRy9CO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNZLDBCQUFXO3lFQUFRO0FBVXhDO0lBREMsSUFBQSxlQUFHLEVBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBRXhELFdBQUEsSUFBQSxpQkFBSyxFQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2QsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTtJQUNQLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7SUFDUCxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBOztxREFEVyxtQkFBUTtRQUNaLFdBQUk7O2dFQWNwQjtBQVFEO0lBREMsSUFBQSxlQUFHLEVBQUMsZUFBZSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ3hDLFdBQUEsSUFBQSxpQkFBSyxFQUFDLElBQUksQ0FBQyxDQUFBOzs7O21FQUdoQztBQVFEO0lBREMsSUFBQSxlQUFHLEVBQUMsY0FBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ3hDLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7O3FDQUFNLFdBQUk7O2tFQUdwQztBQTNEVSxvQ0FBb0M7SUFEaEQsSUFBQSxzQkFBVSxFQUFDLCtCQUErQixDQUFDO0dBQy9CLG9DQUFvQyxDQTREaEQ7QUE1RFksb0ZBQW9DIn0=