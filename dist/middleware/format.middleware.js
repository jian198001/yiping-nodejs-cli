"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatMiddleware = void 0;
// 导入依赖项
const core_1 = require("@midwayjs/core");
const Result_1 = require("../module/common/model/Result");
/**
 * 格式化中间件类
 * 用于统一处理API响应格式
 */
let FormatMiddleware = class FormatMiddleware {
    /**
     * 解析中间件
     * @returns 中间件函数
     */
    resolve() {
        return async (ctx, next) => {
            // 创建一个Result对象，用于存储响应数据
            const result = new Result_1.Result();
            let data = null;
            try {
                // 执行下一个中间件或路由处理函数
                data = await next();
            }
            catch (e) {
                // 如果发生错误，设置Result对象的错误码和错误信息
                result.code = e === null || e === void 0 ? void 0 : e.code;
                result.message = e === null || e === void 0 ? void 0 : e.message;
                // 返回Result对象
                return result;
            }
            // 设置Result对象的数据
            result.data = data;
            // 返回Result对象
            return result;
        };
    }
    /**
     * 匹配中间件
     * @param ctx - 上下文对象
     * @returns 如果路径包含/api/buyer或/api/staff，则返回true，否则返回false
     */
    match(ctx) {
        return (ctx.path.indexOf('/api/buyer') !== -1 || ctx.path.indexOf('/api/staff') !== -1);
    }
};
FormatMiddleware = __decorate([
    (0, core_1.Middleware)()
], FormatMiddleware);
exports.FormatMiddleware = FormatMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1pZGRsZXdhcmUvZm9ybWF0Lm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSLHlDQUF5RDtBQUV6RCwwREFBdUQ7QUFFdkQ7OztHQUdHO0FBRUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFDM0I7OztPQUdHO0lBQ0gsT0FBTztRQUNMLE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDaEQsd0JBQXdCO1lBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7WUFFNUIsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDO1lBRXJCLElBQUk7Z0JBQ0Ysa0JBQWtCO2dCQUNsQixJQUFJLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQzthQUNyQjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLDZCQUE2QjtnQkFDN0IsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDO2dCQUN0QixNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxPQUFPLENBQUM7Z0JBRTVCLGFBQWE7Z0JBQ2IsT0FBTyxNQUFNLENBQUM7YUFDZjtZQUVELGdCQUFnQjtZQUNoQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUVuQixhQUFhO1lBQ2IsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsR0FBRztRQUNQLE9BQU8sQ0FDTCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDL0UsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBMUNZLGdCQUFnQjtJQUQ1QixJQUFBLGlCQUFVLEdBQUU7R0FDQSxnQkFBZ0IsQ0EwQzVCO0FBMUNZLDRDQUFnQiJ9