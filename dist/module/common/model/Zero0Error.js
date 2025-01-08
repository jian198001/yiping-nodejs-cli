"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zero0Error = void 0;
/**
 * 导入Midway框架的MidwayError类，用于创建自定义错误
 */
const core_1 = require("@midwayjs/core");
/**
 * 自定义错误类，继承自MidwayError
 */
class Zero0Error extends core_1.MidwayError {
    /**
     * 构造函数，用于创建Zero0Error实例
     *
     * @param {string} message - 错误消息
     * @param {string} code - 错误代码
     */
    constructor(message, code) {
        // 调用父类的构造函数，传递错误消息、错误代码和一个空对象作为扩展信息
        super(message, code, {});
    }
}
exports.Zero0Error = Zero0Error;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWmVybzBFcnJvci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL2NvbW1vbi9tb2RlbC9aZXJvMEVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0gseUNBQTZDO0FBRTdDOztHQUVHO0FBQ0gsTUFBYSxVQUFXLFNBQVEsa0JBQVc7SUFDekM7Ozs7O09BS0c7SUFDSCxZQUFZLE9BQWUsRUFBRSxJQUFZO1FBQ3ZDLG9DQUFvQztRQUNwQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFYRCxnQ0FXQyJ9