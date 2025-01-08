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
exports.BuyerUniFrontPageGoodsGoodsController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const goods_service_1 = require("../../../../../module/trade/goods.service");
const favor_service_1 = require("../../../../../module/trade/favor.service");
const Favor_1 = require("../../../../../entity/Favor");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家前端页面商品控制器
 */
let BuyerUniFrontPageGoodsGoodsController = class BuyerUniFrontPageGoodsGoodsController {
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
         * 注入商品服务
         */
        this.goodsService = null;
        /**
         * 注入收藏服务
         */
        this.favorService = null;
    }
    /**
     * 获取商品分页列表
     *
     * @param goodsCategoryId - 商品分类ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    async page(goodsCategoryId = "", query, params, reqParam, page) {
        var _a, _b, _c, _d;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "分页列表controller");
        // 调用商品服务的分页方法
        return await ((_d = (_c = this === null || this === void 0 ? void 0 : this.goodsService) === null || _c === void 0 ? void 0 : _c.page) === null || _d === void 0 ? void 0 : _d.call(_c, goodsCategoryId, "onsale", query, params, reqParam, page));
    }
    /**
     * 根据ID获取商品
     *
     * @param id - 商品ID
     * @returns 返回商品信息
     */
    async getById(id) {
        var _a, _b;
        // 调用商品服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.goodsService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 收藏商品
     *
     * @param favor - 收藏信息
     * @returns 返回收藏结果
     */
    async favor(favor) {
        var _a, _b, _c, _d;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 设置收藏的买家ID
        favor.shopBuyerId = shopBuyerId;
        // 调用收藏服务的更新方法
        return await ((_d = this === null || this === void 0 ? void 0 : this.favorService) === null || _d === void 0 ? void 0 : _d.update(favor));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniFrontPageGoodsGoodsController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniFrontPageGoodsGoodsController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", goods_service_1.GoodsService)
], BuyerUniFrontPageGoodsGoodsController.prototype, "goodsService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", favor_service_1.FavorService)
], BuyerUniFrontPageGoodsGoodsController.prototype, "favorService", void 0);
__decorate([
    (0, decorator_1.All)("/page.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("goodsCategoryId")),
    __param(1, (0, decorator_1.Query)("query")),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsGoodsController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)("/getById.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsGoodsController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)("/favor.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Favor_1.Favor]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsGoodsController.prototype, "favor", null);
BuyerUniFrontPageGoodsGoodsController = __decorate([
    (0, decorator_1.Controller)("/buyer/uni/frontPage/goods/goods")
], BuyerUniFrontPageGoodsGoodsController);
exports.BuyerUniFrontPageGoodsGoodsController = BuyerUniFrontPageGoodsGoodsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9idXllci91bmkvZnJvbnRQYWdlL2dvb2RzL2dvb2RzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTZFO0FBRTdFLDBFQUF1RTtBQUN2RSxrRUFBK0Q7QUFFL0QsNkVBQXlFO0FBQ3pFLDZFQUF5RTtBQUN6RSx1REFBb0Q7QUFFcEQsK0ZBQTBGO0FBSTFGOztHQUVHO0FBRUgsSUFBYSxxQ0FBcUMsR0FBbEQsTUFBYSxxQ0FBcUM7SUFBbEQ7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssaUJBQVksR0FBaUIsSUFBSSxDQUFDO1FBQzFDOztXQUVHO1FBRUssaUJBQVksR0FBaUIsSUFBSSxDQUFDO0lBMkQ1QyxDQUFDO0lBMURDOzs7Ozs7Ozs7T0FTRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQ1csa0JBQWtCLEVBQUUsRUFDOUIsS0FBSyxFQUNaLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxjQUFjO1FBQ2QsT0FBUSxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxZQUFZLDBDQUFFLElBQUksbURBQ3BDLGVBQWUsRUFDZixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsSUFBSSxDQUNMLENBQUEsQ0FBQztJQUNKLENBQUM7SUFDRDs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQWMsRUFBVTs7UUFDMUMsa0JBQWtCO1FBQ2xCLE9BQVEsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsWUFBWSwwQ0FBRSxPQUFPLG1EQUFHLEVBQUUsQ0FBRyxDQUFBLENBQUM7SUFDcEQsQ0FBQztJQUNEOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFZOztRQUM3QixZQUFZO1FBQ1osTUFBTSxXQUFXLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUV2RCxZQUFZO1FBQ1osS0FBSyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFFaEMsY0FBYztRQUNkLE9BQU8sTUFBTSxDQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFlBQVksMENBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7SUFDakQsQ0FBQztDQUNGLENBQUE7QUExRUM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O2tFQUNtQjtBQUs1QjtJQURDLElBQUEsa0JBQU0sR0FBRTs7cUVBQ3NCO0FBSy9CO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNhLDRCQUFZOzJFQUFRO0FBSzFDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNhLDRCQUFZOzJFQUFRO0FBWTFDO0lBREMsSUFBQSxlQUFHLEVBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBRXhELFdBQUEsSUFBQSxpQkFBSyxFQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDeEIsV0FBQSxJQUFBLGlCQUFLLEVBQUMsT0FBTyxDQUFDLENBQUE7SUFDZCxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTtJQUNQLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7OzZEQURXLG1CQUFRO1FBQ1osV0FBSTs7aUVBYXBCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7b0VBR2hDO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxhQUFhLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7O3FDQUNsQyxhQUFLOztrRUFTOUI7QUE5RVUscUNBQXFDO0lBRGpELElBQUEsc0JBQVUsRUFBQyxrQ0FBa0MsQ0FBQztHQUNsQyxxQ0FBcUMsQ0ErRWpEO0FBL0VZLHNGQUFxQyJ9