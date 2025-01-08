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
exports.Comment = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 评价实体类
 *
 * 该类用于定义用户对订单的评价信息，包括评价内容、评价结果、订单ID、是否匿名和买家ID。
 * 所有标识符名称均来自淘宝开放平台。
 */
let Comment = class Comment extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '评价内容', name: 'content', }),
    (0, swagger_1.ApiProperty)({ description: '评价内容,最大长度: 500个汉字 .注意：当评价结果为good时就不用输入评价内容.评价内容为neutral/bad的时候需要输入评价内容。标识符名称来自淘宝开放平台', }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '评价结果', name: 'result', }),
    (0, swagger_1.ApiProperty)({ description: '评价结果,可选值:good(好评),neutral(中评),bad(差评)。标识符名称来自淘宝开放平台', }),
    __metadata("design:type", String)
], Comment.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '订单id', name: 'order_id', }),
    (0, swagger_1.ApiProperty)({ description: '订单id', }),
    __metadata("design:type", String)
], Comment.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '是否匿名', name: 'anony', }),
    (0, swagger_1.ApiProperty)({ description: '是否匿名,卖家评不能匿名。可选值:1(匿名),0(非匿名)。注意：如果交易订单匿名,则评价也匿名。标识符名称来自淘宝开放平台', }),
    __metadata("design:type", String)
], Comment.prototype, "anony", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '买家id', name: 'shop_shop_buyer_id', }),
    (0, swagger_1.ApiProperty)({ description: '买家id', }),
    __metadata("design:type", String)
], Comment.prototype, "shopBuyerId", void 0);
Comment = __decorate([
    (0, typeorm_1.Entity)()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7Ozs7O0dBS0c7QUFFSCxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFRLFNBQVEscUJBQVM7Q0ErQ3JDLENBQUE7QUF0Q0M7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQzNELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxzRkFBc0YsR0FBRSxDQUFDOzt3Q0FDOUY7QUFTdEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDO0lBQzFELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxxREFBcUQsR0FBRSxDQUFDOzt1Q0FDOUQ7QUFTckI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDO0lBQzVELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7d0NBQ2Q7QUFTdEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRSxDQUFDO0lBQ3pELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxnRUFBZ0UsR0FBRSxDQUFDOztzQ0FDMUU7QUFTcEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixHQUFFLENBQUM7SUFDdEUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzs0Q0FDVjtBQTdDZixPQUFPO0lBRG5CLElBQUEsZ0JBQU0sR0FBRTtHQUNJLE9BQU8sQ0ErQ25CO0FBL0NZLDBCQUFPIn0=