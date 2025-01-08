"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultErrorFilter = void 0;
// 导入依赖项
const decorator_1 = require("@midwayjs/decorator");
/**
 * 默认错误过滤器类
 * 用于捕获并处理所有未分类的错误
 */
let DefaultErrorFilter = class DefaultErrorFilter {
    /**
     * 捕获错误
     * @param err - 错误对象
     * @param ctx - 上下文对象
     * @returns 包含错误信息的对象
     */
    async catch(err, ctx) {
        // 所有未分类的错误会到这里
        return {
            success: false,
            message: err.message,
        };
    }
};
DefaultErrorFilter = __decorate([
    (0, decorator_1.Catch)()
], DefaultErrorFilter);
exports.DefaultErrorFilter = DefaultErrorFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImZpbHRlci9kZWZhdWx0LmZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxRQUFRO0FBQ1IsbURBQTRDO0FBRzVDOzs7R0FHRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBQzdCOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFVLEVBQUUsR0FBWTtRQUN6QyxlQUFlO1FBQ2YsT0FBTztZQUNMLE9BQU8sRUFBRSxLQUFLO1lBQ2QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1NBQ3JCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWRZLGtCQUFrQjtJQUQ5QixJQUFBLGlCQUFLLEdBQUU7R0FDSyxrQkFBa0IsQ0FjOUI7QUFkWSxnREFBa0IifQ==