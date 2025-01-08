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
exports.BuyerUniFrontPageGoodsShopController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const shop_service_1 = require("../../../../../module/trade/shop.service");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家前端页面店铺控制器
 */
let BuyerUniFrontPageGoodsShopController = class BuyerUniFrontPageGoodsShopController {
    constructor() {
        /**
         * 注入店铺服务
         */
        this.shopService = null;
    }
    /**
     * 根据店铺ID获取店铺信息
     *
     * @param id - 店铺ID
     * @returns 返回店铺信息
     */
    async getById(id = '') {
        var _a, _b;
        // 调用店铺服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.shopService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 根据店铺编码获取店铺信息
     *
     * @param code - 店铺编码
     * @returns 返回店铺信息
     */
    async getByCode(code = '') {
        var _a;
        // 调用店铺服务的根据编码获取方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.shopService) === null || _a === void 0 ? void 0 : _a.getByCode(code));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", shop_service_1.ShopService)
], BuyerUniFrontPageGoodsShopController.prototype, "shopService", void 0);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsShopController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/getByCode.json'),
    __param(0, (0, decorator_1.Query)('shopCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsShopController.prototype, "getByCode", null);
BuyerUniFrontPageGoodsShopController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/frontPage/goods/shop')
], BuyerUniFrontPageGoodsShopController);
exports.BuyerUniFrontPageGoodsShopController = BuyerUniFrontPageGoodsShopController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3VuaS9mcm9udFBhZ2UvZ29vZHMvc2hvcC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxRTtBQUVyRSwyRUFBdUU7QUFFdkUsK0ZBQTBGO0FBRTFGOztHQUVHO0FBRUgsSUFBYSxvQ0FBb0MsR0FBakQsTUFBYSxvQ0FBb0M7SUFBakQ7UUFDRTs7V0FFRztRQUVLLGdCQUFXLEdBQWdCLElBQUksQ0FBQztJQXlCMUMsQ0FBQztJQXZCQzs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQWtCLEtBQUssRUFBRTs7UUFDM0Msa0JBQWtCO1FBQ2xCLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsV0FBVywwQ0FBRSxPQUFPLG1EQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUksS0FBSyxDQUFDLFNBQVMsQ0FBb0IsT0FBTyxFQUFFOztRQUNqRCxrQkFBa0I7UUFDbEIsT0FBTyxNQUFNLENBQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsV0FBVywwQ0FBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztJQUNsRCxDQUFDO0NBQ0YsQ0FBQTtBQXpCQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDWSwwQkFBVzt5RUFBUTtBQVN4QztJQURDLElBQUEsZUFBRyxFQUFDLGVBQWUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUN4QyxXQUFBLElBQUEsaUJBQUssRUFBQyxRQUFRLENBQUMsQ0FBQTs7OzttRUFHcEM7QUFTRDtJQURDLElBQUEsZUFBRyxFQUFDLGlCQUFpQixDQUFDO0lBQ0MsV0FBQSxJQUFBLGlCQUFLLEVBQUMsVUFBVSxDQUFDLENBQUE7Ozs7cUVBR3hDO0FBN0JVLG9DQUFvQztJQURoRCxJQUFBLHNCQUFVLEVBQUMsaUNBQWlDLENBQUM7R0FDakMsb0NBQW9DLENBOEJoRDtBQTlCWSxvRkFBb0MifQ==