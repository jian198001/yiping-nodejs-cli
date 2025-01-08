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
var GoodsCategory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsCategory = void 0;
// 导入依赖项
const typegoose_1 = require("@typegoose/typegoose");
const typeorm_1 = require("typeorm");
/**
 * 商品分类实体类
 * 用于表示商品分类的基本信息
 */
let GoodsCategory = GoodsCategory_1 = class GoodsCategory {
    constructor() {
        /**
         * 商品分类名称
         * 商品分类的名称
         */
        this.name = '';
        /**
         * 店铺ID
         * 商品分类所属的店铺ID
         */
        this.shopId = '';
        /**
         * 子分类列表
         * 商品分类的子分类列表
         */
        this.children = [];
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", Object)
], GoodsCategory.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GoodsCategory.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GoodsCategory.prototype, "shopId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], GoodsCategory.prototype, "level", void 0);
__decorate([
    (0, typegoose_1.Prop)(type => GoodsCategory_1),
    __metadata("design:type", Array)
], GoodsCategory.prototype, "children", void 0);
GoodsCategory = GoodsCategory_1 = __decorate([
    (0, typeorm_1.Entity)('goodsCategory')
], GoodsCategory);
exports.GoodsCategory = GoodsCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZHNDYXRlZ29yeS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kZWwvR29vZHNDYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSLG9EQUFrRDtBQUVsRCxxQ0FBaUQ7QUFFakQ7OztHQUdHO0FBRUgsSUFBYSxhQUFhLHFCQUExQixNQUFhLGFBQWE7SUFBMUI7UUFRRTs7O1dBR0c7UUFFSSxTQUFJLEdBQVksRUFBRSxDQUFDO1FBRTFCOzs7V0FHRztRQUVJLFdBQU0sR0FBWSxFQUFFLENBQUM7UUFTNUI7OztXQUdHO1FBRUksYUFBUSxHQUFxQixFQUFFLENBQUM7SUFFekMsQ0FBQztDQUFBLENBQUE7QUE5QkM7SUFEQyxJQUFBLHdCQUFjLEdBQUU7O3lDQUNHO0FBT3BCO0lBREMsSUFBQSxnQkFBSSxHQUFFOzsyQ0FDbUI7QUFPMUI7SUFEQyxJQUFBLGdCQUFJLEdBQUU7OzZDQUNxQjtBQU81QjtJQURDLElBQUEsZ0JBQUksR0FBRTs7NENBQ2U7QUFPdEI7SUFEQyxJQUFBLGdCQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFhLENBQUM7OytDQUNXO0FBbEM1QixhQUFhO0lBRHpCLElBQUEsZ0JBQU0sRUFBQyxlQUFlLENBQUM7R0FDWCxhQUFhLENBb0N6QjtBQXBDWSxzQ0FBYSJ9