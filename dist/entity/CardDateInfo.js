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
exports.CardDateInfo = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 卡券日期信息实体类
 * 继承自BaseModel，包含卡券的日期相关信息
 */
// @Entity()
class CardDateInfo extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 日期类型
         * 卡券的日期类型，可选值为DATE_TYPE_PERMANENT（永久有效）、DATE_TYPE_FIX_TIME_RANGE（固定日期区间）或DATE_TYPE_FIX_TERM（固定时长，自领取后按天算），默认为DATE_TYPE_PERMANENT
         */
        this.type = "DATE_TYPE_PERMANENT";
    }
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'begin_timestamp', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: 'type为DATE_TYPE_FIX_TIME_RANGE时专用,表示起用时间。从1970年1月1日00:00:00至起用时间的秒数,最终需转换为字符串形态传入。（东八区时间,UTC+8,单位为秒）', }),
    __metadata("design:type", Number)
], CardDateInfo.prototype, "beginTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'type', }),
    __metadata("design:type", String)
], CardDateInfo.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'fixed_term', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: 'type为DATE_TYPE_FIX_TERM时专用,表示自领取后多少天开始生效,领取后当天生效填写0。（单位为天）', }),
    __metadata("design:type", Number)
], CardDateInfo.prototype, "fixedTerm", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'end_timestamp', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '表示结束时间 , 建议设置为截止日期的23:59:59过期 。 （ 东八区时间,UTC+8,单位为秒 ） // 可用于DATE_TYPE_FIX_TERM时间类型,表示卡券统一过期时间 , 建议设置为截止日期的23:59:59过期 。 （ 东八区时间,UTC+8,单位为秒 ）,设置了fixed_term卡券,当时间达到end_timestamp时卡券统一过期', }),
    __metadata("design:type", Number)
], CardDateInfo.prototype, "endTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'fixed_begin_term', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: 'type为DATE_TYPE_FIX_TERM时专用,表示自领取后多少天内有效,不支持填写0。', }),
    __metadata("design:type", Number)
], CardDateInfo.prototype, "fixedBeginTerm", void 0);
exports.CardDateInfo = CardDateInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZERhdGVJbmZvLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvQ2FyZERhdGVJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBaUM7QUFDakMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUNILFlBQVk7QUFDWixNQUFhLFlBQWEsU0FBUSxxQkFBUztJQUEzQzs7UUFVRTs7O1dBR0c7UUFFSSxTQUFJLEdBQVcscUJBQXFCLENBQUM7SUEwQjlDLENBQUM7Q0FBQTtBQWpDQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQ2hGLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxxR0FBcUcsR0FBRSxDQUFDOztvREFDdEc7QUFPN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRSxDQUFDOzswQ0FDVDtBQVE1QztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUUsQ0FBQztJQUMzRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsNERBQTRELEdBQUUsQ0FBQzs7K0NBQ2xFO0FBUXhCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQzlFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxzTEFBc0wsR0FBRSxDQUFDOztrREFDekw7QUFRM0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxTQUFTLEdBQUUsQ0FBQztJQUNqRixJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsaURBQWlELEdBQUUsQ0FBQzs7b0RBQ2xEO0FBdkMvQixvQ0F5Q0MifQ==