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
exports.BuyerUniUserCenterSignInSignInController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const signIn_service_1 = require("../../../../../module/signIn/signIn.service");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const SignIn_1 = require("../../../../../entity/SignIn");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家用户中心签到控制器
 */
let BuyerUniUserCenterSignInSignInController = class BuyerUniUserCenterSignInSignInController {
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
         * 注入签到服务
         */
        this.signInService = null;
    }
    /**
     * 获取签到分页列表
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
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(shopBuyerId);
        // 调用签到服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.signInService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取签到信息
     *
     * @param id - 签到ID
     * @returns 返回签到信息
     */
    async getById(id) {
        var _a, _b;
        // 调用签到服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.signInService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 执行签到操作
     *
     * @param obj - 签到对象
     * @returns 返回签到结果
     */
    async signIn(obj) {
        var _a;
        // 调用签到服务的签到方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.signInService) === null || _a === void 0 ? void 0 : _a.signIn(obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterSignInSignInController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterSignInSignInController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", signIn_service_1.SignInService)
], BuyerUniUserCenterSignInSignInController.prototype, "signInService", void 0);
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
], BuyerUniUserCenterSignInSignInController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterSignInSignInController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/signIn.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignIn_1.SignIn]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterSignInSignInController.prototype, "signIn", null);
BuyerUniUserCenterSignInSignInController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/userCenter/signIn/signIn')
], BuyerUniUserCenterSignInSignInController);
exports.BuyerUniUserCenterSignInSignInController = BuyerUniUserCenterSignInSignInController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbkluLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvYnV5ZXIvdW5pL3VzZXJDZW50ZXIvc2lnbkluL3NpZ25Jbi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE2RTtBQUU3RSxnRkFBNEU7QUFDNUUsMEVBQXVFO0FBQ3ZFLGtFQUErRDtBQUUvRCx5REFBc0Q7QUFFdEQsK0ZBQTBGO0FBSTFGOztHQUVHO0FBRUgsSUFBYSx3Q0FBd0MsR0FBckQsTUFBYSx3Q0FBd0M7SUFBckQ7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFFNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBRS9COztXQUVHO1FBRUssa0JBQWEsR0FBa0IsSUFBSSxDQUFDO0lBeUQ5QyxDQUFDO0lBdkRDOzs7Ozs7OztPQVFHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ3BCLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUV2QyxZQUFZO1FBQ1osTUFBTSxXQUFXLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUV2RCxZQUFZO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6QixjQUFjO1FBQ2QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsYUFBYSwwQ0FBRSxJQUFJLG1EQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7UUFFOUUsU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLE9BQU8sQ0FBYyxFQUFVOztRQUMxQyxrQkFBa0I7UUFDbEIsT0FBTyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxhQUFhLDBDQUFFLE9BQU8sbURBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsTUFBTSxDQUFVLEdBQVc7O1FBQ3RDLGNBQWM7UUFDZCxPQUFPLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxhQUFhLDBDQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO0lBQ2hELENBQUM7Q0FDRixDQUFBO0FBckVDO0lBREMsSUFBQSxrQkFBTSxHQUFFOztxRUFDbUI7QUFNNUI7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O3dFQUNzQjtBQU0vQjtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDYyw4QkFBYTsrRUFBUTtBQVk1QztJQURDLElBQUEsZUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUV4RCxXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7SUFDUCxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7cURBRFcsbUJBQVE7UUFDWixXQUFJOztvRUFnQnBCO0FBU0Q7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7dUVBR2hDO0FBU0Q7SUFEQyxJQUFBLGVBQUcsRUFBQyxjQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7cUNBQU0sZUFBTTs7c0VBR3ZDO0FBekVVLHdDQUF3QztJQURwRCxJQUFBLHNCQUFVLEVBQUMscUNBQXFDLENBQUM7R0FDckMsd0NBQXdDLENBMEVwRDtBQTFFWSw0RkFBd0MifQ==