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
exports.BuyerUniFrontPageGoodsCartItemController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const cartItem_service_1 = require("../../../../../module/trade/cartItem.service");
const CartItem_1 = require("../../../../../entity/CartItem");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家前端页面商品购物车项控制器
 */
let BuyerUniFrontPageGoodsCartItemController = class BuyerUniFrontPageGoodsCartItemController {
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
         * 注入购物车项服务
         */
        this.cartItemService = null;
    }
    /**
     * 获取购物车项分页列表
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
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "分页列表controller");
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用购物车项服务的分页方法
        return await ((_g = (_f = this === null || this === void 0 ? void 0 : this.cartItemService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, shopId, shopBuyerId, query, params, reqParam, page));
    }
    /**
     * 获取购物车项数量
     *
     * @param shopId - 店铺ID
     * @returns 返回购物车项数量
     */
    async count(shopId) {
        var _a, _b, _c, _d, _e, _f;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "分页列表controller");
        // 获取当前用户的ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 调用购物车项服务的数量统计方法
        return await ((_f = this === null || this === void 0 ? void 0 : this.cartItemService) === null || _f === void 0 ? void 0 : _f.count(shopId, shopBuyerId));
    }
    /**
     * 根据ID获取购物车项
     *
     * @param id - 购物车项ID
     * @returns 返回购物车项信息
     */
    async getById(id) {
        var _a, _b;
        // 调用购物车项服务的根据ID获取方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.cartItemService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 添加购物车项
     *
     * @param cartItem - 购物车项信息
     * @returns 返回添加结果
     */
    async add(cartItem = null) {
        var _a, _b, _c, _d;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 设置购物车项的买家ID
        cartItem.shopBuyerId = shopBuyerId;
        // 调用购物车项服务的添加方法
        return await ((_d = this === null || this === void 0 ? void 0 : this.cartItemService) === null || _d === void 0 ? void 0 : _d.add(cartItem));
    }
    /**
     * 清空购物车项
     *
     * @param shopId - 店铺ID
     * @returns 返回清空结果
     */
    async clear(shopId) {
        var _a, _b, _c, _d;
        // 获取当前用户的ID
        const shopBuyerId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 调用购物车项服务的清空方法
        return await ((_d = this === null || this === void 0 ? void 0 : this.cartItemService) === null || _d === void 0 ? void 0 : _d.clear(shopId, shopBuyerId));
    }
    /**
     * 更新购物车项数量
     *
     * @param id - 购物车项ID
     * @param quantity - 数量
     * @returns 返回更新结果
     */
    async updateQuantity(id, quantity) {
        var _a;
        // 将数量转换为整数
        quantity = parseInt === null || parseInt === void 0 ? void 0 : parseInt(quantity + "");
        // 调用购物车项服务的更新数量方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.cartItemService) === null || _a === void 0 ? void 0 : _a.updateQuantity(id, quantity));
    }
    /**
     * 删除购物车项
     *
     * @param cartItems - 购物车项ID数组
     * @returns 返回删除结果
     */
    async del(cartItems = []) {
        var _a, _b;
        // 调用购物车项服务的删除方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.cartItemService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, cartItems));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerUniFrontPageGoodsCartItemController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerUniFrontPageGoodsCartItemController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", cartItem_service_1.CartItemService)
], BuyerUniFrontPageGoodsCartItemController.prototype, "cartItemService", void 0);
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
], BuyerUniFrontPageGoodsCartItemController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)("/count.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsCartItemController.prototype, "count", null);
__decorate([
    (0, decorator_1.All)("/getById.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsCartItemController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)("/add.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CartItem_1.CartItem]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsCartItemController.prototype, "add", null);
__decorate([
    (0, decorator_1.All)("/clear.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsCartItemController.prototype, "clear", null);
__decorate([
    (0, decorator_1.All)("/updateQuantity.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("id")),
    __param(1, (0, decorator_1.Query)("quantity")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsCartItemController.prototype, "updateQuantity", null);
__decorate([
    (0, decorator_1.All)("/del.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageGoodsCartItemController.prototype, "del", null);
BuyerUniFrontPageGoodsCartItemController = __decorate([
    (0, decorator_1.Controller)("/buyer/uni/frontPage/goods/cartItem")
], BuyerUniFrontPageGoodsCartItemController);
exports.BuyerUniFrontPageGoodsCartItemController = BuyerUniFrontPageGoodsCartItemController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydEl0ZW0uY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9idXllci91bmkvZnJvbnRQYWdlL2dvb2RzL2NhcnRJdGVtLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBTzZCO0FBRTdCLDBFQUF1RTtBQUN2RSxrRUFBK0Q7QUFFL0QsbUZBQStFO0FBQy9FLDZEQUEwRDtBQUUxRCwrRkFBMEY7QUFHMUY7O0dBRUc7QUFFSCxJQUFhLHdDQUF3QyxHQUFyRCxNQUFhLHdDQUF3QztJQUFyRDtRQUNFOztXQUVHO1FBRUssUUFBRyxHQUFZLElBQUksQ0FBQztRQUM1Qjs7V0FFRztRQUVLLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDL0I7O1dBRUc7UUFFSyxvQkFBZSxHQUFvQixJQUFJLENBQUM7SUFtSGxELENBQUM7SUFsSEM7Ozs7Ozs7OztPQVNHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDRSxNQUFNLEVBQ1AsS0FBSyxFQUNaLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxZQUFZO1FBQ1osTUFBTSxXQUFXLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUN2RCxnQkFBZ0I7UUFDaEIsT0FBTyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxlQUFlLDBDQUFFLElBQUksbURBQ3RDLE1BQU0sRUFDTixXQUFXLEVBQ1gsS0FBSyxF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