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
exports.DeliveryList = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 发货清单实体类
 *
 * 该类用于定义发货清单的基本信息，包括快递公司ID、快递单号、商品信息和订单ID。
 * 所有标识符名称均来自微信小商店。
 */
let DeliveryList = class DeliveryList extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'delivery_id' }),
    (0, swagger_1.ApiProperty)({ description: '快递公司id，通过获取快递公司列表获取，快递配送必填，同城，线下自提不用填' }),
    __metadata("design:type", String)
], DeliveryList.prototype, "deliveryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'waybill_id' }),
    (0, swagger_1.ApiProperty)({ description: '快递单号，快递配送必填，同城，线下自提不用填' }),
    __metadata("design:type", String)
], DeliveryList.prototype, "waybillId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_infos' }),
    (0, swagger_1.ApiProperty)({ description: '商品' }),
    __metadata("design:type", String)
], DeliveryList.prototype, "goodsInfos", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'order_id' }),
    (0, swagger_1.ApiProperty)({ description: '订单ID' }),
    __metadata("design:type", String)
], DeliveryList.prototype, "orderId", void 0);
DeliveryList = __decorate([
    (0, typeorm_1.Entity)()
], DeliveryList);
exports.DeliveryList = DeliveryList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsaXZlcnlMaXN0LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvRGVsaXZlcnlMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFnRDtBQUNoRCxxQ0FBeUM7QUFDekMsZ0VBQTZEO0FBRTdEOzs7OztHQUtHO0FBRUgsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLHFCQUFTO0NBc0MxQyxDQUFBO0FBN0JDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsdUNBQXVDLEVBQUUsQ0FBQzs7Z0RBQzVDO0FBUzFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQztJQUMzRCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQzs7K0NBQzlCO0FBU3pCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7O2dEQUNUO0FBUzFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7OzZDQUNkO0FBcENaLFlBQVk7SUFEeEIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksWUFBWSxDQXNDeEI7QUF0Q1ksb0NBQVkifQ==