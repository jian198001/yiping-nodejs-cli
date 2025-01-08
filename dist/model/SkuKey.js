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
exports.SkuKey = void 0;
// 导入依赖项
const typegoose_1 = require("@typegoose/typegoose");
const typeorm_1 = require("typeorm");
/**
 * SkuKey实体类
 * 用于表示商品SKU键的基本信息
 */
let SkuKey = class SkuKey {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", Object)
], SkuKey.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], SkuKey.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.Prop)(),
    __metadata("design:type", Array)
], SkuKey.prototype, "skuValues", void 0);
SkuKey = __decorate([
    (0, typeorm_1.Entity)('skuKey')
], SkuKey);
exports.SkuKey = SkuKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2t1S2V5LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2RlbC9Ta3VLZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSLG9EQUFrRDtBQUVsRCxxQ0FBaUQ7QUFFakQ7OztHQUdHO0FBRUgsSUFBYSxNQUFNLEdBQW5CLE1BQWEsTUFBTTtDQXFCbEIsQ0FBQTtBQWZDO0lBREMsSUFBQSx3QkFBYyxHQUFFOztrQ0FDRztBQU9wQjtJQURDLElBQUEsZ0JBQUksR0FBRTs7b0NBQ2E7QUFPcEI7SUFEQyxJQUFBLGdCQUFJLEdBQUU7O3lDQUNxQjtBQXBCakIsTUFBTTtJQURsQixJQUFBLGdCQUFNLEVBQUMsUUFBUSxDQUFDO0dBQ0osTUFBTSxDQXFCbEI7QUFyQlksd0JBQU0ifQ==