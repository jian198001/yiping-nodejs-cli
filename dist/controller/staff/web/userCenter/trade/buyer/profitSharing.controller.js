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
exports.StaffWebUserCenterTradeOrderBuyerProfitSharingController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../../module/common/model/Page");
const profitSharing_service_1 = require("../../../../../../module/trade/profitSharing.service");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心买家分账控制器
 */
let StaffWebUserCenterTradeOrderBuyerProfitSharingController = class StaffWebUserCenterTradeOrderBuyerProfitSharingController {
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
         * 注入分账服务
         */
        this.profitSharingService = null;
    }
    /**
     * 获取分账分页列表
     *
     * @param shopBuyerId - 店铺买家ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    async page(shopBuyerId = '', query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户的ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(staffId);
        // 调用分账服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.profitSharingService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, shopBuyerId, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取分账信息
     *
     * @param id - 分账ID
     * @returns 返回分账信息
     */
    async getById(id) {
        var _a, _b;
        // 调用分账服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.profitSharingService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterTradeOrderBuyerProfitSharingController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterTradeOrderBuyerProfitSharingController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", profitSharing_service_1.ProfitSharingService)
], StaffWebUserCenterTradeOrderBuyerProfitSharingController.prototype, "profitSharingService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('shopBuyerId')),
    __param(1, (0, decorator_1.Query)('query')),
    __param(2, (0, decorator_1.Query)('params')),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderBuyerProfitSharingController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterTradeOrderBuyerProfitSharingController.prototype, "getById", null);
StaffWebUserCenterTradeOrderBuyerProfitSharingController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/trade/buyer/profitSharing')
], StaffWebUserCenterTradeOrderBuyerProfitSharingController);
exports.StaffWebUserCenterTradeOrderBuyerProfitSharingController = StaffWebUserCenterTradeOrderBuyerProfitSharingController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZml0U2hhcmluZy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi91c2VyQ2VudGVyL3RyYWRlL2J1eWVyL3Byb2ZpdFNoYXJpbmcuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBNkU7QUFFN0UsNkVBQTBFO0FBQzFFLHFFQUFrRTtBQUdsRSxnR0FBNEY7QUFHNUYsa0dBQTZGO0FBRTdGOztHQUVHO0FBRUgsSUFBYSx3REFBd0QsR0FBckUsTUFBYSx3REFBd0Q7SUFBckU7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUsseUJBQW9CLEdBQXlCLElBQUksQ0FBQztJQW1ENUQsQ0FBQztJQWxEQzs7Ozs7Ozs7O09BU0c7SUFFSSxLQUFLLENBQUMsSUFBSSxDQUNPLGNBQWMsRUFBRSxFQUN0QixLQUFhLEVBQ1osTUFBVyxFQUNuQixRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUV2QyxZQUFZO1FBQ1osTUFBTSxPQUFPLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUVuRCxZQUFZO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyQixjQUFjO1FBQ2QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsb0JBQW9CLDBDQUFFLElBQUksbURBQ2pELFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixJQUFJLENBQ0wsQ0FBQSxDQUFDO1FBRUYsU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNEOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLE9BQU8sQ0FBYyxFQUFVOztRQUMxQyxrQkFBa0I7UUFDbEIsT0FBTyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxvQkFBb0IsMENBQUUsT0FBTyxtREFBRyxFQUFFLENBQUMsQ0FBQSxDQUFDO0lBQ3pELENBQUM7Q0FDRixDQUFBO0FBN0RDO0lBREMsSUFBQSxrQkFBTSxHQUFFOztxRkFDbUI7QUFLNUI7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O3dGQUNzQjtBQUsvQjtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDcUIsNENBQW9CO3NHQUFRO0FBWTFEO0lBREMsSUFBQSxlQUFHLEVBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBRXhELFdBQUEsSUFBQSxpQkFBSyxFQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3BCLFdBQUEsSUFBQSxpQkFBSyxFQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2QsV0FBQSxJQUFBLGlCQUFLLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFDZixXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7NkRBRFcsbUJBQVE7UUFDWixXQUFJOztvRkFzQnBCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7dUZBR2hDO0FBakVVLHdEQUF3RDtJQURwRSxJQUFBLHNCQUFVLEVBQUMsaURBQWlELENBQUM7R0FDakQsd0RBQXdELENBa0VwRTtBQWxFWSw0SEFBd0QifQ==