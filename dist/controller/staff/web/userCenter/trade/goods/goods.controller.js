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
exports.StaffWebUserCenterGoodsGoodsController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../../module/common/model/Page");
const goods_service_1 = require("../../../../../../module/trade/goods.service");
const Goods_1 = require("../../../../../../entity/Goods");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心商品控制器
 */
let StaffWebUserCenterGoodsGoodsController = class StaffWebUserCenterGoodsGoodsController {
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
    async page(goodsCategoryId = '', query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户的ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(staffId);
        // 调用商品服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.goodsService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, goodsCategoryId, null, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取商品信息
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
     * 删除商品
     *
     * @param ids - 商品ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用商品服务的删除方法
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.goodsService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新商品信息
     *
     * @param obj - 商品对象
     * @param imgs - 商品图片
     * @returns 返回更新结果
     */
    async update(obj = null, imgs = '') {
        var _a;
        // 调用商品服务的更新方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.goodsService) === null || _a === void 0 ? void 0 : _a.update(obj, imgs));
    }
    /**
     * 上架商品
     *
     * @param id - 商品ID
     * @returns 返回操作结果
     */
    async onsale(id) {
        var _a;
        // 调用商品服务的上架方法
        await ((_a = this === null || this === void 0 ? void 0 : this.goodsService) === null || _a === void 0 ? void 0 : _a.onsale(id));
    }
    /**
     * 下架商品
     *
     * @param id - 商品ID
     * @returns 返回操作结果
     */
    async instock(id) {
        var _a;
        // 调用商品服务的下架方法
        await ((_a = this === null || this === void 0 ? void 0 : this.goodsService) === null || _a === void 0 ? void 0 : _a.instock(id));
    }
    /**
     * 上传商品图片
     *
     * @param files - 上传的文件
     * @param query - 查询参数
     * @returns 返回上传结果
     */
    async imgUpload(files, query) {
        var _a;
        // 调用商品服务的图片上传方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.goodsService) === null || _a === void 0 ? void 0 : _a.imgUpload(files, query));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterGoodsGoodsController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterGoodsGoodsController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", goods_service_1.GoodsService)
], StaffWebUserCenterGoodsGoodsController.prototype, "goodsService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('goodsCategoryId')),
    __param(1, (0, decorator_1.Query)('query')),
    __param(2, (0, decorator_1.Query)('params')),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __param(1, (0, decorator_1.Query)('imgs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Goods_1.Goods, Object]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsController.prototype, "update", null);
__decorate([
    (0, decorator_1.All)('/onsale.json'),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsController.prototype, "onsale", null);
__decorate([
    (0, decorator_1.All)('/instock.json'),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsController.prototype, "instock", null);
__decorate([
    (0, decorator_1.All)('/imgUpload.json'),
    __param(0, (0, decorator_1.Files)()),
    __param(1, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsController.prototype, "imgUpload", null);
StaffWebUserCenterGoodsGoodsController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/goods/goods')
], StaffWebUserCenterGoodsGoodsController);
exports.StaffWebUserCenterGoodsGoodsController = StaffWebUserCenterGoodsGoodsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9zdGFmZi93ZWIvdXNlckNlbnRlci90cmFkZS9nb29kcy9nb29kcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQVE2QjtBQUU3Qiw2RUFBMEU7QUFDMUUscUVBQWtFO0FBRWxFLGdGQUE0RTtBQUM1RSwwREFBdUQ7QUFJdkQsa0dBQTZGO0FBRTdGOztHQUVHO0FBRUgsSUFBYSxzQ0FBc0MsR0FBbkQsTUFBYSxzQ0FBc0M7SUFBbkQ7UUFDRTs7V0FFRztRQUVLLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDNUI7O1dBRUc7UUFFSyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9COztXQUVHO1FBRUssaUJBQVksR0FBaUIsSUFBSSxDQUFDO0lBNEc1QyxDQUFDO0lBM0dDOzs7Ozs7Ozs7T0FTRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQ1csa0JBQWtCLEVBQUUsRUFDOUIsS0FBYSxFQUNaLE1BQVcsRUFDbkIsUUFBa0IsRUFDbEIsSUFBVTs7UUFFbkIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGdCQUFnQixDQUFDLENBQUM7UUFDdkMsWUFBWTtRQUNaLE1BQU0sT0FBTyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFDbkQsWUFBWTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsY0FBYztRQUNkLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElB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