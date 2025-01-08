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
exports.OrderItemConsume = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 订单商品消费实体类
 * 用于表示订单中商品的消费信息
 */
let OrderItemConsume = class OrderItemConsume extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'order_item_id' }),
    (0, swagger_1.ApiProperty)({ description: '' }),
    __metadata("design:type", String)
], OrderItemConsume.prototype, "orderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '核销码' }),
    __metadata("design:type", String)
], OrderItemConsume.prototype, "consume", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '' }),
    __metadata("design:type", String)
], OrderItemConsume.prototype, "status", void 0);
OrderItemConsume = __decorate([
    (0, typeorm_1.Entity)()
], OrderItemConsume);
exports.OrderItemConsume = OrderItemConsume;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJJdGVtQ29uc3VtZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L09yZGVySXRlbUNvbnN1bWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBQ2hELHFDQUF5QztBQUN6QyxnRUFBNkQ7QUFFN0Q7OztHQUdHO0FBRUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxxQkFBUztDQXNCOUMsQ0FBQTtBQWZDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQztJQUM5RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLENBQUM7O3FEQUNOO0FBTzNCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O2lEQUNwQjtBQU92QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOztnREFDbEI7QUFyQlgsZ0JBQWdCO0lBRDVCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLGdCQUFnQixDQXNCNUI7QUF0QlksNENBQWdCIn0=