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
exports.BuyerUniUserCenterReceiveAddressReceiveAddressController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const buyerReceiveAddress_service_1 = require("../../../../../module/trade/buyerReceiveAddress.service");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const BuyerReceiveAddress_1 = require("../../../../../entity/BuyerReceiveAddress");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家用户中心收货地址控制器
 */
let BuyerUniUserCenterReceiveAddressReceiveAddressController = class BuyerUniUserCenterReceiveAddressReceiveAddressController {
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
         * 注入买家收货地址服务
         */
        this.buyerReceiveAddressService = null;
    }
    /**
     * 获取收货地址分页列表
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
        // 调用买家收货地址服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.buyerReceiveAddressService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, shopBuyerId, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取收货地址
     *
     * @param id - 收货地址ID
     * @returns 返回收货地址信息
     */
    async getById(id) {
        var _a, _b;
        // 调用买家收货地址服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.buyerReceiveAddressService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 更新收货地址
     *
     * @param obj - 收货地址对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b, _c, _d;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 调用买家收货地址服务的更新方法
        return await ((_d = this === null || this === void 0 ? void 0 : this.buyerReceiveAddressService) === null || _d === void 0 ? void 0 : _d.update(obj, shopBuyerId));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterReceiveAddressReceiveAddressController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniUserCenterReceiveAddressReceiveAddressController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", buyerReceiveAddress_service_1.BuyerReceiveAddressService)
], BuyerUniUserCenterReceiveAddressReceiveAddressController.prototype, "buyerReceiveAddressService", void 0);
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
], BuyerUniUserCenterReceiveAddressReceiveAddressController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)("/getById.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterReceiveAddressReceiveAddressController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)("/update.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BuyerReceiveAddress_1.BuyerReceiveAddress]),
    __metadata("design:returntype", Promise)
], BuyerUniUserCenterReceiveAddressReceiveAddressController.prototype, "update", null);
BuyerUniUserCenterReceiveAddressReceiveAddressController = __decorate([
    (0, decorator_1.Controller)("/buyer/uni/userCenter/receiveAddress/receiveAddress")
], BuyerUniUserCenterReceiveAddressReceiveAddressController);
exports.BuyerUniUserCenterReceiveAddressReceiveAddressController = BuyerUniUserCenterReceiveAddressReceiveAddressController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZWl2ZUFkZHJlc3MuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9idXllci91bmkvdXNlckNlbnRlci9yZWNlaXZlQWRkcmVzcy9yZWNlaXZlQWRkcmVzcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE2RTtBQUU3RSx5R0FBcUc7QUFDckcsMEVBQXVFO0FBQ3ZFLGtFQUErRDtBQUUvRCxtRkFBZ0Y7QUFFaEYsK0ZBQTBGO0FBSTFGOztHQUVHO0FBRUgsSUFBYSx3REFBd0QsR0FBckUsTUFBYSx3REFBd0Q7SUFBckU7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssK0JBQTBCLEdBQStCLElBQUksQ0FBQztJQXdEeEUsQ0FBQztJQXZEQzs7Ozs7Ozs7T0FRRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQ0MsS0FBYSxFQUNwQixNQUFXLEVBQ1gsUUFBa0IsRUFDbEIsSUFBVTs7UUFFbkIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGdCQUFnQixDQUFDLENBQUM7UUFDdkMsWUFBWTtRQUNaLE1BQU0sV0FBVyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFDdkQsa0JBQWtCO1FBQ2xCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLDBCQUEwQiwwQ0FBRSxJQUFJLG1EQUN2RCxXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsSUFBSSxDQUNMLENBQUEsQ0FBQztRQUNGLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRDs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQWMsRUFBVTs7UUFDMUMsc0JBQXNCO1FBQ3RCLE9BQU8sTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsMEJBQTBCLDBDQUFFLE9BQU8sbURBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQztJQUMvRCxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsTUFBTSxDQUFVLEdBQXdCOztRQUNuRCxZQUFZO1FBQ1osTUFBTSxXQUFXLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUN2RCxrQkFBa0I7UUFDbEIsT0FBTyxNQUFNLENBQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsMEJBQTBCLDBDQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUEsQ0FBQztJQUMxRSxDQUFDO0NBQ0YsQ0FBQTtBQWxFQztJQURDLElBQUEsa0JBQU0sR0FBRTs7cUZBQ21CO0FBSzVCO0lBREMsSUFBQSxrQkFBTSxHQUFFOzt3RkFDc0I7QUFLL0I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQzJCLHdEQUEwQjs0R0FBUTtBQVd0RTtJQURDLElBQUEsZUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUV4RCxXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNkLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7SUFDUCxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQ1AsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7cURBRFcsbUJBQVE7UUFDWixXQUFJOztvRkFnQnBCO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7Ozs7dUZBR2hDO0FBUUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxjQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFDeEMsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7cUNBQU0seUNBQW1COztzRkFLcEQ7QUF0RVUsd0RBQXdEO0lBRHBFLElBQUEsc0JBQVUsRUFBQyxxREFBcUQsQ0FBQztHQUNyRCx3REFBd0QsQ0F1RXBFO0FBdkVZLDRIQUF3RCJ9