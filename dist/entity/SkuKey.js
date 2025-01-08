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
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商品规格名实体类
 * 继承自BaseModel，用于存储商品规格名的信息
 */
let SkuKey = class SkuKey extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_id', }),
    (0, swagger_1.ApiProperty)({ description: '商品ID', }),
    __metadata("design:type", String)
], SkuKey.prototype, "goodsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_key_name', }),
    (0, swagger_1.ApiProperty)({ description: '规格类目名称', }),
    __metadata("design:type", String)
], SkuKey.prototype, "skuKeyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku_key_str', }),
    (0, swagger_1.ApiProperty)({ description: 'sku组合列表（下方list）中当前类目对应的key值,value值会是从属于当前类目的一个规格值id', }),
    __metadata("design:type", String)
], SkuKey.prototype, "skuKeyStr", void 0);
SkuKey = __decorate([
    (0, typeorm_1.Entity)()
], SkuKey);
exports.SkuKey = SkuKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2t1S2V5LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvU2t1S2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU8sU0FBUSxxQkFBUztDQTBCcEMsQ0FBQTtBQWxCQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7SUFDeEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzt1Q0FDZDtBQVF0QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxHQUFFLENBQUM7SUFDNUQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLFFBQVEsR0FBRSxDQUFDOzswQ0FDYjtBQVF6QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxHQUFFLENBQUM7SUFDM0QsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHFEQUFxRCxHQUFFLENBQUM7O3lDQUMzRDtBQXhCYixNQUFNO0lBRGxCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLE1BQU0sQ0EwQmxCO0FBMUJZLHdCQUFNIn0=