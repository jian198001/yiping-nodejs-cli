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
exports.SocketService = void 0;
// 导入依赖项
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../../common/service/base.service");
const mock_1 = require("@midwayjs/mock");
/**
 * Socket服务类
 * 提供创建WebSocket客户端和发送消息的功能
 */
let SocketService = class SocketService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // WebSocket客户端实例
        this.webSocket = null;
        // 应用实例
        this.app = null;
    }
    /**
     * 创建WebSocket客户端
     * @returns 无返回值
     */
    async createWebSocketClient() {
        var _a, _b, _c;
        if (!(this === null || this === void 0 ? void 0 : this.webSocket)) {
            (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, 'createWebSocketClient');
            const port = (_c = this === null || this === void 0 ? void 0 : this.app) === null || _c === void 0 ? void 0 : _c.getConfig().koa.port;
            this.webSocket = await (0, mock_1.createWebSocketClient)('ws://localhost:' + port + '/ws');
        }
    }
    /**
     * 发送消息
     * @param data - 消息对象
     * @returns 无返回值
     */
    async send(data) {
        await (this === null || this === void 0 ? void 0 : this.createWebSocketClient());
        this === null || this === void 0 ? void 0 : this.webSocket.send(JSON === null || JSON === void 0 ? void 0 : JSON.stringify(data));
    }
};
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], SocketService.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], SocketService.prototype, "app", void 0);
SocketService = __decorate([
    (0, decorator_1.Provide)()
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9zb2NrZXQvc2VydmljZS9zb2NrZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxRQUFRO0FBQ1IsbURBQTJEO0FBQzNELG9FQUFnRTtBQUdoRSx5Q0FBdUQ7QUFHdkQ7OztHQUdHO0FBRUgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLDBCQUFXO0lBQTlDOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQy9CLGlCQUFpQjtRQUNULGNBQVMsR0FBUSxJQUFJLENBQUM7UUFDOUIsT0FBTztRQUVDLFFBQUcsR0FBZ0IsSUFBSSxDQUFDO0lBMkJsQyxDQUFDO0lBMUJDOzs7T0FHRztJQUNLLEtBQUssQ0FBQyxxQkFBcUI7O1FBQ2pDLElBQUksQ0FBQyxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxTQUFTLENBQUEsRUFBRTtZQUNwQixNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyx1QkFBdUIsQ0FBQyxDQUFDO1lBRTlDLE1BQU0sSUFBSSxHQUFXLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFFckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLElBQUEsNEJBQXFCLEVBQzFDLGlCQUFpQixHQUFHLElBQUksR0FBRyxLQUFLLENBQ2pDLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFlO1FBQy9CLE1BQU0sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUscUJBQXFCLEVBQUUsQ0FBQSxDQUFDO1FBRXBDLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0YsQ0FBQTtBQWhDQztJQURDLElBQUEsa0JBQU0sR0FBRTs7NkNBQ3NCO0FBSy9CO0lBREMsSUFBQSxlQUFHLEdBQUU7OzBDQUMwQjtBQVJyQixhQUFhO0lBRHpCLElBQUEsbUJBQU8sR0FBRTtHQUNHLGFBQWEsQ0FtQ3pCO0FBbkNZLHNDQUFhIn0=