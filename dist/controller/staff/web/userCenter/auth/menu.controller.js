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
exports.StaffWebUserCenterAuthMenuController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const menu_service_1 = require("../../../../../module/auth/menu.service");
const Menu_1 = require("../../../../../model/Menu");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工Web用户中心权限菜单控制器
 * 负责处理与菜单相关的HTTP请求，如获取、删除、更新和初始化菜单
 */
let StaffWebUserCenterAuthMenuController = class StaffWebUserCenterAuthMenuController {
    constructor() {
        // 注入MenuService实例
        this.menuService = null;
    }
    /**
     * 根据ID获取菜单
     * @param id - 菜单ID
     * @param level - 菜单级别
     * @returns 返回菜单信息
     */
    async getById(id, level) {
        var _a, _b;
        // 调用menuService的getById方法获取菜单信息
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.menuService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, id, level));
    }
    /**
     * 删除菜单
     * @param id - 菜单ID
     * @param level - 菜单级别
     * @returns 返回删除结果
     */
    async del(id, level) {
        var _a, _b;
        // 调用menuService的del方法删除菜单
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.menuService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, id, level));
    }
    /**
     * 更新菜单
     * @param obj - 菜单对象
     * @returns 返回更新结果
     */
    async update(obj) {
        var _a, _b;
        // 调用menuService的update方法更新菜单
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.menuService) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, obj));
    }
    /**
     * 初始化菜单
     * @returns 返回初始化结果
     */
    async init() {
        var _a;
        // 调用menuService的init方法初始化菜单
        return await ((_a = this === null || this === void 0 ? void 0 : this.menuService) === null || _a === void 0 ? void 0 : _a.init());
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", menu_service_1.MenuService)
], StaffWebUserCenterAuthMenuController.prototype, "menuService", void 0);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __param(1, (0, decorator_1.Query)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterAuthMenuController.prototype, "getById", null);
__decorate([
    __param(0, (0, decorator_1.Query)('id')),
    __param(1, (0, decorator_1.Query)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterAuthMenuController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Menu_1.Menu]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterAuthMenuController.prototype, "update", null);
__decorate([
    (0, decorator_1.All)('/init.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterAuthMenuController.prototype, "init", null);
StaffWebUserCenterAuthMenuController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/auth/menu')
], StaffWebUserCenterAuthMenuController);
exports.StaffWebUserCenterAuthMenuController = StaffWebUserCenterAuthMenuController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL3N0YWZmL3dlYi91c2VyQ2VudGVyL2F1dGgvbWVudS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUEyRTtBQUUzRSwwRUFBc0U7QUFFdEUsb0RBQWlEO0FBQ2pELCtGQUEwRjtBQUUxRjs7O0dBR0c7QUFFSCxJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztJQUFqRDtRQUNFLGtCQUFrQjtRQUVWLGdCQUFXLEdBQWdCLElBQUksQ0FBQztJQWtEMUMsQ0FBQztJQWpEQzs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQ0wsRUFBVSxFQUNQLEtBQWE7O1FBRTdCLGdDQUFnQztRQUNoQyxPQUFPLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFdBQVcsMENBQUUsT0FBTyxtREFBRyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUEsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsR0FBRyxDQUNELEVBQVUsRUFDUCxLQUFhOztRQUU3QiwwQkFBMEI7UUFDMUIsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsV0FBVywwQ0FBRSxHQUFHLG1EQUFHLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7OztPQUlHO0lBRUksS0FBSyxDQUFDLE1BQU0sQ0FBUyxHQUFTOztRQUNuQyw2QkFBNkI7UUFDN0IsT0FBTyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxXQUFXLDBDQUFFLE1BQU0sbURBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLElBQUk7O1FBQ2YsNEJBQTRCO1FBQzVCLE9BQU8sTUFBTSxDQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFdBQVcsMENBQUUsSUFBSSxFQUFFLENBQUEsQ0FBQztJQUN6QyxDQUFDO0NBQ0YsQ0FBQTtBQWxEQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDWSwwQkFBVzt5RUFBUTtBQVF4QztJQURDLElBQUEsZUFBRyxFQUFDLGVBQWUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUUzRCxXQUFBLElBQUEsaUJBQUssRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUNYLFdBQUEsSUFBQSxpQkFBSyxFQUFDLE9BQU8sQ0FBQyxDQUFBOzs7O21FQUloQjtBQVFEO0lBQ0csV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDWCxXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTs7OzsrREFJaEI7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLGNBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUN4QyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOztxQ0FBTSxXQUFJOztrRUFHcEM7QUFPRDtJQURDLElBQUEsZUFBRyxFQUFDLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQzs7OztnRUFJMUQ7QUFwRFUsb0NBQW9DO0lBRGhELElBQUEsc0JBQVUsRUFBQyxpQ0FBaUMsQ0FBQztHQUNqQyxvQ0FBb0MsQ0FxRGhEO0FBckRZLG9GQUFvQyJ9