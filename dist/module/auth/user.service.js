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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const Zero0Error_1 = require("../common/model/Zero0Error");
const fileUtils = require("../common/utils/fileUtils");
const typeorm_1 = require("@midwayjs/typeorm");
const User_1 = require("../common/model/User");
const typeorm_2 = require("typeorm");
const crypto = require('../common/utils/crypto');
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const UserRoleMap_1 = require("../../entity/UserRoleMap");
const _ = require("lodash");
/**
 * 用户服务类
 * 提供用户的增删改查、分页查询、密码重置、更新密码、登录、获取微信配置、获取访问令牌、获取OpenID、生成小程序码等功能
 */
let UserService = UserService_1 = class UserService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 应用程序实例
        this.app = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${UserService_1 === null || UserService_1 === void 0 ? void 0 : UserService_1.TABLE_NAME} t `;
        // 查询结果集要返回的列名称，其中label和value是给select组件的option使用 // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
     `;
        // 注入User实体的Repository
        this.repository = null;
        // 注入UserRoleMap实体的Repository
        this.userRoleMapRepository = null;
        this.log = '';
    }
    /**
     * 分页查询用户
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
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue); // 处理前端的搜索字符串的搜索需求
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize']))) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query)); // 处理前端的表格中筛选需求
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
     * 根据ID查询用户
     * @param id - 用户ID
     * @returns 查询结果
     */
    async getById(id = '') {
        // 根据id查询一条数据
        var _a, _b, _c, _d;
        const data = await ((_a = super.getByIdBase) === null || _a === void 0 ? void 0 : _a.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql));
        const userRoleMaps = await ((_c = (_b = this.userRoleMapRepository) === null || _b === void 0 ? void 0 : _b.findBy) === null || _c === void 0 ? void 0 : _c.call(_b, { userId: id }));
        const roleIds = [];
        for (const item of userRoleMaps) {
            (_d = roleIds === null || roleIds === void 0 ? void 0 : roleIds.push) === null || _d === void 0 ? void 0 : _d.call(roleIds, item === null || item === void 0 ? void 0 : item.roleId);
        }
        data.roleIds = roleIds;
        return data;
    }
    /**
     * 根据ID数组删除用户
     * @param ids - 用户ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = UserService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 重置用户密码
     * @param id - 用户ID
     * @returns 无返回值
     */
    async resetPwd(id) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e;
        let old = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        old = {
            ...old,
            password: (_c = crypto === null || crypto === void 0 ? void 0 : crypto.md5) === null || _c === void 0 ? void 0 : _c.call(crypto, UserService_1 === null || UserService_1 === void 0 ? void 0 : UserService_1.initPwd),
        };
        await ((_e = (_d = this === null || this === void 0 ? void 0 : this.repository) === null || _d === void 0 ? void 0 : _d.save) === null || _e === void 0 ? void 0 : _e.call(_d, old)); // 修改数据
    }
    /**
     * 更新用户密码
     * @param obj - 用户对象
     * @returns 无返回值
     */
    async updatePwd(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let log = '';
        obj.password = (_a = crypto === null || crypto === void 0 ? void 0 : crypto.md5) === null || _a === void 0 ? void 0 : _a.call(crypto, obj === null || obj === void 0 ? void 0 : obj.password);
        obj.passwordNew = (_b = crypto === null || crypto === void 0 ? void 0 : crypto.md5) === null || _b === void 0 ? void 0 : _b.call(crypto, obj === null || obj === void 0 ? void 0 : obj.passwordNew);
        let old = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        // 验证原密码是否正确
        if ((obj === null || obj === void 0 ? void 0 : obj.password) !== (old === null || old === void 0 ? void 0 : old.password)) {
            log = '原密码输入错误';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        old = {
            ...old,
            password: obj === null || obj === void 0 ? void 0 : obj.passwordNew,
        };
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, old)); // 修改数据
    }
    /**
     * 更新用户信息及角色
     * @param obj - 用户对象
     * @param roleIds - 角色ID数组
     * @returns 更新后的用户对象
     */
    async update(obj, roleIds) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        console.log(obj);
        try {
            if (obj === null || obj === void 0 ? void 0 : obj.password) {
                obj.password = (_a = crypto === null || crypto === void 0 ? void 0 : crypto.md5) === null || _a === void 0 ? void 0 : _a.call(crypto, obj === null || obj === void 0 ? void 0 : obj.password);
            }
            let log = '';
            // 字段非重复性验证
            const uniqueText = await ((_b = super.unique) === null || _b === void 0 ? void 0 : _b.call(this, UserService_1 === null || UserService_1 === void 0 ? void 0 : UserService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id));
            if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
                log = uniqueText + '已存在，操作失败';
                const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
                (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.call(_c, log, zero0Error);
                throw zero0Error;
            }
            // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
            if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
                // 新增数据，主键id的随机字符串值，由后端typeorm提供
                log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
                (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.info) === null || _f === void 0 ? void 0 : _f.call(_e, log);
                await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, obj)); // insert update
                if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                    await ((_j = super.sortOrder) === null || _j === void 0 ? void 0 : _j.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, UserService_1 === null || UserService_1 === void 0 ? void 0 : UserService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
                }
                await ((_k = this === null || this === void 0 ? void 0 : this.updateRoles) === null || _k === void 0 ? void 0 : _k.call(this, obj === null || obj === void 0 ? void 0 : obj.id, roleIds));
                return null;
            }
            let old = await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.findOneById) === null || _m === void 0 ? void 0 : _m.call(_l, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
            await ((_o = this === null || this === void 0 ? void 0 : this.updateRoles) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, roleIds));
            if (!old) {
                // 新增数据，主键id的随机字符串值，由前端页面提供
                await ((_q = (_p = this === null || this === void 0 ? void 0 : this.repository) === null || _p === void 0 ? void 0 : _p.save) === null || _q === void 0 ? void 0 : _q.call(_p, obj)); // insert update
                console.log('old');
                if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                    await ((_r = super.sortOrder) === null || _r === void 0 ? void 0 : _r.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, UserService_1 === null || UserService_1 === void 0 ? void 0 : UserService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
                }
                return null;
            }
            obj === null || obj === void 0 ? true : delete obj.id;
            old = {
                ...old,
                ...obj,
            };
            await ((_t = (_s = this === null || this === void 0 ? void 0 : this.repository) === null || _s === void 0 ? void 0 : _s.save) === null || _t === void 0 ? void 0 : _t.call(_s, old)); // 修改数据
        }
        catch (e) {
            console.log(e);
        }
    }
    async updateRoles(userId, roleIds) {
        // 先把此用户相关的角色都删除
        var _a, _b, _c, _d;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.userRoleMapRepository) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, { userId: userId, }));
        if (!roleIds || roleIds.length < 1) {
            return;
        }
        for (const roleId of roleIds) {
            const userRoleMap = new UserRoleMap_1.UserRoleMap();
            userRoleMap.userId = userId;
            userRoleMap.roleId = roleId;
            await ((_d = (_c = this === null || this === void 0 ? void 0 : this.userRoleMapRepository) === null || _c === void 0 ? void 0 : _c.save) === null || _d === void 0 ? void 0 : _d.call(_c, userRoleMap));
        }
    }
    async login(code = 'the code is a mock one', shopId = '', sceneType) {
        let wechatConfig = await (this === null || this === void 0 ? void 0 : this.getWechatConfig(shopId));
        // https://www.npmjs.com/package/wechat-jssdk
        wechatConfig = {
            ...wechatConfig,
            //小程序配置
            miniProgram: {
                appId: wechatConfig.appId,
                appSecret: wechatConfig.appSecret,
            },
        };
        const { Wechat } = require('wechat-jssdk'), wx = new Wechat(wechatConfig);
        const openid = await wx.miniProgram.getSession(code, null);
        wechatConfig = {
            ...wechatConfig,
            ...openid,
        };
        return wechatConfig;
    }
    async getWechatConfig(shopId = '') {
        var _a, _b, _c;
        let log = '查询此店铺的微信小程序配置信息';
        const sql = ` ${this === null || this === void 0 ? void 0 : this.selectSql} ${this === null || this === void 0 ? void 0 : this.fromSql} WHERE t.shop_id = '${shopId}' `;
        const result = await ((_a = super.query) === null || _a === void 0 ? void 0 : _a.call(this, sql));
        if (!result) {
            log = '未查询到此店铺的微信小程序配置信息';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_c = (_b = this === null || this === void 0 ? void 0 : this.logger) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.call(_b, log, zero0Error);
            throw zero0Error;
        }
        const wechatConfig = result === null || result === void 0 ? void 0 : result[0];
        return wechatConfig;
    }
    async getAccessToken(shopId = '') {
        var _a, _b;
        let wechatConfig = await (this === null || this === void 0 ? void 0 : this.getWechatConfig(shopId));
        // https://www.npmjs.com/package/wechat-jssdk
        wechatConfig = {
            ...wechatConfig,
            //小程序配置
            miniProgram: {
                appId: wechatConfig.appId,
                appSecret: wechatConfig.appSecret,
            },
        };
        const { Wechat } = require('wechat-jssdk'), wx = new Wechat(wechatConfig);
        const getAccessToken = await ((_b = (_a = wx.jssdk).getAccessToken) === null || _b === void 0 ? void 0 : _b.call(_a));
        return getAccessToken.access_token;
    }
    async getOpenId(shopBuyerId = '', appId = '') {
        var _a, _b;
        const sql = ` SELECT open_id FROM user_open_id WHERE  app_id = '${appId}' AND user_id = ( SELECT buyer_id FROM shop_buyer WHERE id = '${shopBuyerId}' ) `;
        const result = await ((_a = super.query) === null || _a === void 0 ? void 0 : _a.call(this, sql));
        if (!result) {
            return null;
        }
        return (_b = result === null || result === void 0 ? void 0 : result[0]) === null || _b === void 0 ? void 0 : _b.openId;
    }
    /**
     * getwxacodeunlimit
     */
    async getwxacodeunlimit(scene = '', accessToken = '') {
        var _a;
        const axios = require('axios');
        // 定义要访问的URL地址
        const url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`;
        // 发起POST请求
        const res = await axios.post(url, { scene: scene }, { responseType: 'arraybuffer' });
        const uri = fileUtils === null || fileUtils === void 0 ? void 0 : fileUtils.outputFileSync(res, 'qrcode', (_a = this === null || this === void 0 ? void 0 : this.app) === null || _a === void 0 ? void 0 : _a.getAppDir());
        return uri;
    }
    async init() {
        var _a, _b, _c, _d, _e, _f, _g;
        let log = '初始化用户数据,创建admin用户';
        this.logger.info(log);
        const count = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.count) === null || _b === void 0 ? void 0 : _b.call(_a));
        // 判断数据是否初始化过，如果已初始化，则不会再次初始化
        if (count > 0) {
            return;
        }
        const user = new User_1.User();
        user.id = '1';
        user.username = 'admin';
        // 默认密码
        const password = (_c = crypto === null || crypto === void 0 ? void 0 : crypto.md5) === null || _c === void 0 ? void 0 : _c.call(crypto, UserService_1 === null || UserService_1 === void 0 ? void 0 : UserService_1.initPwd);
        user.password = password;
        user.name = '系统管理员';
        const userRoleMap = new UserRoleMap_1.UserRoleMap();
        userRoleMap.userId = "1";
        userRoleMap.roleId = "1";
        await ((_e = (_d = this === null || this === void 0 ? void 0 : this.userRoleMapRepository) === null || _d === void 0 ? void 0 : _d.save) === null || _e === void 0 ? void 0 : _e.call(_d, userRoleMap));
        await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, user));
    }
};
// 查询的数据库表名称
UserService.TABLE_NAME = 'user';
// 默认初始化密码
UserService.initPwd = 'aaaa1111';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], UserService.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], UserService.prototype, "app", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(User_1.User),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(UserRoleMap_1.UserRoleMap),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "userRoleMapRepository", void 0);
UserService = UserService_1 = __decorate([
    (0, decorator_1.Provide)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvYXV0aC91c2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUEyRDtBQUUzRCxpRUFBNkQ7QUFFN0QsMkRBQXdEO0FBRXhELHVEQUF1RDtBQUN2RCwrQ0FBc0Q7QUFDdEQsK0NBQTRDO0FBQzVDLHFDQUFxQztBQUlyQyxNQUFNLE1BQU0sR0FBUSxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUV0RCxxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELDBEQUF3RDtBQUN4RCw0QkFBNkI7QUFFN0I7OztHQUdHO0FBRUgsSUFBYSxXQUFXLG1CQUF4QixNQUFhLFdBQVksU0FBUSwwQkFBVztJQUE1Qzs7UUFDRSxRQUFRO1FBRUEsV0FBTSxHQUFZLElBQUksQ0FBQztRQUUvQixTQUFTO1FBRUQsUUFBRyxHQUFnQixJQUFJLENBQUM7UUFRaEMsZUFBZTtRQUNQLFlBQU8sR0FBRyxTQUFTLGFBQVcsYUFBWCxhQUFXLHVCQUFYLGFBQVcsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUV4RCx1RUFBdUU7UUFDL0QsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNOztNQUV0QyxDQUFDO1FBRUwsc0JBQXNCO1FBRWQsZUFBVSxHQUFxQixJQUFJLENBQUM7UUFFNUMsNkJBQTZCO1FBRXJCLDBCQUFxQixHQUE0QixJQUFJLENBQUM7UUFFdEQsUUFBRyxHQUFHLEVBQUUsQ0FBQztJQStabkIsQ0FBQztJQTdaQzs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixLQUFLLEdBQUcsRUFBRSxFQUFFLE1BQWMsRUFDMUIsUUFBa0IsRUFDbEIsSUFBVTtRQUVWLFdBQVc7O1FBRVgsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsQ0FB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