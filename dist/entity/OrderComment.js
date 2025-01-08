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
exports.OrderComment = void 0;
// 导入依赖项
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 订单评论实体类
 * 用于表示订单评论的基本信息
 */
let OrderComment = class OrderComment extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '订单id', name: 'order_id' }),
    (0, swagger_1.ApiProperty)({ description: '订单id' }),
    __metadata("design:type", String)
], OrderComment.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '买家留言,标识符名称来自有赞', name: 'message' }),
    (0, swagger_1.ApiProperty)({ description: '买家留言,标识符名称来自有赞' }),
    __metadata("design:type", String)
], OrderComment.prototype, "message", void 0);
OrderComment = __decorate([
    (0, typeorm_1.Entity)()
], OrderComment);
exports.OrderComment = OrderComment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJDb21tZW50LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvT3JkZXJDb21tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDUiwrQ0FBZ0Q7QUFDaEQscUNBQXlDO0FBQ3pDLGdFQUE2RDtBQUU3RDs7O0dBR0c7QUFFSCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEscUJBQVM7Q0FnQjFDLENBQUE7QUFUQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDN0QsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs2Q0FDZDtBQVF2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUN0RSxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzs7NkNBQ3hCO0FBZlosWUFBWTtJQUR4QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxZQUFZLENBZ0J4QjtBQWhCWSxvQ0FBWSJ9