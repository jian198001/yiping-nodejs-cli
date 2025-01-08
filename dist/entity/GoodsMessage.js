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
exports.GoodsMessage = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商品留言实体类，继承自 BaseModel
 */
let GoodsMessage = class GoodsMessage extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'multiple' }),
    (0, swagger_1.ApiProperty)({ description: '留言类型为 text 时,是否多行文本。\'1\' 表示多行' }),
    __metadata("design:type", String)
], GoodsMessage.prototype, "multiple", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'datetime' }),
    (0, swagger_1.ApiProperty)({ description: '留言类型为 time 时,是否含日期。\'1\' 表示包含' }),
    __metadata("design:type", String)
], GoodsMessage.prototype, "datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'placeholder' }),
    (0, swagger_1.ApiProperty)({ description: '是否必填 \'1\' 表示必填' }),
    __metadata("design:type", String)
], GoodsMessage.prototype, "placeholder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'type' }),
    (0, swagger_1.ApiProperty)({ description: '留言类型,可选: id_no（身份证）, text, tel, date, time, email' }),
    __metadata("design:type", String)
], GoodsMessage.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'required' }),
    (0, swagger_1.ApiProperty)({ description: '是否必填 \'1\' 表示必填' }),
    __metadata("design:type", String)
], GoodsMessage.prototype, "required", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_id' }),
    (0, swagger_1.ApiProperty)({ description: '商品ID' }),
    __metadata("design:type", String)
], GoodsMessage.prototype, "goodsId", void 0);
GoodsMessage = __decorate([
    (0, typeorm_1.Entity)()
], GoodsMessage);
exports.GoodsMessage = GoodsMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZHNNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvR29vZHNNZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFnRDtBQUNoRCxxQ0FBeUM7QUFDekMsZ0VBQTZEO0FBRTdEOztHQUVHO0FBRUgsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLHFCQUFTO0NBMEMxQyxDQUFBO0FBcENDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsZ0NBQWdDLEVBQUUsQ0FBQzs7OENBQ3ZDO0FBT3hCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsK0JBQStCLEVBQUUsQ0FBQzs7OENBQ3RDO0FBT3hCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzs7aURBQ3JCO0FBTzNCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNyRCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsbURBQW1ELEVBQUUsQ0FBQzs7MENBQzlEO0FBT3BCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzs7OENBQ3hCO0FBT3hCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7OzZDQUNkO0FBekNaLFlBQVk7SUFEeEIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksWUFBWSxDQTBDeEI7QUExQ1ksb0NBQVkifQ==