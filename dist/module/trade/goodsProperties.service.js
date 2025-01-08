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
var GoodsPropertiesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsPropertiesService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const GoodsPropertiesKey_1 = require("../../entity/GoodsPropertiesKey");
const GoodsPropertiesValue_1 = require("../../entity/GoodsPropertiesValue");
const Zero0Error_1 = require("../common/model/Zero0Error");
const _ = require("lodash");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
/**
 * 商品属性服务类
 */
let GoodsPropertiesService = GoodsPropertiesService_1 = class GoodsPropertiesService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${GoodsPropertiesService_1 === null || GoodsPropertiesService_1 === void 0 ? void 0 : GoodsPropertiesService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  


        , (t.name) AS k
        , (t.id) AS k_id

     `;
        // 注入商品属性键实体模型
        this.repository = null;
        // 注入商品属性值实体模型
        this.goodsPropertiesValueRepository = null;
        // 价格单位转换因子
        this.priceUnit = 0.01;
    }
    /**
     * 分页查询商品属性数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(query = "", params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // 查询条件字符串
        let whereSql = " ";
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ["name"], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
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
     * 根据ID查询商品属性数据
     * @param id - 商品属性ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = GoodsPropertiesService_1.TABLE_NAME + `:${id}`;
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
     * 删除商品属性数据
     * @param ids - 商品属性ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = GoodsPropertiesService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新商品属性数据
     * @param obj - 商品属性对象
     * @returns 更新后的商品属性对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = "";
        // 删除redis缓存
        const key = (GoodsPropertiesService_1 === null || GoodsPropertiesService_1 === void 0 ? void 0 : GoodsPropertiesService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, GoodsPropertiesService_1 === null || GoodsPropertiesService_1 === void 0 ? void 0 : GoodsPropertiesService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GoodsPropertiesService_1 === null || GoodsPropertiesService_1 === void 0 ? void 0 : GoodsPropertiesService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GoodsPropertiesService_1 === null || GoodsPropertiesService_1 === void 0 ? void 0 : GoodsPropertiesService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
     * 从购物车属性中获取中文描述
     * @param properties - 购物车属性字符串
     * @returns 中文描述字符串
     */
    async getCnStrFromCart(properties) {
        return null;
    }
    /**
     * 从购物车属性中获取初始SKU
     * @param properties - 购物车属性字符串
     * @returns 初始SKU对象
     */
    async getInitialSkuFromCart(properties) {
        return null;
    }
    /**
     * 将字符串转换为布尔值
     * @param multiple - 字符串值
     * @returns 布尔值
     */
    async toBoolean(multiple) {
        if (!multiple) {
            return false;
        }
        if (multiple === "1") {
            return true;
        }
        return false;
    }
    /**
     * 获取商品属性列表
     * @param goodsId - 商品ID
     * @returns 商品属性列表
     */
    async list(goodsId) {
        var _a, _b, _c, _d;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "取得商品对应的可加价属性名及属性值信息");
        const whereSql = " AND t.goods_id = '#{goodsId}' ";
        const anies = await ((_c = super.arrBase) === null || _c === void 0 ? void 0 : _c.call(this, null, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql));
        if (!anies) {
            return [];
        }
        for (const any of anies) {
            any.is_multiple = false;
            const multiple = any.multiple;
            if (multiple === "1") {
                any.is_multiple = true;
                const goodsPropertiesValues = [];
                for (const goodsPropertiesValue of goodsPropertiesValues) {
                    let price = goodsPropertiesValue.price;
                    price = (_d = _ === null || _ === void 0 ? void 0 : _.divide) === null || _d === void 0 ? void 0 : _d.call(_, price, this === null || this === void 0 ? void 0 : this.priceUnit);
                    goodsPropertiesValue.price = price;
                }
                any.v = goodsPropertiesValues;
            }
            if (!anies) {
                return [];
            }
            return anies;
        }
    }
    async save(map) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (!map) {
            return;
        }
        const goodsId = map === null || map === void 0 ? void 0 : map.goodsId;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "遍历此商品对应的旧的规格名,把对应的规格值删除");
        const sql = " DELETE FROM goods_properties_value WHERE goods_properties_key_id IN ( SELECT id FROM goods_properties_key WHERE goods_id = '#{goodsId}' ) ";
        await ((_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.call(this, sql));
        (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.info) === null || _e === void 0 ? void 0 : _e.call(_d, "删除此商品对应的旧的规格名");
        const goodsPropertiesKey = new GoodsPropertiesKey_1.GoodsPropertiesKey();
        goodsPropertiesKey.goodsId = goodsId;
        await ((_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.remove(goodsPropertiesKey));
        const data = map === null || map === void 0 ? void 0 : map.data;
        if (!data) {
            return;
        }
        for (const any of data) {
            let goodsPropertiesKey1 = new GoodsPropertiesKey_1.GoodsPropertiesKey();
            goodsPropertiesKey1 = (_g = _ === null || _ === void 0 ? void 0 : _.assign) === null || _g === void 0 ? void 0 : _g.call(_, goodsPropertiesKey1, any);
            await ((_j = (_h = this === null || this === void 0 ? void 0 : this.repository) === null || _h === void 0 ? void 0 : _h.save) === null || _j === void 0 ? void 0 : _j.call(_h, goodsPropertiesKey1));
            const v = any.v;
            if (!v) {
                continue;
            }
            for (const vElement of v) {
                let goodsPropertiesValue = new GoodsPropertiesValue_1.GoodsPropertiesValue();
                goodsPropertiesValue = (_k = _ === null || _ === void 0 ? void 0 : _.assign) === null || _k === void 0 ? void 0 : _k.call(_, goodsPropertiesValue, vElement);
                goodsPropertiesValue.goodsPropertiesKeyId = goodsPropertiesKey1.id;
                await ((_m = (_l = this === null || this === void 0 ? void 0 : this.goodsPropertiesValueRepository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, goodsPropertiesValue));
            }
        }
    }
};
// 查询的数据库表名称
GoodsPropertiesService.TABLE_NAME = "goods_properties_key";
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], GoodsPropertiesService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(GoodsPropertiesKey_1.GoodsPropertiesKey),
    __metadata("design:type", typeorm_1.Repository)
], GoodsPropertiesService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(GoodsPropertiesValue_1.GoodsPropertiesValue),
    __metadata("design:type", typeorm_1.Repository)
], GoodsPropertiesService.prototype, "goodsPropertiesValueRepository", void 0);
GoodsPropertiesService = GoodsPropertiesService_1 = __decorate([
    (0, decorator_1.Provide)()
], GoodsPropertiesService);
exports.GoodsPropertiesService = GoodsPropertiesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHNQcm9wZXJ0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS90cmFkZS9nb29kc1Byb3BlcnRpZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELGlFQUE2RDtBQUc3RCxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBQ3RELHdFQUFxRTtBQUdyRSw0RUFBeUU7QUFFekUsMkRBQXdEO0FBRXhELDRCQUE2QjtBQUU3QixxREFBcUQ7QUFDckQscURBQXFEO0FBRXJEOztHQUVHO0FBRUgsSUFBYSxzQkFBc0IsOEJBQW5DLE1BQWEsc0JBQXVCLFNBQVEsMEJBQVc7SUFBdkQ7O1FBQ0UsUUFBUTtRQUVBLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFLL0IsZUFBZTtRQUNQLFlBQU8sR0FBRyxTQUFTLHdCQUFzQixhQUF0Qix3QkFBc0IsdUJBQXRCLHdCQUFzQixDQUFFLFVBQVUsS0FBSyxDQUFDO1FBQ25FLHNCQUFzQjtRQUNkLGNBQVMsR0FBRyxJQUFJLDBCQUFXLENBQUMsTUFBTTs7Ozs7O01BTXRDLENBQUM7UUFFTCxjQUFjO1FBRU4sZUFBVSxHQUFtQyxJQUFJLENBQUM7UUFFMUQsY0FBYztRQUVOLG1DQUE4QixHQUNwQyxJQUFJLENBQUM7UUFFUCxXQUFXO1FBQ0gsY0FBUyxHQUFHLElBQUksQ0FBQztJQStWM0IsQ0FBQztJQTdWQzs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixLQUFLLEdBQUcsRUFBRSxFQUNWLE1BQVcsRUFDWCxRQUFrQixFQUNsQixJQUFVO1FBRVYsV0FBVzs7UUFFWCxVQUFVO1FBQ1YsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBRW5CLGtCQUFrQjtRQUNsQixRQUFRLElBQUksTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENB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