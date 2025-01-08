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
var PurchaseOrderItemService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderItemService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const PurchaseOrderItem_1 = require("../../entity/PurchaseOrderItem");
const Zero0Error_1 = require("../common/model/Zero0Error");
const _ = require("lodash");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const moment = require('moment');
/**
 * 采购订单项服务类
 * 提供采购订单项的分页查询、根据ID查询、删除、更新、生成出库单号、订单计数、支付宝手机网站支付、支付宝退款、支付宝关闭订单、微信支付统一下单、减库存、设置发货信息、积分转换金额等功能
 */
let PurchaseOrderItemService = PurchaseOrderItemService_1 = class PurchaseOrderItemService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${PurchaseOrderItemService_1 === null || PurchaseOrderItemService_1 === void 0 ? void 0 : PurchaseOrderItemService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql} 
  , ( SELECT name AS material_name FROM material WHERE t.material_id = material.id ) AS material_name 
  , ( SELECT sku AS material_sku FROM material WHERE t.material_id = material.id ) AS material_sku 
     `;
        // 注入PurchaseOrderItem实体的Repository
        this.repository = null;
    }
    /**
     * 分页查询采购订单项
     * @param orderId - 订单ID
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(orderId = '', query = '', params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // 分页列表查询数据
        let whereSql = ' '; // 查询条件字符串
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
        if (orderId) {
            // 添加订单ID的查询条件
            whereSql += ` AND t.order_id = '${orderId}' `;
        }
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        // 处理前端的表格中筛选需求
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize',]))) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
        console.log(whereSql);
        // 执行查询语句并返回page对象结果
        const data = await ((_g = super.pageBase) === null || _g === void 0 ? void 0 : _g.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
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
     * 根据ID查询采购订单项
     * @param id - 采购订单项ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = PurchaseOrderItemService_1.TABLE_NAME + `:${id}`;
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
     * 根据ID数组删除采购订单项
     * @param ids - 采购订单项ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = PurchaseOrderItemService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新采购订单项
     * @param obj - 采购订单项对象
     * @returns 更新后的采购订单项
     */
    async update(obj) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        // 一个表进行操作 typeORM
        let log = ''; // 删除redis缓存
        const key = (PurchaseOrderItemService_1 === null || PurchaseOrderItemService_1 === void 0 ? void 0 : PurchaseOrderItemService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, PurchaseOrderItemService_1 === null || PurchaseOrderItemService_1 === void 0 ? void 0 : PurchaseOrderItemService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, PurchaseOrderItemService_1 === null || PurchaseOrderItemService_1 === void 0 ? void 0 : PurchaseOrderItemService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, PurchaseOrderItemService_1 === null || PurchaseOrderItemService_1 === void 0 ? void 0 : PurchaseOrderItemService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
     * 生成出库单号
     * @returns 生成的出库单号
     */
    async getOutPurchaseNo() {
        var _a, _b, _c;
        // 生成出库单号
        return (((_b = (_a = moment()).format) === null || _b === void 0 ? void 0 : _b.call(_a, 'YYYYMMDDHHmmss')) +
            ((_c = _ === null || _ === void 0 ? void 0 : _.random) === null || _c === void 0 ? void 0 : _c.call(_, 1000000000000000, 9999999999999999, false)));
    }
    /**
     * 订单计数
     * @param shopBuyerId - 店铺买家ID
     * @param shopId - 店铺ID
     * @returns 无返回值
     */
    async orderCount(shopBuyerId = '', shopId = '') { }
    async alipayRefund(orderId) { }
    async alipayClose(orderId) { }
    async wxpayUnifiedOrder(orderId) {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '进行微信支付统一下单的订单预创建');
    }
    async subStock(orderId, subStockType) {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '进行物料减库存操作,将订单占用的库存从物料库存中减去');
    }
    async setDelivery(orderId, deliveryCompany, deliveryTrackNo, needDelivery, isOthers) { }
    async bonusToAmount(bonus, rate) {
        var _a, _b, _c, _d, _e;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '积分转换成金额(元)');
        if (!bonus) {
            log = '积分过小，转换失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.call(_c, log, zero0Error);
            throw zero0Error;
        }
        return (_e = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _e === void 0 ? void 0 : _e.call(_, bonus, rate);
    }
};
// 查询的数据库表名称
PurchaseOrderItemService.TABLE_NAME = 'purchase_order_item';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], PurchaseOrderItemService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(PurchaseOrderItem_1.PurchaseOrderItem),
    __metadata("design:type", typeorm_1.Repository)
], PurchaseOrderItemService.prototype, "repository", void 0);
PurchaseOrderItemService = PurchaseOrderItemService_1 = __decorate([
    (0, decorator_1.Provide)()
], PurchaseOrderItemService);
exports.PurchaseOrderItemService = PurchaseOrderItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyY2hhc2VPcmRlckl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3B1cmNoYXNlL3B1cmNoYXNlT3JkZXJJdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCxpRUFBNkQ7QUFHN0QscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUd0RCxzRUFBbUU7QUFDbkUsMkRBQXdEO0FBRXhELDRCQUE2QjtBQUU3QixxREFBcUQ7QUFDckQscURBQXFEO0FBRXJELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQzs7O0dBR0c7QUFFSCxJQUFhLHdCQUF3QixnQ0FBckMsTUFBYSx3QkFBeUIsU0FBUSwwQkFBVztJQUF6RDs7UUFFRSxRQUFRO1FBRUEsV0FBTSxHQUFZLElBQUksQ0FBQztRQUsvQixlQUFlO1FBQ1AsWUFBTyxHQUFHLFNBQVMsMEJBQXdCLGFBQXhCLDBCQUF3Qix1QkFBeEIsMEJBQXdCLENBQUUsVUFBVSxLQUFLLENBQUM7UUFFckUsc0JBQXNCO1FBQ2QsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNOzs7TUFHdEMsQ0FBQztRQUVMLG1DQUFtQztRQUUzQixlQUFVLEdBQWtDLElBQUksQ0FBQztJQStPM0QsQ0FBQztJQTdPQzs7Ozs7Ozs7T0FRRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQ2YsT0FBTyxHQUFHLEVBQUUsRUFDWixLQUFLLEdBQUcsRUFBRSxFQUFFLE1BQWMsRUFBRSxRQUFrQixFQUM5QyxJQUFVOztRQUVWLFdBQVc7UUFDWCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVO1FBQzlCLGtCQUFrQjtRQUNsQixRQUFRLElBQUksTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsSUFBSSx5REFB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