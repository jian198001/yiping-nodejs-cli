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
exports.BuyerUniFrontPageGoodsGoodsCategoryController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const goodsCategory_service_1 = require("../../../../../module/trade/goodsCategory.service");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家前端页面商品分类控制器
 */
let BuyerUniFrontPageGoodsGoodsCategoryController = class BuyerUniFrontPageGoodsGoodsCategoryController {
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
         * 注入商品分类服务
         */
        this.goodsCategoryService = null;
    }
    /**
     * 获取商品分类分页列表
     *
     * @param shopId - 店铺ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    async page(shopId, query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        console.log(shopBuyerId);
        // 记录日志
        (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.info) === null || _e === void 0 ? void 0 : _e.call(_d, "分页列表controller");
        // 调用商品分类服务的分页方法
        return await ((_g = (_f = this === null || this === void 0 ? void 0 : this.goodsCategoryService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, shopId, query, params, reqParam, page));
    }
    /**
     * 根据ID获取商品分类
     *
     * @param id - 商品分类ID
     * @returns 返回商品分类信息
     */
    async getById(id) {
        var _a, _b;
        // 调用商品分类服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.goodsCategoryService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 获取商品分类子分类列表
     *
     * @param parentId - 父分类ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @returns 返回子分类列表
     */
    async arrPane(parentId = "", query, params, reqParam) {
        var _a;
        // 调用商品分类服务的获取子分类列表方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.goodsCategoryService) === null || _a === void 0 ? void 0 : _a.arrPane(parentId, reqParam));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniFrontPageGoodsGoodsCategoryController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniFrontPageGoodsGoodsCategoryController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", goodsCategory_service_1.GoodsCategoryService)
], BuyerUniFrontPageGoodsGoodsCategoryController.prototype, "goodsCategoryService", void 0);
__decorate([
    (0, decorator_1.All)("/page.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("shopId")),
    __param(1, (0, decorator_1.Query)("query")),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsGoodsCategoryController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)("/getById.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsGoodsCategoryController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)("/arrPane.json"),
    __param(0, (0, decorator_1.Query)("parentId")),
    __param(1, (0, decorator_1.Query)("query")),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, ReqParam_1.ReqParam]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsGoodsCategoryController.prototype, "arrPane", null);
BuyerUniFrontPageGoodsGoodsCategoryController = __decorate([
    (0, decorator_1.Controller)("/buyer/uni/frontPage/goods/goodsCategory")
], BuyerUniFrontPageGoodsGoodsCategoryController);
exports.BuyerUniFrontPageGoodsGoodsCategoryController = BuyerUniFrontPageGoodsGoodsCategoryController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHNDYXRlZ29yeS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3VuaS9mcm9udFBhZ2UvZ29vZHMvZ29vZHNDYXRlZ29yeS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE2RTtBQUU3RSwwRUFBdUU7QUFDdkUsa0VBQStEO0FBRS9ELDZGQUF5RjtBQUV6RiwrRkFBMEY7QUFJMUY7O0dBRUc7QUFFSCxJQUFhLDZDQUE2QyxHQUExRCxNQUFhLDZDQUE2QztJQUExRDtRQUNFOztXQUVHO1FBRUssUUFBRyxHQUFZLElBQUksQ0FBQztRQUM1Qjs7V0FFRztRQUVLLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDL0I7O1dBRUc7UUFFSyx5QkFBb0IsR0FBeUIsSUFBSSxDQUFDO0lBb0U1RCxDQUFDO0lBbkVDOzs7Ozs7Ozs7T0FTRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQ0UsTUFBTSxFQUNQLEtBQUssRUFDWixNQUFXLEVBQ1gsUUFBa0IsRUFDbEIsSUFBVTs7UUFFbkIsWUFBWTtRQUNaLE1BQU0sV0FBVyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFFdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6QixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxnQkFBZ0I7UUFDaEIsT0FBUSxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxvQkFBb0IsMENBQUUsSUFBSSxtREFDNUMsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLElBQUksQ0FDTCxDQUFBLENBQUM7SUFDSixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsT0FBTyxDQUFjLEVBQVU7O1FBQzFDLG9CQUFvQjtRQUNwQixPQUFRLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLG9CQUFvQiwwQ0FBRSxPQUFPLG1EQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUM7SUFDMUQsQ0FBQztJQUNEOzs7Ozs7OztPQVFHO0lBRUksS0FBSyxDQUFDLE9BQU8sQ0FDQyxXQUFXLEVBQUUsRUFDaEIsS0FBSyxFQUNaLE1BQVcsRUFDWCxRQUFrQjs7UUFFM0IscUJBQXFCO1FBQ3JCLE9BQU8sTUFBTSxDQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLG9CQUFvQiwwQ0FBRSxPQUFPLENBQzlDLFFBQVEsRUFDUixRQUFRLENBQ1QsQ0FBQSxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUE5RUM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OzBFQUNtQjtBQUs1QjtJQURDLElBQUEsa0JBQU0sR0FBRTs7NkVBQ3NCO0FBSy9CO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNxQiw0Q0FBb0I7MkZBQVE7QUFZMUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFFeEQsV0FBQSxJQUFBLGlCQUFLLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFDZixXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7SUFDUCxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7NkRBRFcsbUJBQVE7UUFDWixXQUFJOzt5RUFpQnBCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7NEVBR2hDO0FBV0Q7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLENBQUM7SUFFbEIsV0FBQSxJQUFBLGlCQUFLLEVBQUMsVUFBVSxDQUFDLENBQUE7SUFDakIsV0FBQSxJQUFBLGlCQUFLLEVBQUMsT0FBTyxDQUFDLENBQUE7SUFDZCxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7NkRBQVcsbUJBQVE7OzRFQU81QjtBQWxGVSw2Q0FBNkM7SUFEekQsSUFBQSxzQkFBVSxFQUFDLDBDQUEwQyxDQUFDO0dBQzFDLDZDQUE2QyxDQW1GekQ7QUFuRlksc0dBQTZDIn0=