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
var AlipayConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlipayConfigService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const Zero0Error_1 = require("../common/model/Zero0Error");
const AlipayConfig_1 = require("../../entity/AlipayConfig");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
/**
 * 支付宝配置服务类
 * 提供支付宝配置的增删改查以及分页查询功能
 */
let AlipayConfigService = AlipayConfigService_1 = class AlipayConfigService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${AlipayConfigService_1 === null || AlipayConfigService_1 === void 0 ? void 0 : AlipayConfigService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
     `;
        // 注入AlipayConfig实体的Repository
        this.repository = null;
    }
    /**
     * 分页查询支付宝配置
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(query = "", params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let whereSql = " "; // 查询条件字符串
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ["name"], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue); // 处理前端的搜索字符串的搜索需求
        let parameters = [];
        if (params && params.length > 3) {
            parameters = (_b = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _b === void 0 ? void 0 : _b.call(JSON, params);
        }
        whereSql +=
            ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, parameters, ["current", "pageSize"]))) +
                ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) +
                ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query)); // 处理前端的表格中筛选需求
        // 执行查询语句并返回page对象结果
        const data = await ((_g = super.pageBase) === null || _g === void 0 ? void 0 : _g.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
        // 遍历查询结果,将查询结果异步读取到redis
        // 遍历查询结果,将查询结果中异步读取到redis
        (_h = this === null || this === void 0 ? void 0 : this.getToRedis) === null || _h === void 0 ? void 0 : _h.call(this, (_j = _ === null || _ === void 0 ? void 0 : _.map) === null || _j === void 0 ? void 0 : _j.call(_, data === null || data === void 0 ? void 0 : data.list, "id"));
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
     * 根据ID查询支付宝配置
     * @param id - 支付宝配置ID
     * @returns 查询结果
     */
    async getById(id = "") {
        // 根据id查询一条数据
        var _a;
        return (_a = super.getByIdBase) === null || _a === void 0 ? void 0 : _a.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql);
    }
    /**
     * 删除支付宝配置
     * @param ids - 支付宝配置ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = AlipayConfigService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        } // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新支付宝配置
     * @param obj - 支付宝配置对象
     * @returns 更新后的支付宝配置对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = "";
        // 删除redis缓存
        const key = (AlipayConfigService_1 === null || AlipayConfigService_1 === void 0 ? void 0 : AlipayConfigService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, AlipayConfigService_1 === null || AlipayConfigService_1 === void 0 ? void 0 : AlipayConfigService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
        if (uniqueText) {
            // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + "已存在，操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, AlipayConfigService_1 === null || AlipayConfigService_1 === void 0 ? void 0 : AlipayConfigService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, AlipayConfigService_1 === null || AlipayConfigService_1 === void 0 ? void 0 : AlipayConfigService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
};
// 查询的数据库表名称
AlipayConfigService.TABLE_NAME = "wx_pay_config";
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], AlipayConfigService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(AlipayConfig_1.AlipayConfig),
    __metadata("design:type", typeorm_1.Repository)
], AlipayConfigService.prototype, "repository", void 0);
AlipayConfigService = AlipayConfigService_1 = __decorate([
    (0, decorator_1.Provide)()
], AlipayConfigService);
exports.AlipayConfigService = AlipayConfigService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpcGF5Q29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9hbGlwYXlQYXkvYWxpcGF5Q29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCxpRUFBNkQ7QUFHN0QscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUN0RCwyREFBd0Q7QUFHeEQsNERBQXlEO0FBRXpELHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsNEJBQTZCO0FBRTdCOzs7R0FHRztBQUVILElBQWEsbUJBQW1CLDJCQUFoQyxNQUFhLG1CQUFvQixTQUFRLDBCQUFXO0lBQXBEOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSy9CLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxxQkFBbUIsYUFBbkIscUJBQW1CLHVCQUFuQixxQkFBbUIsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUVoRSxzQkFBc0I7UUFDZCxjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU07O01BRXRDLENBQUM7UUFFTCw4QkFBOEI7UUFFdEIsZUFBVSxHQUE2QixJQUFJLENBQUM7SUFpTHRELENBQUM7SUEvS0M7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQ2YsS0FBSyxHQUFHLEVBQUUsRUFDVixNQUFjLEVBQ2QsUUFBa0IsRUFDbEIsSUFBVTtRQUVWLFdBQVc7O1FBRVgsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVTtRQUU5QixRQUFRLElBQUksTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsSUFBSSx5REFBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtRQUVqRixJQUFJ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