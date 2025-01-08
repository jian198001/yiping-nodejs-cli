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
exports.BuyerWebUserCenterAuthMenuController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const menu_service_1 = require("../../../../../module/auth/menu.service");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
const Menu_1 = require("../../../../../model/Menu");
/**
 * 买家Web用户中心认证菜单控制器
 * 处理与菜单相关的HTTP请求，如根据ID查询、删除、更新和初始化
 */
let BuyerWebUserCenterAuthMenuController = class BuyerWebUserCenterAuthMenuController {
    constructor() {
        // 注入MenuService实例
        this.menuService = null;
    }
    /**
     * 根据ID查询菜单
     * @param id - 菜单ID
     * @param level - 菜单级别
     * @returns 返回查询结果
     */
    async getById(id, level) {
        var _a, _b;
        // 调用menuService的getById方法根据ID和级别查询菜单
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
        // 调用menuService的del方法根据ID和级别删除菜单
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.menuService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, id, level));
        return null;
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
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", menu_service_1.MenuService)
], BuyerWebUserCenterAuthMenuController.prototype, "menuService", void 0);
__decorate([
    (0, decorator_1.All)('/getById.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __param(1, (0, decorator_1.Query)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterAuthMenuController.prototype, "getById", null);
__decorate([
    (0, decorator_1.All)('/del.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)('id')),
    __param(1, (0, decorator_1.Query)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterAuthMenuController.prototype, "del", null);
__decorate([
    (0, decorator_1.All)('/update.json', { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Menu_1.Menu]),
    __metadata("design:returntype", Promise)
], BuyerWebUserCenterAuthMenuController.prototype, "update", null);
BuyerWebUserCenterAuthMenuController = __decorate([
    (0, decorator_1.Controller)('/buyer/web/userCenter/auth/menu')
], BuyerWebUserCenterAuthMenuController);
exports.BuyerWebUserCenterAuthMenuController = BuyerWebUserCenterAuthMenuController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3dlYi91c2VyQ2VudGVyL2F1dGgvbWVudS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUEyRTtBQUUzRSwwRUFBc0U7QUFFdEUsK0ZBQTBGO0FBRTFGLG9EQUFpRDtBQUVqRDs7O0dBR0c7QUFFSCxJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztJQUFqRDtRQUNFLGtCQUFrQjtRQUVWLGdCQUFXLEdBQWdCLElBQUksQ0FBQztJQTJDMUMsQ0FBQztJQTFDQzs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQ0wsRUFBVSxFQUNQLEtBQWE7O1FBRTdCLHFDQUFxQztRQUNyQyxPQUFPLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFdBQVcsMENBQUUsT0FBTyxtREFBRyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUEsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsR0FBRyxDQUNELEVBQVUsRUFDUCxLQUFhOztRQUU3QixpQ0FBaUM7UUFDakMsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsV0FBVywwQ0FBRSxHQUFHLG1EQUFHLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQSxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsTUFBTSxDQUFTLEdBQVM7O1FBQ25DLDZCQUE2QjtRQUM3QixPQUFPLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFdBQVcsMENBQUUsTUFBTSxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDO0lBQ2hELENBQUM7Q0FFRixDQUFBO0FBM0NDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNZLDBCQUFXO3lFQUFRO0FBUXhDO0lBREMsSUFBQSxlQUFHLEVBQUMsZUFBZSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBRTNELFdBQUEsSUFBQSxpQkFBSyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQ1gsV0FBQSxJQUFBLGlCQUFLLEVBQUMsT0FBTyxDQUFDLENBQUE7Ozs7bUVBSWhCO0FBU0Q7SUFEQyxJQUFBLGVBQUcsRUFBQyxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQywrQ0FBcUIsQ0FBQyxFQUFFLENBQUM7SUFFdkQsV0FBQSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDWCxXQUFBLElBQUEsaUJBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTs7OzsrREFLaEI7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLGNBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQztJQUN4QyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOztxQ0FBTSxXQUFJOztrRUFHcEM7QUE1Q1Usb0NBQW9DO0lBRGhELElBQUEsc0JBQVUsRUFBQyxpQ0FBaUMsQ0FBQztHQUNqQyxvQ0FBb0MsQ0E4Q2hEO0FBOUNZLG9GQUFvQyJ9