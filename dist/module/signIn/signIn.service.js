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
var SignInService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const SignIn_1 = require("../../entity/SignIn");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
/**
 * 签到服务类
 * 提供签到的分页查询、根据ID查询、删除、签到等功能
 */
let SignInService = SignInService_1 = class SignInService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${SignInService_1 === null || SignInService_1 === void 0 ? void 0 : SignInService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql} `;
        // 注入SignIn实体的Repository
        this.repository = null;
        // 日志信息
        this.log = '';
    }
    /**
     * 分页查询签到记录
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(query = '', params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        console === null || console === void 0 ? void 0 : console.log(this === null || this === void 0 ? void 0 : this.log);
        let whereSql = ' '; // 查询条件字符串
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        // 处理前端的表格中筛选需求
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize',]))) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
        // TODO 将分页列表查询的多条返回结果的每一条的详情信息放入redis
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
     * 根据ID查询签到记录
     * @param id - 签到记录ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = SignInService_1.TABLE_NAME + `:${id}`;
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
     * 删除签到记录
     * @param ids - 签到记录ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = SignInService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 签到
     * @param obj - 签到对象
     * @returns 签到后的签到对象
     */
    async signIn(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = '';
        // 判断今天是否已签到过，如已签到过，则抛出异常
        // 删除redis缓存
        const key = (SignInService_1 === null || SignInService_1 === void 0 ? void 0 : SignInService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, SignInService_1 === null || SignInService_1 === void 0 ? void 0 : SignInService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id));
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, SignInService_1 === null || SignInService_1 === void 0 ? void 0 : SignInService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, SignInService_1 === null || SignInService_1 === void 0 ? void 0 : SignInService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
SignInService.TABLE_NAME = 'sign_in';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], SignInService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(SignIn_1.SignIn),
    __metadata("design:type", typeorm_1.Repository)
], SignInService.prototype, "repository", void 0);
SignInService = SignInService_1 = __decorate([
    (0, decorator_1.Provide)()
], SignInService);
exports.SignInService = SignInService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbkluLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9zaWduSW4vc2lnbkluLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCxpRUFBNkQ7QUFHN0QscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUN0RCxnREFBNkM7QUFJN0MsMkRBQXdEO0FBRXhELHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsNEJBQTZCO0FBRTdCOzs7R0FHRztBQUVILElBQWEsYUFBYSxxQkFBMUIsTUFBYSxhQUFjLFNBQVEsMEJBQVc7SUFBOUM7O1FBQ0UsUUFBUTtRQUVBLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFLL0IsZUFBZTtRQUNQLFlBQU8sR0FBRyxTQUFTLGVBQWEsYUFBYixlQUFhLHVCQUFiLGVBQWEsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUUxRCxzQkFBc0I7UUFDZCxjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBRTlDLHdCQUF3QjtRQUVoQixlQUFVLEdBQXVCLElBQUksQ0FBQztRQUU5QyxPQUFPO1FBQ0MsUUFBRyxHQUFHLEVBQUUsQ0FBQztJQTZMbkIsQ0FBQztJQTNMQzs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixLQUFLLEdBQUcsRUFBRSxFQUFFLE1BQWMsRUFDMUIsUUFBa0IsRUFDbEIsSUFBVTtRQUVWLFdBQVc7O1FBRVgsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsQ0FBQyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRyxDQUFDLENBQUM7UUFFeEIsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVTtRQUM5QixrQkFBa0I7UUFDbEIsUUFBUSxJQUFJLE1BQUEsUUFBUSxhQUFSLFFBQVEs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