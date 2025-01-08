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
var GiftCardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const GiftCard_1 = require("../../entity/GiftCard");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
let GiftCardService = GiftCardService_1 = class GiftCardService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${GiftCardService_1 === null || GiftCardService_1 === void 0 ? void 0 : GiftCardService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
     `;
        this.repository = null;
    }
    async page(query = '', params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let whereSql = ' '; // 查询条件字符串
        let parameters = [];
        if (params && params.length > 3) {
            parameters = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, params);
        }
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, (_c = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _c === void 0 ? void 0 : _c.call(strUtils, parameters, ['current', 'pageSize',]))) + ((_d = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _d === void 0 ? void 0 : _d.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue)) + ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query)); // 处理前端的表格中筛选需求
        // 执行查询语句并返回page对象结果
        const data = await ((_g = super.pageBase) === null || _g === void 0 ? void 0 : _g.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
        // 遍历查询结果,将查询结果异步读取到redis
        // 遍历查询结果,将查询结果中异步读取到redis
        (_h = this === null || this === void 0 ? void 0 : this.getToRedis) === null || _h === void 0 ? void 0 : _h.call(this, (_j = _ === null || _ === void 0 ? void 0 : _.map) === null || _j === void 0 ? void 0 : _j.call(_, data === null || data === void 0 ? void 0 : data.list, 'id'));
        if ((page === null || page === void 0 ? void 0 : page.pageSize) > 0) {
            return data;
        }
        if ((page === null || page === void 0 ? void 0 : page.pageSize) < 1) {
            // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
            return (_k = _ === null || _ === void 0 ? void 0 : _.keyBy) === null || _k === void 0 ? void 0 : _k.call(_, data === null || data === void 0 ? void 0 : data.list, "value");
        }
    }
    async getToRedis(ids) {
        // 根据id查询一条数据
        var _a;
        for (const id of ids) {
            await ((_a = this === null || this === void 0 ? void 0 : this.getById) === null || _a === void 0 ? void 0 : _a.call(this, id));
        }
    }
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = GiftCardService_1.TABLE_NAME + `:${id}`;
        let data = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.redisService) === null || _c === void 0 ? void 0 : _c.get) === null || _d === void 0 ? void 0 : _d.call(_c, key));
        // 缓存中有此数据，直接返回
        if (data) {
            const parse = JSON.parse(data);
            return parse;
        }
        // 缓存中没有此数据，查询数据库
        // 调用父类的getByIdBase方法，根据ID查询数据
        data = await ((_e = super.getByIdBase) === null || _e === void 0 ? void 0 : _e.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql));
        // 查询数据库后，把数据放入缓存
        await ((_g = (_f = this === null || this === void 0 ? void 0 : this.redisService) === null || _f === void 0 ? void 0 : _f.set) === null || _g === void 0 ? void 0 : _g.call(_f, key, JSON.stringify(data)));
        // 返回数据
        return data;
    }
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = GiftCardService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let log = '';
        // 字段非重复性验证
        const uniqueText = await ((_a = super.unique) === null || _a === void 0 ? void 0 : _a.call(this, GiftCardService_1 === null || GiftCardService_1 === void 0 ? void 0 : GiftCardService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
        if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + '已存在，操作失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_c = (_b = this === null || this === void 0 ? void 0 : this.logger) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.call(_b, log, zero0Error);
            throw zero0Error;
        }
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_e = (_d = this === null || this === void 0 ? void 0 : this.repository) === null || _d === void 0 ? void 0 : _d.save) === null || _e === void 0 ? void 0 : _e.call(_d, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_f = super.sortOrder) === null || _f === void 0 ? void 0 : _f.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GiftCardService_1 === null || GiftCardService_1 === void 0 ? void 0 : GiftCardService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.findOneById) === null || _h === void 0 ? void 0 : _h.call(_g, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_l = super.sortOrder) === null || _l === void 0 ? void 0 : _l.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GiftCardService_1 === null || GiftCardService_1 === void 0 ? void 0 : GiftCardService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        await ((_o = (_m = this === null || this === void 0 ? void 0 : this.repository) === null || _m === void 0 ? void 0 : _m.save) === null || _o === void 0 ? void 0 : _o.call(_m, old)); // 修改数据
    }
    async checkCardBaseInfo(card) { }
    async decryptCardCode(encryptCode) { }
    async queryCardCode(cardId, code, checkConsume) { }
    async consumeCardCode(code) { }
    async updateUserCardStatus(memberCardOffer) { }
    async markCardCode(code, cardId, shopBuyerId = '', isMark) { }
    async getCardDetail(cardId) { }
    async createCard(cardCreateMessage, goods) { }
    async createCardOffer(cardCreateMessage, quantity) { }
    async createQrcodeCard(cardId, outerStr, expiresIn, shopBuyerId = '', code, isUniqueCode) { }
    async unavailableCardCode(cardId, code, reason) { }
    async deleteCard(cardId) { }
    async cardCodeDeposit(cardId, codeList) { }
    async cardCodeDepositCount(cardId) { }
    async cardCodeCheckcode(cardId, codeList) { }
    async cardMpnewsGethtml(cardId) { }
    async cardModifyStock(cardId, changeValue) { }
    async cardCodeUpdate(cardId, oldCode, newCode) { }
    async cardPaycellSet(cardId, isOpen) { }
    async cardSelfConsumeCellSet(cardId, isOpen, needVerifyCod, needRemarkAmount) { }
    async getUserCardList(shopBuyerId = '', cardId) { }
    async beginCard(code, shopBuyerId = '', cardId) { }
    async userGetCard(code, shopBuyerId = '', cardId, orderItemId) { }
    async auditRefund(orderId) { }
    async activate(code, cardId, activateBeginTime, activateEndTime, initBonus, initBalance) { }
};
// 查询的数据库表名称
GiftCardService.TABLE_NAME = 'gift_card';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], GiftCardService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(GiftCard_1.GiftCard),
    __metadata("design:type", typeorm_1.Repository)
], GiftCardService.prototype, "repository", void 0);
GiftCardService = GiftCardService_1 = __decorate([
    (0, decorator_1.Provide)()
], GiftCardService);
exports.GiftCardService = GiftCardService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lmdENhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3RyYWRlL2dpZnRDYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCxpRUFBNkQ7QUFHN0QscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUN0RCxvREFBaUQ7QUFJakQsMkRBQXdEO0FBRXhELHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsNEJBQTZCO0FBRTdCLElBQWEsZUFBZSx1QkFBNUIsTUFBYSxlQUFnQixTQUFRLDBCQUFXO0lBQWhEOztRQUdVLFdBQU0sR0FBWSxJQUFJLENBQUE7UUFLaEMsZUFBZTtRQUNMLFlBQU8sR0FBRyxTQUFTLGlCQUFlLGFBQWYsaUJBQWUsdUJBQWYsaUJBQWUsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUM3RCxzQkFBc0I7UUFDYixjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU07O01BRXRDLENBQUE7UUFHSSxlQUFVLEdBQXlCLElBQUksQ0FBQztJQW9SbEQsQ0FBQztJQWxSUSxLQUFLLENBQUMsSUFBSSxDQUNmLEtBQUssR0FBRyxFQUFFLEVBQUUsTUFBYyxFQUFFLFFBQWtCLEVBQzlDLElBQVU7UUFFVixXQUFXOztRQUVYLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQSxDQUFDLFVBQVU7UUFHM0IsSUFBSSxVQUFVLEdBQVUsRUFBRSxDQUFBO1FBRTFCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRS9CLFVBQVUsR0FBRyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLHFEQUFHLE1BQU0sQ0FBQyxDQUFBO1NBRW5DO1FBRUQsUUFBUSxJQUFJLENBQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUs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