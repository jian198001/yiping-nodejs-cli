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
exports.Sku = void 0;
// 导入依赖项
const typegoose_1 = require("@typegoose/typegoose");
const typeorm_1 = require("typeorm");
/**
 * Sku实体类
 * 用于表示商品SKU的基本信息
 */
let Sku = class Sku {
    constructor() {
        /**
         * 商品ID
         * Sku所属的商品ID
         */
        this.goodsId = '';
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", Object)
], Sku.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Sku.prototype, "goodsId", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Array)
], Sku.prototype, "skuKey", void 0);
Sku = __decorate([
    (0, typeorm_1.Entity)('sku')
], Sku);
exports.Sku = Sku;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2t1LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2RlbC9Ta3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSLG9EQUFrRDtBQUVsRCxxQ0FBaUQ7QUFHakQ7OztHQUdHO0FBRUgsSUFBYSxHQUFHLEdBQWhCLE1BQWEsR0FBRztJQUFoQjtRQVFFOzs7V0FHRztRQUVJLFlBQU8sR0FBWSxFQUFFLENBQUM7SUFRL0IsQ0FBQztDQUFBLENBQUE7QUFmQztJQURDLElBQUEsd0JBQWMsR0FBRTs7K0JBQ0c7QUFPcEI7SUFEQyxJQUFBLGdCQUFJLEdBQUU7O29DQUNzQjtBQU83QjtJQURDLElBQUEsZ0JBQUksR0FBRTs7bUNBQ2tCO0FBcEJkLEdBQUc7SUFEZixJQUFBLGdCQUFNLEVBQUMsS0FBSyxDQUFDO0dBQ0QsR0FBRyxDQXFCZjtBQXJCWSxrQkFBRyJ9