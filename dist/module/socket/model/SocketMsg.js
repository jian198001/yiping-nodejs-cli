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
exports.SocketMsg = void 0;
// 导入依赖项
const swagger_1 = require("@midwayjs/swagger");
const BaseModel_1 = require("../../common/model/BaseModel");
/**
 * Socket消息模型类
 * 用于定义Socket消息的结构
 */
class SocketMsg extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        // 消息发送者
        this.sender = '';
        // 消息接收者
        this.receiver = '';
        // 消息标题
        this.title = '';
        // 消息内容
        this.content = '';
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '消息发送者' }),
    __metadata("design:type", Object)
], SocketMsg.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '消息接收者' }),
    __metadata("design:type", Object)
], SocketMsg.prototype, "receiver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '消息标题' }),
    __metadata("design:type", Object)
], SocketMsg.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '消息内容' }),
    __metadata("design:type", Object)
], SocketMsg.prototype, "content", void 0);
exports.SocketMsg = SocketMsg;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0TXNnLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvc29ja2V0L21vZGVsL1NvY2tldE1zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxRQUFRO0FBQ1IsK0NBQWdEO0FBQ2hELDREQUF5RDtBQUV6RDs7O0dBR0c7QUFDSCxNQUFhLFNBQVUsU0FBUSxxQkFBUztJQUF4Qzs7UUFDRSxRQUFRO1FBRUQsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNuQixRQUFRO1FBRUQsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNyQixPQUFPO1FBRUEsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNsQixPQUFPO1FBRUEsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBQUE7QUFWQztJQURDLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQzs7eUNBQ25CO0FBR25CO0lBREMsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDOzsyQ0FDakI7QUFHckI7SUFEQyxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7O3dDQUNuQjtBQUdsQjtJQURDLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQzs7MENBQ2pCO0FBWnRCLDhCQWFDIn0=