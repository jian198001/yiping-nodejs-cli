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
exports.StaffWebFrontPageInitController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const user_service_1 = require("../../../../module/auth/user.service");
const role_service_1 = require("../../../../module/auth/role.service");
/**
 * 员工Web前端页面初始化控制器
 * 处理与员工前端页面初始化相关的HTTP请求
 */
let StaffWebFrontPageInitController = class StaffWebFrontPageInitController {
    constructor() {
        // 注入Logger实例
        this.logger = null;
        // 注入UserService实例
        this.userService = null;
        // 注入RoleService实例
        this.roleService = null;
    }
    /**
     * 初始化员工前端页面
     * @returns 返回初始化数据，包括项目名称、是否开放注册和验证码等
     */
    async init() {
        var _a, _b;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '初始化controller');
        const conf = {
            // 项目中文名称
            projectNameCn: '一平管理系统',
            // 是否开放注册
            reg: false,
            // 验证码
            captcha: null,
        };
        // 调用userService的init方法初始化用户数据
        this.userService.init();
        // 调用roleService的init方法初始化角色数据
        this.roleService.init();
        const data = conf;
        return data;
    }
};
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebFrontPageInitController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], StaffWebFrontPageInitController.prototype, "userService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", role_service_1.RoleService)
], StaffWebFrontPageInitController.prototype, "roleService", void 0);
__decorate([
    (0, decorator_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffWebFrontPageInitController.prototype, "init", null);
StaffWebFrontPageInitController = __decorate([
    (0, decorator_1.Controller)('/staff/web/frontPage/init')
], StaffWebFrontPageInitController);
exports.StaffWebFrontPageInitController = StaffWebFrontPageInitController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi9mcm9udFBhZ2UvaW5pdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRTtBQUV0RSx1RUFBbUU7QUFDbkUsdUVBQW1FO0FBRW5FOzs7R0FHRztBQUVILElBQWEsK0JBQStCLEdBQTVDLE1BQWEsK0JBQStCO0lBQTVDO1FBQ0UsYUFBYTtRQUVMLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDL0Isa0JBQWtCO1FBRVYsZ0JBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBQ3hDLGtCQUFrQjtRQUVWLGdCQUFXLEdBQWdCLElBQUksQ0FBQztJQTJCMUMsQ0FBQztJQTFCQzs7O09BR0c7SUFFSSxLQUFLLENBQUMsSUFBSTs7UUFDZixPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsZUFBZSxDQUFDLENBQUM7UUFFdEMsTUFBTSxJQUFJLEdBQVE7WUFDaEIsU0FBUztZQUNULGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLFNBQVM7WUFDVCxHQUFHLEVBQUUsS0FBSztZQUNWLE1BQU07WUFDTixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUM7UUFDRiw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4Qiw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV4QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFFbEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YsQ0FBQTtBQWpDQztJQURDLElBQUEsa0JBQU0sR0FBRTs7K0RBQ3NCO0FBRy9CO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNZLDBCQUFXO29FQUFRO0FBR3hDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNZLDBCQUFXO29FQUFRO0FBTXhDO0lBREMsSUFBQSxlQUFHLEVBQUMsR0FBRyxDQUFDOzs7OzJEQXFCUjtBQW5DVSwrQkFBK0I7SUFEM0MsSUFBQSxzQkFBVSxFQUFDLDJCQUEyQixDQUFDO0dBQzNCLCtCQUErQixDQW9DM0M7QUFwQ1ksMEVBQStCIn0=