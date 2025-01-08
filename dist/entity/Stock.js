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
exports.Stock = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 库存实体类
 * 继承自BaseModel，用于存储库存相关的信息
 */
let Stock = class Stock extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 库存数量
         * 对应库存物料的数量，标识符名称来自支付宝
         */
        this.quantity = 1;
        /**
         * 失效日期
         * 对应库存物料的失效日期
         */
        this.exp = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'material_id', }),
    __metadata("design:type", String)
], Stock.prototype, "materialId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'sku', }),
    __metadata("design:type", String)
], Stock.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', type: 'double', }),
    (0, swagger_1.ApiProperty)({ description: '库存数量,标识符名称来自支付宝', }),
    __metadata("design:type", Number)
], Stock.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'datetime', }),
    (0, swagger_1.ApiProperty)({ description: '失效日期', type: 'datetime', }),
    __metadata("design:type", Object)
], Stock.prototype, "exp", void 0);
Stock = __decorate([
    (0, typeorm_1.Entity)()
], Stock);
exports.Stock = Stock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvY2suanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9TdG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQscUNBQXlDO0FBQ3pDLGdFQUE4RDtBQUU5RDs7O0dBR0c7QUFFSCxJQUFhLEtBQUssR0FBbEIsTUFBYSxLQUFNLFNBQVEscUJBQVM7SUFBcEM7O1FBZ0JJOzs7V0FHRztRQUdJLGFBQVEsR0FBVyxDQUFDLENBQUE7UUFFM0I7OztXQUdHO1FBR0ksUUFBRyxHQUFRLElBQUksQ0FBQTtJQUUxQixDQUFDO0NBQUEsQ0FBQTtBQXpCRztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxHQUFHLENBQUM7O3lDQUNyQztBQU96QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUM7O2tDQUNwQztBQVFsQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLENBQUM7SUFDeEQsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixHQUFHLENBQUM7O3VDQUN0QjtBQVEzQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDO0lBQzNDLElBQUEscUJBQVcsRUFBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRyxDQUFDOztrQ0FDbEM7QUE5QmIsS0FBSztJQURqQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxLQUFLLENBZ0NqQjtBQWhDWSxzQkFBSyJ9