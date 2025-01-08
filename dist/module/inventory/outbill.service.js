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
var OutbillService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutbillService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const Outbill_1 = require("../../entity/Outbill");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const OutbillItem_1 = require("../../entity/OutbillItem");
const Stock_1 = require("../../entity/Stock");
const Consume_1 = require("../../entity/Consume");
const _ = require("lodash");
/**
 * 出库单服务类
 * 提供出库单的增删改查以及物料领用等功能
 */
let OutbillService = OutbillService_1 = class OutbillService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${OutbillService_1 === null || OutbillService_1 === void 0 ? void 0 : OutbillService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  `;
        // 注入Outbill实体的Repository
        this.repository = null;
        // 注入Stock实体的Repository
        this.stockRepository = null;
        // 注入OutbillItem实体的Repository
        this.outbillItemRepository = null;
        // 注入Consume实体的Repository
        this.consumeRepository = null;
        // 采购入库->purchase采购信息->inbill->形成入库单，记录入库信息->stock库存信息
        // 领用出库->stock库存信息->outbill->形成出库单，记录出库信息
        // 领用信息表->谁领用了哪些物料 staffId materialId quantity
        // 归还入库->inbill->形成入库单，记录归还入库信息->stock库存信息
    }
    /**
     * 分页查询出库单
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(query = '', params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // 分页列表查询数据
        let whereSql = ' '; // 查询条件字符串
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue); // 处理前端的搜索字符串的搜索需求
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize']))) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query)); // 处理前端的表格中筛选需求
        // 执行查询语句并返回page对象结果
        const data = await ((_g = super.pageBase) === null || _g === void 0 ? void 0 : _g.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
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
     * 根据ID查询出库单
     * @param id - 出库单ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = OutbillService_1.TABLE_NAME + `:${id}`;
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
     * 删除出库单
     * @param ids - 出库单ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = OutbillService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新出库单
     * @param obj - 出库单对象
     * @returns 更新后的出库单对象
     */
    async update(obj) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        // 一个表进行操作 typeORM
        let log = ''; // 删除redis缓存
        const key = (OutbillService_1 === null || OutbillService_1 === void 0 ? void 0 : OutbillService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, OutbillService_1 === null || OutbillService_1 === void 0 ? void 0 : OutbillService_1.TABLE_NAME, null, obj === null || obj === void 0 ? void 0 : obj.id));
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, OutbillService_1 === null || OutbillService_1 === void 0 ? void 0 : OutbillService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, OutbillService_1 === null || OutbillService_1 === void 0 ? void 0 : OutbillService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
     * 物料领用
     * @param obj - 出库单对象
     * @param items - 出库单项数组
     * @param staffId - 员工ID
     * @returns 更新后的出库单对象
     */
    async consume(obj, items, staffId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        // 一个表进行操作 typeORM 物料领用
        let log = ''; // 删除redis缓存
        const key = (OutbillService_1 === null || OutbillService_1 === void 0 ? void 0 : OutbillService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, OutbillService_1 === null || OutbillService_1 === void 0 ? void 0 : OutbillService_1.TABLE_NAME, null, obj === null || obj === void 0 ? void 0 : obj.id));
        if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + '已存在，操作失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        for (const item of items) {
            item.billId = obj === null || obj === void 0 ? void 0 : obj.id;
        }
        await (this === null || this === void 0 ? void 0 : this.updateItems(items, staffId));
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, OutbillService_1 === null || OutbillService_1 === void 0 ? void 0 : OutbillService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, OutbillService_1 === null || OutbillService_1 === void 0 ? void 0 : OutbillService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
    async updateItems(items, staffId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (!items) {
            return;
        }
        for (const item of items) {
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.outbillItemRepository) === null || _a === void 0 ? void 0 : _a.save) === null || _b === void 0 ? void 0 : _b.call(_a, item));
            // 减少相应库存
            const stock = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.stockRepository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, item === null || item === void 0 ? void 0 : item.id));
            stock.quantity = (stock === null || stock === void 0 ? void 0 : stock.quantity) - (item === null || item === void 0 ? void 0 : item.consumeQuantity);
            await ((_f = (_e = this === null || this === void 0 ? void 0 : this.stockRepository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, stock));
            // 领用人信息中增加此物料数量
            let consumeNew = { materialId: item === null || item === void 0 ? void 0 : item.materialId, staffId: staffId, quantity: item === null || item === void 0 ? void 0 : item.consumeQuantity };
            const consume = await ((_h = this === null || this === void 0 ? void 0 : (_g = this.consumeRepository).findOne) === null || _h === void 0 ? void 0 : _h.call(_g, { where: { materialId: consumeNew === null || consumeNew === void 0 ? void 0 : consumeNew.materialId, staffId: staffId }, }));
            if (!consume) {
                await ((_k = (_j = this === null || this === void 0 ? void 0 : this.consumeRepository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, consumeNew));
                continue;
            }
            consume.quantity = (consume === null || consume === void 0 ? void 0 : consume.quantity) + (item === null || item === void 0 ? void 0 : item.consumeQuantity);
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.consumeRepository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, consume));
            continue;
        }
    }
};
// 查询的数据库表名称
OutbillService.TABLE_NAME = 'outbill';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], OutbillService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Outbill_1.Outbill),
    __metadata("design:type", typeorm_1.Repository)
], OutbillService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Stock_1.Stock),
    __metadata("design:type", typeorm_1.Repository)
], OutbillService.prototype, "stockRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(OutbillItem_1.OutbillItem),
    __metadata("design:type", typeorm_1.Repository)
], OutbillService.prototype, "outbillItemRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Consume_1.Consume),
    __metadata("design:type", typeorm_1.Repository)
], OutbillService.prototype, "consumeRepository", void 0);
OutbillService = OutbillService_1 = __decorate([
    (0, decorator_1.Provide)()
], OutbillService);
exports.OutbillService = OutbillService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0YmlsbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvaW52ZW50b3J5L291dGJpbGwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELGlFQUE2RDtBQUc3RCxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBQ3RELGtEQUErQztBQUMvQywyREFBd0Q7QUFHeEQscURBQXFEO0FBQ3JELHFEQUFxRDtBQUVyRCwwREFBdUQ7QUFDdkQsOENBQTJDO0FBQzNDLGtEQUErQztBQUMvQyw0QkFBNkI7QUFFN0I7OztHQUdHO0FBRUgsSUFBYSxjQUFjLHNCQUEzQixNQUFhLGNBQWUsU0FBUSwwQkFBVztJQUEvQzs7UUFDRSxRQUFRO1FBRUEsV0FBTSxHQUFZLElBQUksQ0FBQztRQUcvQixlQUFlO1FBQ1AsWUFBTyxHQUFHLFNBQVMsZ0JBQWMsYUFBZCxnQkFBYyx1QkFBZCxnQkFBYyxDQUFFLFVBQVUsS0FBSyxDQUFDO1FBQzNELHNCQUFzQjtRQUNkLGNBQVMsR0FBRyxJQUFJLDBCQUFXLENBQUMsTUFBTTtHQUN6QyxDQUFDO1FBQ0YseUJBQXlCO1FBRWpCLGVBQVUsR0FBd0IsSUFBSSxDQUFDO1FBQy9DLHVCQUF1QjtRQUVmLG9CQUFlLEdBQXNCLElBQUksQ0FBQztRQUNsRCw2QkFBNkI7UUFFckIsMEJBQXFCLEdBQTRCLElBQUksQ0FBQztRQUM5RCx5QkFBeUI7UUFFakIsc0JBQWlCLEdBQXdCLElBQUksQ0FBQztRQWtQdEQsc0RBQXNEO1FBQ3RELHlDQUF5QztRQUN6Qyw4Q0FBOEM7UUFDOUMsMENBQTBDO0lBQzVDLENBQUM7SUFyUEM7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQ2YsS0FBSyxHQUFHLEVBQUUsRUFBRSxNQUFjLEVBQUUsUUFBa0IsRUFDOUMsSUFBVTs7UUFFVixX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