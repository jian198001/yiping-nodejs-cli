"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundFilter = void 0;
// 导入依赖项
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@midwayjs/core");
/**
 * 未找到错误过滤器类
 * 用于捕获并处理404错误
 */
let NotFoundFilter = class NotFoundFilter {
    /**
     * 捕获未找到错误
     * @param err - MidwayHttpError对象
     * @param ctx - Context对象
     * @returns 无返回值
     */
    async catch(err, ctx) {
        // 404错误会到这里
        ctx.redirect('/404.html');
    }
};
NotFoundFilter = __decorate([
    (0, decorator_1.Catch)(core_1.httpError.NotFoundError)
], NotFoundFilter);
exports.NotFoundFilter = NotFoundFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Zm91bmQuZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJmaWx0ZXIvbm90Zm91bmQuZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDUixtREFBNEM7QUFDNUMseUNBQTREO0FBRzVEOzs7R0FHRztBQUVILElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekI7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBWTtRQUNuRCxZQUFZO1FBQ1osR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0YsQ0FBQTtBQVhZLGNBQWM7SUFEMUIsSUFBQSxpQkFBSyxFQUFDLGdCQUFTLENBQUMsYUFBYSxDQUFDO0dBQ2xCLGNBQWMsQ0FXMUI7QUFYWSx3Q0FBYyJ9