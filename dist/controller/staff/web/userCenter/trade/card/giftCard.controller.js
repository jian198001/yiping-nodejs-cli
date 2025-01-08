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
exports.StaffWebUserCenterCardGiftCardController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../../module/common/model/Page");
const giftCard_service_1 = require("../../../../../../module/trade/giftCard.service");
const GiftCard_1 = require("../../../../../../entity/GiftCard");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心礼品卡控制器
 */
let StaffWebUserCenterCardGiftCardController = class StaffWebUserCenterCardGiftCardController {
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
         * 注入礼品卡服务
         */
        this.giftCardService = null;
    }
    /**
     * 获取礼品卡分页列表
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
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(staffId);
        // 调用礼品卡服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.giftCardService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取礼品卡信息
     *
     * @param id - 礼品卡ID
     * @returns 返回礼品卡信息
     */
    async getById(id) {
        var _a, _b;
        // 调用礼品卡服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.giftCardService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除礼品卡
     *
     * @param ids - 礼品卡ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用礼品卡服务的删除方法
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.giftCardService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
        // 返回空值
        return null;
    }
    /**
     * 更新礼品卡信息
     *
     * @param obj - 礼品卡对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用礼品卡服务的更新方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.giftCardService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterCardGiftCardController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterCardGiftCardController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", giftCard_service_1.GiftCardService)
], StaffWebUserCenterCardGiftCardController.prototype, "giftCardService", void 0);
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
], StaffWebUserCenterCardGiftCardController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterCardGiftCardController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterCardGiftCardController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GiftCard_1.GiftCard]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterCardGiftCardController.prototype, "update", null);
StaffWebUserCenterCardGiftCardController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/card/giftCard')
], StaffWebUserCenterCardGiftCardController);
exports.StaffWebUserCenterCardGiftCardController = StaffWebUserCenterCardGiftCardController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lmdENhcmQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvdXNlckNlbnRlci90cmFkZS9jYXJkL2dpZnRDYXJkLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBTzZCO0FBRTdCLDZFQUEwRTtBQUMxRSxxRUFBa0U7QUFFbEUsc0ZBQWtGO0FBQ2xGLGdFQUE2RDtBQUk3RCxrR0FBNkY7QUFFN0Y7O0dBRUc7QUFFSCxJQUFhLHdDQUF3QyxHQUFyRCxNQUFhLHdDQUF3QztJQUFyRDtRQUNFOztXQUVHO1FBRUssUUFBRyxHQUFZLElBQUksQ0FBQztRQUM1Qjs7V0FFRztRQUVLLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDL0I7O1dBRUc7UUFFSyxvQkFBZSxHQUFvQixJQUFJLENBQUM7SUErRGxELENBQUM7SUE5REM7Ozs7Ozs7O09BUUc7SUFFSSxLQUFLLENBQUMsSUFBSSxDQUNDLEtBQWEsRUFDWixNQUFXLEVBQ25CLFFBQWtCLEVBQ2xCLElBQVU7O1FBRW5CLE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZDLFlBQVk7UUFDWixNQUFNLE9BQU8sR0FBVyxNQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLElBQUksMENBQUUsRUFBRSxDQUFDO1FBQ25ELFlBQVk7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLGVBQWU7UUFDZixNQUFNLElBQUksR0FBRyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxlQUFlLDBDQUFFLElBQUksbURBQUcsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQztRQUNoRixTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsT0FBTyxDQUFjLEVBQVU7O1FBQzFDLG1CQUFtQjtRQUNuQixPQUFPLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGVBQWUsMENBQUUsT0FBTyxtREFBRyxFQUFFLENBQUMsQ0FBQSxDQUFDO0lBQ3BELENBQUM7SUFDRDs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxHQUFHLENBQVMsR0FBYTs7UUFDcEMsZUFBZTtRQUNmLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGVBQWUsMENBQUUsR0FBRyxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDO1FBQ3hDLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRDs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxNQUFNLENBQVMsR0FBYTs7UUFDdkMsZUFBZTtRQUNmLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZUFBZSwwQ0FBRSxNQUFNLG1EQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUM7SUFDcEQsQ0FBQztDQUNGLENBQUE7QUF6RUM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O3FFQUNtQjtBQUs1QjtJQURDLElBQUEsa0JBQU0sR0FBRTs7d0VBQ3NCO0FBSy9CO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNnQixrQ0FBZTtpRkFBUTtBQVdoRDtJQURDLElBQUEsZUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUV4RCxXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxpQkFBSyxFQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2YsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTtJQUNQLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7O3FEQURXLG1CQUFRO1FBQ1osV0FBSTs7b0VBWXBCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7dUVBR2hDO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OzttRUFLdkI7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLGNBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUN4QyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOztxQ0FBTSxtQkFBUTs7c0VBR3hDO0FBN0VVLHdDQUF3QztJQURwRCxJQUFBLHNCQUFVLEVBQUMscUNBQXFDLENBQUM7R0FDckMsd0NBQXdDLENBOEVwRDtBQTlFWSw0RkFBd0MifQ==