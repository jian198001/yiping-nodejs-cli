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
var NoticeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeService = void 0;
// 引入必要的模块和装饰器
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const Notice_1 = require("../../entity/Notice");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
/**
 * 通知消息服务类
 * 提供通知消息的增删改查功能
 */
let NoticeService = NoticeService_1 = class NoticeService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${NoticeService_1 === null || NoticeService_1 === void 0 ? void 0 : NoticeService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  `;
        // 注入Notice实体的Repository
        this.repository = null;
        // 日志字符串
        this.log = "";
    }
    /**
     * 分页查询通知消息
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(query = "", params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // 分页列表查询数据
        console === null || console === void 0 ? void 0 : console.log(this === null || this === void 0 ? void 0 : this.log);
        let whereSql = " "; // 查询条件字符串
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ["name"], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
        // 处理前端的表格中筛选需求
        whereSql +=
            ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) +
                ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), [
                    "current",
                    "pageSize",
                ]))) +
                ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
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
        var _a;
        for (const id of ids) {
            await ((_a = this === null || this === void 0 ? void 0 : this.getById) === null || _a === void 0 ? void 0 : _a.call(this, id));
        }
    }
    /**
     * 根据ID查询通知消息
     * @param id - 通知消息ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        console.log('getById');
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = NoticeService_1.TABLE_NAME + `:${id}`;
        let data = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.redisService) === null || _c === void 0 ? void 0 : _c.get) === null || _d === void 0 ? void 0 : _d.call(_c, key));
        // 缓存中有此数据，直接返回
        if (data) {
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.info) === null || _f === void 0 ? void 0 : _f.call(_e, '缓存中有此数据，直接返回');
            const parse = JSON.parse(data);
            return parse;
        }
        // 缓存中没有此数据，查询数据库
        // 调用父类的getByIdBase方法，根据ID查询数据
        data = await ((_g = super.getByIdBase) === null || _g === void 0 ? void 0 : _g.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql));
        // 查询数据库后，把数据放入缓存
        await ((_j = (_h = this === null || this === void 0 ? void 0 : this.redisService) === null || _h === void 0 ? void 0 : _h.set) === null || _j === void 0 ? void 0 : _j.call(_h, key, JSON.stringify(data)));
        // 返回数据
        return data;
    }
    /**
     * 删除通知消息
     * @param ids - 通知消息ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = NoticeService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用父类的delBase方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新通知消息
     * @param obj - 通知消息对象
     * @returns 更新后的通知消息对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = "";
        // 删除redis缓存
        const key = (NoticeService_1 === null || NoticeService_1 === void 0 ? void 0 : NoticeService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, NoticeService_1 === null || NoticeService_1 === void 0 ? void 0 : NoticeService_1.TABLE_NAME, [{ label: "title", value: obj === null || obj === void 0 ? void 0 : obj.title, text: "标题" }], obj === null || obj === void 0 ? void 0 : obj.id));
        if (uniqueText) {
            // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + "已存在，操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        // 新增数据，主键id的随机字符串值，由后端typeorm提供
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, NoticeService_1 === null || NoticeService_1 === void 0 ? void 0 : NoticeService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, NoticeService_1 === null || NoticeService_1 === void 0 ? void 0 : NoticeService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
NoticeService.TABLE_NAME = "notice";
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], NoticeService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Notice_1.Notice),
    __metadata("design:type", typeorm_1.Repository)
], NoticeService.prototype, "repository", void 0);
NoticeService = NoticeService_1 = __decorate([
    (0, decorator_1.Provide)()
], NoticeService);
exports.NoticeService = NoticeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9ub3RpY2Uvbm90aWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxtREFBdUQ7QUFDdkQsaUVBQTZEO0FBRzdELHFDQUFxQztBQUNyQywrQ0FBc0Q7QUFDdEQsZ0RBQTZDO0FBRTdDLDJEQUF3RDtBQUN4RCxxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELDRCQUE2QjtBQUU3Qjs7O0dBR0c7QUFFSCxJQUFhLGFBQWEscUJBQTFCLE1BQWEsYUFBYyxTQUFRLDBCQUFXO0lBQTlDOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSy9CLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxlQUFhLGFBQWIsZUFBYSx1QkFBYixlQUFhLENBQUUsVUFBVSxLQUFLLENBQUM7UUFFMUQsc0JBQXNCO1FBQ2QsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNO0dBQ3pDLENBQUM7UUFFRix3QkFBd0I7UUFFaEIsZUFBVSxHQUF1QixJQUFJLENBQUM7UUFFOUMsUUFBUTtRQUNBLFFBQUcsR0FBRyxFQUFFLENBQUM7SUFpTW5CLENBQUM7SUEvTEM7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQ2YsS0FBSyxHQUFHLEVBQUUsRUFDVixNQUFjLEVBQ2QsUUFBa0IsRUFDbEIsSUFBVTs7UUFFVixXQUFXO1FBQ1gsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsQ0FBQyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRyxDQUFDLENBQUM7UUFFeEIsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVTtRQUU5QixrQkFBa0I7UUFDbEIsUUFBUSxJQUFJLE1BQUEsUUFBUSxh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