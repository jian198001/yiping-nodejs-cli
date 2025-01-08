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
exports.BuyerWebUserCenterDeptPostController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const post_service_1 = require("../../../../../module/oa/post.service");
const Post_1 = require("../../../../../entity/Post");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 买家Web用户中心OA岗位控制器
 * 处理与岗位相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
let BuyerWebUserCenterDeptPostController = class BuyerWebUserCenterDeptPostController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入PostService实例
        this.postService = null;
    }
    /**
     * 分页查询岗位
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    async page(query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '分页列表controller');
        // 获取当前用户ID
        const shopBuyerId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        console.log(shopBuyerId);
        // 调用postService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.postService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询岗位
     * @param id - 岗位ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用postService的getById方法根据ID查询岗位
        let data = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.postService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
        // 如果查询结果为空，则返回一个空对象
        if (!data) {
            data = {};
        }
        return data;
    }
    /**
     * 删除岗位
     * @param ids - 岗位ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用postService的del方法删除岗位
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.postService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
        return null;
    }
    /**
     * 更新岗位
     * @param obj - 岗位对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用postService的update方法更新岗位
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.postService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BuyerWebUserCenterDeptPostController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerWebUserCenterDeptPostController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", post_service_1.PostService)
], BuyerWebUserCenterDeptPostController.prototype, "postService", void 0);
__decorate([
    (0, decorator_1.All)('/page.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('query')),
    __param(1, (0, decorator_1.Query)()),
    __param(2, (0, decorator_1.Query)()),
    __param(3, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ReqParam_1.ReqParam,
        Page_1.Page]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterDeptPostController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterDeptPostController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterDeptPostController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterDeptPostController.prototype, "update", null);
BuyerWebUserCenterDeptPostController = __decorate([
    (0, decorator_1.Controller)('/buyer/web/userCenter/oa/post')
], BuyerWebUserCenterDeptPostController);
exports.BuyerWebUserCenterDeptPostController = BuyerWebUserCenterDeptPostController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3dlYi91c2VyQ2VudGVyL29hL3Bvc3QuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFPNkI7QUFFN0IsMEVBQXVFO0FBQ3ZFLGtFQUErRDtBQUUvRCx3RUFBb0U7QUFDcEUscURBQWtEO0FBRWxELCtGQUEwRjtBQUcxRjs7O0dBR0c7QUFFSCxJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztJQUFqRDtRQUNFLGNBQWM7UUFFTixRQUFHLEdBQVksSUFBSSxDQUFDO1FBRTVCLGFBQWE7UUFFTCxXQUFNLEdBQVksSUFBSSxDQUFDO1FBRS9CLGtCQUFrQjtRQUVWLGdCQUFXLEdBQWdCLElBQUksQ0FBQztJQXFFMUMsQ0FBQztJQW5FQzs7Ozs7OztPQU9HO0lBRUksS0FBSyxDQUFDLElBQUksQ0FDQyxLQUFhLEVBQ3BCLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVOztRQUVuQixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUV2QyxXQUFXO1FBQ1gsTUFBTSxXQUFXLEdBQVcsTUFBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxJQUFJLDBDQUFFLEVBQUUsQ0FBQztRQUV2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXpCLDZCQUE2QjtRQUM3QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxXQUFXLDBDQUFFLElBQUksbURB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