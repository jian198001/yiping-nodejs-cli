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
exports.BaseModel = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
/**
 * 基础模型类，包含通用的字段和属性
 */
class BaseModel {
    constructor() {
        /**
         * 排序字段，可为空，默认值为0
         */
        this.orderNum = 0;
        /**
         * 创建日期，默认为当前日期
         */
        this.createDate = new Date();
        /**
         * 更新日期，默认为当前日期
         */
        this.updateDate = new Date();
        /**
         * 版本号，默认为0
         */
        this.version = 0;
        /**
         * 删除日期，默认为空
         */
        this.deleteDate = null;
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BaseModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '名称' }),
    __metadata("design:type", String)
], BaseModel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '排序',
        name: 'order_num',
        type: 'integer',
    }),
    (0, swagger_1.ApiProperty)({ description: '排序' }),
    __metadata("design:type", Number)
], BaseModel.prototype, "orderNum", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_date', type: 'datetime' }),
    __metadata("design:type", Object)
], BaseModel.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_date', type: 'datetime' }),
    __metadata("design:type", Object)
], BaseModel.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], BaseModel.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'delete_date', type: 'datetime' }),
    __metadata("design:type", Object)
], BaseModel.prototype, "deleteDate", void 0);
exports.BaseModel = BaseModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVsLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvY29tbW9uL21vZGVsL0Jhc2VNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQscUNBT2lCO0FBRWpCOztHQUVHO0FBQ0gsTUFBc0IsU0FBUztJQUEvQjtRQWFFOztXQUVHO1FBUUksYUFBUSxHQUFXLENBQUMsQ0FBQztRQUU1Qjs7V0FFRztRQUVJLGVBQVUsR0FBUSxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXBDOztXQUVHO1FBRUksZUFBVSxHQUFRLElBQUksSUFBSSxFQUFFLENBQUM7UUFFcEM7O1dBRUc7UUFFSSxZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRTNCOztXQUVHO1FBRUksZUFBVSxHQUFRLElBQUksQ0FBQztJQUNoQyxDQUFDO0NBQUE7QUEzQ0M7SUFEQyxJQUFBLGdDQUFzQixFQUFDLE1BQU0sQ0FBQzs7cUNBQ2I7QUFNbEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7dUNBQ3RCO0FBWXBCO0lBUEMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSxXQUFXO1FBQ2pCLElBQUksRUFBRSxTQUFTO0tBQ2hCLENBQUM7SUFDRCxJQUFBLHFCQUFXLEVBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7OzJDQUNQO0FBTTVCO0lBREMsSUFBQSwwQkFBZ0IsRUFBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDOzs2Q0FDeEI7QUFNcEM7SUFEQyxJQUFBLDBCQUFnQixFQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7OzZDQUN4QjtBQU1wQztJQURDLElBQUEsdUJBQWEsRUFBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7MENBQ1I7QUFNM0I7SUFEQyxJQUFBLDBCQUFnQixFQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7OzZDQUM5QjtBQS9DaEMsOEJBZ0RDIn0=