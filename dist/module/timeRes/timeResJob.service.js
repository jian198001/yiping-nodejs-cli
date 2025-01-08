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
var TimeResJobService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeResJobService = void 0;
// 导入依赖项
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const TimeResJob_1 = require("../../entity/TimeResJob");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const TimeRes_1 = require("../../entity/TimeRes");
const dayjs = require("dayjs");
const ShopBuyer_1 = require("../../entity/ShopBuyer");
const shopBuyer_service_1 = require("../trade/shopBuyer.service");
const _ = require("lodash");
/**
 * 时间资源任务服务类
 * 提供时间资源任务的分页查询、根据ID查询、删除、更新等功能
 */
let TimeResJobService = TimeResJobService_1 = class TimeResJobService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${TimeResJobService_1 === null || TimeResJobService_1 === void 0 ? void 0 : TimeResJobService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  

  , (DATE_format?.(t.time_start, '%H:%i') ) AS time_start_str -- 预定开始时间

  , (DATE_format?.(t.time_end, '%H:%i') ) AS time_end_str -- 预定结束时间
  
  , (DATE_format?.(t.time_end, '%Y-%m-%d') ) AS day -- 预定日期

  , IFNULL(( SELECT COUNT(*) FROM time_res_job_work WHERE time_res_job_work.time_res_job_id = t.id ), 0) AS work_count -- 已预定数

  , ( CASE WHEN t.time_end < NOW() THEN 1 ELSE 0 END ) AS before_now -- 是否已过期

  , ( CASE WHEN ( SELECT COUNT(*) FROM time_res_job_work WHERE time_res_job_work.time_res_job_id = t.id ) < t.quota THEN 1 ELSE 0 END ) AS work -- 是否已达到最大预定数

  , ( SELECT user_id FROM time_res WHERE id = t.time_res_id ) AS user_id 

     `;
        // 注入TimeResJob实体的Repository
        this.repository = null;
        // 注入TimeRes实体的Repository
        this.timeJobRepository = null;
        // 注入ShopBuyer实体的Repository
        this.shopBuyerRepository = null;
        // 注入ShopBuyerService
        this.shopBuyerService = null;
    }
    /**
     * 分页查询时间资源任务
     * @param sellerId - 预约信息发布者id
     * @param user - 用户类型
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(sellerId, // 预约信息发布者id,发布者只能看到自己发布的信息,消费者只能看到指定发布者发布的信息
    user, // 用户类型，买家只可以看到可预约的时间段，无法看到已过期的时间段，卖家(排班生产者)可以看到全部时间段
    query = "", params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e;
        let whereSql = " "; // 查询条件字符串
        if (user === "buyer") {
            whereSql += ` AND t.time_end > NOW() `;
        }
        whereSql += ` AND t.time_res_id IN ( SELECT id FROM time_res WHERE time_res.user_id = '${sellerId}' ) `;
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ["name"], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue); // 处理前端的搜索字符串的搜索需求
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        whereSql += (_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters); // 处理前端的表格中筛选需求
        whereSql += (_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, query);
        // 执行查询语句并返回page对象结果
        const data = await ((_d = super.pageBase) === null || _d === void 0 ? void 0 : _d.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
        if ((page === null || page === void 0 ? void 0 : page.pageSize) > 0) {
            return data;
        }
        if ((page === null || page === void 0 ? void 0 : page.pageSize) < 1) {
            // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
            return (_e = _ === null || _ === void 0 ? void 0 : _.keyBy) === null || _e === void 0 ? void 0 : _e.call(_, data === null || data === void 0 ? void 0 : data.list, 'value');
        }
    }
    /**
     * 根据ID查询时间资源任务
     * @param id - 时间资源任务ID
     * @returns 查询结果
     */
    async getById(id = "") {
        // 根据id查询一条数据
        var _a;
        const data = await ((_a = super.getByIdBase) === null || _a === void 0 ? void 0 : _a.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql));
        data.works = [];
        return data;
    }
    /**
     * 删除时间资源任务
     * @param ids - 时间资源任务ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = TimeResJobService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新时间资源任务
     * @param obj - 时间资源任务对象
     * @param timeStartStr - 开始时间字符串
     * @param timeEndStr - 结束时间字符串
     * @param day - 日期字符串
     * @param userId - 用户ID
     * @returns 更新后的时间资源任务
     */
    async update(obj, timeStartStr = "", timeEndStr = "", day = "", userId = "") {
        // 排班信息进行新增或修改
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        if (!userId) {
            userId = "1";
        }
        let log = "";
        timeStartStr = day + " " + timeStartStr + ":00";
        timeEndStr = day + " " + timeEndStr + ":00";
        obj.timeStart = dayjs(timeStartStr).toDate();
        obj.timeEnd = dayjs(timeEndStr).toDate();
        // 如果此用户的对应资源不存在，则创建资源
        const timeRes = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.timeJobRepository) === null || _a === void 0 ? void 0 : _a.findOneBy) === null || _b === void 0 ? void 0 : _b.call(_a, {
            userId: userId,
        }));
        if (!timeRes) {
            const timeResObj = new TimeRes_1.TimeRes();
            timeResObj.userId = userId;
            await ((_d = (_c = this === null || this === void 0 ? void 0 : this.timeJobRepository) === null || _c === void 0 ? void 0 : _c.save) === null || _d === void 0 ? void 0 : _d.call(_c, timeResObj));
            obj.timeResId = timeResObj.id;
        }
        else {
            obj.timeResId = timeRes.id;
        }
        // 无法新增或修改结束时间已过时的排班
        if (dayjs(timeStartStr).isAfter(dayjs(timeEndStr))) {
            log = "开始时间晚于结束时间，操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        if (dayjs().isAfter(dayjs(timeEndStr))) {
            log = "无法新增或修改结束时间已过时的排班，操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.call(_g, log, zero0Error);
            throw zero0Error;
        }
        // 新增或修改排班信息时，查看同时段是否已有排班信息存在
        let sql = ` SELECT COUNT(*) AS count_0 FROM time_res_job t WHERE 1>0  ` +
            sqlUtils.intersectionTime(timeStartStr, timeEndStr, "t.time_start", "t.time_end");
        sql += ` AND t.time_res_id = '${obj.timeResId}' `;
        if (obj === null || obj === void 0 ? void 0 : obj.id) {
            sql += ` AND t.id != '${obj === null || obj === void 0 ? void 0 : obj.id}' `; // 如果是修改数据，则判断是否重复时，需要把原记录筛选掉
        }
        const results = await ((_j = super.query) === null || _j === void 0 ? void 0 : _j.call(this, sql));
        const count = (_k = results === null || results === void 0 ? void 0 : results[0]) === null || _k === void 0 ? void 0 : _k.count_0;
        // 获取同时段可预约最大数量
        if (count > 0) {
            log = "同时段排班信息已存在，操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_m = (_l = this === null || this === void 0 ? void 0 : this.logger) === null || _l === void 0 ? void 0 : _l.error) === null || _m === void 0 ? void 0 : _m.call(_l, log, zero0Error);
            throw zero0Error;
        }
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_p = (_o = this === null || this === void 0 ? void 0 : this.repository) === null || _o === void 0 ? void 0 : _o.save) === null || _p === void 0 ? void 0 : _p.call(_o, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_q = super.sortOrder) === null || _q === void 0 ? void 0 : _q.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, TimeResJobService_1 === null || TimeResJobService_1 === void 0 ? void 0 : TimeResJobService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return obj;
        }
        let old = await ((_s = (_r = this === null || this === void 0 ? void 0 : this.repository) === null || _r === void 0 ? void 0 : _r.findOneById) === null || _s === void 0 ? void 0 : _s.call(_r, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_u = (_t = this === null || this === void 0 ? void 0 : this.repository) === null || _t === void 0 ? void 0 : _t.save) === null || _u === void 0 ? void 0 : _u.call(_t, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_v = super.sortOrder) === null || _v === void 0 ? void 0 : _v.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, TimeResJobService_1 === null || TimeResJobService_1 === void 0 ? void 0 : TimeResJobService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return obj;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        await ((_x = (_w = this === null || this === void 0 ? void 0 : this.repository) === null || _w === void 0 ? void 0 : _w.save) === null || _x === void 0 ? void 0 : _x.call(_w, old)); // 修改数据
        return old;
    }
    async updateScene(username, shopBuyerId) {
        // TODO 根据预约信息发布者用户名,找到对应的发布者ID
        var _a, _b;
        const seller = await (this === null || this === void 0 ? void 0 : this.shopBuyerService.findByUsername(username, '1'));
        let shopBuyer = await ((_a = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _a === void 0 ? void 0 : _a.findOneById(shopBuyerId));
        shopBuyer.scene = seller === null || seller === void 0 ? void 0 : seller.id;
        await ((_b = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _b === void 0 ? void 0 : _b.save(shopBuyer));
        return seller;
    }
};
// 查询的数据库表名称
TimeResJobService.TABLE_NAME = "time_res_job";
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], TimeResJobService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(TimeResJob_1.TimeResJob),
    __metadata("design:type", typeorm_1.Repository)
], TimeResJobService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(TimeRes_1.TimeRes),
    __metadata("design:type", typeorm_1.Repository)
], TimeResJobService.prototype, "timeJobRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(ShopBuyer_1.ShopBuyer),
    __metadata("design:type", typeorm_1.Repository)
], TimeResJobService.prototype, "shopBuyerRepository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", shopBuyer_service_1.ShopBuyerService)
], TimeResJobService.prototype, "shopBuyerService", void 0);
TimeResJobService = TimeResJobService_1 = __decorate([
    (0, decorator_1.Provide)()
], TimeResJobService);
exports.TimeResJobService = TimeResJobService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVJlc0pvYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvdGltZVJlcy90aW1lUmVzSm9iLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDUixtREFBOEQ7QUFDOUQsaUVBQTZEO0FBRzdELHFDQUFxQztBQUNyQywrQ0FBc0Q7QUFFdEQsd0RBQXFEO0FBRXJELDJEQUF3RDtBQUV4RCxxREFBcUQ7QUFDckQsa0RBQStDO0FBQy9DLCtCQUFnQztBQUNoQyxzREFBbUQ7QUFDbkQsa0VBQThEO0FBQzlELDRCQUE2QjtBQUU3Qjs7O0dBR0c7QUFFSCxJQUFhLGlCQUFpQix5QkFBOUIsTUFBYSxpQkFBa0IsU0FBUSwwQkFBVztJQUFsRDs7UUFDRSxRQUFRO1FBRUEsV0FBTSxHQUFZLElBQUksQ0FBQztRQUsvQixlQUFlO1FBQ1AsWUFBTyxHQUFHLFNBQVMsbUJBQWlCLGFBQWpCLG1CQUFpQix1QkFBakIsbUJBQWlCLENBQUUsVUFBVSxLQUFLLENBQUM7UUFDL0Qsc0JBQXNCO1FBQ2IsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7O01BZ0J0QyxDQUFDO1FBRUwsNEJBQTRCO1FBRXBCLGVBQVUsR0FBMkIsSUFBSSxDQUFDO1FBRWxELHlCQUF5QjtRQUVqQixzQkFBaUIsR0FBd0IsSUFBSSxDQUFDO1FBRXRELDJCQUEyQjtRQUVuQix3QkFBbUIsR0FBMEIsSUFBSSxDQUFDO1FBRTFELHFCQUFxQjtRQUViLHFCQUFnQixHQUFxQixJQUFJLENBQUM7SUFzUXBELENBQUM7SUFwUUM7Ozs7Ozs7OztPQVNHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixRQUFnQixFQUFFLDZDQUE2QztJQUMvRCxJQUFZLEVBQUUscURBQXFEO0lBQ25FLEtBQUssR0FBRyxFQUFFLEVBQUUsTUFBVyxFQUN2QixRQUFrQixFQUNsQixJQUFVO1FBRVYsV0FBVzs7UUFFWCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVO1FBRTlCLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUNwQixRQUFRLElBQUksMEJBQTBCLENBQUM7U0FDeEM7UUFFRCxRQUFRLElBQUksNkVBQTZFLFFBQVEsTUFBTSxDQUFBO1FBRXZHLFFBQVEsSUFBSSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLHlEQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsQ0FBRyxDQUFDLENBQUMsa0JBQWtCO1FBQ3ZGLHNEQUFzRDtRQUNsRCxrR0FBa0c7UUFDbEcsK0RBQStEO1FBQy9ELFFBQVEsSUFBSSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxjQUFjLHlEQUFHLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLGVBQWU7UUFDMUUsUUFBUSxJQUFJLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEtBQUsseURBQUcsS0FBSyxDQUFDLENBQUM7UUFDekMsb0JBQW9CO1FBQ2hCLE1BQU0sSUFBSSxHQUFRLE1BQU0sQ0FBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLHFEQUNwQyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsU0FBUyxFQUNmLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLEVBQ2IsUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQ0wsQ0FBQSxDQUFBO1FBQ0csSUFBSSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLElBQUcsQ0FBQyxFQUFFO1lBRXRCLE9BQU8sSUFBSSxDQUFBO1NBRVo7UUFFRCxJQUFJLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsSUFBRyxDQUFDLEVBQUU7WUFDdEIsOEVBQThFO1lBQzlFLE9BQU8sTUFBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsS0FBSyxrREFBRyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBRSxDQUFBO1NBRXhDO0lBRVAsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFO1FBQzFCLGFBQWE7O1FBRWIsTUFBTSxJQUFJLEdBQVEsTUFBTSxDQUFBLE1BQUEsS0FBSyxDQUFDLFdBQVcscURBQUcsRUFBRSxFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxTQUFTLEVBQUUsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sQ0FBQyxDQUFBLENBQUE7UUFFL0UsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7UUFFZixPQUFPLElBQUksQ0FBQTtJQUViLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFhO1FBQzVCLFlBQVk7O1FBRVosS0FBSyxNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUU7WUFDcEIsTUFBTSxHQUFHLEdBQUcsbUJBQWlCLENBQUMsVUFBVSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUM7WUFFcEQsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsWUFBWSwwQ0FBRSxHQUFHLG1EQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUM7U0FDdEM7UUFFRCxzQkFBc0I7UUFDdEIsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsVUFBVSwwQ0FBRSxNQUFNLG1EQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FDakIsR0FBZSxFQUNmLGVBQXVCLEVBQUUsRUFDekIsYUFBcUIsRUFBRSxFQUN2QixNQUFjLEVBQUUsRUFDaEIsU0FBaUIsRUFBRTtRQUVuQixjQUFjO1FBQ2Qsa0JBQWtCOztRQUVsQixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNkO1FBRUQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsWUFBWSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUVoRCxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRTVDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTdDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXpDLHNCQUFzQjtRQUV0QixNQUFNLE9BQU8sR0FBUSxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxpQkFBaUIsMENBQUUsU0FBUyxtREFBRztZQUM5RCxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQSxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sVUFBVSxHQUFZLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBRTFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBRTNCLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGlCQUFpQiwwQ0FBRSxJQUFJLG1EQUFHLFVBQVUsQ0FBQyxDQUFBLENBQUM7WUFFbEQsR0FBRyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDO1NBQy9CO2FBQU07WUFDTCxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDNUI7UUFFRCxvQkFBb0I7UUFFcEIsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFO1lBQ2xELEdBQUcsR0FBRyxpQkFBaUIsQ0FBQztZQUV4QixNQUFNLFVBQVUsR0FBZSxJQUFJLHVCQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNELE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxLQUFLLG1EQUFHLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2QyxNQUFNLFVBQVUsQ0FBQztTQUNsQjtRQUVELElBQUksS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFO1lBQ3RDLEdBQUcsR0FBRyx3QkFBd0IsQ0FBQztZQUUvQixNQUFNLFVBQVUsR0FBZSxJQUFJLHVCQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNELE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxLQUFLLG1EQUFHLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2QyxNQUFNLFVBQVUsQ0FBQztTQUNsQjtRQUVELDZCQUE2QjtRQUU3QixJQUFJLEdBQUcsR0FDTCw2REFBNkQ7WUFDN0QsUUFBUSxDQUFDLGdCQUFnQixDQUN2QixZQUFZLEVBQ1osVUFBVSxFQUNWLGNBQWMsRUFDZCxZQUFZLENBQ2IsQ0FBQztRQUVKLEdBQUcsSUFBSSx5QkFBeUIsR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDO1FBRWxELElBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEVBQUUsRUFBRTtZQUNYLEdBQUcsSUFBSSxpQkFBaUIsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsNkJBQTZCO1NBQ25FO1FBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFBLE1BQUEsS0FBSyxDQUFDLEtBQUsscURBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQztRQUV6QyxNQUFNLEtBQUssR0FBVyxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRyxDQUFDLENBQUMsMENBQUUsT0FBTyxDQUFDO1FBRTVDLGVBQWU7UUFFZixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDYixHQUFHLEdBQUcsaUJBQWlCLENBQUM7WUFFeEIsTUFBTSxVQUFVLEdBQWUsSUFBSSx1QkFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMzRCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsS0FBSyxtREFBRyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDdkMsTUFBTSxVQUFVLENBQUM7U0FDbEI7UUFDTCwyRUFBMkU7UUFDdkUsSUFBSSxDQUFDLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEVBQUUsQ0FBQSxFQUFFO1lBQ1osZ0NBQWdDO1lBQ2hDLEdBQUcsR0FBRywrQkFBK0IsQ0FBQztZQUUvQixHQUFHLGFBQUgsR0FBRyw0QkFBSCxHQUFHLENBQUUsRUFBRSxDQUFDO1lBRWYsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsVUFBVSwwQ0FBRSxJQUFJLG1EQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxnQkFBZ0I7WUFFckQsSUFBSSxDQUFDLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFFBQVEsQ0FBQSxFQUFFO2dCQUNsQixNQUFNLENBQUEsTUFBQSxLQUFLLENBQUMsU0FBUyxxREFDbkIsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEVBQUUsRUFDUCxJQUFJLEVBQ0osSUFBSSxFQUNKLG1CQUFpQixhQUFqQixtQkFBaUIsdUJBQWpCLG1CQUFpQixDQUFFLFVBQVUsQ0FDOUIsQ0FBQSxDQUFDLENBQUMsMkJBQTJCO2FBQy9CO1lBRUQsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELElBQUksR0FBRyxHQUFlLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsV0FBVyxtREFBRyxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLCtDQUErQztRQUVySCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsMkJBQTJCO1lBRTNCLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsSUFBSSxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsZ0JBQWdCO1lBRXJELElBQUksQ0FBQyxDQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxRQUFRLENBQUEsRUFBRTtnQkFDbEIsTUFBTSxDQUFBLE1BQUEsS0FBSyxDQUFDLFNBQVMscURBQ25CLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxFQUFFLEVBQ1AsSUFBSSxFQUNKLElBQUksRUFDSixtQkFBaUIsYUFBakIsbUJBQWlCLHVCQUFqQixtQkFBaUIsQ0FBRSxVQUFVLENBQzlCLENBQUEsQ0FBQyxDQUFDLDJCQUEyQjthQUMvQjtZQUVELE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFFTSxHQUFHLGFBQUgsR0FBRyw0QkFBSCxHQUFHLENBQUUsRUFBRSxDQUFDO1FBRWYsR0FBRyxHQUFHO1lBQ0osR0FBRyxHQUFHO1lBRU4sR0FBRyxHQUFHO1NBQ1AsQ0FBQztRQUVGLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsSUFBSSxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsT0FBTztRQUU1QyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUN0QixRQUFnQixFQUNoQixXQUFtQjtRQUduQiwrQkFBK0I7O1FBRS9CLE1BQU0sTUFBTSxHQUFPLE1BQU0sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQSxDQUFBO1FBRTdFLElBQUksU0FBUyxHQUFRLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxtQkFBbUIsMENBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUE7UUFFOUUsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsRUFBRSxDQUFBO1FBRTVCLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxtQkFBbUIsMENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUE7UUFFaEQsT0FBTyxNQUFNLENBQUM7SUFFaEIsQ0FBQztDQUVGLENBQUE7QUE1U0MsWUFBWTtBQUNHLDRCQUFVLEdBQUcsY0FBZSxDQUFBO0FBSDNDO0lBREMsSUFBQSxrQkFBTSxHQUFFOztpREFDc0I7QUE0Qi9CO0lBREMsSUFBQSwyQkFBaUIsRUFBQyx1QkFBVSxDQUFDOzhCQUNWLG9CQUFVO3FEQUFvQjtBQUlsRDtJQURDLElBQUEsMkJBQWlCLEVBQUMsaUJBQU8sQ0FBQzs4QkFDQSxvQkFBVTs0REFBaUI7QUFJdEQ7SUFEQyxJQUFBLDJCQUFpQixFQUFDLHFCQUFTLENBQUM7OEJBQ0Esb0JBQVU7OERBQW1CO0FBSTFEO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNpQixvQ0FBZ0I7MkRBQVE7QUEzQ3ZDLGlCQUFpQjtJQUQ3QixJQUFBLG1CQUFPLEdBQUU7R0FDRyxpQkFBaUIsQ0FpVDdCO0FBalRZLDhDQUFpQiJ9