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
exports.CardTimeLimit = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 卡券时间限制实体类
 *
 * 该类用于定义卡券的时间限制信息，包括起始时间、结束时间、限制类型、起始小时和结束小时。
 * 所有标识符名称均来自微信支付平台。
 */
// @Entity()
class CardTimeLimit extends BaseModel_1.BaseModel {
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'begin_minute', type: 'integer' }),
    (0, swagger_1.ApiProperty)({ description: '当前type类型下的起始时间（分钟） ,如当前结构体内填写了MONDAY, begin_hour填写10,此处填写了59, 则此处表示周一 10:59可用' }),
    __metadata("design:type", Number)
], CardTimeLimit.prototype, "beginMinute", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'end_minute', type: 'integer' }),
    (0, swagger_1.ApiProperty)({ description: '当前type类型下的结束时间（分钟） ,如当前结构体内填写了MONDAY, begin_hour填写10,此处填写了59, 则此处表示周一 10:59-00:59可用' }),
    __metadata("design:type", Number)
], CardTimeLimit.prototype, "endMinute", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'type' }),
    (0, swagger_1.ApiProperty)({ description: '限制类型枚举值：支持填入 MONDAY 周一 TUESDAY 周二 WEDNESDAY 周三 THURSDAY 周四 FRIDAY 周五 SATURDAY 周六 SUNDAY 周日 此处只控制显示, 不控制实际使用逻辑,不填默认不显示' }),
    __metadata("design:type", String)
], CardTimeLimit.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'begin_hour', type: 'integer' }),
    (0, swagger_1.ApiProperty)({ description: '当前type类型下的起始时间（小时） ,如当前结构体内填写了MONDAY, 此处填写了10,则此处表示周一 10:00可用' }),
    __metadata("design:type", Number)
], CardTimeLimit.prototype, "beginHour", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'end_hour', type: 'integer' }),
    (0, swagger_1.ApiProperty)({ description: '当前type类型下的结束时间（小时） ,如当前结构体内填写了MONDAY, 此处填写了20, 则此处表示周一 10:00-20:00可用' }),
    __metadata("design:type", Number)
], CardTimeLimit.prototype, "endHour", void 0);
exports.CardTimeLimit = CardTimeLimit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZFRpbWVMaW1pdC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0NhcmRUaW1lTGltaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBQ2hELHFDQUFpQztBQUNqQyxnRUFBNkQ7QUFFN0Q7Ozs7O0dBS0c7QUFDSCxZQUFZO0FBQ1osTUFBYSxhQUFjLFNBQVEscUJBQVM7Q0ErQzNDO0FBdENDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQzlFLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSwrRUFBK0UsRUFBRSxDQUFDOztrREFDbkY7QUFTM0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDNUUsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLHFGQUFxRixFQUFFLENBQUM7O2dEQUMzRjtBQVN6QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDckQsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLHVIQUF1SCxFQUFFLENBQUM7OzJDQUNsSTtBQVNwQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUM1RSxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsK0RBQStELEVBQUUsQ0FBQzs7Z0RBQ3JFO0FBU3pCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQzFFLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxzRUFBc0UsRUFBRSxDQUFDOzs4Q0FDOUU7QUE3Q3pCLHNDQStDQyJ9