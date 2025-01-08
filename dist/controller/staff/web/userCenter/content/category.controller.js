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
exports.StaffWebUserCenterContentCategoryController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const category_service_1 = require("../../../../../module/content/category.service");
const Category_1 = require("../../../../../entity/Category");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工Web用户中心内容分类控制器
 * 处理与分类相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
let StaffWebUserCenterContentCategoryController = class StaffWebUserCenterContentCategoryController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入CategoryService实例
        this.categoryService = null;
    }
    /**
     * 分页查询分类
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
        // 调用categoryService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.categoryService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询分类
     * @param id - 分类ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用categoryService的getById方法根据ID查询分类
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.categoryService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除分类
     * @param ids - 分类ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用categoryService的del方法删除分类
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.categoryService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新分类
     * @param obj - 分类对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用categoryService的update方法更新分类
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.categoryService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterContentCategoryController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterContentCategoryController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", category_service_1.CategoryService)
], StaffWebUserCenterContentCategoryController.prototype, "categoryService", void 0);
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
], StaffWebUserCenterContentCategoryController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterContentCategoryController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterContentCategoryController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category_1.Category]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterContentCategoryController.prototype, "update", null);
StaffWebUserCenterContentCategoryController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/content/category')
], StaffWebUserCenterContentCategoryController);
exports.StaffWebUserCenterContentCategoryController = StaffWebUserCenterContentCategoryController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvdXNlckNlbnRlci9jb250ZW50L2NhdGVnb3J5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBTzZCO0FBRTdCLDBFQUF1RTtBQUN2RSxrRUFBK0Q7QUFFL0QscUZBQWlGO0FBQ2pGLDZEQUEwRDtBQUcxRCwrRkFBMEY7QUFFMUY7OztHQUdHO0FBRUgsSUFBYSwyQ0FBMkMsR0FBeEQsTUFBYSwyQ0FBMkM7SUFBeEQ7UUFDRSxjQUFjO1FBRU4sUUFBRyxHQUFZLElBQUksQ0FBQztRQUM1QixhQUFhO1FBRUwsV0FBTSxHQUFZLElBQUksQ0FBQztRQUMvQixzQkFBc0I7UUFFZCxvQkFBZSxHQUFvQixJQUFJLENBQUM7SUE4RGxELENBQUM7SUE3REM7Ozs7Ozs7T0FPRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQ0MsS0FBYSxFQUNaLE1BQVcsRUFDbkIsUUFBa0IsRUFDbEIsSUFBVTs7UUFFbkIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGdCQUFnQixDQUFDLENBQUM7UUFFdkMsV0FBVztRQUNYLE1BQU0sT0FBTyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFFbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyQixpQ0FBaUM7UUFDakMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZUFBZSwwQ0FBRSxJQUFJLG1EQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7UUFFaEYsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQWMsRUFBVTs7UUFDMUMsc0NBQXNDO1FBQ3RDLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZUFBZSwwQ0FBRSxPQUFPLG1EQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsR0FBRyxDQUFTLEdBQWE7O1FBQ3BDLDhCQUE4QjtRQUM5QixNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxlQUFlLDBDQUFFLEdBQUcsbURBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVJLEtBQUssQ0FBQyxNQUFNLENBQVMsR0FBYTs7UUFDdkMsaUNBQWlDO1FBQ2pDLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZUFBZSwwQ0FBRSxNQUFNLG1EQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUM7SUFDcEQsQ0FBQztDQUNGLENBQUE7QUFwRUM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O3dFQUNtQjtBQUc1QjtJQURDLElBQUEsa0JBQU0sR0FBRTs7MkVBQ3NCO0FBRy9CO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNnQixrQ0FBZTtvRkFBUTtBQVVoRDtJQURDLElBQUEsZUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUV4RCxXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxpQkFBSyxFQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2YsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTtJQUNQLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7O3FEQURXLG1CQUFRO1FBQ1osV0FBSTs7dUVBY3BCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7MEVBR2hDO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OztzRUFHdkI7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLGNBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUN4QyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOztxQ0FBTSxtQkFBUTs7eUVBR3hDO0FBdEVVLDJDQUEyQztJQUR2RCxJQUFBLHNCQUFVLEVBQUMsd0NBQXdDLENBQUM7R0FDeEMsMkNBQTJDLENBdUV2RDtBQXZFWSxrR0FBMkMifQ==