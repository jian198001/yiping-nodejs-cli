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
exports.Consume = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 物料领用记录实体类
 *
 * 该类用于定义物料领用记录的基本信息，包括员工ID、物料ID和购买数量。
 * 所有标识符名称均来自支付宝。
 */
let Consume = class Consume extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 购买数量
         *
         * 领用的物料数量。
         */
        this.quantity = 1;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '员工ID', name: 'staff_id' }),
    __metadata("design:type", String)
], Consume.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '物料ID', name: 'material_id' }),
    __metadata("design:type", String)
], Consume.prototype, "materialId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '购买数量', type: 'double' }),
    (0, swagger_1.ApiProperty)({ description: '购买数量,标识符名称来自支付宝' }),
    __metadata("design:type", Number)
], Consume.prototype, "quantity", void 0);
Consume = __decorate([
    (0, typeorm_1.Entity)()
], Consume);
exports.Consume = Consume;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0NvbnN1bWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBQ2hELHFDQUF5QztBQUN6QyxnRUFBNkQ7QUFFN0Q7Ozs7O0dBS0c7QUFFSCxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFRLFNBQVEscUJBQVM7SUFBdEM7O1FBaUJJOzs7O1dBSUc7UUFHSSxhQUFRLEdBQVcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FBQSxDQUFBO0FBbEJHO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQzs7d0NBQ3ZDO0FBUXZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQzs7MkNBQ3ZDO0FBUzFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUMzRCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzs7eUNBQ3BCO0FBeEJuQixPQUFPO0lBRG5CLElBQUEsZ0JBQU0sR0FBRTtHQUNJLE9BQU8sQ0F5Qm5CO0FBekJZLDBCQUFPIn0=