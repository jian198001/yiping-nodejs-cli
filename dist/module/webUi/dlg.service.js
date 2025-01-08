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
var DlgService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DlgService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const Dlg_1 = require("../../entity/Dlg");
const Zero0Error_1 = require("../common/model/Zero0Error");
const path = require("path");
const _ = require("lodash");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const fse = require('fs-extra');
/**
 * Dlg服务类
 * 提供Dlg的分页查询、根据ID查询、删除、更新等功能
 */
let DlgService = DlgService_1 = class DlgService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${DlgService_1 === null || DlgService_1 === void 0 ? void 0 : DlgService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
     `;
        this.app = null;
        this.repository = null;
    }
    /**
     * 分页查询Dlg
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
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
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.like?.(['name'], reqParam?.searchValue) 处理前端的搜索字符串的搜索需求
        // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        // 处理前端的表格中筛选需求
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, (_c = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _c === void 0 ? void 0 : _c.call(strUtils, parameters, ['current', 'pageSize',]))) + ((_d = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _d === void 0 ? void 0 : _d.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue)) + ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
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
     * 根据ID查询Dlg
     * @param id - Dlg ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = DlgService_1.TABLE_NAME + `:${id}`;
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
     * 删除Dlg
     * @param ids - Dlg ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = DlgService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新Dlg
     * @param obj - Dlg对象
     * @returns 更新后的Dlg对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        let log = '';
        // 删除redis缓存
        const key = (DlgService_1 === null || DlgService_1 === void 0 ? void 0 : DlgService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, DlgService_1 === null || DlgService_1 === void 0 ? void 0 : DlgService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
        if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + '已存在，操作失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        let pathStr = obj === null || obj === void 0 ? void 0 : obj.path;
        if (pathStr) {
            pathStr = strUtils === null || strUtils === void 0 ? void 0 : strUtils.subStartEndSep(pathStr);
            const strings = (_f = pathStr === null || pathStr === void 0 ? void 0 : pathStr.split) === null || _f === void 0 ? void 0 : _f.call(pathStr, '/');
            if ((strings === null || strings === void 0 ? void 0 : strings.length) !== 2) {
                log = '目前路径只支持2级目录路径，操作失败';
                const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
                (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.call(_g, log, zero0Error);
                throw zero0Error;
            }
            obj.path = pathStr;
        }
        const name = obj === null || obj === void 0 ? void 0 : obj.name;
        if ((name === null || name === void 0 ? void 0 : name.search(/[^a-zA-Z]/g)) > -1) {
            log = '名称' + name + '含有英文外的其它字符，操作失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.error) === null || _k === void 0 ? void 0 : _k.call(_j, log, zero0Error);
            throw zero0Error;
        }
        // 判断组件路径第3级目录对应的表单entity是否已存在
        const ts = (_l = path === null || path === void 0 ? void 0 : path.join) === null || _l === void 0 ? void 0 : _l.call(path, await ((_m = this === null || this === void 0 ? void 0 : this.app) === null || _m === void 0 ? void 0 : _m.getAppDir()), 'src', 'entity', (_ === null || _ === void 0 ? void 0 : _.upperFirst(name)) + '.ts');
        if (fse === null || fse === void 0 ? void 0 : fse.existsSync(ts)) {
            log =
                '名称对应的表单entity' +
                    (_ === null || _ === void 0 ? void 0 : _.upperFirst(name)) +
                    '.ts' +
                    '已存在，操作失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_p = (_o = this === null || this === void 0 ? void 0 : this.logger) === null || _o === void 0 ? void 0 : _o.error) === null || _p === void 0 ? void 0 : _p.call(_o, log, zero0Error);
            throw zero0Error;
        }
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_r = (_q = this === null || this === void 0 ? void 0 : this.repository) === null || _q === void 0 ? void 0 : _q.save) === null || _r === void 0 ? void 0 : _r.call(_q, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_s = super.sortOrder) === null || _s === void 0 ? void 0 : _s.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, DlgService_1 === null || DlgService_1 === void 0 ? void 0 : DlgService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_u = (_t = this === null || this === void 0 ? void 0 : this.repository) === null || _t === void 0 ? void 0 : _t.findOneById) === null || _u === void 0 ? void 0 : _u.call(_t, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_w = (_v = this === null || this === void 0 ? void 0 : this.repository) === null || _v === void 0 ? void 0 : _v.save) === null || _w === void 0 ? void 0 : _w.call(_v, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_x = super.sortOrder) === null || _x === void 0 ? void 0 : _x.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, DlgService_1 === null || DlgService_1 === void 0 ? void 0 : DlgService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        await ((_z = (_y = this === null || this === void 0 ? void 0 : this.repository) === null || _y === void 0 ? void 0 : _y.save) === null || _z === void 0 ? void 0 : _z.call(_y, old)); // 修改数据
    }
};
// 查询的数据库表名称
DlgService.TABLE_NAME = 'dlg';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], DlgService.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], DlgService.prototype, "app", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Dlg_1.Dlg),
    __metadata("design:type", typeorm_1.Repository)
], DlgService.prototype, "repository", void 0);
DlgService = DlgService_1 = __decorate([
    (0, decorator_1.Provide)()
], DlgService);
exports.DlgService = DlgService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGxnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS93ZWJVaS9kbGcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTJEO0FBQzNELGlFQUE2RDtBQUc3RCxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBQ3RELDBDQUF1QztBQUN2QywyREFBd0Q7QUFJeEQsNkJBQTZCO0FBRTdCLDRCQUE2QjtBQUU3QixxREFBcUQ7QUFDckQscURBQXFEO0FBRXJELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVoQzs7O0dBR0c7QUFFSCxJQUFhLFVBQVUsa0JBQXZCLE1BQWEsVUFBVyxTQUFRLDBCQUFXO0lBQTNDOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBRy9CLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxZQUFVLGFBQVYsWUFBVSx1QkFBVixZQUFVLENBQUUsVUFBVSxLQUFLLENBQUM7UUFDdkQsc0JBQXNCO1FBQ2QsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNOztNQUV0QyxDQUFDO1FBR0csUUFBRyxHQUFnQixJQUFJLENBQUM7UUFHeEIsZUFBVSxHQUFvQixJQUFJLENBQUM7SUFvUDdDLENBQUM7SUFsUEM7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQ2YsS0FBSyxHQUFHLEVBQUUsRUFBRSxNQUFjLEVBQUUsUUFBa0IsRUFDOUMsSUFBVTtRQUVWLFdBQVc7O1FBRVgsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFBLENBQUMsVUFBVTtRQUU3QixJQUFJLFVBQVUsR0FBVSxFQUFFLENBQUE7UUFFMUIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0IsVUFBVSxHQUFHLE1BQUEsSUFBSSxhQUFK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