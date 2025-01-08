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
var RoleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const Role_1 = require("../../entity/Role");
const RoleMenuMap_1 = require("../../entity/RoleMenuMap");
const RoleDeptMap_1 = require("../../entity/RoleDeptMap");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
/**
 * 角色服务类
 * 提供角色的增删改查、分页查询、初始化以及更新数据范围等功能
 */
let RoleService = RoleService_1 = class RoleService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${RoleService_1 === null || RoleService_1 === void 0 ? void 0 : RoleService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
     `;
        // 注入Role实体的Repository
        this.repository = null;
        // 注入RoleMenuMap实体的Repository
        this.roleMenuMapRepository = null;
        // 注入RoleDeptMap实体的Repository
        this.roleDeptMapRepository = null;
    }
    /**
     * 分页查询角色
     * @param userId - 用户ID
     * @param allocated - 是否已分配
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(userId, allocated, query = '', params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // 分页列表查询数据
        let whereSql = ' '; // 查询条件字符串
        if (userId) {
            if (allocated) {
                // 查询已分配给指定用户的角色
                whereSql =
                    whereSql +
                        ` AND t.id IN ( SELECT role_id FROM user_role_map WHERE user_id = '${userId}' ) `;
            }
            else {
                // 查询未分配给指定用户的角色
                whereSql =
                    whereSql +
                        ` AND t.id NOT IN ( SELECT role_id FROM user_role_map WHERE user_id = '${userId}' ) `;
            }
        }
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ['name', 'role_key'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
        let parameters = [];
        if (params && params.length > 3) {
            // 解析前端传递的参数
            parameters = (_b = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _b === void 0 ? void 0 : _b.call(JSON, params);
        }
        // 处理前端的表格中筛选需求
        whereSql += ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, parameters, ['current', 'pageSize',]))) + ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
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
     * 根据ID查询角色
     * @param id - 角色ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = RoleService_1.TABLE_NAME + `:${id}`;
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
     * 根据ID数组删除角色
     * @param ids - 角色ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = RoleService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新角色
     * @param obj - 角色对象
     * @returns 更新后的角色对象
     */
    async update(obj) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        // 一个表进行操作 typeORM
        let role = null;
        let log = ''; // 删除redis缓存
        const key = (RoleService_1 === null || RoleService_1 === void 0 ? void 0 : RoleService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, RoleService_1 === null || RoleService_1 === void 0 ? void 0 : RoleService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
            role = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, RoleService_1 === null || RoleService_1 === void 0 ? void 0 : RoleService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
        }
        else {
            role = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
            if (!role) {
                await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
                if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                    await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, RoleService_1 === null || RoleService_1 === void 0 ? void 0 : RoleService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
                }
                return null;
            }
            role.name = obj === null || obj === void 0 ? void 0 : obj.name;
            role.roleKey = obj === null || obj === void 0 ? void 0 : obj.roleKey;
            role.orderNum = obj === null || obj === void 0 ? void 0 : obj.orderNum;
            role.status = obj === null || obj === void 0 ? void 0 : obj.status;
            role.remark = obj === null || obj === void 0 ? void 0 : obj.remark;
            role = await ((_q = (_p = this === null || this === void 0 ? void 0 : this.repository) === null || _p === void 0 ? void 0 : _p.save) === null || _q === void 0 ? void 0 : _q.call(_p, role));
            if (!(role === null || role === void 0 ? void 0 : role.orderNum)) {
                await ((_r = super.sortOrder) === null || _r === void 0 ? void 0 : _r.call(this, role.id, null, null, 'role'));
            }
        }
        const roleMenuMap = new RoleMenuMap_1.RoleMenuMap();
        roleMenuMap.roleId = role === null || role === void 0 ? void 0 : role.id;
        await ((_s = this === null || this === void 0 ? void 0 : this.roleMenuMapRepository) === null || _s === void 0 ? void 0 : _s.remove(roleMenuMap));
        const menuIds = obj === null || obj === void 0 ? void 0 : obj.menuIds;
        for (const menuId of menuIds) {
            const roleMenuMapNew = new RoleMenuMap_1.RoleMenuMap();
            delete roleMenuMapNew.id;
            roleMenuMapNew.roleId = role === null || role === void 0 ? void 0 : role.id;
            roleMenuMapNew.menuId = menuId;
            await ((_u = (_t = this === null || this === void 0 ? void 0 : this.roleMenuMapRepository) === null || _t === void 0 ? void 0 : _t.save) === null || _u === void 0 ? void 0 : _u.call(_t, roleMenuMapNew));
        }
        return role;
    }
    /**
     * 更新角色的数据范围
     * @param obj - 角色对象
     * @returns 更新
     */
    async updateDataScope(obj) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 一个表进行操作 typeORM
        let role = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOne) === null || _b === void 0 ? void 0 : _b.call(_a, { where: { id: obj === null || obj === void 0 ? void 0 : obj.id } }));
        role.dataScope = obj === null || obj === void 0 ? void 0 : obj.dataScope;
        role = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.save) === null || _d === void 0 ? void 0 : _d.call(_c, role));
        const roleDeptMap = new RoleDeptMap_1.RoleDeptMap();
        roleDeptMap.roleId = role === null || role === void 0 ? void 0 : role.id;
        await ((_e = this === null || this === void 0 ? void 0 : this.roleDeptMapRepository) === null || _e === void 0 ? void 0 : _e.remove(roleDeptMap));
        const deptIds = obj === null || obj === void 0 ? void 0 : obj.deptIds;
        for (const deptId of deptIds) {
            const roleDeptMapNew = new RoleDeptMap_1.RoleDeptMap();
            delete roleDeptMapNew.id;
            roleDeptMapNew.roleId = role === null || role === void 0 ? void 0 : role.id;
            roleDeptMapNew.deptId = deptId;
            await ((_g = (_f = this === null || this === void 0 ? void 0 : this.roleDeptMapRepository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, roleDeptMapNew));
        }
        return role;
    }
    async init() {
        var _a, _b, _c, _d;
        let log = '初始化角色数据,创建管理员角色';
        this.logger.info(log);
        const count = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.count) === null || _b === void 0 ? void 0 : _b.call(_a));
        // 判断数据是否初始化过，如果已初始化，则不会再次初始化
        if (count > 0) {
            return;
        }
        const role = new Role_1.Role();
        role.id = '1';
        role.name = '系统管理员';
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.save) === null || _d === void 0 ? void 0 : _d.call(_c, role));
    }
};
// 查询的数据库表名称
RoleService.TABLE_NAME = 'role';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], RoleService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Role_1.Role),
    __metadata("design:type", typeorm_1.Repository)
], RoleService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(RoleMenuMap_1.RoleMenuMap),
    __metadata("design:type", typeorm_1.Repository)
], RoleService.prototype, "roleMenuMapRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(RoleDeptMap_1.RoleDeptMap),
    __metadata("design:type", typeorm_1.Repository)
], RoleService.prototype, "roleDeptMapRepository", void 0);
RoleService = RoleService_1 = __decorate([
    (0, decorator_1.Provide)()
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvYXV0aC9yb2xlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCxpRUFBNkQ7QUFHN0QscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUV0RCw0Q0FBeUM7QUFDekMsMERBQXVEO0FBQ3ZELDBEQUF1RDtBQUN2RCwyREFBd0Q7QUFFeEQscURBQXFEO0FBQ3JELHFEQUFxRDtBQUNyRCw0QkFBNkI7QUFFN0I7OztHQUdHO0FBRUgsSUFBYSxXQUFXLG1CQUF4QixNQUFhLFdBQVksU0FBUSwwQkFBVztJQUE1Qzs7UUFDRSxRQUFRO1FBRUEsV0FBTSxHQUFZLElBQUksQ0FBQztRQUsvQixlQUFlO1FBQ1AsWUFBTyxHQUFHLFNBQVMsYUFBVyxhQUFYLGFBQVcsdUJBQVgsYUFBVyxDQUFFLFVBQVUsS0FBSyxDQUFDO1FBQ3hELHNCQUFzQjtRQUNkLGNBQVMsR0FBRyxJQUFJLDBCQUFXLENBQUMsTUFBTTs7TUFFdEMsQ0FBQztRQUNMLHNCQUFzQjtRQUVkLGVBQVUsR0FBcUIsSUFBSSxDQUFDO1FBQzVDLDZCQUE2QjtRQUVyQiwwQkFBcUIsR0FBNEIsSUFBSSxDQUFDO1FBQzlELDZCQUE2QjtRQUVyQiwwQkFBcUIsR0FBNEIsSUFBSSxDQUFDO0lBeU9oRSxDQUFDO0lBeE9DOzs7Ozs7Ozs7T0FTRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQ2YsTUFBYyxFQUNkLFNBQWtCLEVBQ2xCLEtBQUssR0FBRyxFQUFFLEVBQUUsTUFBYyxFQUMxQixRQUFrQixFQUNsQixJQUFVOztRQUVWLFdBQVc7UUFDWCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVO1FBQzlCLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsZ0JB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