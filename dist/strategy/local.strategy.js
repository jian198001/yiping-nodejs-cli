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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
// 导入依赖项
const passport_1 = require("@midwayjs/passport");
const decorator_1 = require("@midwayjs/decorator");
const passport_local_1 = require("passport-local");
const jwt_1 = require("@midwayjs/jwt");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const Zero0Error_1 = require("../module/common/model/Zero0Error");
const User_1 = require("../module/common/model/User");
const crypto = require('../module/common/utils/crypto');
/**
 * 本地策略类
 * 用于处理本地用户认证
 */
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 注入User实体的Repository
        this.repository = null;
        // 注入JwtService
        this.jwtService = null;
    }
    /**
     * 验证用户凭据
     * @param username - 用户名
     * @param password - 密码
     * @returns 包含JWT令牌的对象
     */
    async validate(username, password) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let log = '';
        console.log(username, password);
        const pwd = (_a = crypto === null || crypto === void 0 ? void 0 : crypto.md5) === null || _a === void 0 ? void 0 : _a.call(crypto, password);
        const users = await ((_b = this === null || this === void 0 ? void 0 : this.repository) === null || _b === void 0 ? void 0 : _b.findBy({
            username: username,
            password: pwd,
        }));
        console.log(users);
        if (!users || (users === null || users === void 0 ? void 0 : users.length) < 1) {
            log = '用户名或密码错误';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '401');
            (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.call(_c, log, zero0Error);
            throw zero0Error;
        }
        const user = users === null || users === void 0 ? void 0 : users[0];
        if (!user) {
            log = '用户名或密码错误';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '401');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        const payload = { id: user === null || user === void 0 ? void 0 : user.id };
        const token = (_h = (_g = this === null || this === void 0 ? void 0 : this.jwtService) === null || _g === void 0 ? void 0 : _g.signSync) === null || _h === void 0 ? void 0 : _h.call(_g, payload, 'yiping', {
            expiresIn: '999999d',
        });
        return {
            token,
        };
    }
    /**
     * 获取策略选项
     * @returns 策略选项对象
     */
    getStrategyOptions() {
        return {};
    }
};
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], LocalStrategy.prototype, "logger", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(User_1.User),
    __metadata("design:type", typeorm_2.Repository)
], LocalStrategy.prototype, "repository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", jwt_1.JwtService)
], LocalStrategy.prototype, "jwtService", void 0);
LocalStrategy = __decorate([
    (0, passport_1.CustomStrategy)()
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwuc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbInN0cmF0ZWd5L2xvY2FsLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDUixpREFBc0U7QUFDdEUsbURBQXFEO0FBQ3JELG1EQUEwQztBQUMxQyx1Q0FBMkM7QUFDM0MsK0NBQXNEO0FBQ3RELHFDQUFxQztBQUdyQyxrRUFBK0Q7QUFDL0Qsc0RBQW1EO0FBRW5ELE1BQU0sTUFBTSxHQUFRLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBRTdEOzs7R0FHRztBQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxJQUFBLDJCQUFnQixFQUFDLHlCQUFRLENBQUM7SUFBN0Q7O1FBQ0UsUUFBUTtRQUVBLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0Isc0JBQXNCO1FBRWQsZUFBVSxHQUFxQixJQUFJLENBQUM7UUFFNUMsZUFBZTtRQUVQLGVBQVUsR0FBZSxJQUFJLENBQUM7SUEwRHhDLENBQUM7SUF4REM7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFROztRQUMvQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoQyxNQUFNLEdBQUcsR0FBRyxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxHQUFHLHVEQUFHLFFBQVEsQ0FBQyxDQUFDO1FBRXBDLE1BQU0sS0FBSyxHQUFXLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLDBDQUFFLE1BQU0sQ0FBQztZQUNuRCxRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQSxDQUFDO1FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuQixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE1BQU0sSUFBRyxDQUFDLEVBQUU7WUFDL0IsR0FBRyxHQUFHLFVBQVUsQ0FBQztZQUVqQixNQUFNLFVBQVUsR0FBZSxJQUFJLHVCQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFELE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxLQUFLLG1EQUFHLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2QyxNQUFNLFVBQVUsQ0FBQztTQUNsQjtRQUVELE1BQU0sSUFBSSxHQUFHLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxDQUFDLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsR0FBRyxHQUFHLFVBQVUsQ0FBQztZQUVqQixNQUFNLFVBQVUsR0FBZSxJQUFJLHVCQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFELE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxLQUFLLG1EQUFHLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2QyxNQUFNLFVBQVUsQ0FBQztTQUNsQjtRQUVELE1BQU0sT0FBTyxHQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxFQUFFLEVBQUUsQ0FBQztRQUV0QyxNQUFNLEtBQUssR0FBVyxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsUUFBUSxtREFBRyxPQUFPLEVBQUUsUUFBUSxFQUFFO1lBQ3BFLFNBQVMsRUFBRSxTQUFTO1NBQ3JCLENBQUMsQ0FBQztRQUVILE9BQU87WUFDTCxLQUFLO1NBQ04sQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxrQkFBa0I7UUFDaEIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0YsQ0FBQTtBQWxFQztJQURDLElBQUEsa0JBQU0sR0FBRTs7NkNBQ3NCO0FBSS9CO0lBREMsSUFBQSwyQkFBaUIsRUFBQyxXQUFJLENBQUM7OEJBQ0osb0JBQVU7aURBQWM7QUFJNUM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1csZ0JBQVU7aURBQVE7QUFYM0IsYUFBYTtJQUR6QixJQUFBLHlCQUFjLEdBQUU7R0FDSixhQUFhLENBcUV6QjtBQXJFWSxzQ0FBYSJ9