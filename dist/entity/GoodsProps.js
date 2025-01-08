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
exports.GoodsProps = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 商品属性实体类
 * 用于表示商品的属性信息
 */
let GoodsProps = class GoodsProps extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_id', }),
    (0, swagger_1.ApiProperty)({ description: '商品ID', }),
    __metadata("design:type", String)
], GoodsProps.prototype, "goodsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'type', }),
    (0, swagger_1.ApiProperty)({ description: '类型,可选: id_no（身份证）, text, tel, date, time, email', }),
    __metadata("design:type", String)
], GoodsProps.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'value', }),
    (0, swagger_1.ApiProperty)({ description: '值', }),
    __metadata("design:type", String)
], GoodsProps.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'name', }),
    (0, swagger_1.ApiProperty)({ description: '名称', }),
    __metadata("design:type", String)
], GoodsProps.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'label', }),
    (0, swagger_1.ApiProperty)({ description: '标签', }),
    __metadata("design:type", String)
], GoodsProps.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'required', }),
    (0, swagger_1.ApiProperty)({ description: '是否必填,1:是,0:否', }),
    __metadata("design:type", String)
], GoodsProps.prototype, "required", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'default_value', }),
    (0, swagger_1.ApiProperty)({ description: '默认值', }),
    __metadata("design:type", String)
], GoodsProps.prototype, "defaultValue", void 0);
GoodsProps = __decorate([
    (0, typeorm_1.Entity)()
], GoodsProps);
exports.GoodsProps = GoodsProps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZHNQcm9wcy5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0dvb2RzUHJvcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLHFCQUFTO0NBMER4QyxDQUFBO0FBbERDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQztJQUN4RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7OzJDQUNkO0FBUXRCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEdBQUUsQ0FBQztJQUNwRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsaURBQWlELEdBQUUsQ0FBQzs7d0NBQzVEO0FBUW5CO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUUsQ0FBQztJQUNyRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsR0FBRyxHQUFFLENBQUM7O3lDQUNiO0FBUXBCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEdBQUUsQ0FBQztJQUNwRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O3dDQUNmO0FBUW5CO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUUsQ0FBQztJQUNyRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O3lDQUNkO0FBUXBCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQztJQUN4RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsY0FBYyxHQUFFLENBQUM7OzRDQUNyQjtBQVF2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFFLENBQUM7SUFDN0QsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLEtBQUssR0FBRSxDQUFDOztnREFDUjtBQXhEaEIsVUFBVTtJQUR0QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxVQUFVLENBMER0QjtBQTFEWSxnQ0FBVSJ9