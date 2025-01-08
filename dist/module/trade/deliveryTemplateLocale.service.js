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
var DeliveryTemplateLocaleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryTemplateLocaleService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const DeliveryTemplateLocale_1 = require("../../entity/DeliveryTemplateLocale");
const Zero0Error_1 = require("../common/model/Zero0Error");
const _ = require("lodash");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
let DeliveryTemplateLocaleService = DeliveryTemplateLocaleService_1 = class DeliveryTemplateLocaleService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${DeliveryTemplateLocaleService_1 === null || DeliveryTemplateLocaleService_1 === void 0 ? void 0 : DeliveryTemplateLocaleService_1.TABLE_NAME} t `;
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
        const key = DeliveryTemplateLocaleService_1.TABLE_NAME + `:${id}`;
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
            const key = DeliveryTemplateLocaleService_1.TABLE_NAME + `:${id}`;
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
        const uniqueText = await ((_a = super.unique) === null || _a === void 0 ? void 0 : _a.call(this, DeliveryTemplateLocaleService_1 === null || DeliveryTemplateLocaleService_1 === void 0 ? void 0 : DeliveryTemplateLocaleService_1.TABLE_NAME, null, obj === null || obj === void 0 ? void 0 : obj.id));
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
                await ((_f = super.sortOrder) === null || _f === void 0 ? void 0 : _f.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, DeliveryTemplateLocaleService_1 === null || DeliveryTemplateLocaleService_1 === void 0 ? void 0 : DeliveryTemplateLocaleService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.findOneById) === null || _h === void 0 ? void 0 : _h.call(_g, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_l = super.sortOrder) === null || _l === void 0 ? void 0 : _l.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, DeliveryTemplateLocaleService_1 === null || DeliveryTemplateLocaleService_1 === void 0 ? void 0 : DeliveryTemplateLocaleService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
    async getDeliveryTotalAmount(list) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '计算订单运费金额');
        let totalAmount = 0.0;
        if (!list) {
            return totalAmount;
        }
        let templateSame = true; // 所有订单的运费模板是否相同
        let valuationSame = true; // 所有订单的运费计价方式是否相同
        const firstMap = (_c = _ === null || _ === void 0 ? void 0 : _.head) === null || _c === void 0 ? void 0 : _c.call(_, list); // 集合中的第一个订单,其它订单要与此订单进行比较
        let totalQuantity = 0; // 所有订单的商品总件数
        let totalVolume = 0; // 所有订单的商品总体积
        let totalMass = 0; // 所有订单的商品总质量
        let valuationFirst = firstMap.valuation; // 第一个订单的运费计价方式
        let startStandardsFirst = firstMap.startStandards; // 第一个订单的首费标准
        let startFeesFirst = firstMap.startFees; // 第一个订单的首费价格
        let addStandardsFirst = firstMap.addStandards; // 第一个订单的续费标准
        let addFeesFirst = firstMap.addFees; // 第一个订单的续费价格
        const freightPayerFirst = firstMap.freightPayer;
        if (freightPayerFirst !== 'buyer') {
            startStandardsFirst = 0;
            firstMap.startStandardsFirst = startStandardsFirst;
            startFeesFirst = 0;
            firstMap.startFeesFirst = startFeesFirst;
            addStandardsFirst = 0;
            firstMap.addStandardsFirst = addStandardsFirst;
            addFeesFirst = 0;
            firstMap.addFeesFirst = addFeesFirst;
        }
        if (!valuationFirst) {
            valuationFirst = 'quantity';
        }
        if (!startStandardsFirst) {
            startStandardsFirst = 0;
        }
        if (!startFeesFirst) {
            startFeesFirst = 0;
        }
        if (!addStandardsFirst) {
            addStandardsFirst = 0;
        }
        if (!addStandardsFirst) {
            addStandardsFirst = 0;
        }
        let maxStartFees = startFeesFirst; // 所有订单中最大的那个首费价格
        let maxStartFeesMap = firstMap; // 所有订单中拥有最大首费价格的那个订单
        for (const listElement of list) {
            const valuation = listElement.valuation;
            const quantity = listElement.quantity;
            const volume = listElement.volume;
            const mass = listElement.mass;
            const freightPayer = listElement.freightPayer;
            if (quantity) {
                totalQuantity = _ === null || _ === void 0 ? void 0 : _.add(totalQuantity, quantity);
            }
            if (volume) {
                totalVolume = _ === null || _ === void 0 ? void 0 : _.add(totalVolume, volume);
            }
            if (mass) {
                totalMass = _ === null || _ === void 0 ? void 0 : _.add(totalMass, mass);
            }
            if (valuationFirst === valuation) {
                valuationSame = false;
                templateSame = false;
            }
            let startStandards = listElement.startStandards;
            let startFees = listElement.startFees;
            let addStandards = listElement.addStandards;
            let addFees = listElement.addFees;
            if (freightPayer !== 'buyer') {
                startStandards = 0;
                listElement.startStandards = startStandards;
                startFees = 0;
                listElement.startFees = startFees;
                addStandards = 0;
                listElement.addStandards = addStandards;
                addFees = 0;
                listElement.addFees = addFees;
            }
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.info) === null || _e === void 0 ? void 0 : _e.call(_d, '如果此子订单不是最大首费的订单,则很可能完全按照续费价格进行整体计费,这里计算按续费价格整体计费的(元)');
            let totalAmountOrderItem = 0;
            if (!startStandards) {
                startStandards = 0;
            }
            if (!startFees) {
                startFees = 0;
            }
            if (!addStandards) {
                addStandards = 0;
            }
            if (startFees > maxStartFees) {
                maxStartFees = startFees;
                maxStartFeesMap = listElement;
                listElement.maxStartFeesMap = true;
                if (valuation === 'mass') {
                    totalAmountOrderItem = (_f = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _f === void 0 ? void 0 : _f.call(_, (_g = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _g === void 0 ? void 0 : _g.call(_, mass, startStandards), addFees);
                }
                else if (valuation === 'volume') {
                    totalAmountOrderItem = (_h = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _h === void 0 ? void 0 : _h.call(_, (_j = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _j === void 0 ? void 0 : _j.call(_, volume, startStandards), addFees);
                }
                else {
                    totalAmountOrderItem = (_k = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _k === void 0 ? void 0 : _k.call(_, (_l = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _l === void 0 ? void 0 : _l.call(_, quantity, startStandards), addFees);
                }
            }
            else {
                listElement.maxStartFeesMap = false;
                if (valuation === 'mass') {
                    totalAmountOrderItem = (_m = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _m === void 0 ? void 0 : _m.call(_, (_o = _ === null || _ === void 0 ? void 0 : _.divide) === null || _o === void 0 ? void 0 : _o.call(_, mass, startStandards), addFees);
                }
                else if (valuation === 'volume') {
                    totalAmountOrderItem = (_p = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _p === void 0 ? void 0 : _p.call(_, (_q = _ === null || _ === void 0 ? void 0 : _.divide) === null || _q === void 0 ? void 0 : _q.call(_, volume, startStandards), addFees);
                }
                else {
                    totalAmountOrderItem = (_r = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _r === void 0 ? void 0 : _r.call(_, (_s = _ === null || _ === void 0 ? void 0 : _.divide) === null || _s === void 0 ? void 0 : _s.call(_, quantity, startStandards), addFees);
                }
            }
            listElement.totalAmountOrderItem = totalAmountOrderItem;
            if (startStandards !== startStandardsFirst ||
                startFees !== startFeesFirst ||
                addStandards !== addStandardsFirst ||
                addFees !== addFeesFirst) {
                templateSame = false;
            }
        }
        totalAmount = _ === null || _ === void 0 ? void 0 : _.add(totalAmount, maxStartFees);
        (_u = (_t = this === null || this === void 0 ? void 0 : this.logger) === null || _t === void 0 ? void 0 : _t.info) === null || _u === void 0 ? void 0 : _u.call(_t, '所有订单中最大的那个首费价格:' + totalAmount);
        (_w = (_v = this === null || this === void 0 ? void 0 : this.logger) === null || _v === void 0 ? void 0 : _v.info) === null || _w === void 0 ? void 0 : _w.call(_v, '代表订单中所有子订单对应的商品的运费计价方式和价格完全相同');
        (_y = (_x = this === null || this === void 0 ? void 0 : this.logger) === null || _x === void 0 ? void 0 : _x.info) === null || _y === void 0 ? void 0 : _y.call(_x, '当我同时购买2件商品A和2件商品B,因为这两款商品都使用同一个运费模板,则只使用其中一款商品的首件运费,其余商品直接按照续件的运费进行计算,即购买2件商品A和2件商品B时');
        if (templateSame && valuationSame) {
            (_0 = (_z = this === null || this === void 0 ? void 0 : this.logger) === null || _z === void 0 ? void 0 : _z.info) === null || _0 === void 0 ? void 0 : _0.call(_z, '订单中所有子订单对应的商品的运费计价方式和价格完全相同');
            if (valuationFirst === 'mass') {
                const otherMass = (_1 = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _1 === void 0 ? void 0 : _1.call(_, totalMass, maxStartFeesMap.startStandards);
                if (otherMass < 0.01) {
                    return totalAmount;
                }
                totalAmount = _ === null || _ === void 0 ? void 0 : _.add(totalAmount, (_2 = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _2 === void 0 ? void 0 : _2.call(_, otherMass, addFeesFirst));
                return totalAmount;
            }
            if (valuationFirst === 'volume') {
                const otherVolume = (_3 = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _3 === void 0 ? void 0 : _3.call(_, totalVolume, maxStartFeesMap.startStandards);
                if (otherVolume < 0.01) {
                    return totalAmount;
                }
                totalAmount = _ === null || _ === void 0 ? void 0 : _.add(totalAmount, (_4 = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _4 === void 0 ? void 0 : _4.call(_, otherVolume, addFeesFirst));
                return totalAmount;
            }
            const otherQuantity = (_5 = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _5 === void 0 ? void 0 : _5.call(_, totalQuantity, maxStartFeesMap.startStandards);
            if (otherQuantity < 0.01) {
                return totalAmount;
            }
            totalAmount = _ === null || _ === void 0 ? void 0 : _.add(totalAmount, (_6 = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _6 === void 0 ? void 0 : _6.call(_, otherQuantity, addFeesFirst));
            return totalAmount;
        }
        (_8 = (_7 = this === null || this === void 0 ? void 0 : this.logger) === null || _7 === void 0 ? void 0 : _7.info) === null || _8 === void 0 ? void 0 : _8.call(_7, '当我同时购买2件商品A和2件商品C,这两款商品都是按照件数计算运费,但使用的是不同的运费模板,则会比较这两款商品中首件的运费,选择首件运费最大的费用作为首件费用（商品C首件运费20元）,然后忽略商品A的首件运费,商品A全部按照该商品的续件费用进行计算运费');
        (_10 = (_9 = this === null || this === void 0 ? void 0 : this.logger) === null || _9 === void 0 ? void 0 : _9.info) === null || _10 === void 0 ? void 0 : _10.call(_9, '当我同时购买2件商品A和2kg商品D,商品A按照件数计算运费,商品D按照重量计算运费,则会比较这两款商品中首件（首公斤）的运费,选择首件（首公斤）运费最大的费用作为首件（首公斤）费用（商品D首公斤运费12元）,然后忽略商品A的首件运费,商品A全部按照该商品的续件费用进行计算运费');
        (_12 = (_11 = this === null || this === void 0 ? void 0 : this.logger) === null || _11 === void 0 ? void 0 : _11.info) === null || _12 === void 0 ? void 0 : _12.call(_11, '订单中所有子订单对应的商品的运费计价方式相同,但是价格不同.或者,订单中所有子订单对应的商品的运费计价方式不同');
        for (const any of list) {
            totalAmount = _ === null || _ === void 0 ? void 0 : _.add(totalAmount, any.totalAmountOrderItem);
        }
        return totalAmount;
    }
};
// 查询的数据库表名称
DeliveryTemplateLocaleService.TABLE_NAME = 'delivery_template_locale';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], DeliveryTemplateLocaleService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(DeliveryTemplateLocale_1.DeliveryTemplateLocale),
    __metadata("design:type", typeorm_1.Repository)
], DeliveryTemplateLocaleService.prototype, "repository", void 0);
DeliveryTemplateLocaleService = DeliveryTemplateLocaleService_1 = __decorate([
    (0, decorator_1.Provide)()
], DeliveryTemplateLocaleService);
exports.DeliveryTemplateLocaleService = DeliveryTemplateLocaleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnlUZW1wbGF0ZUxvY2FsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvdHJhZGUvZGVsaXZlcnlUZW1wbGF0ZUxvY2FsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsaUVBQTZEO0FBRzdELHFDQUFxQztBQUNyQywrQ0FBc0Q7QUFDdEQsZ0ZBQTZFO0FBSTdFLDJEQUF3RDtBQUV4RCw0QkFBNkI7QUFHN0IscURBQXFEO0FBQ3JELHFEQUFxRDtBQUlyRCxJQUFhLDZCQUE2QixxQ0FBMUMsTUFBYSw2QkFBOEIsU0FBUSwwQkFBVztJQUE5RDs7UUFHVSxXQUFNLEdBQVksSUFBSSxDQUFBO1FBS2hDLGVBQWU7UUFDTCxZQUFPLEdBQUcsU0FBUywrQkFBNkIsYUFBN0IsK0JBQTZCLHVCQUE3QiwrQkFBNkIsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUMzRSxzQkFBc0I7UUFDYixjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU07O01BRXRDLENBQUE7UUFHSSxlQUFVLEdBQXVDLElBQUksQ0FBQztJQXdkaEUsQ0FBQztJQXRkUSxLQUFLLENBQUMsSUFBSSxDQUNmLEtBQUssR0FBRyxFQUFFLEVBQUUsTUFBYyxFQUFFLFFBQWtCLEVBQzlDLElBQVU7UUFFVixXQUFXOztRQUVYLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQSxDQUFDLFVBQVU7UUFHM0IsSUFBSSxVQUFVLEdBQVUsRUFBRSxDQUFBO1FBRTFCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRS9CLFVBQVUsR0FBRyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLHFEQUFHLE1BQU0sQ0FBQyxDQUFBO1NBRW5DO1FBRUQsUUFBUSxJQUFJLENBQUEs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