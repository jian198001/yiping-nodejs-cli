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
 * 商家转账明细列表实体类
 * 继承自BaseModel，包含商家转账相关的各种信息
 */
let TransferDetailList = class TransferDetailList extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '直连商户的appid -不传 默认使用初始化数据', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "appid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '商家批次单号', name: 'out_batch_no', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "outBatchNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '批次名称', name: 'batch_name', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "batchName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '批次备注', name: 'batch_remark', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "batchRemark", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '转账总金额(元)', name: 'total_amount', }),
    __metadata("design:type", Number)
], TransferDetailList.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '转账总笔数', name: 'total_num', }),
    __metadata("design:type", Number)
], TransferDetailList.prototype, "totalNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '转账场景ID', name: 'transfer_scene_id', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "transferSceneId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '微信平台证书序列号-Wechatpay-Serial(当有敏感信息加密时,需要当前参数)', name: 'wx_serial_no', }),
    __metadata("design:type", String)
], TransferDetailList.prototype, "wxSerialNo", void 0);
TransferDetailList = __decorate([
    (0, typeorm_1.Entity)()
], TransferDetailList);
exports.TransferDetailList = TransferDetailList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmF0Y2hlc1RyYW5zZmVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvQmF0Y2hlc1RyYW5zZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF5QztBQUN6QyxnRUFBOEQ7QUFFOUQ7OztHQUdHO0FBRUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxxQkFBUztDQWdDaEQsQ0FBQTtBQTdCRztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixHQUFHLENBQUM7O2lEQUNwRDtBQUliO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUcsQ0FBQzs7c0RBQ25EO0FBSWxCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEdBQUcsQ0FBQzs7cURBQ2hEO0FBSWpCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUcsQ0FBQzs7dURBQ2hEO0FBSW5CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUcsQ0FBQzs7dURBQ3BEO0FBSW5CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUcsQ0FBQzs7b0RBQ2pEO0FBSWhCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxtQkFBbUIsR0FBRyxDQUFDOzsyREFDbkQ7QUFJdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSw4Q0FBOEMsRUFBRSxJQUFJLEVBQUUsY0FBYyxHQUFHLENBQUM7O3NEQUN6RjtBQS9CVCxrQkFBa0I7SUFEOUIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksa0JBQWtCLENBZ0M5QjtBQWhDWSxnREFBa0IifQ==