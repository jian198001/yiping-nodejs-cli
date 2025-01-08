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
exports.DeliveryCompany = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 快递公司实体类
 *
 * 该类用于定义快递公司的基本信息，包括快递公司ID和快递公司名称。
 * 所有标识符名称均来自微信小商店。
 */
let DeliveryCompany = class DeliveryCompany extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_id' }),
    (0, swagger_1.ApiProperty)({ description: '快递公司id' }),
    __metadata("design:type", String)
], DeliveryCompany.prototype, "deliveryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_name' }),
    (0, swagger_1.ApiProperty)({ description: '快递公司名称' }),
    __metadata("design:type", String)
], DeliveryCompany.prototype, "deliveryName", void 0);
DeliveryCompany = __decorate([
    (0, typeorm_1.Entity)()
], DeliveryCompany);
exports.DeliveryCompany = DeliveryCompany;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsaXZlcnlDb21wYW55LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvRGVsaXZlcnlDb21wYW55LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFnRDtBQUNoRCxxQ0FBeUM7QUFDekMsZ0VBQTZEO0FBRTdEOzs7OztHQUtHO0FBRUgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxxQkFBUztDQW9CN0MsQ0FBQTtBQVhDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUM7O21EQUNiO0FBUzFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQztJQUM5RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUM7O3FEQUNYO0FBbEJqQixlQUFlO0lBRDNCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLGVBQWUsQ0FvQjNCO0FBcEJZLDBDQUFlIn0=