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
exports.BuyerWebFrontPageInitController = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 买家Web前端页面初始化控制器
 * 处理与买家前端页面初始化相关的HTTP请求
 */
let BuyerWebFrontPageInitController = class BuyerWebFrontPageInitController {
    constructor() {
        // 注入Logger实例
        this.logger = null;
    }
    /**
     * 初始化买家前端页面
     * @returns 返回初始化数据，包括项目名称、是否开放注册和验证码等
     */
    async init() {
        var _a, _b;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '初始化controller');
        return {
            // 项目中文名称
            projectNameCn: '一平管理系统',
            // 是否开放注册
            reg: true,
            // 验证码
            captcha: null,
        };
    }
};
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerWebFrontPageInitController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyerWebFrontPageInitController.prototype, "init", null);
BuyerWebFrontPageInitController = __decorate([
    (0, decorator_1.Controller)('/buyer/web/frontPage/init')
], BuyerWebFrontPageInitController);
exports.BuyerWebFrontPageInitController = BuyerWebFrontPageInitController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3dlYi9mcm9udFBhZ2UvaW5pdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RDtBQUc5RDs7O0dBR0c7QUFFSCxJQUFhLCtCQUErQixHQUE1QyxNQUFhLCtCQUErQjtJQUE1QztRQUNFLGFBQWE7UUFFTCxXQUFNLEdBQVksSUFBSSxDQUFDO0lBbUJqQyxDQUFDO0lBbEJDOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxJQUFJOztRQUNmLE9BQU87UUFDUCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxlQUFlLENBQUMsQ0FBQztRQUV0QyxPQUFPO1lBQ0wsU0FBUztZQUNULGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLFNBQVM7WUFDVCxHQUFHLEVBQUUsSUFBSTtZQUNULE1BQU07WUFDTixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQW5CQztJQURDLElBQUEsa0JBQU0sR0FBRTs7K0RBQ3NCO0FBTS9CO0lBREMsSUFBQSxlQUFHLEVBQUMsR0FBRyxDQUFDOzs7OzJEQWFSO0FBckJVLCtCQUErQjtJQUQzQyxJQUFBLHNCQUFVLEVBQUMsMkJBQTJCLENBQUM7R0FDM0IsK0JBQStCLENBc0IzQztBQXRCWSwwRUFBK0IifQ==