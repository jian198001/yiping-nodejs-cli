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
exports.TransferDetailList = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 转账明细列表实体类
 * 继承自BaseModel，用于存储转账明细的相关信息
 * 标识符名称来自微信支付商户平台
 */
let TransferDetailList = class TransferDetailList extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '商家批次单号', name: 'out_batch_no', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "outBatchNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '商家明细单号', name: 'out_detail_no', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "outDetailNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '转账金额(元)', name: 'transfer_amount', }),
    __metadata("design:type", Number)
], TransferDetailList.prototype, "transferAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '转账备注', name: 'transfer_remark', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "transferRemark", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '用户在直连商户应用下的用户标示', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "openid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '收款用户姓名', name: 'user_name', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "userName", void 0);
TransferDetailList = __decorate([
    (0, typeorm_1.Entity)()
], TransferDetailList);
exports.TransferDetailList = TransferDetailList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJEZXRhaWxMaXN0LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvVHJhbnNmZXJEZXRhaWxMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7Ozs7R0FJRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEscUJBQVM7Q0E0Q2hELENBQUE7QUFyQ0M7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsR0FBRSxDQUFDOztzREFDMUM7QUFPekI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGVBQWUsR0FBRSxDQUFDOzt1REFDMUM7QUFPMUI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixHQUFFLENBQUM7OzBEQUMxQztBQU83QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEdBQUUsQ0FBQzs7MERBQ3ZDO0FBTzdCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEdBQUUsQ0FBQzs7a0RBQ2pDO0FBT3JCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQzs7b0RBQ3hDO0FBMUNiLGtCQUFrQjtJQUQ5QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxrQkFBa0IsQ0E0QzlCO0FBNUNZLGdEQUFrQiJ9