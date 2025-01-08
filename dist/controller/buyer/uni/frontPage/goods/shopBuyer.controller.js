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
exports.BuyerUniFrontPageGoodsShopBuyerController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const shopBuyer_service_1 = require("../../../../../module/trade/shopBuyer.service");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家前端页面店铺买家控制器
 */
let BuyerUniFrontPageGoodsShopBuyerController = class BuyerUniFrontPageGoodsShopBuyerController {
    constructor() {
        /**
         * 注入上下文对象
         */
        this.ctx = null;
        /**
         * 注入店铺买家服务
         */
        this.shopBuyerService = null;
    }
    /**
     * 根据店铺买家ID获取店铺买家信息
     *
     * @param id - 店铺买家ID
     * @returns 返回店铺买家信息
     */
    async getById(id = '') {
        var _a, _b, _c, _d, _e;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 记录日志
        console.log(shopBuyerId);
        // 调用店铺买家服务的根据ID获取方法
        return await ((_e = (_d = this === null || this === void 0 ? void 0 : this.shopBuyerService) === null || _d === void 0 ? void 0 : _d.getById) === null || _e === void 0 ? void 0 : _e.call(_d, id));
    }
    /**
     * 根据店铺买家编码获取店铺买家信息
     *
     * @param code - 店铺买家编码
     * @returns 返回店铺买家信息
     */
    async getByCode(code = '') {
        var _a;
        // 调用店铺买家服务的根据编码获取方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.shopBuyerService) === null || _a === void 0 ? void 0 : _a.getByCode(code));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniFrontPageGoodsShopBuyerController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", shopBuyer_service_1.ShopBuyerService)
], BuyerUniFrontPageGoodsShopBuyerController.prototype, "shopBuyerService", void 0);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('shopBuyerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsShopBuyerController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/getByCode.json'),
    __param(0, (0, decorator_1.Query)('shopBuyerCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsShopBuyerController.prototype, "getByCode", null);
BuyerUniFrontPageGoodsShopBuyerController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/frontPage/goods/shopBuyer')
], BuyerUniFrontPageGoodsShopBuyerController);
exports.BuyerUniFrontPageGoodsShopBuyerController = BuyerUniFrontPageGoodsShopBuyerController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcEJ1eWVyLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvYnV5ZXIvdW5pL2Zyb250UGFnZS9nb29kcy9zaG9wQnV5ZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBcUU7QUFFckUscUZBQWlGO0FBRWpGLCtGQUEwRjtBQUkxRjs7R0FFRztBQUVILElBQWEseUNBQXlDLEdBQXRELE1BQWEseUNBQXlDO0lBQXREO1FBQ0U7O1dBRUc7UUFFSyxRQUFHLEdBQVksSUFBSSxDQUFDO1FBRTVCOztXQUVHO1FBRUsscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQStCcEQsQ0FBQztJQTdCQzs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQXVCLEtBQUssRUFBRTs7UUFDaEQsWUFBWTtRQUNaLE1BQU0sV0FBVyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFFdkQsT0FBTztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekIsb0JBQW9CO1FBQ3BCLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZ0JBQWdCLDBDQUFFLE9BQU8sbURBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsU0FBUyxDQUF5QixPQUFPLEVBQUU7O1FBQ3RELG9CQUFvQjtRQUNwQixPQUFPLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxnQkFBZ0IsMENBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7SUFDdkQsQ0FBQztDQUNGLENBQUE7QUFyQ0M7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O3NFQUNtQjtBQU01QjtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDaUIsb0NBQWdCO21GQUFRO0FBU2xEO0lBREMsSUFBQSxlQUFHLEVBQUMsZUFBZSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ3hDLFdBQUEsSUFBQSxpQkFBSyxFQUFDLGFBQWEsQ0FBQyxDQUFBOzs7O3dFQVN6QztBQVNEO0lBREMsSUFBQSxlQUFHLEVBQUMsaUJBQWlCLENBQUM7SUFDQyxXQUFBLElBQUEsaUJBQUssRUFBQyxlQUFlLENBQUMsQ0FBQTs7OzswRUFHN0M7QUF6Q1UseUNBQXlDO0lBRHJELElBQUEsc0JBQVUsRUFBQyxzQ0FBc0MsQ0FBQztHQUN0Qyx5Q0FBeUMsQ0EwQ3JEO0FBMUNZLDhGQUF5QyJ9