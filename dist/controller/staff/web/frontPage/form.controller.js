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
exports.StaffWebFrontPageFormFormController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../module/common/model/Page");
const form_service_1 = require("../../../../module/form/form.service");
/**
 * 员工Web前端页面表单控制器
 * 处理与表单相关的HTTP请求，如分页查询和根据编码查询表单
 */
let StaffWebFrontPageFormFormController = class StaffWebFrontPageFormFormController {
    constructor() {
        // 注入FormService实例
        this.formService = null;
    }
    /**
     * 分页查询表单
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    async page(query, params, reqParam, page) {
        var _a, _b;
        // 调用formService的page方法进行分页查询
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.formService) === null || _a === void 0 ? void 0 : _a.page) === null || _b === void 0 ? void 0 : _b.call(_a, query, params, reqParam, page));
    }
    /**
     * 根据编码查询表单
     * @param code - 表单编码
     * @returns 返回查询结果
     */
    async getByCode(code) {
        var _a;
        // 调用formService的getByCode方法根据编码查询表单
        return await ((_a = this === null || this === void 0 ? void 0 : this.formService) === null || _a === void 0 ? void 0 : _a.getByCode(code));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", form_service_1.FormService)
], StaffWebFrontPageFormFormController.prototype, "formService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json'),
    __param(0, (0, decorator_1.Query)('query')),
    __param(1, (0, decorator_1.Query)()),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebFrontPageFormFormController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getByCode.json'),
    __param(0, (0, decorator_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebFrontPageFormFormController.prototype, "getByCode", null);
StaffWebFrontPageFormFormController = __decorate([
    (0, decorator_1.Controller)('/staff/web/frontPage/form/form')
], StaffWebFrontPageFormFormController);
exports.StaffWebFrontPageFormFormController = StaffWebFrontPageFormFormController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi9mcm9udFBhZ2UvZm9ybS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxRTtBQUVyRSx1RUFBb0U7QUFDcEUsK0RBQTREO0FBQzVELHVFQUFtRTtBQUVuRTs7O0dBR0c7QUFFSCxJQUFhLG1DQUFtQyxHQUFoRCxNQUFhLG1DQUFtQztJQUFoRDtRQUNFLGtCQUFrQjtRQUVWLGdCQUFXLEdBQWdCLElBQUksQ0FBQztJQStCMUMsQ0FBQztJQTdCQzs7Ozs7OztPQU9HO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ3BCLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVOztRQUVuQiw2QkFBNkI7UUFDN0IsT0FBTyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxXQUFXLDBDQUFFLElBQUksbURBQUcsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVJLEtBQUssQ0FBQyxTQUFTLENBQWdCLElBQVk7O1FBQ2hELG9DQUFvQztRQUNwQyxPQUFPLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxXQUFXLDBDQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO0lBQ2xELENBQUM7Q0FDRixDQUFBO0FBL0JDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNZLDBCQUFXO3dFQUFRO0FBV3hDO0lBREMsSUFBQSxlQUFHLEVBQUMsWUFBWSxDQUFDO0lBRWYsV0FBQSxJQUFBLGlCQUFLLEVBQUMsT0FBTyxDQUFDLENBQUE7SUFDZCxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTtJQUNQLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7O3FEQURXLG1CQUFRO1FBQ1osV0FBSTs7K0RBSXBCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxpQkFBaUIsQ0FBQztJQUNDLFdBQUEsSUFBQSxpQkFBSyxFQUFDLE1BQU0sQ0FBQyxDQUFBOzs7O29FQUdwQztBQWpDVSxtQ0FBbUM7SUFEL0MsSUFBQSxzQkFBVSxFQUFDLGdDQUFnQyxDQUFDO0dBQ2hDLG1DQUFtQyxDQWtDL0M7QUFsQ1ksa0ZBQW1DIn0=