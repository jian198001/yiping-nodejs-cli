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
exports.Conf = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 配置项实体类
 *
 * 该类用于定义系统配置项的基本信息，包括配置项的键、值、类别、类型、可见性和备注。
 * 所有标识符名称均来自支付宝。
 */
let Conf = class Conf extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '配置项的键', name: 'conf_key' }),
    (0, swagger_1.ApiProperty)({ description: '配置项的键' }),
    __metadata("design:type", String)
], Conf.prototype, "confKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'conf_val' }),
    (0, swagger_1.ApiProperty)({ description: '配置项的值' }),
    __metadata("design:type", String)
], Conf.prototype, "confVal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'category' }),
    (0, swagger_1.ApiProperty)({ description: '配置项的类别' }),
    __metadata("design:type", String)
], Conf.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'type' }),
    (0, swagger_1.ApiProperty)({ description: '配置项的类型' }),
    __metadata("design:type", String)
], Conf.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'visible' }),
    (0, swagger_1.ApiProperty)({ description: '配置项的可见性' }),
    __metadata("design:type", String)
], Conf.prototype, "visible", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'remark' }),
    (0, swagger_1.ApiProperty)({ description: '配置项的备注' }),
    __metadata("design:type", String)
], Conf.prototype, "remark", void 0);
Conf = __decorate([
    (0, typeorm_1.Entity)()
], Conf);
exports.Conf = Conf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZi5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0NvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBQ2hELHFDQUF5QztBQUN6QyxnRUFBNkQ7QUFFN0Q7Ozs7O0dBS0c7QUFFSCxJQUFhLElBQUksR0FBakIsTUFBYSxJQUFLLFNBQVEscUJBQVM7Q0F3RGxDLENBQUE7QUEvQ0M7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQzlELElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQzs7cUNBQ2Y7QUFTdkI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUM1QyxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUM7O3FDQUNmO0FBU3ZCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDNUMsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDOztzQ0FDZjtBQVN4QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3hDLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQzs7a0NBQ25CO0FBU3BCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDM0MsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDOztxQ0FDakI7QUFTdkI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUMxQyxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUM7O29DQUNqQjtBQXREWCxJQUFJO0lBRGhCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLElBQUksQ0F3RGhCO0FBeERZLG9CQUFJIn0=