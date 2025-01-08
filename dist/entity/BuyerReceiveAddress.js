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
exports.BuyerReceiveAddress = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 买家收货地址实体类
 * 继承自BaseModel，包含买家收货地址相关的各种信息
 */
let BuyerReceiveAddress = class BuyerReceiveAddress extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'area_code', }),
    (0, swagger_1.ApiProperty)({ description: '地区编码', }),
    __metadata("design:type", String)
], BuyerReceiveAddress.prototype, "areaCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'phone_num', }),
    __metadata("design:type", String)
], BuyerReceiveAddress.prototype, "phoneNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'buyer_id', }),
    __metadata("design:type", String)
], BuyerReceiveAddress.prototype, "buyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'true_name', }),
    __metadata("design:type", String)
], BuyerReceiveAddress.prototype, "trueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'city', }),
    (0, swagger_1.ApiProperty)({ description: '城市', }),
    __metadata("design:type", String)
], BuyerReceiveAddress.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'region', }),
    (0, swagger_1.ApiProperty)({ description: '区', }),
    __metadata("design:type", String)
], BuyerReceiveAddress.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'province', }),
    (0, swagger_1.ApiProperty)({ description: '省份/直辖市', }),
    __metadata("design:type", String)
], BuyerReceiveAddress.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'post_code', }),
    (0, swagger_1.ApiProperty)({ description: '邮政编码', }),
    __metadata("design:type", String)
], BuyerReceiveAddress.prototype, "postCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'default_status', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '是否为默认', }),
    __metadata("design:type", Number)
], BuyerReceiveAddress.prototype, "defaultStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'detail_address', }),
    (0, swagger_1.ApiProperty)({ description: '详细地址(街道及门牌号码)', }),
    __metadata("design:type", String)
], BuyerReceiveAddress.prototype, "detailAddress", void 0);
BuyerReceiveAddress = __decorate([
    (0, typeorm_1.Entity)()
], BuyerReceiveAddress);
exports.BuyerReceiveAddress = BuyerReceiveAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV5ZXJSZWNlaXZlQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0J1eWVyUmVjZWl2ZUFkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxxQkFBUztDQStFakQsQ0FBQTtBQXZFQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFLENBQUM7SUFDekQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOztxREFDYjtBQU92QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFLENBQUM7O3FEQUNuQztBQU92QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7O29EQUNuQztBQU90QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFLENBQUM7O3FEQUNuQztBQVF2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFFLENBQUM7SUFDcEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksR0FBRSxDQUFDOztpREFDZjtBQVFuQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUM7SUFDdEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRSxDQUFDOzttREFDWjtBQVFyQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7SUFDeEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLFFBQVEsR0FBRSxDQUFDOztxREFDZjtBQVF2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFLENBQUM7SUFDekQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOztxREFDYjtBQVF2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQy9FLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxPQUFPLEdBQUUsQ0FBQzs7MERBQ1Q7QUFRNUI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixHQUFFLENBQUM7SUFDOUQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLGVBQWUsR0FBRSxDQUFDOzswREFDakI7QUE3RWpCLG1CQUFtQjtJQUQvQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxtQkFBbUIsQ0ErRS9CO0FBL0VZLGtEQUFtQiJ9