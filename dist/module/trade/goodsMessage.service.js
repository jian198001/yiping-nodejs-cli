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
var GoodsMessageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsMessageService = void 0;
// 导入所需的模块和装饰器
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const GoodsMessage_1 = require("../../entity/GoodsMessage");
const sku_service_1 = require("./sku.service");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
/**
 * 商品消息服务类
 */
let GoodsMessageService = GoodsMessageService_1 = class GoodsMessageService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${GoodsMessageService_1 === null || GoodsMessageService_1 === void 0 ? void 0 : GoodsMessageService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
     `;
        // 注入商品消息实体模型
        this.repository = null;
        // 注入SKU服务
        this.skuService = null;
    }
    /**
     * 分页查询商品消息数据
     * @param query - 查询字符串
     * @param params - 参数对象
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
     * 根据ID查询商品消息数据
     * @param id - 商品消息ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = GoodsMessageService_1.TABLE_NAME + `:${id}`;
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
     * 删除商品消息数据
     * @param ids - 商品消息ID数组
     * @returns 无返回值
     */
    async del(ids) {
        var _a, _b;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新商品消息数据
     * @param obj - 商品消息对象
     * @returns 更新后的商品消息对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = '';
        // 删除redis缓存
        const key = (GoodsMessageService_1 === null || GoodsMessageService_1 === void 0 ? void 0 : GoodsMessageService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, GoodsMessageService_1 === null || GoodsMessageService_1 === void 0 ? void 0 : GoodsMessageService_1.TABLE_NAME, null, obj === null || obj === void 0 ? void 0 : obj.id));
        if (uniqueText) {
            // 某unique字段值已存在，抛出异常，程序处理终止
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GoodsMessageService_1 === null || GoodsMessageService_1 === void 0 ? void 0 : GoodsMessageService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GoodsMessageService_1 === null || GoodsMessageService_1 === void 0 ? void 0 : GoodsMessageService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
     * 从购物车消息中获取中文描述
     * @param cartMessages - 购物车消息字符串
     * @returns 中文描述字符串
     */
    async getCnStrFromCart(cartMessages) {
        var _a;
        if (!cartMessages) {
            return '';
        }
        cartMessages = await ((_a = this === null || this === void 0 ? void 0 : this.skuService) === null || _a === void 0 ? void 0 : _a.json2CnStr(cartMessages));
        if (!cartMessages) {
            return '';
        }
        cartMessages = '买家留言: ' + cartMessages;
        return cartMessages;
    }
    /**
     * 获取商品消息
     * @param goodsId - 商品ID
     * @returns 商品消息数组
     */
    async getMessage(goodsId) {
        return null;
    }
    /**
     * 保存商品消息
     * @param obj - 商品消息对象
     * @returns 保存成功的消息ID
     */
    async saveGoodsMessage(obj) {
        return null;
    }
    /**
     * 插入消息到消息列表
     * @param listMessagesStr - 消息列表字符串
     * @param messages - 要插入的消息对象
     * @returns 更新后的消息列表字符串
     */
    async insertMessages(listMessagesStr, messages) {
        var _a, _b;
        if (!listMessagesStr) {
            return JSON === null || JSON === void 0 ? void 0 : JSON.stringify([messages]);
        }
        const parse = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, listMessagesStr);
        if (!parse) {
            return JSON === null || JSON === void 0 ? void 0 : JSON.stringify([messages]);
        }
        (_b = parse.push) === null || _b === void 0 ? void 0 : _b.call(parse, messages);
        return JSON === null || JSON === void 0 ? void 0 : JSON.stringify(parse);
    }
    /**
     * 插入购物车消息到购物车消息列表
     * @param listCartMessagesStr - 购物车消息列表字符串
     * @param cartMessages - 要插入的购物车消息对象
     * @returns 更新后的购物车消息列表字符串
     */
    async insertCartMessages(listCartMessagesStr, cartMessages) {
        var _a, _b;
        if (!listCartMessagesStr) {
            return JSON === null || JSON === void 0 ? void 0 : JSON.stringify([cartMessages]);
        }
        const parse = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, listCartMessagesStr);
        if (!parse) {
            return JSON === null || JSON === void 0 ? void 0 : JSON.stringify([cartMessages]);
        }
        (_b = parse.push) === null || _b === void 0 ? void 0 : _b.call(parse, cartMessages);
        return JSON === null || JSON === void 0 ? void 0 : JSON.stringify(parse);
    }
};
// 查询的数据库表名称
GoodsMessageService.TABLE_NAME = 'goods_message';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], GoodsMessageService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(GoodsMessage_1.GoodsMessage),
    __metadata("design:type", typeorm_1.Repository)
], GoodsMessageService.prototype, "repository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", sku_service_1.SkuService)
], GoodsMessageService.prototype, "skuService", void 0);
GoodsMessageService = GoodsMessageService_1 = __decorate([
    (0, decorator_1.Provide)()
], GoodsMessageService);
exports.GoodsMessageService = GoodsMessageService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHNNZXNzYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS90cmFkZS9nb29kc01lc3NhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLG1EQUE4RDtBQUM5RCxpRUFBNkQ7QUFHN0QscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUN0RCw0REFBeUQ7QUFHekQsK0NBQTJDO0FBRTNDLDJEQUF3RDtBQUV4RCxxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELDRCQUE2QjtBQUU3Qjs7R0FFRztBQUVILElBQWEsbUJBQW1CLDJCQUFoQyxNQUFhLG1CQUFvQixTQUFRLDBCQUFXO0lBQXBEOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSy9CLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxxQkFBbUIsYUFBbkIscUJBQW1CLHVCQUFuQixxQkFBbUIsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUVoRSxzQkFBc0I7UUFDZCxjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU07TUFDdEMsQ0FBQztRQUVMLGFBQWE7UUFFTCxlQUFVLEdBQTZCLElBQUksQ0FBQztRQUVwRCxVQUFVO1FBRUYsZUFBVSxHQUFlLElBQUksQ0FBQztJQXdSeEMsQ0FBQztJQXRSQzs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixLQUFLLEdBQUcsRUFBRSxFQUFFLE1BQWMsRUFBRSxRQUFrQixFQUM5QyxJQUFVO1FBRVYsV0FBVzs7UUFFWCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVO1FBRTlCLGtCQUFrQjtRQUNsQixRQUFRLElBQUksTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsSUFBSSx5REFBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEs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