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
exports.StaffWebUserCenterGoodsGoodsCategoryController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../../module/common/model/Page");
const goodsCategory_service_1 = require("../../../../../../module/trade/goodsCategory.service");
const GoodsCategory_1 = require("../../../../../../entity/GoodsCategory");
const jwt_passport_middleware_1 = require("../../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心商品分类控制器
 */
let StaffWebUserCenterGoodsGoodsCategoryController = class StaffWebUserCenterGoodsGoodsCategoryController {
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
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户的ID
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        // 打印当前用户的ID
        console.log(staffId);
        // 调用商品分类服务的分页方法
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.goodsCategoryService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, shopId, query, params, reqParam, page));
        // 返回分页结果
        return data;
    }
    /**
     * 根据ID获取商品分类信息
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
     * 删除商品分类
     *
     * @param ids - 商品分类ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用商品分类服务的删除方法
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.goodsCategoryService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新商品分类信息
     *
     * @param obj - 商品分类对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用商品分类服务的更新方法
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.goodsCategoryService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
    /**
     * 上传商品分类图片
     *
     * @param files - 上传的文件
     * @param query - 查询参数
     * @returns 返回上传结果
     */
    async imgUpload(files, query) {
        var _a;
        // 调用商品分类服务的图片上传方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.goodsCategoryService) === null || _a === void 0 ? void 0 : _a.imgUpload(files, query));
    }
    /**
     * 删除商品分类图片
     *
     * @param id - 图片ID
     * @returns 返回删除结果
     */
    async imgDel(id) {
        var _a;
        // 调用商品分类服务的图片删除方法
        return await ((_a = this === null || this === void 0 ? void 0 : this.goodsCategoryService) === null || _a === void 0 ? void 0 : _a.imgDel(id));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], StaffWebUserCenterGoodsGoodsCategoryController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterGoodsGoodsCategoryController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", goodsCategory_service_1.GoodsCategoryService)
], StaffWebUserCenterGoodsGoodsCategoryController.prototype, "goodsCategoryService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('shopId')),
    __param(1, (0, decorator_1.Query)('query')),
    __param(2, (0, decorator_1.Query)('params')),
    __param(3, (0, decorator_1.Query)()),
    __param(4, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsCategoryController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsCategoryController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsCategoryController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GoodsCategory_1.GoodsCategory]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsCategoryController.prototype, "update", null);
__decorate([
    (0, decorator_1.All)('/imgUpload.json'),
    __param(0, (0, decorator_1.Files)()),
    __param(1, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsCategoryController.prototype, "imgUpload", null);
__decorate([
    (0, decorator_1.All)('/imgDel.json'),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterGoodsGoodsCategoryController.prototype, "imgDel", null);
StaffWebUserCenterGoodsGoodsCategoryController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/goods/goodsCategory')
], StaffWebUserCenterGoodsGoodsCategoryController);
exports.StaffWebUserCenterGoodsGoodsCategoryController = StaffWebUserCenterGoodsGoodsCategoryController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHNDYXRlZ29yeS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi91c2VyQ2VudGVyL3RyYWRlL2dvb2RzL2dvb2RzQ2F0ZWdvcnkuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFRNkI7QUFFN0IsNkVBQTBFO0FBQzFFLHFFQUFrRTtBQUVsRSxnR0FBNEY7QUFDNUYsMEVBQXVFO0FBSXZFLGtHQUE2RjtBQUU3Rjs7R0FFRztBQUVILElBQWEsOENBQThDLEdBQTNELE1BQWEsOENBQThDO0lBQTNEO1FBQ0U7O1dBRUc7UUFFSyxRQUFHLEdBQVksSUFBSSxDQUFDO1FBQzVCOztXQUVHO1FBRUssV0FBTSxHQUFZLElBQUksQ0FBQztRQUMvQjs7V0FFRztRQUVLLHlCQUFvQixHQUF5QixJQUFJLENBQUM7SUE0RjVELENBQUM7SUEzRkM7Ozs7Ozs7OztPQVNHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDRSxNQUFNLEVBQ1AsS0FBYSxFQUNaLE1BQVcsRUFDbkIsUUFBa0IsRUFDbEIsSUFBVTs7UUFFbkIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGdCQUFnQixDQUFDLENBQUM7UUFDdkMsWUFBWTtRQUNaLE1BQU0sT0FBTyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFDbkQsWUFBWTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsZ0JBQWdCO1FBQ2hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQSxNQUFBLE1BQUEs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