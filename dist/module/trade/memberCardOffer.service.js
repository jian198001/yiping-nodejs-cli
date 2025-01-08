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
var MemberCardOfferService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberCardOfferService = void 0;
// 导入所需的装饰器和模块
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const MemberCardOffer_1 = require("../../entity/MemberCardOffer");
const MemberCardOfferConsume_1 = require("../../entity/MemberCardOfferConsume");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
/**
 * 会员卡服务类
 */
let MemberCardOfferService = MemberCardOfferService_1 = class MemberCardOfferService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${MemberCardOfferService_1 === null || MemberCardOfferService_1 === void 0 ? void 0 : MemberCardOfferService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  `;
        // 注入会员卡实体模型
        this.repository = null;
        // 注入会员卡消费实体模型
        this.memberCardOfferConsumeRepository = null;
    }
    /**
     * 分页查询会员卡数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(query = '', params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let whereSql = ' '; // 查询条件字符串
        let parameters = [];
        if (params && params.length > 3) {
            parameters = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, params);
        }
        // 构建查询条件
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
    /**
     * 根据ID查询会员卡数据
     * @param id - 会员卡ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = MemberCardOfferService_1.TABLE_NAME + `:${id}`;
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
    /**
     * 删除会员卡数据
     * @param ids - 会员卡ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = MemberCardOfferService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新会员卡数据
     * @param obj - 会员卡对象
     * @returns 更新后的会员卡对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = '';
        // 删除redis缓存
        const key = (MemberCardOfferService_1 === null || MemberCardOfferService_1 === void 0 ? void 0 : MemberCardOfferService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, MemberCardOfferService_1 === null || MemberCardOfferService_1 === void 0 ? void 0 : MemberCardOfferService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
        if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + '已存在，操作失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, MemberCardOfferService_1 === null || MemberCardOfferService_1 === void 0 ? void 0 : MemberCardOfferService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, MemberCardOfferService_1 === null || MemberCardOfferService_1 === void 0 ? void 0 : MemberCardOfferService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        await ((_q = (_p = this === null || this === void 0 ? void 0 : this.repository) === null || _p === void 0 ? void 0 : _p.save) === null || _q === void 0 ? void 0 : _q.call(_p, old)); // 修改数据
    }
    /**
     * 会员卡消费
     * @param memberCardOfferConsume - 会员卡消费对象
     * @returns 会员卡消费对象
     */
    async consume(memberCardOfferConsume) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '取得会员卡包中会员卡信息');
        const memberCardOfferId = memberCardOfferConsume.memberCardOfferId;
        const memberCardOffer = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, memberCardOfferId));
        if (!memberCardOffer) {
            log = '会员卡包中不存在此会员卡';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.call(_g, '以上条件都通过，代表此卡可以核销');
        (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.info) === null || _k === void 0 ? void 0 : _k.call(_j, '此卡如果是首次使用，并且是使用即激活，则激活此卡，设定此卡的有效期信息');
        (_m = (_l = this === null || this === void 0 ? void 0 : this.logger) === null || _l === void 0 ? void 0 : _l.info) === null || _m === void 0 ? void 0 : _m.call(_l, '判断此卡有没有核销过，如果没有核销过，说明是首次使用');
        const consumeCount = await ((_o = this === null || this === void 0 ? void 0 : this.memberCardOfferConsumeRepository) === null || _o === void 0 ? void 0 : _o.countBy({
            memberCardOfferId: memberCardOfferId,
        }));
        if (!consumeCount) {
            (_q = (_p = this === null || this === void 0 ? void 0 : this.logger) === null || _p === void 0 ? void 0 : _p.info) === null || _q === void 0 ? void 0 : _q.call(_p, '首次使用');
            const activateType = memberCardOffer.activateType;
            if (activateType === 'use') {
                (_s = (_r = this === null || this === void 0 ? void 0 : this.logger) === null || _r === void 0 ? void 0 : _r.info) === null || _s === void 0 ? void 0 : _s.call(_r, '此卡的类型是首次使用时激活,进行激活操作');
                await (this === null || this === void 0 ? void 0 : this.activate(memberCardOfferId));
            }
        }
        const consume = memberCardOffer.consume;
        if (!consume) {
            log = '会员卡包中此会员卡核销次数已用尽,核销失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_u = (_t = this === null || this === void 0 ? void 0 : this.logger) === null || _t === void 0 ? void 0 : _t.error) === null || _u === void 0 ? void 0 : _u.call(_t, log, zero0Error);
            throw zero0Error;
        }
        const endTime = memberCardOffer.endTime;
        console === null || console === void 0 ? void 0 : console.log(endTime);
        // TODO
        const beginTime = memberCardOffer.beginTime;
        console === null || console === void 0 ? void 0 : console.log(beginTime);
        // TODO
        memberCardOffer.consume = memberCardOffer.consume - 1;
        await ((_w = (_v = this === null || this === void 0 ? void 0 : this.repository) === null || _v === void 0 ? void 0 : _v.save) === null || _w === void 0 ? void 0 : _w.call(_v, memberCardOffer));
        await ((_y = (_x = this === null || this === void 0 ? void 0 : this.memberCardOfferConsumeRepository) === null || _x === void 0 ? void 0 : _x.save) === null || _y === void 0 ? void 0 : _y.call(_x, memberCardOfferConsume));
        return memberCardOfferConsume;
    }
    async activate(memberCardOfferId) {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '会员卡包中会员卡激活操作');
        const memberCardOffer = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, memberCardOfferId));
        const type = memberCardOffer.type;
        const beginTime = new Date();
        const endTime = new Date();
        if (type === 'DATE_TYPE_FIX_TIME_RANGE') {
        }
        else if (type === 'DATE_TYPE_FIX_TERM') {
        }
        memberCardOffer.beginTime = beginTime;
        memberCardOffer.endTime = endTime;
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, memberCardOffer));
        return memberCardOffer;
    }
    async init(memberCardOffer) {
        var _a, _b;
        const type = memberCardOffer.type;
        const beginTime = new Date();
        const endTime = new Date();
        if (type === 'DATE_TYPE_FIX_TIME_RANGE') {
        }
        else if (type === 'DATE_TYPE_FIX_TERM') {
        }
        memberCardOffer.beginTime = beginTime;
        memberCardOffer.endTime = endTime;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.save) === null || _b === void 0 ? void 0 : _b.call(_a, memberCardOffer));
        return memberCardOffer;
    }
    async refundConsume(memberCardOfferId) {
        var _a, _b, _c, _d;
        const memberCardOffer = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, memberCardOfferId));
        memberCardOffer.consume = memberCardOffer.consume + 1;
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.save) === null || _d === void 0 ? void 0 : _d.call(_c, memberCardOffer));
        return memberCardOffer;
    }
};
// 查询的数据库表名称
MemberCardOfferService.TABLE_NAME = 'member_card_offer';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], MemberCardOfferService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(MemberCardOffer_1.MemberCardOffer),
    __metadata("design:type", typeorm_1.Repository)
], MemberCardOfferService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(MemberCardOfferConsume_1.MemberCardOfferConsume),
    __metadata("design:type", typeorm_1.Repository)
], MemberCardOfferService.prototype, "memberCardOfferConsumeRepository", void 0);
MemberCardOfferService = MemberCardOfferService_1 = __decorate([
    (0, decorator_1.Provide)()
], MemberCardOfferService);
exports.MemberCardOfferService = MemberCardOfferService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVyQ2FyZE9mZmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS90cmFkZS9tZW1iZXJDYXJkT2ZmZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLG1EQUFzRDtBQUN0RCxpRUFBNkQ7QUFHN0QscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUN0RCxrRUFBK0Q7QUFFL0QsZ0ZBQTZFO0FBQzdFLDJEQUF3RDtBQUN4RCxxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELDRCQUE2QjtBQUU3Qjs7R0FFRztBQUVILElBQWEsc0JBQXNCLDhCQUFuQyxNQUFhLHNCQUF1QixTQUFRLDBCQUFXO0lBQXZEOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSy9CLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyx3QkFBc0IsYUFBdEIsd0JBQXNCLHVCQUF0Qix3QkFBc0IsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUNuRSxzQkFBc0I7UUFDZCxjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBRS9DLFlBQVk7UUFFSixlQUFVLEdBQWdDLElBQUksQ0FBQztRQUV2RCxjQUFjO1FBRU4scUNBQWdDLEdBQXVDLElBQUksQ0FBQztJQXNWdEYsQ0FBQztJQXBWQzs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixLQUFLLEdBQUcsRUFBRSxFQUFFLE1BQWMsRUFBRSxRQUFrQixFQUM5QyxJQUFVO1FBRVYsV0FBVzs7UUFFWCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUEsQ0FBQyxVQUFVO1FBRTdCLElBQUksVUFBVSxHQUFVLEVBQUUsQ0FBQTtRQUUxQixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQixVQUFV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