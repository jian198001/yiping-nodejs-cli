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
var MobileModuleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileModuleService = void 0;
// 引入必要的模块和装饰器
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const MobileModule_1 = require("../../entity/MobileModule");
const Zero0Error_1 = require("../common/model/Zero0Error");
// 引入路径模块
const path = require("path");
const _ = require("lodash");
// 引入SQL和字符串工具函数
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
// 引入文件系统扩展模块和日期处理模块
const fse = require('fs-extra'), moment = require('moment');
/**
 * 移动模块服务类
 * 提供移动模块的增删改查功能
 */
let MobileModuleService = MobileModuleService_1 = class MobileModuleService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${MobileModuleService_1 === null || MobileModuleService_1 === void 0 ? void 0 : MobileModuleService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  `;
        // 注入MobileModule实体的Repository
        this.repository = null;
    }
    /**
     * 分页查询移动模块
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
        let parameters = [];
        if (params && params.length > 3) {
            parameters = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, params);
        }
        // 处理前端的表格中筛选需求
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, (_c = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _c === void 0 ? void 0 : _c.call(strUtils, parameters, ['current', 'pageSize']))) + ((_d = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _d === void 0 ? void 0 : _d.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue)) + ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
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
     * 根据ID查询移动模块
     * @param id - 移动模块ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = MobileModuleService_1.TABLE_NAME + `:${id}`;
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
     * 删除移动模块
     * @param ids - 移动模块ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = MobileModuleService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新移动模块
     * @param obj - 移动模块对象
     * @returns 更新后的移动模块对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = '';
        // 删除redis缓存
        const key = (MobileModuleService_1 === null || MobileModuleService_1 === void 0 ? void 0 : MobileModuleService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, MobileModuleService_1 === null || MobileModuleService_1 === void 0 ? void 0 : MobileModuleService_1.TABLE_NAME, null, obj === null || obj === void 0 ? void 0 : obj.id));
        if (uniqueText) {
            // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + '已存在，操作失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        // 新增数据，主键id的随机字符串值，由后端typeorm提供
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, MobileModuleService_1 === null || MobileModuleService_1 === void 0 ? void 0 : MobileModuleService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, MobileModuleService_1 === null || MobileModuleService_1 === void 0 ? void 0 : MobileModuleService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
    /**
     * 更新页面配置
     * @param packageUview2 - 包路径
     * @param pathModule - 模块路径
     * @returns 无返回值
     */
    async updatePages(packageUview2, pathModule) {
        var _a, _b, _c, _d;
        const join = (_a = path === null || path === void 0 ? void 0 : path.join) === null || _a === void 0 ? void 0 : _a.call(path, packageUview2, '..', 'pages.json');
        const readFileSync = fse === null || fse === void 0 ? void 0 : fse.readFileSync(join, 'UTF-8');
        const evalObj = (_b = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _b === void 0 ? void 0 : _b.call(JSON, readFileSync);
        let pages = evalObj.pages;
        pages = await (this === null || this === void 0 ? void 0 : this.forEachPages(pages, 'pages/' + pathModule + '/page'));
        pages = await (this === null || this === void 0 ? void 0 : this.forEachPages(pages, 'pages/' + pathModule + '/detail'));
        pages = await (this === null || this === void 0 ? void 0 : this.forEachPages(pages, 'pages/' + pathModule + '/update'));
        evalObj.pages = pages;
        const joinBak = join + '_' + ((_d = (_c = new moment()).format) === null || _d === void 0 ? void 0 : _d.call(_c, 'YYYYMMDDHHmmss')) + '_bak';
        fse === null || fse === void 0 ? void 0 : fse.ensureFileSync(joinBak);
        fse === null || fse === void 0 ? void 0 : fse.copySync(join, joinBak);
        fse === null || fse === void 0 ? void 0 : fse.writeFileSync(join, JSON === null || JSON === void 0 ? void 0 : JSON.stringify(evalObj), 'UTF-8');
    }
    /**
     * 遍历页面数组并添加路径
     * @param pages - 页面数组
     * @param path - 路径
     * @returns 更新后的页面数组
     */
    async forEachPages(pages, path) {
        var _a;
        if (!pages) {
            return [];
        }
        if (!path) {
            return pages;
        }
        let b = false;
        _ === null || _ === void 0 ? void 0 : _.forEach(pages, (value, key) => {
            if (path === value.path) {
                b = true;
            }
        });
        if (b) {
            return pages;
        }
        (_a = pages.push) === null || _a === void 0 ? void 0 : _a.call(pages, { path: path });
        return pages;
    }
};
// 查询的数据库表名称
MobileModuleService.TABLE_NAME = 'mobile_module';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], MobileModuleService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(MobileModule_1.MobileModule),
    __metadata("design:type", typeorm_1.Repository)
], MobileModuleService.prototype, "repository", void 0);
MobileModuleService = MobileModuleService_1 = __decorate([
    (0, decorator_1.Provide)()
], MobileModuleService);
exports.MobileModuleService = MobileModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlTW9kdWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9tb2JpbGUvbW9iaWxlTW9kdWxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxtREFBc0Q7QUFDdEQsaUVBQTZEO0FBRzdELHFDQUFxQztBQUNyQywrQ0FBc0Q7QUFDdEQsNERBQXlEO0FBQ3pELDJEQUF3RDtBQUd4RCxTQUFTO0FBQ1QsNkJBQTZCO0FBQzdCLDRCQUE2QjtBQUU3QixnQkFBZ0I7QUFDaEIscURBQXFEO0FBQ3JELHFEQUFxRDtBQUVyRCxvQkFBb0I7QUFDcEIsTUFBTSxHQUFHLEdBQVEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUNsQyxNQUFNLEdBQVEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWxDOzs7R0FHRztBQUVILElBQWEsbUJBQW1CLDJCQUFoQyxNQUFhLG1CQUFvQixTQUFRLDBCQUFXO0lBQXBEOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSy9CLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxxQkFBbUIsYUFBbkIscUJBQW1CLHVCQUFuQixxQkFBbUIsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUVoRSxzQkFBc0I7UUFDZCxjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU07R0FDekMsQ0FBQztRQUVGLDhCQUE4QjtRQUV0QixlQUFVLEdBQTZCLElBQUksQ0FBQztJQXFRdEQsQ0FBQztJQW5RQzs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixLQUFLLEdBQUcsRUFBRSxFQUFFLE1BQWMsRUFBRSxRQUFrQixFQUM5QyxJQUFVO1FBRVYsV0FBVzs7UUFFWCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVO1FBRTlCLElBQUksVUFB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