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
exports.BuyerUniUserCenterNoticeNoticeController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const notice_service_1 = require("../../../../../module/notice/notice.service");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const Notice_1 = require("../../../../../entity/Notice");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家用户中心通知控制器
 */
let BuyerUniUserCenterNoticeNoticeController = class BuyerUniUserCenterNoticeNoticeController {
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
         * 注入通知服务
         */
        this.noticeService = null;
    }
    /**
     * 获取通知分页列表
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
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "分页列表controller");
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(shopBuyerId);
        // 调用通知服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.noticeService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取通知
     *
     * @param id - 通知ID
     * @returns 返回通知信息
     */
    async getById(id) {
        var _a, _b;
        // 调用通知服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.noticeService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 更新通知
     *
     * @param obj - 通知对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用通知服务的更新方法
        return (_b = (_a = this === null || this === void 0 ? void 0 : this.noticeService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj);
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterNoticeNoticeController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterNoticeNoticeController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", notice_service_1.NoticeService)
], BuyerUniUserCenterNoticeNoticeController.prototype, "noticeService", void 0);
__decorate([
    (0, decorator_1.All)("/page.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("query")),
    __param(1, (0, decorator_1.Query)()),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterNoticeNoticeController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)("/getById.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterNoticeNoticeController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)("/update.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Notice_1.Notice]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterNoticeNoticeController.prototype, "update", null);
BuyerUniUserCenterNoticeNoticeController = __decorate([
    (0, decorator_1.Controller)("/buyer/uni/userCenter/notice/notice")
], BuyerUniUserCenterNoticeNoticeController);
exports.BuyerUniUserCenterNoticeNoticeController = BuyerUniUserCenterNoticeNoticeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWNlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvYnV5ZXIvdW5pL3VzZXJDZW50ZXIvbm90aWNlL25vdGljZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE2RTtBQUU3RSxnRkFBNEU7QUFDNUUsMEVBQXVFO0FBQ3ZFLGtFQUErRDtBQUUvRCx5REFBc0Q7QUFFdEQsK0ZBQTBGO0FBSTFGOztHQUVHO0FBRUgsSUFBYSx3Q0FBd0MsR0FBckQsTUFBYSx3Q0FBd0M7SUFBckQ7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssa0JBQWEsR0FBa0IsSUFBSSxDQUFDO0lBdUQ5QyxDQUFDO0lBdERDOzs7Ozs7OztPQVFHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ3BCLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxZQUFZO1FBQ1osTUFBTSxXQUFXLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUN2RCxZQUFZO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QixjQUFjO1FBQ2QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsYUFBYSwwQ0FBRSxJQUFJLG1EQUMxQyxLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixJQUFJLENBQ0wsQ0FBQSxDQUFDO1FBQ0YsU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNEOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLE9BQU8sQ0FBYyxFQUFVOztRQUMxQyxrQkFBa0I7UUFDbEIsT0FBTyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxhQUFhLDBDQUFFLE9BQU8sbURBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQztJQUNsRCxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsTUFBTSxDQUFVLEdBQVc7O1FBQ3RDLGNBQWM7UUFDZCxPQUFPLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsYUFBYSwwQ0FBRSxNQUFNLG1EQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRixDQUFBO0FBakVDO0lBREMsSUFBQSxrQkFBTSxHQUFFOztxRUFDbUI7QUFLNUI7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O3dFQUNzQjtBQUsvQjtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDYyw4QkFBYTsrRUFBUTtBQVc1QztJQURDLElBQUEsZUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUV4RCxXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7SUFDUCxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7cURBRFcsbUJBQVE7UUFDWixXQUFJOztvRUFpQnBCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7dUVBR2hDO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxjQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7cUNBQU0sZUFBTTs7c0VBR3ZDO0FBckVVLHdDQUF3QztJQURwRCxJQUFBLHNCQUFVLEVBQUMscUNBQXFDLENBQUM7R0FDckMsd0NBQXdDLENBc0VwRDtBQXRFWSw0RkFBd0MifQ==