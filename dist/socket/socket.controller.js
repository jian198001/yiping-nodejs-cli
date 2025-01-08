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
exports.SocketController = void 0;
// 导入依赖项
const core_1 = require("@midwayjs/core");
/**
 * WebSocket控制器类
 * 处理WebSocket连接和消息
 */
let SocketController = class SocketController {
    /**
     * 处理WebSocket消息
     * @param data - 接收到的消息数据
     * @returns 返回接收到的消息数据
     */
    async message(data) {
        var _a;
        // 将接收到的数据转换为字符串并返回
        return (_a = data === null || data === void 0 ? void 0 : data.toString) === null || _a === void 0 ? void 0 : _a.call(data);
    }
};
__decorate([
    (0, core_1.OnWSMessage)('message'),
    (0, core_1.WSBroadCast)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocketController.prototype, "message", null);
SocketController = __decorate([
    (0, core_1.WSController)('/ws')
], SocketController);
exports.SocketController = SocketController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbInNvY2tldC9zb2NrZXQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxRQUFRO0FBQ1IseUNBQXdFO0FBRXhFOzs7R0FHRztBQUVILElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQzNCOzs7O09BSUc7SUFHSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQVk7O1FBQy9CLG1CQUFtQjtRQUNuQixPQUFPLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsb0RBQUksQ0FBQztJQUM1QixDQUFDO0NBQ0YsQ0FBQTtBQUpDO0lBRkMsSUFBQSxrQkFBVyxFQUFDLFNBQVMsQ0FBQztJQUN0QixJQUFBLGtCQUFXLEdBQUU7Ozs7K0NBSWI7QUFYVSxnQkFBZ0I7SUFENUIsSUFBQSxtQkFBWSxFQUFDLEtBQUssQ0FBQztHQUNQLGdCQUFnQixDQVk1QjtBQVpZLDRDQUFnQiJ9