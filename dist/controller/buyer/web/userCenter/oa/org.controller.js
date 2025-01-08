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
exports.BuyerWebUserCenterDeptOrgController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const org_service_1 = require("../../../../../module/oa/org.service");
const Org_1 = require("../../../../../entity/Org");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家Web用户中心OA组织控制器
 * 处理与组织相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
let BuyerWebUserCenterDeptOrgController = class BuyerWebUserCenterDeptOrgController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入OrgService实例
        this.orgService = null;
    }
    /**
     * 分页查询组织
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
        // 调用orgService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.orgService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询组织
     * @param id - 组织ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用orgService的getById方法根据ID查询组织
        let data = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.orgService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
        // 如果查询结果为空，则返回一个空对象
        if (!data) {
            data = {};
        }
        return data;
    }
    /**
     * 删除组织
     * @param ids - 组织ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用orgService的del方法删除组织
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.orgService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
        return null;
    }
    /**
     * 更新组织
     * @param obj - 组织对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用orgService的update方法更新组织
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.orgService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerWebUserCenterDeptOrgController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerWebUserCenterDeptOrgController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", org_service_1.OrgService)
], BuyerWebUserCenterDeptOrgController.prototype, "orgService", void 0);
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
], BuyerWebUserCenterDeptOrgController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterDeptOrgController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterDeptOrgController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Org_1.Org]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterDeptOrgController.prototype, "update", null);
BuyerWebUserCenterDeptOrgController = __decorate([
    (0, decorator_1.Controller)('/buyer/web/userCenter/oa/org')
], BuyerWebUserCenterDeptOrgController);
exports.BuyerWebUserCenterDeptOrgController = BuyerWebUserCenterDeptOrgController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvYnV5ZXIvd2ViL3VzZXJDZW50ZXIvb2Evb3JnLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBTzZCO0FBRTdCLDBFQUF1RTtBQUN2RSxrRUFBK0Q7QUFFL0Qsc0VBQWtFO0FBQ2xFLG1EQUFnRDtBQUdoRCwrRkFBMEY7QUFFMUY7OztHQUdHO0FBRUgsSUFBYSxtQ0FBbUMsR0FBaEQsTUFBYSxtQ0FBbUM7SUFBaEQ7UUFDRSxjQUFjO1FBRU4sUUFBRyxHQUFZLElBQUksQ0FBQztRQUU1QixhQUFhO1FBRUwsV0FBTSxHQUFZLElBQUksQ0FBQztRQUUvQixpQkFBaUI7UUFFVCxlQUFVLEdBQWUsSUFBSSxDQUFDO0lBcUV4QyxDQUFDO0lBbkVDOzs7Ozs7O09BT0c7SUFFSSxLQUFLLENBQUMsSUFBSSxDQUNDLEtBQWEsRUFDcEIsTUFBVyxFQUNYLFFBQWtCLEVBQ2xCLElBQVU7O1FBRW5CLE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXZDLFdBQVc7UUFDWCxNQUFNLFdBQVcsR0FBVyxNQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLElBQUksMENBQUUsRUFBRSxDQUFDO1FBRXZELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekIsNEJBQTRCO1FBQzVCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsSUFBSSxtREFBRyxL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