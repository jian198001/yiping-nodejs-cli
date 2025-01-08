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
exports.UserWebUserCenterAuthUserController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
const ReqParam_1 = require("../../../../../module/common/model/ReqParam");
const Page_1 = require("../../../../../module/common/model/Page");
const user_service_1 = require("../../../../../module/auth/user.service");
const User_1 = require("../../../../../module/common/model/User");
/**
 * 用户Web用户中心认证用户控制器
 * 处理与用户相关的HTTP请求，如分页查询、根据ID查询、删除、更新、更新密码、重置密码、根据Token获取用户信息、获取用户详情、获取用户设置和获取用户中心信息
 */
let UserWebUserCenterAuthUserController = class UserWebUserCenterAuthUserController {
    constructor() {
        // 注入Context实例
        this.ctx = null;
        // 注入Logger实例
        this.logger = null;
        // 注入UserService实例
        this.userService = null;
    }
    /**
     * 分页查询用户
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
        const staffId = (_e = (_d = (_c = this === null || this === void 0 ? void 0 : this.ctx) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id;
        console.log(staffId);
        // 调用userService的page方法进行分页查询
        const data = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.userService) === null || _f === void 0 ? void 0 : _f.page) === null || _g === void 0 ? void 0 : _g.call(_f, query, params, reqParam, page));
        return data;
    }
    /**
     * 根据ID查询用户
     * @param id - 用户ID
     * @returns 返回查询结果
     */
    async getById(id) {
        var _a, _b;
        // 调用userService的getById方法根据ID查询用户
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.userService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 删除用户
     * @param ids - 用户ID数组
     * @returns 返回删除结果
     */
    async del(ids) {
        var _a, _b;
        // 调用userService的del方法删除用户
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.userService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新用户
     * @param obj - 用户对象
     * @param roleIds - 角色ID数组
     * @returns 返回更新结果
     */
    async update(obj, roleIds) {
        var _a, _b;
        // 调用userService的update方法更新用户
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.userService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj, roleIds));
    }
    /**
     * 更新用户密码
     * @param obj - 包含新密码的对象
     * @returns 返回更新结果
     */
    async updatePwd(obj) {
        var _a, _b, _c, _d, _e;
        // 获取当前用户ID
        const staffId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 设置用户ID
        obj.id = staffId;
        // 调用userService的updatePwd方法更新用户密码
        return await ((_e = (_d = this === null || this === void 0 ? void 0 : this.userService) === null || _d === void 0 ? void 0 : _d.updatePwd) === null || _e === void 0 ? void 0 : _e.call(_d, obj));
    }
    /**
     * 重置用户密码
     * @param id - 用户ID
     * @returns 返回重置结果
     */
    async resetPwd(id) {
        var _a, _b;
        // 调用userService的resetPwd方法重置用户密码
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.userService) === null || _a === void 0 ? void 0 : _a.resetPwd) === null || _b === void 0 ? void 0 : _b.call(_a, id));
    }
    /**
     * 根据Token获取用户信息
     * @returns 返回用户信息
     */
    async getByToken() {
        var _a, _b, _c, _d, _e;
        // 获取当前用户ID
        const staffId = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.ctx) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
        // 调用userService的getById方法根据ID查询用户
        let data = await ((_e = (_d = this === null || this === void 0 ? void 0 : this.userService) === null || _d === void 0 ? void 0 : _d.getById) === null || _e === void 0 ? void 0 : _e.call(_d, staffId));
        // 格式化用户信息
        data = {
            ...data,
            name: data === null || data === void 0 ? void 0 : data.username,
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        };
        return data;
    }
    /**
     * 获取用户详情
     * @returns 返回用户详情
     */
    async detail() {
        // 返回用户详情
        return {
            name: "jack hao",
            avatar: "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
            userid: "00000001",
            email: "antdesign@alipay.com",
            signature: "签名文字",
            title: "交互专家",
            group: "某某技术部－UED",
            tags: [
                {
                    key: "0",
                    label: "很有想法的",
                },
                {
                    key: "1",
                    label: "专注设计",
                },
            ],
            user: [
                {
                    id: "xxx1",
                    title: "Alipay",
                    logo: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
                    description: "那是一种内在的东西，他们到达不了，也无法触摸的",
                    updatedAt: "2024-10-19T12:24:55.374Z",
                    member: "科学搬砖组",
                    href: "",
                    memberLink: "",
                },
                {
                    id: "xxx2",
                    title: "Angular",
                    logo: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
                    description: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
                    updatedAt: "2017-07-24T00:00:00.000Z",
                    member: "全组都是吴彦祖",
                    href: "",
                    memberLink: "",
                },
            ],
            notifyCount: 12,
            unreadCount: 11,
            country: "China",
            geographic: {
                province: {
                    label: "浙江省",
                    key: "330000",
                },
                city: {
                    label: "杭州市",
                    key: "330100",
                },
            },
            address: "西湖区工专路 77 号",
            phone: "0752-268888888",
        };
    }
    /**
     * 获取用户设置
     * @returns 返回用户设置
     */
    async setting() {
        // 返回用户设置
        return {
            name: "jack hao",
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            userid: "00000001",
            email: "jian198001@163.com",
            signature: "签名文字",
            title: "交互专家",
            group: "某某技术部－UED",
            tags: [
                {
                    key: "0",
                    label: "很有想法的",
                },
                {
                    key: "1",
                    label: "专注设计",
                },
            ],
            notifyCount: 12,
            unreadCount: 11,
            country: "China",
            geographic: {
                province: {
                    label: "浙江省",
                    key: "330000",
                },
                city: {
                    label: "杭州市",
                    key: "330100",
                },
            },
            address: "西湖区工专路 77 号",
            phone: "0752-268888888",
        };
    }
    async center() {
        return {
            list: [
                {
                    id: "fake-list-0",
                    owner: "付小小",
                    title: "Alipay",
                    avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
                    cover: "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
                    status: "active",
                    percent: 62,
                    logo: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
                    href: "https://ant.design",
                    updatedAt: 1729345965099,
                    createdAt: 1729345965099,
                    subDescription: "那是一种内在的东西， 他们到达不了，也无法触摸的",
                    description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
                    activeUser: 149968,
                    newUser: 1381,
                    star: 170,
                    like: 181,
                    message: 18,
                    content: "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
                    members: [
                        {
                            avatar: "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
                            name: "曲丽丽",
                            id: "member1",
                        },
                        {
                            avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
                            name: "王昭君",
                            id: "member2",
                        },
                        {
                            avatar: "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
                            name: "董娜娜",
                            id: "member3",
                        },
                    ],
                },
                {
                    id: "fake-list-1",
                    owner: "曲丽丽",
                    title: "Angular",
                    avatar: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
                    cover: "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
                    status: "exception",
                    percent: 58,
                    logo: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
                    href: "https://ant.design",
                    updatedAt: 1729338765099,
                    createdAt: 1729338765099,
                    subDescription: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
                    description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
                    activeUser: 161529,
                    newUser: 1374,
                    star: 157,
                    like: 118,
                    message: 13,
                    content: "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
                    members: [
                        {
                            avatar: "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
                            name: "曲丽丽",
                            id: "member1",
                        },
                        {
                            avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
                            name: "王昭君",
                            id: "member2",
                        },
                        {
                            avatar: "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
                            name: "董娜娜",
                            id: "member3",
                        },
                    ],
                },
            ],
        };
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], UserWebUserCenterAuthUserController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], UserWebUserCenterAuthUserController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], UserWebUserCenterAuthUserController.prototype, "userService", void 0);
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
], UserWebUserCenterAuthUserController.prototype, "page", null);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserWebUserCenterAuthUserController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserWebUserCenterAuthUserController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __param(1, (0, decorator_1.Body)('roleIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserWebUserCenterAuthUserController.prototype, "update", null);
__decorate([
    (0, decorator_1.All)('/updatePwd.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserWebUserCenterAuthUserController.prototype, "updatePwd", null);
__decorate([
    (0, decorator_1.All)('/resetPwd.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserWebUserCenterAuthUserController.prototype, "resetPwd", null);
__decorate([
    (0, decorator_1.All)("/getByToken.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserWebUserCenterAuthUserController.prototype, "getByToken", null);
__decorate([
    (0, decorator_1.All)("/detail.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserWebUserCenterAuthUserController.prototype, "detail", null);
__decorate([
    (0, decorator_1.All)("/setting.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserWebUserCenterAuthUserController.prototype, "setting", null);
__decorate([
    (0, decorator_1.All)("/center.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserWebUserCenterAuthUserController.prototype, "center", null);
UserWebUserCenterAuthUserController = __decorate([
    (0, decorator_1.Controller)("/staff/web/userCenter/auth/user")
], UserWebUserCenterAuthUserController);
exports.UserWebUserCenterAuthUserController = UserWebUserCenterAuthUserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi91c2VyQ2VudGVyL2F1dGgvdXNlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUk2QjtBQUU3QiwrRkFBMEY7QUFHMUYsMEVBQXVFO0FBQ3ZFLGtFQUErRDtBQUMvRCwwRUFBc0U7QUFFdEUsa0VBQStEO0FBRS9EOzs7R0FHRztBQUVILElBQWEsbUNBQW1DLEdBQWhELE1BQWEsbUNBQW1DO0lBQWhEO1FBRUUsY0FBYztRQUVOLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFFNUIsYUFBYTtRQUVMLFdBQU0sR0FBWSxJQUFJLENBQUE7UUFFOUIsa0JBQWtCO1FBRVYsZ0JBQVcsR0FBZ0IsSUFBSSxDQUFDO0lBMFUxQyxDQUFDO0lBeFVDOzs7Ozs7O09BT0c7SUFFSSxLQUFLLENBQUMsSUFBSSxDQUNDLEtBQWEsRUFDWixNQUFXLEVBQVcsUUFBa0IsRUFDaEQsSUFBVTs7UUFFbkIsT0FBTztRQUNQLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLGdCQUFnQixDQUFDLENBQUM7UUFFdkMsV0FBVztRQUNYLE1BQU0sT0FBTyxHQUFXLE1BQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLEtBQUssMENBQUUsSUFBSSwwQ0FBRSxFQUFFLENBQUM7UUFFbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyQiw2QkFBNkI7UUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsV0FBVywwQ0FBRSxJQUFJLG1E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