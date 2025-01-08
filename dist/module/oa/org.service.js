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
var OrgService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const Org_1 = require("../../entity/Org");
const _ = require("lodash");
const arrayUtils = require("../common/utils/arrayUtils"), treeUtils = require("../common/utils/treeUtils");
/**
 * 组织服务类
 * 提供组织的增删改查、分页查询以及根据角色ID获取组织列表等功能
 */
let OrgService = OrgService_1 = class OrgService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${OrgService_1 === null || OrgService_1 === void 0 ? void 0 : OrgService_1.TABLE_NAME} t `;
        // 查询结果集要返回的列名称，其中label和value是给select组件的option使用 // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
     `;
        // 注入Org实体的Repository
        this.repository = null;
    }
    /**
     * 分页查询组织
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
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ["name"], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句
        // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
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
     * 根据ID查询组织
     * @param id - 组织ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = OrgService_1.TABLE_NAME + `:${id}`;
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
     * 根据ID数组删除组织
     * @param ids - 组织ID数组
     * @returns 无返回值
     */
    async del(ids) {
        var _a, _b, _c, _d;
        let newVar = [];
        // 将数组中的键名转换为驼峰命名
        newVar = (_a = arrayUtils === null || arrayUtils === void 0 ? void 0 : arrayUtils.camelCase) === null || _a === void 0 ? void 0 : _a.call(arrayUtils, newVar);
        let children = null;
        // 遍历树形数据，查找指定ID的子节点
        // for (const treeOne of treeData) {
        //   if (!children) {
        //     children = treeUtils.getChildren(treeOne, id);
        //   }
        // }
        // 获取子节点的所有ID
        treeUtils.getIds(children, ids);
        // 批量删除组织
        await ((_d = (_b = this === null || this === void 0 ? void 0 : this.repository) === null || _b === void 0 ? void 0 : (_c = _b.createQueryBuilder()).delete) === null || _d === void 0 ? void 0 : _d.call(_c).from(Org_1.Org).whereInIds(ids).execute());
    }
    /**
     * 更新组织
     * @param obj - 组织对象
     * @returns 更新后的组织对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = "";
        // 删除redis缓存
        const key = (OrgService_1 === null || OrgService_1 === void 0 ? void 0 : OrgService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, OrgService_1 === null || OrgService_1 === void 0 ? void 0 : OrgService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, OrgService_1 === null || OrgService_1 === void 0 ? void 0 : OrgService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, OrgService_1 === null || OrgService_1 === void 0 ? void 0 : OrgService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
     * 更新组织代码
     * @param obj - 组织对象
     * @returns 无返回值
     */
    async updateCode(obj) {
        // 如果parentCode为空，则生成一个4位的code
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const parentId = obj.code;
        if (!parentId) {
            // TODO 如果parentId为空，则从当前级别code中选取最大的code来加1
            obj.code = await ((_a = super.getCode) === null || _a === void 0 ? void 0 : _a.call(this, null, OrgService_1 === null || OrgService_1 === void 0 ? void 0 : OrgService_1.TABLE_NAME, 4));
            await ((_c = (_b = this === null || this === void 0 ? void 0 : this.repository) === null || _b === void 0 ? void 0 : _b.save) === null || _c === void 0 ? void 0 : _c.call(_b, obj));
            return;
        }
        const parent = await ((_e = (_d = this === null || this === void 0 ? void 0 : this.repository) === null || _d === void 0 ? void 0 : _d.findOneById) === null || _e === void 0 ? void 0 : _e.call(_d, parentId));
        const parentCode = parent === null || parent === void 0 ? void 0 : parent.code;
        const code = await ((_f = super.getCode) === null || _f === void 0 ? void 0 : _f.call(this, parentCode, OrgService_1 === null || OrgService_1 === void 0 ? void 0 : OrgService_1.TABLE_NAME, 4));
        obj.code = code;
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, obj));
    }
    async getListByRoleId(roleId) {
        var _a, _b;
        let sql = ` select d.id from org d left join role_org_map rd on d.id = rd.org_id where rd.role_id = '${roleId}' `;
        sql = sql + " order by d.parent_id, d.order_num ";
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
    async init() { }
};
// 查询的数据库表名称
OrgService.TABLE_NAME = "org";
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], OrgService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Org_1.Org),
    __metadata("design:type", typeorm_1.Repository)
], OrgService.prototype, "repository", void 0);
OrgService = OrgService_1 = __decorate([
    (0, decorator_1.Provide)()
], OrgService);
exports.OrgService = OrgService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9vYS9vcmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELGlFQUE2RDtBQUc3RCxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBR3RELDJEQUF3RDtBQUV4RCxxREFBcUQ7QUFDckQscURBQXFEO0FBRXJELDBDQUF1QztBQUN2Qyw0QkFBNkI7QUFDN0IsTUFBTSxVQUFVLEdBQVEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLEVBQzNELFNBQVMsR0FBUSxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV4RDs7O0dBR0c7QUFFSCxJQUFhLFVBQVUsa0JBQXZCLE1BQWEsVUFBVyxTQUFRLDBCQUFXO0lBQTNDOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSy9CLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxZQUFVLGFBQVYsWUFBVSx1QkFBVixZQUFVLENBQUUsVUFBVSxLQUFLLENBQUM7UUFFdkQsdUVBQXVFO1FBQy9ELGNBQVMsR0FBRyxJQUFJLDBCQUFXLENBQUMsTUFBTTs7TUFFdEMsQ0FBQztRQUVMLHFCQUFxQjtRQUViLGVBQVUsR0FBb0IsSUFBSSxDQUFDO0lBK1I3QyxDQUFDO0lBN1JDOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUNmLEtBQUssR0FBRyxFQUFFLEVBQ1YsTUFBYyxFQUNkLFFBQWtCLEVBQ2xCLElBQVU7UUFFVixXQUFXOztRQUVYLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFVBQVU7UUFFOUIsa0JBQWtCO1FBQ2xCLFFBQVEsSUFBSSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLHlEQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxh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