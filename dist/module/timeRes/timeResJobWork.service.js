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
var TimeResJobWorkService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeResJobWorkService = void 0;
// 导入依赖项
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const TimeResJobWork_1 = require("../../entity/TimeResJobWork");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const timeResJob_service_1 = require("./timeResJob.service");
const _ = require("lodash");
/**
 * 时间资源工作服务类
 * 提供时间资源工作的分页查询、根据ID查询、删除、预约等功能
 */
let TimeResJobWorkService = TimeResJobWorkService_1 = class TimeResJobWorkService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${TimeResJobWorkService_1 === null || TimeResJobWorkService_1 === void 0 ? void 0 : TimeResJobWorkService_1.TABLE_NAME} t LEFT JOIN time_res_job j ON (t.time_res_job_id = j.id) `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  , (DATE_format?.(j.time_start, '%H:%i') ) AS time_start_str -- 预定开始时间

  , (DATE_format?.(j.time_end, '%H:%i') ) AS time_end_str -- 预定结束时间

  , (DATE_format?.(j.time_end, '%Y-%m-%d') ) AS day -- 预定日期

  , (DATE_format?.(j.create_date, '%m-%d %H:%i') ) AS create_date_str -- 预定操作时间

  , j.content AS content

  , ( SELECT username FROM buyer WHERE id = ( SELECT buyer_id FROM shop_buyer WHERE id = ( SELECT user_id FROM time_res WHERE id = ( SELECT time_res_id FROM time_res_job WHERE id = t.time_res_job_id ) ) ) ) AS username -- 信息发布者用户名

  , ( SELECT username FROM buyer WHERE id = ( SELECT buyer_id FROM shop_buyer WHERE id =  t.user_id) ) AS shop_buyer_username -- 买家用户名

     `;
        // 注入TimeResJobWork实体的Repository
        this.repository = null;
        // 注入TimeResJobService
        this.timeResJobService = null;
    }
    /**
     * 分页查询时间资源工作
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
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        // 处理前端的表格中筛选需求
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize',]))) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
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
     * 根据ID查询时间资源工作
     * @param id - 时间资源工作ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = TimeResJobWorkService_1.TABLE_NAME + `:${id}`;
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
     * 删除时间资源工作
     * @param ids - 时间资源工作ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = TimeResJobWorkService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 预约时间资源工作
     * @param obj - 时间资源工作对象
     * @returns 预约后的时间资源工作对象
     */
    async work(obj) {
        // 对某资源的某一时间段，进行预约
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        obj = {
            ...obj,
            timeResJobId: obj === null || obj === void 0 ? void 0 : obj.id,
        };
        let log = '', uniqueWhere = { timeResJobId: obj.timeResJobId };
        obj === null || obj === void 0 ? true : delete obj.id;
        if (obj === null || obj === void 0 ? void 0 : obj.id) {
            uniqueWhere.id = (0, typeorm_1.Not)(obj === null || obj === void 0 ? void 0 : obj.id); // 如果是修改数据，则判断是否重复时，需要把原记录筛选掉
        }
        const count = await ((_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.count({ where: uniqueWhere }));
        const timeResJob = await ((_c = this === null || this === void 0 ? void 0 : (_b = this.timeResJobService).getById) === null || _c === void 0 ? void 0 : _c.call(_b, obj.timeResJobId));
        const quota = timeResJob.quota;
        if (timeResJob.userId === obj.userId) {
            log = "您无法预定您自己发布的工作安排，操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        if (count >= quota) {
            log = "此资源已到达最大预约数量，操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_g = (_f = this === null || this === void 0 ? void 0 : this.logger) === null || _f === void 0 ? void 0 : _f.error) === null || _g === void 0 ? void 0 : _g.call(_f, log, zero0Error);
            throw zero0Error;
        }
        uniqueWhere = {
            ...uniqueWhere,
            userId: obj.userId,
        };
        const countUser = await ((_h = this === null || this === void 0 ? void 0 : this.repository) === null || _h === void 0 ? void 0 : _h.count({ where: uniqueWhere }));
        if (countUser > 0) {
            log = "您已预约过，无需再次预约，操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.error) === null || _k === void 0 ? void 0 : _k.call(_j, log, zero0Error);
            throw zero0Error;
        }
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, TimeResJobWorkService_1 === null || TimeResJobWorkService_1 === void 0 ? void 0 : TimeResJobWorkService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return obj;
        }
        let old = await ((_q = (_p = this === null || this === void 0 ? void 0 : this.repository) === null || _p === void 0 ? void 0 : _p.findOneById) === null || _q === void 0 ? void 0 : _q.call(_p, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_s = (_r = this === null || this === void 0 ? void 0 : this.repository) === null || _r === void 0 ? void 0 : _r.save) === null || _s === void 0 ? void 0 : _s.call(_r, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_t = super.sortOrder) === null || _t === void 0 ? void 0 : _t.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, TimeResJobWorkService_1 === null || TimeResJobWorkService_1 === void 0 ? void 0 : TimeResJobWorkService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        await ((_v = (_u = this === null || this === void 0 ? void 0 : this.repository) === null || _u === void 0 ? void 0 : _u.save) === null || _v === void 0 ? void 0 : _v.call(_u, old)); // 修改数据
    }
};
// 查询的数据库表名称
TimeResJobWorkService.TABLE_NAME = 'time_res_job_work';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], TimeResJobWorkService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(TimeResJobWork_1.TimeResJobWork),
    __metadata("design:type", typeorm_1.Repository)
], TimeResJobWorkService.prototype, "repository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", timeResJob_service_1.TimeResJobService)
], TimeResJobWorkService.prototype, "timeResJobService", void 0);
TimeResJobWorkService = TimeResJobWorkService_1 = __decorate([
    (0, decorator_1.Provide)()
], TimeResJobWorkService);
exports.TimeResJobWorkService = TimeResJobWorkService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVJlc0pvYldvcmsuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3RpbWVSZXMvdGltZVJlc0pvYldvcmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSLG1EQUE4RDtBQUM5RCxpRUFBNkQ7QUFHN0QscUNBQTBDO0FBQzFDLCtDQUFzRDtBQUV0RCxnRUFBNkQ7QUFFN0QsMkRBQXdEO0FBRXhELHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsNkRBQXlEO0FBQ3pELDRCQUE2QjtBQUU3Qjs7O0dBR0c7QUFFSCxJQUFhLHFCQUFxQiw2QkFBbEMsTUFBYSxxQkFBc0IsU0FBUSwwQkFBVztJQUF0RDs7UUFDRSxRQUFRO1FBRUEsV0FBTSxHQUFZLElBQUksQ0FBQztRQUsvQixlQUFlO1FBQ1AsWUFBTyxHQUFHLFNBQVMsdUJBQXFCLGFBQXJCLHVCQUFxQix1QkFBckIsdUJBQXFCLENBQUUsVUFBVSw0REFBNEQsQ0FBQztRQUV6SCxzQkFBc0I7UUFDZCxjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7OztNQWV0QyxDQUFDO1FBRUwsZ0NBQWdDO1FBRXhCLGVBQVUsR0FBK0IsSUFBSSxDQUFDO1FBRXRELHNCQUFzQjtRQUVkLHNCQUFpQixHQUFzQixJQUFJLENBQUM7SUErT3RELENBQUM7SUE3T0M7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQ2YsS0FBSyxHQUFHLEVBQUUsRUFBRSxNQUFXLEVBQ3ZCLFFBQWtCLEVBQ2xCLElBQVU7UUFFVixXQUFXOztRQUVYLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQSxDQUFDLFVBQVU7UUFFN0Isa0JBQWtCO1FBQ2xCLFFBQVEsSUFBSSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJ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