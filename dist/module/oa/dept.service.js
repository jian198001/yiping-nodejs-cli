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
var DeptService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeptService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const Dept_1 = require("../../entity/Dept");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
const arrayUtils = require('../common/utils/arrayUtils'), treeUtils = require('../common/utils/treeUtils');
/**
 * 部门服务类
 * 提供部门的增删改查、分页查询以及根据角色ID获取部门列表等功能
 */
let DeptService = DeptService_1 = class DeptService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${DeptService_1 === null || DeptService_1 === void 0 ? void 0 : DeptService_1.TABLE_NAME} t `;
        // 查询结果集要返回的列名称，其中label和value是给select组件的option使用 // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
     `;
        // 注入Dept实体的Repository
        this.repository = null;
    }
    /**
     * 分页查询部门
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
     * 根据ID查询部门
     * @param id - 部门ID
     * @returns 查询结果
     */
    async getById(id = '') {
        // 根据id查询一条数据
        var _a;
        return (_a = super.getByIdBase) === null || _a === void 0 ? void 0 : _a.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql);
    }
    /**
     * 根据ID删除部门及其子部门
     * @param id - 部门ID
     * @returns 无返回值
     */
    async del(id) {
        var _a, _b, _c, _d;
        let newVar = [];
        // 将数组中的键名转换为驼峰命名
        newVar = (_a = arrayUtils === null || arrayUtils === void 0 ? void 0 : arrayUtils.camelCase) === null || _a === void 0 ? void 0 : _a.call(arrayUtils, newVar);
        // 处理树形结构数据
        const treeData = arrayUtils === null || arrayUtils === void 0 ? void 0 : arrayUtils.handleTree(newVar);
        let children = null;
        // 遍历树形数据，查找指定ID的子节点
        for (const treeOne of treeData) {
            if (!children) {
                children = treeUtils.getChildren(treeOne, id);
            }
        }
        const ids = [];
        // 获取子节点的所有ID
        treeUtils.getIds(children, ids);
        // 批量删除部门及其子部门
        await ((_d = (_b = this === null || this === void 0 ? void 0 : this.repository) === null || _b === void 0 ? void 0 : (_c = _b.createQueryBuilder()).delete) === null || _d === void 0 ? void 0 : _d.call(_c).from(Dept_1.Dept).whereInIds(ids).execute());
    }
    /**
     * 更新部门
     * @param obj - 部门对象
     * @returns 更新后的部门对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = '';
        // 删除redis缓存
        const key = (DeptService_1 === null || DeptService_1 === void 0 ? void 0 : DeptService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, DeptService_1 === null || DeptService_1 === void 0 ? void 0 : DeptService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, DeptService_1 === null || DeptService_1 === void 0 ? void 0 : DeptService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            if (!(obj === null || obj === void 0 ? void 0 : obj.code)) {
                await (this === null || this === void 0 ? void 0 : this.updateCode(obj));
            }
            return obj;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, DeptService_1 === null || DeptService_1 === void 0 ? void 0 : DeptService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            if (!(obj === null || obj === void 0 ? void 0 : obj.code)) {
                await (this === null || this === void 0 ? void 0 : this.updateCode(obj));
            }
            return obj;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        await ((_q = (_p = this === null || this === void 0 ? void 0 : this.repository) === null || _p === void 0 ? void 0 : _p.save) === null || _q === void 0 ? void 0 : _q.call(_p, old)); // 修改数据
        if (!(old === null || old === void 0 ? void 0 : old.code)) {
            await (this === null || this === void 0 ? void 0 : this.updateCode(old));
        }
        return old;
    }
    /**
     * 更新部门代码
     * @param obj - 部门对象
     * @returns 无返回值
     */
    async updateCode(obj) {
        // 如果parentCode为空，则生成一个4位的code
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const parentId = obj.code;
        if (!parentId) {
            // TODO 如果parentId为空，则从当前级别code中选取最大的code来加1
            obj.code = await ((_a = super.getCode) === null || _a === void 0 ? void 0 : _a.call(this, null, DeptService_1 === null || DeptService_1 === void 0 ? void 0 : DeptService_1.TABLE_NAME, 4));
            await ((_c = (_b = this === null || this === void 0 ? void 0 : this.repository) === null || _b === void 0 ? void 0 : _b.save) === null || _c === void 0 ? void 0 : _c.call(_b, obj));
            return;
        }
        const parent = await ((_e = (_d = this === null || this === void 0 ? void 0 : this.repository) === null || _d === void 0 ? void 0 : _d.findOneById) === null || _e === void 0 ? void 0 : _e.call(_d, parentId));
        const parentCode = parent === null || parent === void 0 ? void 0 : parent.code;
        const code = await ((_f = super.getCode) === null || _f === void 0 ? void 0 : _f.call(this, parentCode, DeptService_1 === null || DeptService_1 === void 0 ? void 0 : DeptService_1.TABLE_NAME, 4));
        obj.code = code;
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, obj));
    }
    async getListByRoleId(roleId) {
        var _a, _b;
        let sql = ` select d.id from dept d left join role_dept_map rd on d.id = rd.dept_id where rd.role_id = '${roleId}' `;
        sql = sql + ' order by d.parent_id, d.order_num ';
        const newVar = await ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.call(this, sql));
        if (!newVar) {
            return [];
        }
        const ret = [];
        for (const newVarOne of newVar) {
            const menuId = newVarOne.id;
            (_b = ret.push) === null || _b === void 0 ? void 0 : _b.call(ret, menuId);
        }
        return ret;
    }
};
// 查询的数据库表名称
DeptService.TABLE_NAME = 'dept';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], DeptService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Dept_1.Dept),
    __metadata("design:type", typeorm_1.Repository)
], DeptService.prototype, "repository", void 0);
DeptService = DeptService_1 = __decorate([
    (0, decorator_1.Provide)()
], DeptService);
exports.DeptService = DeptService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvb2EvZGVwdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsaUVBQTZEO0FBRzdELHFDQUFxQztBQUNyQywrQ0FBc0Q7QUFDdEQsNENBQXlDO0FBR3pDLDJEQUF3RDtBQUV4RCxxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELDRCQUE2QjtBQUU3QixNQUFNLFVBQVUsR0FBUSxPQUFPLENBQUMsNEJBQTRCLENBQUMsRUFDM0QsU0FBUyxHQUFRLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRXhEOzs7R0FHRztBQUVILElBQWEsV0FBVyxtQkFBeEIsTUFBYSxXQUFZLFNBQVEsMEJBQVc7SUFBNUM7O1FBRUUsUUFBUTtRQUVBLFdBQU0sR0FBWSxJQUFJLENBQUE7UUFLOUIsZUFBZTtRQUNQLFlBQU8sR0FBRyxTQUFTLGFBQVcsYUFBWCxhQUFXLHVCQUFYLGFBQVcsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUV4RCx1RUFBdUU7UUFDL0QsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNOztNQUV0QyxDQUFBO1FBRUosc0JBQXNCO1FBRWQsZUFBVSxHQUFxQixJQUFJLENBQUM7SUFzUDlDLENBQUM7SUFwUEM7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQ2YsS0FBSyxHQUFHLEVBQUUsRUFBRSxNQUFjLEVBQUUsUUFBa0IsRUFDOUMsSUFBVTtRQUVWLFdBQVc7O1FBRVgsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFBLENBQUMsVUFBVTtRQUU3QixrQkFBa0I7UUFDbEIsUUFBUSxJQUFJLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUkseURBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFR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