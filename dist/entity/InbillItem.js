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
exports.InbillItem = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 入库单商品项实体类
 * 用于表示入库单中的商品项信息
 */
let InbillItem = class InbillItem extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 商品数量
         * 入库单中商品的数量，默认值为1
         */
        this.quantity = 1;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '数量,标识符名称来自支付宝', type: 'double', }),
    __metadata("design:type", Number)
], InbillItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list_cn', }),
    __metadata("design:type", String)
], InbillItem.prototype, "skuListCn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list', }),
    __metadata("design:type", String)
], InbillItem.prototype, "skuList", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'img', }),
    __metadata("design:type", String)
], InbillItem.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_category_id', }),
    __metadata("design:type", String)
], InbillItem.prototype, "materialCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_id', }),
    __metadata("design:type", String)
], InbillItem.prototype, "materialId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cart_messages', }),
    __metadata("design:type", String)
], InbillItem.prototype, "cartMessages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id', }),
    __metadata("design:type", String)
], InbillItem.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sku_code', }),
    __metadata("design:type", String)
], InbillItem.prototype, "materialSkuCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sn', }),
    __metadata("design:type", String)
], InbillItem.prototype, "materialSn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_name', }),
    __metadata("design:type", String)
], InbillItem.prototype, "materialName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'properties', }),
    __metadata("design:type", String)
], InbillItem.prototype, "properties", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sku_id', }),
    __metadata("design:type", String)
], InbillItem.prototype, "materialSkuId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_attr', }),
    __metadata("design:type", String)
], InbillItem.prototype, "materialAttr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'messages', }),
    __metadata("design:type", String)
], InbillItem.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_id', }),
    __metadata("design:type", String)
], InbillItem.prototype, "billId", void 0);
InbillItem = __decorate([
    (0, typeorm_1.Entity)()
], InbillItem);
exports.InbillItem = InbillItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5iaWxsSXRlbS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0luYmlsbEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFXLFNBQVEscUJBQVM7SUFBekM7O1FBQ0U7OztXQUdHO1FBRUksYUFBUSxHQUFXLENBQUMsQ0FBQztJQTBHOUIsQ0FBQztDQUFBLENBQUE7QUExR0M7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDOzs0Q0FDeEM7QUFPNUI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsR0FBRSxDQUFDOzs2Q0FDbkM7QUFPekI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDOzsyQ0FDbEM7QUFPdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRSxDQUFDOzt1Q0FDakM7QUFPbkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixHQUFFLENBQUM7O3NEQUNuQztBQU9sQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxHQUFFLENBQUM7OzhDQUNsQztBQU8xQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFFLENBQUM7O2dEQUNsQztBQU81QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFFLENBQUM7OytDQUNuQztBQU8zQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEdBQUUsQ0FBQzs7bURBQ25DO0FBTy9CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQzs7OENBQ2xDO0FBTzFCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQzs7Z0RBQ2xDO0FBTzVCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEdBQUUsQ0FBQzs7OENBQ2pDO0FBTzFCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsR0FBRSxDQUFDOztpREFDbkM7QUFPN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsR0FBRSxDQUFDOztnREFDbEM7QUFPNUI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDOzs0Q0FDakM7QUFPeEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDOzswQ0FDbEM7QUEvR1gsVUFBVTtJQUR0QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxVQUFVLENBZ0h0QjtBQWhIWSxnQ0FBVSJ9