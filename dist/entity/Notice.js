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
exports.Notice = void 0;
// 导入依赖项
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 通知实体类
 * 用于表示通知的基本信息
 */
let Notice = class Notice extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '通知标题' }),
    __metadata("design:type", String)
], Notice.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '消息类型', name: 'msg_type' }),
    __metadata("design:type", String)
], Notice.prototype, "msgType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '通知内容', name: 'content', type: 'text' }),
    __metadata("design:type", String)
], Notice.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '店铺买家ID', name: 'shop_buyer_id' }),
    __metadata("design:type", String)
], Notice.prototype, "shopBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '阅读历史', name: 'read_history', type: 'integer' }),
    (0, swagger_1.ApiProperty)({ description: '消息是否被已读' }),
    __metadata("design:type", Number)
], Notice.prototype, "readHistory", void 0);
Notice = __decorate([
    (0, typeorm_1.Entity)()
], Notice);
exports.Notice = Notice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvTm90aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDUiwrQ0FBZ0Q7QUFDaEQscUNBQXlDO0FBQ3pDLGdFQUE2RDtBQUU3RDs7O0dBR0c7QUFFSCxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFPLFNBQVEscUJBQVM7Q0FvQ3BDLENBQUE7QUE5QkM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7cUNBQ3ZCO0FBT3JCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQzs7dUNBQ3ZDO0FBT3ZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOzt1Q0FDcEQ7QUFPdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDOzsyQ0FDMUM7QUFRM0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDbEYsSUFBQSxxQkFBVyxFQUFDLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDOzsyQ0FDYjtBQW5DaEIsTUFBTTtJQURsQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxNQUFNLENBb0NsQjtBQXBDWSx3QkFBTSJ9