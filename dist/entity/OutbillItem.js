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
exports.OutbillItem = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 出库单商品项实体类
 * 用于表示出库单中的商品项信息
 */
let OutbillItem = class OutbillItem extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 商品数量
         * 该商品项的数量
         */
        this.quantity = 1;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '数量,标识符名称来自支付宝', name: 'quantity', type: 'double', }),
    __metadata("design:type", Number)
], OutbillItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list_cn', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "skuListCn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "skuList", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'img', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_category_id', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "materialCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_id', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "materialId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cart_messages', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "cartMessages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sku_code', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "materialSkuCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sn', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "materialSn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_name', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "materialName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'properties', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "properties", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sku_id', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "materialSkuId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_attr', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "materialAttr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'messages', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bill_id', }),
    __metadata("design:type", String)
], OutbillItem.prototype, "billId", void 0);
OutbillItem = __decorate([
    (0, typeorm_1.Entity)()
], OutbillItem);
exports.OutbillItem = OutbillItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3V0YmlsbEl0ZW0uanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9PdXRiaWxsSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBd0M7QUFDeEMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxxQkFBUztJQUExQzs7UUFDRTs7O1dBR0c7UUFFSSxhQUFRLEdBQVcsQ0FBQyxDQUFDO0lBMEc5QixDQUFDO0NBQUEsQ0FBQTtBQTFHQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQzs7NkNBQzFEO0FBTzVCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQzs7OENBQ25DO0FBT3pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQzs7NENBQ2xDO0FBT3ZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEdBQUUsQ0FBQzs7d0NBQ2pDO0FBT25CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxzQkFBc0IsR0FBRSxDQUFDOzt1REFDbkM7QUFPbEM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsR0FBRSxDQUFDOzsrQ0FDbEM7QUFPMUI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsR0FBRSxDQUFDOztpREFDbEM7QUFPNUI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsR0FBRSxDQUFDOztnREFDbkM7QUFPM0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixHQUFFLENBQUM7O29EQUNuQztBQU8vQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxHQUFFLENBQUM7OytDQUNsQztBQU8xQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFFLENBQUM7O2lEQUNsQztBQU81QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxHQUFFLENBQUM7OytDQUNqQztBQU8xQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEdBQUUsQ0FBQzs7a0RBQ25DO0FBTzdCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQzs7aURBQ2xDO0FBTzVCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQzs7NkNBQ2pDO0FBT3hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUUsQ0FBQzs7MkNBQ2xDO0FBL0dYLFdBQVc7SUFEdkIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksV0FBVyxDQWdIdkI7QUFoSFksa0NBQVcifQ==