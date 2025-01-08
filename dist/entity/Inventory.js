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
exports.Inventory = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 库存实体类
 * 用于表示库存的基本信息
 */
let Inventory = class Inventory extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 库存数量
         * 库存中商品的数量，默认值为1，标识符名称来自支付宝
         */
        this.quantity = 1;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '数量,标识符名称来自支付宝', name: 'quantity', type: 'double', }),
    __metadata("design:type", Number)
], Inventory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list_cn', }),
    __metadata("design:type", String)
], Inventory.prototype, "skuListCn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_list', }),
    __metadata("design:type", String)
], Inventory.prototype, "skuList", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'img', }),
    __metadata("design:type", String)
], Inventory.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_category_id', }),
    __metadata("design:type", String)
], Inventory.prototype, "materialCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_id', }),
    __metadata("design:type", String)
], Inventory.prototype, "materialId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cart_messages', }),
    __metadata("design:type", String)
], Inventory.prototype, "cartMessages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_buyer_id', }),
    __metadata("design:type", String)
], Inventory.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sku_code', }),
    __metadata("design:type", String)
], Inventory.prototype, "materialSkuCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sn', }),
    __metadata("design:type", String)
], Inventory.prototype, "materialSn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_name', }),
    __metadata("design:type", String)
], Inventory.prototype, "materialName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'properties', }),
    __metadata("design:type", String)
], Inventory.prototype, "properties", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_sku_id', }),
    __metadata("design:type", String)
], Inventory.prototype, "materialSkuId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_attr', }),
    __metadata("design:type", String)
], Inventory.prototype, "materialAttr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'messages', }),
    __metadata("design:type", String)
], Inventory.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'order_id', }),
    __metadata("design:type", String)
], Inventory.prototype, "billId", void 0);
Inventory = __decorate([
    (0, typeorm_1.Entity)()
], Inventory);
exports.Inventory = Inventory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvSW52ZW50b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBVSxTQUFRLHFCQUFTO0lBQXhDOztRQUNFOzs7V0FHRztRQUVJLGFBQVEsR0FBVyxDQUFDLENBQUM7SUEwRzlCLENBQUM7Q0FBQSxDQUFBO0FBMUdDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDOzsyQ0FDMUQ7QUFPNUI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsR0FBRSxDQUFDOzs0Q0FDbkM7QUFPekI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDOzswQ0FDbEM7QUFPdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRSxDQUFDOztzQ0FDakM7QUFPbkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixHQUFFLENBQUM7O3FEQUNuQztBQU9sQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxHQUFFLENBQUM7OzZDQUNsQztBQU8xQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFFLENBQUM7OytDQUNsQztBQU81QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFFLENBQUM7OzhDQUNuQztBQU8zQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEdBQUUsQ0FBQzs7a0RBQ25DO0FBTy9CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQzs7NkNBQ2xDO0FBTzFCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQzs7K0NBQ2xDO0FBTzVCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEdBQUUsQ0FBQzs7NkNBQ2pDO0FBTzFCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsR0FBRSxDQUFDOztnREFDbkM7QUFPN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsR0FBRSxDQUFDOzsrQ0FDbEM7QUFPNUI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDOzsyQ0FDakM7QUFPeEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDOzt5Q0FDbkM7QUEvR1gsU0FBUztJQURyQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxTQUFTLENBZ0hyQjtBQWhIWSw4QkFBUyJ9