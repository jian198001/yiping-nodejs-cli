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
exports.DeliveryTemplateLocale = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 配送模板区域设置实体类
 *
 * 该类用于定义配送模板区域设置的基本信息，包括是否为默认、区域名称、起步标准、加价费用、区域ID、父级ID、加价标准、店铺ID、计价方式和起步费用。
 * 所有标识符名称均来自支付宝。
 */
let DeliveryTemplateLocale = class DeliveryTemplateLocale extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'default_status' }),
    (0, swagger_1.ApiProperty)({ description: '是否为默认' }),
    __metadata("design:type", Number)
], DeliveryTemplateLocale.prototype, "defaultStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'area_names' }),
    __metadata("design:type", String)
], DeliveryTemplateLocale.prototype, "areaNames", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'start_standards', type: 'double' }),
    __metadata("design:type", Number)
], DeliveryTemplateLocale.prototype, "startStandards", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'add_fees', type: 'double' }),
    __metadata("design:type", Number)
], DeliveryTemplateLocale.prototype, "addFees", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'area_ids' }),
    __metadata("design:type", String)
], DeliveryTemplateLocale.prototype, "areaIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'parent_id' }),
    __metadata("design:type", String)
], DeliveryTemplateLocale.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'add_standards', type: 'double' }),
    __metadata("design:type", Number)
], DeliveryTemplateLocale.prototype, "addStandards", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id' }),
    __metadata("design:type", String)
], DeliveryTemplateLocale.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'valuation' }),
    __metadata("design:type", String)
], DeliveryTemplateLocale.prototype, "valuation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'start_fees', type: 'double' }),
    __metadata("design:type", Number)
], DeliveryTemplateLocale.prototype, "startFees", void 0);
DeliveryTemplateLocale = __decorate([
    (0, typeorm_1.Entity)()
], DeliveryTemplateLocale);
exports.DeliveryTemplateLocale = DeliveryTemplateLocale;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsaXZlcnlUZW1wbGF0ZUxvY2FsZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0RlbGl2ZXJ5VGVtcGxhdGVMb2NhbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBQ2hELHFDQUF5QztBQUN6QyxnRUFBNkQ7QUFFN0Q7Ozs7O0dBS0c7QUFFSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLHFCQUFTO0NBbUZwRCxDQUFBO0FBMUVDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0lBQy9ELElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQzs7NkRBQ1Q7QUFRN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDOzt5REFDbkM7QUFRekI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs7OERBQ25EO0FBUTlCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDOzt1REFDbkQ7QUFRdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDOzt1REFDbkM7QUFRdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDOzt3REFDbkM7QUFReEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7OzREQUNuRDtBQVE1QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7O3NEQUNuQztBQVF0QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7O3lEQUNsQztBQVF6QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs7eURBQ25EO0FBakZkLHNCQUFzQjtJQURsQyxJQUFBLGdCQUFNLEdBQUU7R0FDSSxzQkFBc0IsQ0FtRmxDO0FBbkZZLHdEQUFzQiJ9