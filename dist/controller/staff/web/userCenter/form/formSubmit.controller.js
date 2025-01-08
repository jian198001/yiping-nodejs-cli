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
exports.StaffWebUserCenterFormFormSubmitController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const formSubmit_service_1 = require("../../../../../module/form/formSubmit.service");
const FormSubmit_1 = require("../../../../../entity/FormSubmit");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工Web用户中心表单提交控制器
 * 处理与表单提交相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
let StaffWebUserCenterFormFormSubmitController = class StaffWebUserCenterFormFormSubmitController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入FormSubmitService实例
        this.formSubmitService = null;
    }
    /**
     * 分页查询表单提交记录
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
        // 调用formSubmitService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.formSubmitService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询表单提交记录
     * @param id - 表单提交记录ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用formSubmitService的getById方法根据ID查询表单提交记录
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.formSubmitService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除表单提交记录
     * @param ids - 表单提交记录ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用formSubmitService的del方法删除表单提交记录
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.formSubmitService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新表单提交记录
     * @param obj - 表单提交记录对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用formSubmitService的update方法更新表单提交记录
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.formSubmitService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterFormFormSubmitController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterFormFormSubmitController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", formSubmit_service_1.FormSubmitService)
], StaffWebUserCenterFormFormSubmitController.prototype, "formSubmitService", void 0);
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
], StaffWebUserCenterFormFormSubmitController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterFormFormSubmitController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterFormFormSubmitController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FormSubmit_1.FormSubmit]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterFormFormSubmitController.prototype, "update", null);
StaffWebUserCenterFormFormSubmitController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/form/formSubmit')
], StaffWebUserCenterFormFormSubmitController);
exports.StaffWebUserCenterFormFormSubmitController = StaffWebUserCenterFormFormSubmitController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybVN1Ym1pdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi91c2VyQ2VudGVyL2Zvcm0vZm9ybVN1Ym1pdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUU3QiwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELHNGQUFrRjtBQUNsRixpRUFBOEQ7QUFHOUQsK0ZBQTBGO0FBRTFGOzs7R0FHRztBQUVILElBQWEsMENBQTBDLEdBQXZELE1BQWEsMENBQTBDO0lBQXZEO1FBQ0UsY0FBYztRQUVOLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFFNUIsYUFBYTtRQUVMLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0Isd0JBQXdCO1FBRWhCLHNCQUFpQixHQUFzQixJQUFJLENBQUM7SUE4RHRELENBQUM7SUE1REM7Ozs7Ozs7T0FPRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQ0MsS0FBYSxFQUNaLE1BQVcsRUFDbkIsUUFBa0IsRUFDbEIsSUFBVTs7UUFFbkIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGdCQUFnQixDQUFDLENBQUM7UUFFdkMsV0FBVztRQUNYLE1BQU0sT0FBTyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFFbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyQixtQ0FBbUM7UUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsaUJBQWlCLDBDQUFFLElBQUksbURBQUcsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQztRQUNsRixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBRUksS0FBSyxDQUFDLE9BQU8sQ0FBYyxFQUFVOztRQUMxQyw0Q0FBNEM7UUFDNUMsT0FBTyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxpQkFBaUIsMENBQUUsT0FBTyxtREFBRyxFQUFFLENBQUMsQ0FBQSxDQUFDO0lBQ3RELENBQUM7SUFFRDs7OztPQUlHO0lBRUksS0FBSyxDQUFDLEdBQUcsQ0FBUyxHQUFhOztRQUNwQyxvQ0FBb0M7UUFDcEMsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsaUJBQWlCLDBDQUFFLEdBQUcsbURBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVJLEtBQUssQ0FBQyxNQUFNLENBQVMsR0FBZTs7UUFDekMsdUNBQXVDO1FBQ3ZDLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsaUJBQWlCLDBDQUFFLE1BQU0sbURBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQztJQUN0RCxDQUFDO0NBQ0YsQ0FBQTtBQXRFQztJQURDLElBQUEsa0JBQU0sR0FBRTs7dUVBQ21CO0FBSTVCO0lBREMsSUFBQSxrQkFBTSxHQUFFOzswRUFDc0I7QUFJL0I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ2tCLHNDQUFpQjtxRkFBUTtBQVdwRDtJQURDLElBQUEsZUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUV4RCxXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxpQkFBSyxFQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2YsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTtJQUNQLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7O3FEQURXLG1CQUFRO1FBQ1osV0FBSTs7c0VBYXBCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7eUVBR2hDO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OztxRUFHdkI7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLGNBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUN4QyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOztxQ0FBTSx1QkFBVTs7d0VBRzFDO0FBeEVVLDBDQUEwQztJQUR0RCxJQUFBLHNCQUFVLEVBQUMsdUNBQXVDLENBQUM7R0FDdkMsMENBQTBDLENBeUV0RDtBQXpFWSxnR0FBMEMifQ==