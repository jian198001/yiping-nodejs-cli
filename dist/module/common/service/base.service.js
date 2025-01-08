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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const mysql_1 = require("../dao/mysql");
const Page_1 = require("../model/Page");
const ReqParam_1 = require("../model/ReqParam");
const _ = require("lodash");
const redis_1 = require("@midwayjs/redis");
const sqlUtils = require("../utils/sqlUtils"), arrayUtils = require("../utils/arrayUtils"), objUtils = require("../utils/objUtils"), pageUtils = require("../utils/pageUtils");
let BaseService = class BaseService {
    constructor() {
        this.mysqlConf = null;
    }
    /**
     * 分页查询基础方法
     *
     * @param selectSql - 查询的字段
     * @param fromSql - 查询的表
     * @param whereSql - 查询的条件
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    async pageBase(selectSql, fromSql, whereSql = "", reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (!page) {
            page = new Page_1.Page();
        }
        // 构造查询总条数的SQL
        const sqlCount = (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.selectCount) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, fromSql, whereSql);
        // 执行查询总条数的SQL
        const resultCount = await ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.call(this, sqlCount));
        // 获取查询结果的第一条数据
        const head = (_c = _ === null || _ === void 0 ? void 0 : _.head) === null || _c === void 0 ? void 0 : _c.call(_, resultCount);
        // 如果查询结果为空，直接返回分页对象
        if ((head === null || head === void 0 ? void 0 : head.count_0) < 1) {
            return page;
        }
        // 设置分页对象的总条数
        page.total = head === null || head === void 0 ? void 0 : head.count_0;
        if (!reqParam) {
            reqParam = new ReqParam_1.ReqParam();
        }
        // 设置默认排序
        reqParam = (_d = pageUtils === null || pageUtils === void 0 ? void 0 : pageUtils.defaultSort) === null || _d === void 0 ? void 0 : _d.call(pageUtils, reqParam);
        if (!page) {
            page = new Page_1.Page();
        }
        // 构造分页查询的SQL
        const sql = (_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.selectPage) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, selectSql, fromSql, whereSql, (_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.orderBy) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.sortName, "t", reqParam === null || reqParam === void 0 ? void 0 : reqParam.sortOrder), (_g = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.limit) === null || _g === void 0 ? void 0 : _g.call(sqlUtils, (_h = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.getStart) === null || _h === void 0 ? void 0 : _h.call(sqlUtils, page === null || page === void 0 ? void 0 : page.pageNum, page === null || page === void 0 ? void 0 : page.pageSize), page === null || page === void 0 ? void 0 : page.pageSize, page === null || page === void 0 ? void 0 : page.total));
        console.log(sql);
        // 执行分页查询的SQL
        const result = await ((_j = this === null || this === void 0 ? void 0 : this.query) === null || _j === void 0 ? void 0 : _j.call(this, sql));
        if (result) {
            // 将查询结果的字段名转换为驼峰命名
            page.list = (_k = arrayUtils === null || arrayUtils === void 0 ? void 0 : arrayUtils.camelCase) === null || _k === void 0 ? void 0 : _k.call(arrayUtils, result);
        }
        return page;
    }
    /**
     * 根据ID查询基础方法
     *
     * @param id - 查询的ID
     * @param selectSql - 查询的字段
     * @param fromSql - 查询的表
     * @returns 返回查询结果
     */
    async getByIdBase(id, selectSql, fromSql) {
        var _a, _b, _c, _d, _e;
        // 构造查询条件
        const whereSql = (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.where) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, { id: id }, "t");
        // 构造查询的SQL
        const sql = (_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.selectPage) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, selectSql, fromSql, whereSql);
        // 执行查询的SQL
        const result = await ((_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.call(this, sql));
        if (!result) {
            return null;
        }
        // 将查询结果的字段名转换为驼峰命名
        return (_d = objUtils === null || objUtils === void 0 ? void 0 : objUtils.camelCase) === null || _d === void 0 ? void 0 : _d.call(objUtils, (_e = _ === null || _ === void 0 ? void 0 : _.head) === null || _e === void 0 ? void 0 : _e.call(_, result));
    }
    /**
     * 查询数组基础方法
     *
     * @param reqParam - 请求参数
     * @param selectSql - 查询的字段
     * @param fromSql - 查询的表
     * @param whereSql - 查询的条件
     * @returns 返回查询结果数组
     */
    async arrBase(reqParam, selectSql, fromSql, whereSql = " ") {
        var _a, _b, _c, _d;
        if (!reqParam) {
            reqParam = new ReqParam_1.ReqParam();
        }
        // 构造查询的SQL
        const sql = (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.selectPage) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, selectSql, fromSql, whereSql, (_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.orderBy) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.sortName, "t", reqParam === null || reqParam === void 0 ? void 0 : reqParam.sortOrder), " ");
        console.log(sql);
        // 执行查询的SQL
        let result = await ((_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.call(this, sql));
        // 将查询结果的字段名转换为驼峰命名
        result = (_d = arrayUtils === null || arrayUtils === void 0 ? void 0 : arrayUtils.camelCase) === null || _d === void 0 ? void 0 : _d.call(arrayUtils, result);
        return result;
    }
    /**
     * 查询基础方法
     *
     * @param sql - 查询的SQL
     * @returns 返回查询结果数组
     */
    async query(sql) {
        var _a;
        // 执行查询的SQL
        let result = await (mysql_1.query === null || mysql_1.query === void 0 ? void 0 : (0, mysql_1.query)(sql, this === null || this === void 0 ? void 0 : this.mysqlConf));
        if (!result || result.length < 1) {
            return result;
        }
        // 将查询结果的字段名转换为驼峰命名
        result = (_a = arrayUtils === null || arrayUtils === void 0 ? void 0 : arrayUtils.camelCase) === null || _a === void 0 ? void 0 : _a.call(arrayUtils, result);
        return result;
    }
    /**
     * 排序基础方法
     *
     * @param id - 排序的ID
     * @param prevId - 前一个ID
     * @param nextId - 后一个ID
     * @param tableName - 排序的表名
     * @returns 返回排序后的序号
     */
    async sortOrder(id, prevId, nextId, tableName) {
        // 排序
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        let orderNum = 0;
        // 查询当前ID的序号
        const aniesOrderNum = await ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.call(this, ` SELECT t.order_num FROM ${tableName} t WHERE t.id = '${id}' `));
        if (aniesOrderNum) {
            orderNum = (_b = aniesOrderNum === null || aniesOrderNum === void 0 ? void 0 : aniesOrderNum[0]) === null || _b === void 0 ? void 0 : _b.order_num;
        }
        let orderNumPrev = 0;
        let orderNumNext = 0;
        if (!prevId && !nextId) {
            // 新增数据
            // 查询表中的记录数
            const aniesCount = await ((_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.call(this, ` SELECT COUNT(*) AS count_0 FROM ${tableName} `));
            let count = 0;
            if (aniesCount) {
                count = (_d = aniesCount === null || aniesCount === void 0 ? void 0 : aniesCount[0]) === null || _d === void 0 ? void 0 : _d.count_0;
            }
            if (count < 2) {
                // 只有自己这一条新增记录，代表插入的是第一条记录
                orderNum = 1073741823;
                // 更新当前ID的序号
                await ((_e = this === null || this === void 0 ? void 0 : this.query) === null || _e === void 0 ? void 0 : _e.call(this, ` UPDATE ${tableName} SET order_num = ${orderNum} WHERE id = '${id}' `));
                return orderNum;
            }
            else {
                // 表中已有记录，这是在最后插入记录
                // 查询表中的最小序号
                const anies = await ((_f = this === null || this === void 0 ? void 0 : this.query) === null || _f === void 0 ? void 0 : _f.call(this, ` SELECT MIN(t.order_num) AS min_order_num FROM ${tableName} t `));
                if (anies) {
                    orderNumNext = (_g = anies === null || anies === void 0 ? void 0 : anies[0]) === null || _g === void 0 ? void 0 : _g.min_order_num;
                }
                // 计算当前ID的序号
                orderNum = await ((_h = this === null || this === void 0 ? void 0 : this.getOrderNum) === null || _h === void 0 ? void 0 : _h.call(this, orderNumPrev, orderNumNext));
                // 更新当前ID的序号
                await ((_j = this === null || this === void 0 ? void 0 : this.query) === null || _j === void 0 ? void 0 : _j.call(this, ` UPDATE ${tableName} SET order_num = ${orderNum} WHERE id = '${id}' `));
                return orderNum;
            }
        }
        // 拖拽排序
        if (!prevId) {
            // 查询后一个ID的序号
            const sqlNext = ` SELECT t.order_num FROM ${tableName} t WHERE t.id = '${nextId}' `;
            const aniesNext = await ((_k = this === null || this === void 0 ? void 0 : this.query) === null || _k === void 0 ? void 0 : _k.call(this, sqlNext));
            if (aniesNext) {
                orderNumNext = (_l = aniesNext === null || aniesNext === void 0 ? void 0 : aniesNext[0]) === null || _l === void 0 ? void 0 : _l.order_num;
            }
            // 得到比当前id小
            const sqlMaxOrderNum = ` SELECT MAX(t.order_num) AS max_order_num FROM ${tableName} t WHERE t.order_num < ( SELECT order_num FROM ${tableName} WHERE id = '${id}' ) `;
            const aniesPrev = await ((_m = this === null || this === void 0 ? void 0 : this.query) === null || _m === void 0 ? void 0 : _m.call(this, sqlMaxOrderNum));
            if (aniesPrev) {
                orderNumPrev = (_o = aniesPrev[0]) === null || _o === void 0 ? void 0 : _o.order_num;
            }
            orderNum = await ((_p = this === null || this === void 0 ? void 0 : this.getOrderNum) === null || _p === void 0 ? void 0 : _p.call(this, orderNumPrev, orderNumNext));
            await ((_q = this === null || this === void 0 ? void 0 : this.query) === null || _q === void 0 ? void 0 : _q.call(this, ` UPDATE ${tableName} SET order_num = ${orderNum} WHERE id = '${id}' `));
            return orderNum;
        }
        if (!nextId) {
            const sqlPrev = ` SELECT t.order_num FROM ${tableName} t WHERE t.id = '${prevId}' `;
            const aniesPrev = await ((_r = this === null || this === void 0 ? void 0 : this.query) === null || _r === void 0 ? void 0 : _r.call(this, sqlPrev));
            if (aniesPrev) {
                orderNumPrev = (_s = aniesPrev === null || aniesPrev === void 0 ? void 0 : aniesPrev[0]) === null || _s === void 0 ? void 0 : _s.order_num;
            }
            const sqlMinOrderNum = ` SELECT MIN(order_num) AS min_order_num FROM ${tableName} t WHERE t.order_num > ( SELECT order_num FROM ${tableName} WHERE id = '${id}'  ) `;
            const anies = await ((_t = this === null || this === void 0 ? void 0 : this.query) === null || _t === void 0 ? void 0 : _t.call(this, sqlMinOrderNum));
            if (anies) {
                orderNumNext = (_u = anies === null || anies === void 0 ? void 0 : anies[0]) === null || _u === void 0 ? void 0 : _u.min_order_num;
            }
            if (!orderNumNext || orderNumNext > 2147483646) {
                orderNumNext = 2147483640;
            }
            orderNum = await ((_v = this === null || this === void 0 ? void 0 : this.getOrderNum) === null || _v === void 0 ? void 0 : _v.call(this, orderNumPrev, orderNumNext));
            await ((_w = this === null || this === void 0 ? void 0 : this.query) === null || _w === void 0 ? void 0 : _w.call(this, ` UPDATE ${tableName} SET order_num = ${orderNum} WHERE id = '${id}' `));
            return orderNum;
        }
        // 只有前一条的id，后一条id为空
        // 同时有前一条和后一条的id
        const sqlPrev = ` SELECT t.order_num FROM ${tableName} t WHERE t.id = '${prevId}' `;
        const aniesPrev = await ((_x = this === null || this === void 0 ? void 0 : this.query) === null || _x === void 0 ? void 0 : _x.call(this, sqlPrev));
        if (aniesPrev) {
            orderNumPrev = (_y = aniesPrev === null || aniesPrev === void 0 ? void 0 : aniesPrev[0]) === null || _y === void 0 ? void 0 : _y.order_num;
        }
        const sqlNext = ` SELECT t.order_num FROM ${tableName} t WHERE t.id = '${nextId}' `;
        const aniesNext = await ((_z = this === null || this === void 0 ? void 0 : this.query) === null || _z === void 0 ? void 0 : _z.call(this, sqlNext));
        if (aniesNext) {
            orderNumNext = (_0 = aniesNext === null || aniesNext === void 0 ? void 0 : aniesNext[0]) === null || _0 === void 0 ? void 0 : _0.order_num;
        }
        orderNum = await ((_1 = this === null || this === void 0 ? void 0 : this.getOrderNum) === null || _1 === void 0 ? void 0 : _1.call(this, orderNumPrev, orderNumNext));
        await ((_2 = this === null || this === void 0 ? void 0 : this.query) === null || _2 === void 0 ? void 0 : _2.call(this, ` UPDATE ${tableName} SET order_num = ${orderNum} WHERE id = '${id}' `));
        return orderNum;
    }
    async getOrderNum(orderNumPrev = 0, orderNumNext = 0) {
        var _a, _b, _c;
        let orderNumSub = 0;
        if (orderNumPrev > orderNumNext) {
            orderNumSub = (_a = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _a === void 0 ? void 0 : _a.call(_, orderNumPrev, orderNumNext);
        }
        else {
            orderNumSub = (_b = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _b === void 0 ? void 0 : _b.call(_, orderNumNext, orderNumPrev);
        }
        const orderNumSubDec = _ === null || _ === void 0 ? void 0 : _.floor((_c = _ === null || _ === void 0 ? void 0 : _.divide) === null || _c === void 0 ? void 0 : _c.call(_, orderNumSub, 2));
        if (orderNumPrev > orderNumNext) {
            return orderNumPrev + orderNumSubDec;
        }
        return orderNumNext + orderNumSubDec;
    }
    async getCode(parentCode, tableName, len = 4, columnName = "code") {
        // 在树形结构中，为每一个叶子节点，生成对应的code值
        // 子节点生成的code值，会在父节点的code值基础上，增加固定长度的后缀
        // 方便数据库查询时，根据父节点找到对应的所有子孙节点，并根据子孙节点，快速找到对应的父节点
        var _a, _b, _c, _d;
        let newCodeLen = len;
        if (parentCode) {
            newCodeLen = (parentCode === null || parentCode === void 0 ? void 0 : parentCode.length) + len;
        }
        let sql = ` SELECT MAX(t.${columnName}) AS max_code FROM ${tableName} t WHERE LENGTH(t.${columnName}) = ${newCodeLen} `;
        if (parentCode) {
            sql += ` AND ${columnName} LIKE '${parentCode}%' `;
        }
        const results = await ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.call(this, sql));
        const maxCode = (_b = results === null || results === void 0 ? void 0 : results[0]) === null || _b === void 0 ? void 0 : _b.max_code;
        if (!maxCode) {
            // TODO
            let code = (_c = _ === null || _ === void 0 ? void 0 : _.padStart) === null || _c === void 0 ? void 0 : _c.call(_, "1", len, "0");
            if (parentCode) {
                code = parentCode + code;
            }
            return code;
        }
        // 取得当前parentCode下面的最大值的code的值
        const codeNew = (parseInt === null || parseInt === void 0 ? void 0 : parseInt(maxCode)) + 1;
        // 设置当前的code为parentCode+code+1的值
        const code = (_d = _ === null || _ === void 0 ? void 0 : _.padStart) === null || _d === void 0 ? void 0 : _d.call(_, codeNew + "", newCodeLen, "0");
        return code;
    }
    async unique(tableName = "", columnArr = [], id = "") {
        // 查询列值是否重复
        var _a, _b, _c, _d, _e, _f;
        tableName = (_a = _ === null || _ === void 0 ? void 0 : _.lowerFirst) === null || _a === void 0 ? void 0 : _a.call(_, tableName);
        tableName = (_b = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _b === void 0 ? void 0 : _b.call(_, tableName);
        const sql = ` SELECT COUNT(*) AS count_0 FROM ${tableName} t WHERE 1>0 `;
        if (!columnArr) {
            return null;
        }
        let sqlId = ` `;
        if (id) {
            sqlId = ` AND t.id != '${id}' `;
        }
        for (const element of columnArr) {
            let label = element === null || element === void 0 ? void 0 : element.label;
            const value = element === null || element === void 0 ? void 0 : element.value;
            label = (_c = _ === null || _ === void 0 ? void 0 : _.lowerFirst) === null || _c === void 0 ? void 0 : _c.call(_, label);
            label = (_d = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _d === void 0 ? void 0 : _d.call(_, label);
            const sqlWhere = sql + ` AND t.${label} = '${value}' ` + sqlId;
            const arr = await ((_e = this === null || this === void 0 ? void 0 : this.query) === null || _e === void 0 ? void 0 : _e.call(this, sqlWhere));
            const count = (_f = arr === null || arr === void 0 ? void 0 : arr[0]) === null || _f === void 0 ? void 0 : _f.count_0;
            if (count > 0) {
                return element === null || element === void 0 ? void 0 : element.text;
            }
        }
        return null;
    }
};
BaseService.selSql = ` SELECT t.*
  , t.name AS label
  , t.name AS text
  , t.id AS value `;
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", redis_1.RedisService)
], BaseService.prototype, "redisService", void 0);
__decorate([
    (0, decorator_1.Config)("typeorm"),
    __metadata("design:type", Object)
], BaseService.prototype, "mysqlConf", void 0);
BaseService = __decorate([
    (0, decorator_1.Provide)()
], BaseService);
exports.BaseService = BaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvY29tbW9uL3NlcnZpY2UvYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RDtBQUM5RCx3Q0FBcUM7QUFDckMsd0NBQXFDO0FBQ3JDLGdEQUE2QztBQUU3Qyw0QkFBNkI7QUFDN0IsMkNBQStDO0FBRS9DLE1BQU0sUUFBUSxHQUFRLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxFQUNoRCxVQUFVLEdBQVEsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEVBQ2hELFFBQVEsR0FBUSxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFDNUMsU0FBUyxHQUFRLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBR2pELElBQXNCLFdBQVcsR0FBakMsTUFBc0IsV0FBVztJQUFqQztRQU1VLGNBQVMsR0FBUSxJQUFJLENBQUM7SUF3Y2hDLENBQUM7SUFsY0M7Ozs7Ozs7OztPQVNHO0lBQ08sS0FBSyxDQUFDLFFBQVEsQ0FDdEIsU0FBaUIsRUFDakIsT0FBZSxFQUNmLFFBQVEsR0FBRyxFQUFFLEVBQ2IsUUFBa0IsRUFDbEIsSUFBVTs7UUFFVixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7U0FDbkI7UUFFRCxjQUFjO1FBQ2QsTUFBTSxRQUFRLEdBQVcsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsV0FBVyx5REFBRyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFcEUsY0FBYztRQUNkLE1BQU0sV0FBVyxHQUFRLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLHFEQUFHLFFBQVEsQ0FBQyxDQUFBLENBQUM7UUFFdkQsZUFBZTtRQUNmLE1BQU0s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