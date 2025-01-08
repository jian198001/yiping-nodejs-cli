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
var MallMemberCardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MallMemberCardService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const MemberCard_1 = require("../../entity/MemberCard");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
let MallMemberCardService = MallMemberCardService_1 = class MallMemberCardService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${MallMemberCardService_1 === null || MallMemberCardService_1 === void 0 ? void 0 : MallMemberCardService_1.TABLE_NAME} t `;
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
        const key = MallMemberCardService_1.TABLE_NAME + `:${id}`;
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
            const key = MallMemberCardService_1.TABLE_NAME + `:${id}`;
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
        const uniqueText = await ((_a = super.unique) === null || _a === void 0 ? void 0 : _a.call(this, MallMemberCardService_1 === null || MallMemberCardService_1 === void 0 ? void 0 : MallMemberCardService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
                await ((_f = super.sortOrder) === null || _f === void 0 ? void 0 : _f.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, MallMemberCardService_1 === null || MallMemberCardService_1 === void 0 ? void 0 : MallMemberCardService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.findOneById) === null || _h === void 0 ? void 0 : _h.call(_g, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_l = super.sortOrder) === null || _l === void 0 ? void 0 : _l.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, MallMemberCardService_1 === null || MallMemberCardService_1 === void 0 ? void 0 : MallMemberCardService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
MallMemberCardService.TABLE_NAME = 'member_card';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], MallMemberCardService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(MemberCard_1.MemberCard),
    __metadata("design:type", typeorm_1.Repository)
], MallMemberCardService.prototype, "repository", void 0);
MallMemberCardService = MallMemberCardService_1 = __decorate([
    (0, decorator_1.Provide)()
], MallMemberCardService);
exports.MallMemberCardService = MallMemberCardService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsbE1lbWJlckNhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3RyYWRlL21hbGxNZW1iZXJDYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCxpRUFBNkQ7QUFHN0QscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUN0RCx3REFBcUQ7QUFJckQsMkRBQXdEO0FBRXhELHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsNEJBQTZCO0FBRTdCLElBQWEscUJBQXFCLDZCQUFsQyxNQUFhLHFCQUFzQixTQUFRLDBCQUFXO0lBQXREOztRQUdVLFdBQU0sR0FBWSxJQUFJLENBQUE7UUFLaEMsZUFBZTtRQUNMLFlBQU8sR0FBRyxTQUFTLHVCQUFxQixhQUFyQix1QkFBcUIsdUJBQXJCLHVCQUFxQixDQUFFLFVBQVUsS0FBSyxDQUFDO1FBQ25FLHNCQUFzQjtRQUNiLGNBQVMsR0FBRyxJQUFJLDBCQUFXLENBQUMsTUFBTTs7TUFFdEMsQ0FBQTtRQUdJLGVBQVUsR0FBMkIsSUFBSSxDQUFDO0lBOFJwRCxDQUFDO0lBNVJRLEtBQUssQ0FBQyxJQUFJLENBQ2YsS0FBSyxHQUFHLEVBQUUsRUFBRSxNQUFjLEVBQUUsUUFBa0IsRUFDOUMsSUFBVTtRQUVWLFdBQVc7O1FBRVgsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFBLENBQUMsVUFBVTtRQUczQixJQUFJLFVBQVUsR0FBVSxFQUFFLENBQUE7UUFFMUIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFL0IsVUFBVSxHQUFHLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEtBQUsscURBQUcsTUFBTSxDQUFDLENBQUE7U0FFbkM7UUFFRCxRQUFRLElBQUksQ0FBQSxNQUFBLFFBQVEsYUFBUixR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