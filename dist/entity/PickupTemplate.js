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
exports.PickupTemplate = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 线下自提模板实体类
 * 用于表示线下自提的相关模板信息
 */
let PickupTemplate = class PickupTemplate extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'business_hours', }),
    (0, swagger_1.ApiProperty)({ description: '营业时间:默认值：00:00-23:59', }),
    __metadata("design:type", String)
], PickupTemplate.prototype, "businessHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'promise_delivery_minutes', }),
    (0, swagger_1.ApiProperty)({ description: '备货时间,分钟', }),
    __metadata("design:type", Number)
], PickupTemplate.prototype, "promiseDeliveryMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'book_time', }),
    (0, swagger_1.ApiProperty)({ description: '可预定时间,分钟', }),
    __metadata("design:type", Number)
], PickupTemplate.prototype, "bookTime", void 0);
PickupTemplate = __decorate([
    (0, typeorm_1.Entity)()
], PickupTemplate);
exports.PickupTemplate = PickupTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja3VwVGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9QaWNrdXBUZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFDOUMscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEscUJBQVM7Q0EwQjVDLENBQUE7QUFsQkM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixHQUFFLENBQUM7SUFDOUQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHNCQUFzQixHQUFFLENBQUM7O3FEQUN4QjtBQVE1QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEdBQUUsQ0FBQztJQUN4RSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsU0FBUyxHQUFFLENBQUM7OzhEQUNGO0FBUXJDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsVUFBVSxHQUFFLENBQUM7O2dEQUNqQjtBQXhCWixjQUFjO0lBRDFCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLGNBQWMsQ0EwQjFCO0FBMUJZLHdDQUFjIn0=