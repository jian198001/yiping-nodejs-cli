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
exports.DeliveryTemplateGlobal = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 配送模板全局设置实体类
 *
 * 该类用于定义配送模板全局设置的基本信息，包括起步费用、计价方式、店铺ID、加价标准、区域ID、父级ID、加价费用、起步标准、是否为默认和区域名称。
 * 所有标识符名称均来自支付宝。
 */
let DeliveryTemplateGlobal = class DeliveryTemplateGlobal extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'start_fees', type: 'double' }),
    __metadata("design:type", Number)
], DeliveryTemplateGlobal.prototype, "startFees", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'valuation' }),
    __metadata("design:type", String)
], DeliveryTemplateGlobal.prototype, "valuation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id' }),
    __metadata("design:type", String)
], DeliveryTemplateGlobal.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'add_standards', type: 'double' }),
    __metadata("design:type", Number)
], DeliveryTemplateGlobal.prototype, "ddStandards", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'area_ids' }),
    __metadata("design:type", String)
], DeliveryTemplateGlobal.prototype, "areaIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'parent_id' }),
    __metadata("design:type", String)
], DeliveryTemplateGlobal.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'add_fees', type: 'double' }),
    __metadata("design:type", Number)
], DeliveryTemplateGlobal.prototype, "addFees", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'start_standards', type: 'double' }),
    __metadata("design:type", Number)
], DeliveryTemplateGlobal.prototype, "startStandards", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'default_status', type: 'integer' }),
    (0, swagger_1.ApiProperty)({ description: '是否为默认' }),
    __metadata("design:type", Number)
], DeliveryTemplateGlobal.prototype, "defaultStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'area_names' }),
    __metadata("design:type", String)
], DeliveryTemplateGlobal.prototype, "areaNames", void 0);
DeliveryTemplateGlobal = __decorate([
    (0, typeorm_1.Entity)()
], DeliveryTemplateGlobal);
exports.DeliveryTemplateGlobal = DeliveryTemplateGlobal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsaXZlcnlUZW1wbGF0ZUdsb2JhbC5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0RlbGl2ZXJ5VGVtcGxhdGVHbG9iYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBQ2hELHFDQUF5QztBQUN6QyxnRUFBNkQ7QUFFN0Q7Ozs7O0dBS0c7QUFFSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLHFCQUFTO0NBbUZwRCxDQUFBO0FBM0VDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDOzt5REFDbkQ7QUFRekI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDOzt5REFDbEM7QUFRekI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOztzREFDbkM7QUFRdEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7OzJEQUNwRDtBQVEzQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7O3VEQUNuQztBQVF2QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7O3dEQUNuQztBQVF4QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs7dURBQ25EO0FBUXZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7OzhEQUNuRDtBQVM5QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQ2hGLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQzs7NkRBQ1Q7QUFRN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDOzt5REFDbkM7QUFqRmQsc0JBQXNCO0lBRGxDLElBQUEsZ0JBQU0sR0FBRTtHQUNJLHNCQUFzQixDQW1GbEM7QUFuRlksd0RBQXNCIn0=