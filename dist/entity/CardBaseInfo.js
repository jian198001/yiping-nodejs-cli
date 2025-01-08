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
exports.CardBaseInfo = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 卡券基础信息实体类
 * 继承自BaseModel，包含卡券相关的各种基础信息
 */
// @Entity()
class CardBaseInfo extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 使用时间的类型
         * 卡券的使用时间类型，可选值为DATE_TYPE_FIX_TIME_RANGE（固定日期区间）或DATE_TYPE_FIX_TERM（固定时长，自领取后按天算），默认为DATE_TYPE_FIX_TERM
         */
        this.type = "DATE_TYPE_FIX_TERM";
        /**
         * 码型
         * 卡券的码型，可选值为"CODE_TYPE_TEXT"（文本）、"CODE_TYPE_BARCODE"（一维码）、"CODE_TYPE_QRCODE"（二维码）、"CODE_TYPE_ONLY_QRCODE"（二维码无code显示）、"CODE_TYPE_ONLY_BARCODE"（一维码无code显示）、CODE_TYPE_NONE（不显示code和条形码类型），默认为"CODE_TYPE_QRCODE"
         */
        this.codeType = "CODE_TYPE_QRCODE";
    }
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'brand_name', }),
    (0, swagger_1.ApiProperty)({ description: '商户名字,字数上限为12个汉字。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "brandName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'bind_shop_buyer_id', }),
    (0, swagger_1.ApiProperty)({ description: '是否指定用户领取,填写true或false 。默认为false。通常指定特殊用户群体 投放卡券或防止刷券时选择指定用户领取。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "bindBuyerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'share_friends', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "shareFriends", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'type', }),
    (0, swagger_1.ApiProperty)({ description: '使用时间的类型,DATE_TYPE_FIX_TIME_RANGE 表示固定日期区间,DATE_TYPE_FIX_TERM 表示固定时长 （自领取后按天算)。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'object_use_for', }),
    (0, swagger_1.ApiProperty)({ description: '购买xx可用类型门槛,仅用于兑换 ,填入后自动拼写购买xxx可用。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "objectUseFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'service_phone', }),
    (0, swagger_1.ApiProperty)({ description: '客服电话。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "servicePhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'reject_category', }),
    (0, swagger_1.ApiProperty)({ description: '指定不可用的商品类目,仅用于代金券类型 ,填入后将在券面拼写不适用于xxxx', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "rejectCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'begin_timestamp', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: 'type为DATE_TYPE_FIX_TIME_RANGE时专用,表示起用时间。从1970年1月1日00:00:00至起用时间的秒数,最终需转换为字符串形态传入。（东八区时间,UTC+8,单位为秒）', }),
    __metadata("design:type", Number)
], CardBaseInfo.prototype, "beginTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'least_cost', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '满减门槛字段,可用于兑换券和代金券 ,填入后将在全面拼写消费满xx元可用。', }),
    __metadata("design:type", Number)
], CardBaseInfo.prototype, "leastCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'code_type', }),
    (0, swagger_1.ApiProperty)({ description: '码型： "CODE_TYPE_TEXT"文 本 ； "CODE_TYPE_BARCODE"一维码 "CODE_TYPE_QRCODE"二维码 "CODE_TYPE_ONLY_QRCODE",二维码无code显示； "CODE_TYPE_ONLY_BARCODE",一维码无code显示；CODE_TYPE_NONE, 不显示code和条形码类型', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "codeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'fixed_term', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: 'type为DATE_TYPE_FIX_TERM时专用,表示自领取后多少天内有效,不支持填写0。', }),
    __metadata("design:type", Number)
], CardBaseInfo.prototype, "fixedTerm", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'can_use_with_other_discount', }),
    (0, swagger_1.ApiProperty)({ description: '不可以与其他类型共享门槛 ,填写false时系统将在使用须知里 拼写“不可与其他优惠共享”, 填写true时系统将在使用须知里 拼写“可与其他优惠共享”, 默认为true', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "canUseWithOtherDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'is_pay_and_qrcode', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "isPayAndQrcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'color', }),
    (0, swagger_1.ApiProperty)({ description: '券颜色。按色彩规范标注填写Color010-Color100。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'get_limit', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '每人可领券的数量限制,不填写默认为50。', }),
    __metadata("design:type", Number)
], CardBaseInfo.prototype, "getLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'description', }),
    (0, swagger_1.ApiProperty)({ description: '卡券使用说明,字数上限为1024个汉字。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'can_share', }),
    (0, swagger_1.ApiProperty)({ description: '卡券领取页面是否可分享。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "canShare", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'accept_category', }),
    (0, swagger_1.ApiProperty)({ description: '指定可用的商品类目,仅用于代金券类型 ,填入后将在券面拼写适用于xxx', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "acceptCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'custom_url_name', }),
    (0, swagger_1.ApiProperty)({ description: '服务场景入口', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "customUrlName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'location_id_list', }),
    (0, swagger_1.ApiProperty)({ description: '门店位置poiid。 调用 POI门店管理接 口 获取门店位置poiid。具备线下门店 的商户为必填。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "locationIdList", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'use_custom_code', }),
    (0, swagger_1.ApiProperty)({ description: '是否自定义Code码 。填写true或false,默认为false。 通常自有优惠码系统的开发者选择 自定义Code码,并在卡券投放时带入 Code码,详情见 是否自定义Code码 。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "useCustomCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'shop_id', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'use_all_locations', }),
    (0, swagger_1.ApiProperty)({ description: '设置本卡券支持全部门店,与location_id_list互斥', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "useAllLocations", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'end_timestamp', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '表示结束时间 , 建议设置为截止日期的23:59:59过期 。 （ 东八区时间,UTC+8,单位为秒 ） // 可用于DATE_TYPE_FIX_TERM时间类型,表示卡券统一过期时间 , 建议设置为截止日期的23:59:59过期 。 （ 东八区时间,UTC+8,单位为秒 ）,设置了fixed_term卡券,当时间达到end_timestamp时卡券统一过期', }),
    __metadata("design:type", Number)
], CardBaseInfo.prototype, "endTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'can_give_friend', }),
    (0, swagger_1.ApiProperty)({ description: '卡券是否可转赠。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "canGiveFriend", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'title', }),
    (0, swagger_1.ApiProperty)({ description: '卡券名,字数上限为9个汉字。(建议涵盖卡券属性、服务及金额(元))。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'notice', }),
    (0, swagger_1.ApiProperty)({ description: '卡券使用提醒,字数上限为16个汉字。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "notice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'business_service_list', }),
    (0, swagger_1.ApiProperty)({ description: '商家服务类型： BIZ_SERVICE_DELIVER 外卖服务； BIZ_SERVICE_FREE_PARK 停车位； BIZ_SERVICE_WITH_PET 可带宠物； BIZ_SERVICE_FREE_WIFI 免费wifi, 可多选', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "businessServiceList", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'custom_url', }),
    (0, swagger_1.ApiProperty)({ description: '服务场景入口', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "customUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'center_sub_title', }),
    (0, swagger_1.ApiProperty)({ description: '显示在入口下方的提示语 ,仅在卡券状态正常(可以核销)时显示。', }),
    __metadata("design:type", String)
], CardBaseInfo.prototype, "centerSubTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'fixed_begin_term', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: 'type为DATE_TYPE_FIX_TERM时专用,表示自领取后多少天开始生效,领取后当天生效填写0。（单位为天）', }),
    __metadata("design:type", Number)
], CardBaseInfo.prototype, "fixedBeginTerm", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'use_limit', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '每人可领券的数量限制,不填写默认为50。', }),
    __metadata("design:type", Number)
], CardBaseInfo.prototype, "useLimit", void 0);
exports.CardBaseInfo = CardBaseInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZEJhc2VJbmZvLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvQ2FyZEJhc2VJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBaUM7QUFDakMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUNILFlBQVk7QUFDWixNQUFhLFlBQWEsU0FBUSxxQkFBUztJQUEzQzs7UUF5QkU7OztXQUdHO1FBR0ksU0FBSSxHQUFXLG9CQUFvQixDQUFDO1FBMEMzQzs7O1dBR0c7UUFHSSxhQUFRLEdBQVcsa0JBQWtCLENBQUM7SUFrSy9DLENBQUM7Q0FBQTtBQXpPQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxHQUFFLENBQUM7SUFDMUQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLGtCQUFrQixHQUFFLENBQUM7OytDQUN4QjtBQVF4QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEdBQUUsQ0FBQztJQUNsRSxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsZ0VBQWdFLEdBQUUsQ0FBQzs7aURBQ3BFO0FBTzFCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQzs7a0RBQ25DO0FBUTNCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEdBQUUsQ0FBQztJQUNwRCxJQUFBLHFCQUFXLEVB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