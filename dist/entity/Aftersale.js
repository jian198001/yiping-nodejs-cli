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
exports.Aftersale = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 售后单实体类
 * 继承自BaseModel，包含售后单相关的各种信息
 */
let Aftersale = class Aftersale extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'outOrderId', }),
    (0, swagger_1.ApiProperty)({ description: '商家自定义订单ID', }),
    __metadata("design:type", String)
], Aftersale.prototype, "outOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'out_aftersale_id', }),
    (0, swagger_1.ApiProperty)({ description: '商家自定义售后ID', }),
    __metadata("design:type", String)
], Aftersale.prototype, "outAftersaleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'path', }),
    (0, swagger_1.ApiProperty)({ description: '商家小程序该售后单的页面path，不存在则使用订单path', }),
    __metadata("design:type", String)
], Aftersale.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'type', }),
    (0, swagger_1.ApiProperty)({ description: '售后类型，1:退款,2:退款退货,3:换货', }),
    __metadata("design:type", String)
], Aftersale.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'status', }),
    (0, swagger_1.ApiProperty)({ description: '0:未受理,1:用户取消,2:商家受理中,3:商家逾期未处理,4:商家拒绝退款,5:商家拒绝退货退款,6:待买家退货,7:退货退款关闭,8:待商家收货,11:商家退款中,12:商家逾期未退款,13:退款完成,14:退货退款完成,15:换货完成,16:待商家发货,17:待用户确认收货,18:商家拒绝换货,19:商家已收到货', }),
    __metadata("design:type", String)
], Aftersale.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'finish_all_aftersale', }),
    (0, swagger_1.ApiProperty)({ description: '0:订单存在可售后商品，1:订单所有商品售后完成（订单维度）', }),
    __metadata("design:type", String)
], Aftersale.prototype, "finishAllAftersale", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'goods_infos', }),
    (0, swagger_1.ApiProperty)({ description: '退货相关商品列表', }),
    __metadata("design:type", String)
], Aftersale.prototype, "goodsInfos", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'refund_reason', }),
    (0, swagger_1.ApiProperty)({ description: '退款原因', }),
    __metadata("design:type", String)
], Aftersale.prototype, "refundReason", void 0);
Aftersale = __decorate([
    (0, typeorm_1.Entity)()
], Aftersale);
exports.Aftersale = Aftersale;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWZ0ZXJzYWxlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvQWZ0ZXJzYWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVUsU0FBUSxxQkFBUztDQThEdkMsQ0FBQTtBQXZEQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxHQUFFLENBQUM7SUFDMUQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLFdBQVcsR0FBRSxDQUFDOzs2Q0FDaEI7QUFPekI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixHQUFFLENBQUM7SUFDaEUsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLFdBQVcsR0FBRSxDQUFDOztpREFDWjtBQVE3QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFFLENBQUM7SUFDcEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLCtCQUErQixHQUFFLENBQUM7O3VDQUMxQztBQVFuQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFFLENBQUM7SUFDcEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLHVCQUF1QixHQUFFLENBQUM7O3VDQUNsQztBQVFuQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFFLENBQUM7SUFDdEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLG1LQUFtSyxHQUFFLENBQUM7O3lDQUM1SztBQVFyQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEdBQUUsQ0FBQztJQUNwRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsZ0NBQWdDLEdBQUUsQ0FBQzs7cURBQzdCO0FBT2pDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQztJQUMzRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsVUFBVSxHQUFFLENBQUM7OzZDQUNmO0FBT3pCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQztJQUM3RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7OytDQUNUO0FBNURoQixTQUFTO0lBRHJCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLFNBQVMsQ0E4RHJCO0FBOURZLDhCQUFTIn0=