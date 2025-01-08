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
var SkuService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const SkuKey_1 = require("../../entity/SkuKey");
const SkuList_1 = require("../../entity/SkuList");
const Zero0Error_1 = require("../common/model/Zero0Error");
const _ = require("lodash");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
let SkuService = SkuService_1 = class SkuService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 商品规格服务
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${SkuService_1 === null || SkuService_1 === void 0 ? void 0 : SkuService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
     `;
        this.repository = null;
        this.skuListRepository = null;
    }
    /**
     * 分页查询商品规格数据
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页参数
     * @returns Promise<any> - 返回分页查询结果
     */
    async page(query = "", params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let whereSql = " "; // 查询条件字符串
        let parameters = [];
        if (params && params.length > 3) {
            parameters = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, params);
        }
        whereSql +=
            ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, (_c = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _c === void 0 ? void 0 : _c.call(strUtils, parameters, ["current", "pageSize"]))) +
                ((_d = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _d === void 0 ? void 0 : _d.call(sqlUtils, ["name"], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue)) +
                ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) +
                ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query)); // 处理前端的表格中筛选需求
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
     * 根据ID查询一条商品规格数据
     * @param id - 商品规格ID
     * @returns Promise<any> - 返回查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = SkuService_1.TABLE_NAME + `:${id}`;
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
     * 根据商品规格ID删除商品规格信息
     * @param ids - 商品规格ID数组
     * @returns Promise<void> - 无返回值
     */
    async del(ids) {
        var _a, _b;
        // 根据商品规格ID删除商品规格信息
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新或插入SKU规格信息
     * @param obj - 包含SKU规格信息的对象
     * @returns Promise<SkuKey> - 返回更新后的SKU规格信息对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = "";
        // 删除redis缓存
        const key = (SkuService_1 === null || SkuService_1 === void 0 ? void 0 : SkuService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, SkuService_1 === null || SkuService_1 === void 0 ? void 0 : SkuService_1.TABLE_NAME, null, obj === null || obj === void 0 ? void 0 : obj.id));
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, SkuService_1 === null || SkuService_1 === void 0 ? void 0 : SkuService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, SkuService_1 === null || SkuService_1 === void 0 ? void 0 : SkuService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
     * 将JSON字符串转换为中文格式的字符串
     * @param jsonStr - 输入的JSON字符串
     * @returns Promise<string> - 返回转换后的中文格式字符串
     */
    async json2CnStr(jsonStr) {
        var _a, _b, _c, _d, _e;
        // 将JSON字符串转换为中文格式的字符串
        jsonStr = (_a = _ === null || _ === void 0 ? void 0 : _.replace) === null || _a === void 0 ? void 0 : _a.call(_, jsonStr, "[", "");
        jsonStr = (_b = _ === null || _ === void 0 ? void 0 : _.replace) === null || _b === void 0 ? void 0 : _b.call(_, jsonStr, "]", "");
        jsonStr = (_c = _ === null || _ === void 0 ? void 0 : _.replace) === null || _c === void 0 ? void 0 : _c.call(_, jsonStr, "{", "");
        jsonStr = (_d = _ === null || _ === void 0 ? void 0 : _.replace) === null || _d === void 0 ? void 0 : _d.call(_, jsonStr, "}", "");
        jsonStr = (_e = _ === null || _ === void 0 ? void 0 : _.replace) === null || _e === void 0 ? void 0 : _e.call(_, jsonStr, '"', "");
        return jsonStr;
    }
    /**
     * 提取购买信息中的SKU规格信息
     * @param jsonArray - 包含购买信息的JSON数组
     * @returns Promise<any[]> - 返回提取出的SKU规格信息数组
     */
    async changeSkuList(jsonArray) {
        // 提取出购买信息中的SKU规格信息
        return null;
    }
    /**
     * 根据id查询一条商品规格数据
     * @param id - 商品规格ID
     * @returns Promise<void> - 无返回值
     */
    async selectById(id) {
        // 根据id查询一条数据
    }
    /**
     * 取得商品规格的有效价格库存信息（库存需大于0）
     * @param goodsId - 商品ID
     * @param skuPriceUnit - 商品规格的价格单位
     * @param shopBuyerId - 买家ID（可选）
     * @returns Promise<void> - 无返回值
     */
    async getValidSkuList(goodsId, skuPriceUnit, shopBuyerId = "") {
        // 取得商品规格的有效价格库存信息（库存需大于0）
    }
    async getInitialSku(jsonArray, goodsId, shopBuyerId = "") {
        // 取得此买家针对于此商品的默认SKU规格价格库存信息,如此买家购物车中没有此商品信息,则使用此商品的默认SKU规格价格库存信息,如购物车中有,则使用购物车中最新购买的信息
    }
    /**
     * 更新商品规格的有效价格库存信息（库存需大于0）中的默认选中的库存
     * @param goodsId - 商品ID
     * @param initialSkuListMap - 包含默认选中库存的商品规格信息映射
     * @returns Promise<void> - 无返回值
     */
    async updateGoodsInitialSku(goodsId, initialSkuListMap) {
        // 更新商品规格的有效价格库存信息（库存需大于0）中的默认选中的库存
    }
    /**
     * 取得商品规格的价格库存信息
     * @param goodsId - 商品ID
     * @param skuPriceUnit - 商品规格的价格单位
     * @param isUpdate - 是否更新商品规格的价格库存信息
     * @returns Promise<void> - 无返回值
     */
    async getSkuList(goodsId, skuPriceUnit, isUpdate) {
        // 取得商品规格的价格库存信息
    }
    /**
     * 保存商品规格的价格库存信息
     * @param skuList - 商品规格的价格库存信息
     * @returns Promise<void> - 无返回值
     */
    async saveSkuList(skuList) {
        // 编辑商品规格的价格库存信息
    }
    /**
     * 根据商品规格ID、商品ID和商品规格列表获取商品规格的中文名称
     * @param skuListId - 商品规格ID
     * @param goodsId - 商品ID
     * @param skuList - 商品规格列表
     * @returns Promise<any> - 返回商品规格的中文名称
     */
    async getSkuListCn(skuListId, goodsId, skuList) {
        // 如果商品规格ID或商品规格列表为空，则返回空对象
        if (!skuListId || !skuList) {
            return {};
        }
    }
    /**
     * 减少商品规格的库存数量
     * @param id - 商品规格ID
     * @param subStock - 要减少的库存数量
     * @returns Promise<void> - 无返回值
     */
    async subStock(id, subStock) {
        var _a, _b, _c, _d, _e;
        // 根据商品规格ID查询商品规格信息
        const skuList = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.skuListRepository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
        // 减少商品规格的库存数量
        skuList.stockNum = (_c = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _c === void 0 ? void 0 : _c.call(_, skuList.stockNum, subStock);
        // 保存更新后的商品规格信息到数据库中
        await ((_e = (_d = this === null || this === void 0 ? void 0 : this.skuListRepository) === null || _d === void 0 ? void 0 : _d.save) === null || _e === void 0 ? void 0 : _e.call(_d, skuList));
    }
    /**
     * 增加商品规格的库存数量
     * @param id - 商品规格ID
     * @param subStock - 要增加的库存数量
     * @returns Promise<void> - 无返回值
     */
    async refundStock(id, subStock) {
        var _a, _b, _c, _d;
        // 根据商品规格ID查询商品规格信息
        const skuList = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.skuListRepository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
        // 增加商品规格的库存数量
        skuList.stockNum = _ === null || _ === void 0 ? void 0 : _.add(skuList.stockNum, subStock);
        // 保存更新后的商品规格信息到数据库中
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.skuListRepository) === null || _c === void 0 ? void 0 : _c.save) === null || _d === void 0 ? void 0 : _d.call(_c, skuList));
    }
};
// 查询的数据库表名称
SkuService.TABLE_NAME = "sku_key";
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], SkuService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(SkuKey_1.SkuKey),
    __metadata("design:type", typeorm_1.Repository)
], SkuService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(SkuList_1.SkuList),
    __metadata("design:type", typeorm_1.Repository)
], SkuService.prototype, "skuListRepository", void 0);
SkuService = SkuService_1 = __decorate([
    (0, decorator_1.Provide)()
], SkuService);
exports.SkuService = SkuService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t1LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS90cmFkZS9za3Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELGlFQUE2RDtBQUc3RCxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBQ3RELGdEQUE2QztBQUc3QyxrREFBK0M7QUFFL0MsMkRBQXdEO0FBRXhELDRCQUE2QjtBQUU3QixxREFBcUQ7QUFDckQscURBQXFEO0FBR3JELElBQWEsVUFBVSxrQkFBdkIsTUFBYSxVQUFXLFNBQVEsMEJBQVc7SUFBM0M7O1FBQ0UsU0FBUztRQUVELFdBQU0sR0FBWSxJQUFJLENBQUM7UUFLL0IsZUFBZTtRQUNQLFlBQU8sR0FBRyxTQUFTLFlBQVUsYUFBVixZQUFVLHVCQUFWLFlBQVUsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUN2RCxzQkFBc0I7UUFDZCxjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU07O01BRXRDLENBQUM7UUFHRyxlQUFVLEdBQXVCLElBQUksQ0FBQztRQUd0QyxzQkFBaUIsR0FBd0IsSUFBSSxDQUFDO0lBaVV4RCxDQUFDO0lBaFVDOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUNmLEtBQUssR0FBRyxFQUFFLEVBQ1YsTUFBYyxFQUNkLFFBQWtCLEVBQ2xCLElBQVU7UUFFVixXQUFXOztRQUVYLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFVBQVU7UUFFOUIsSUFBSSxVQUFVLEdBQVUsRUFBRSxDQUFDO1FBRTNCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLFVBQVUsR0FBRyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLHFEQUFHLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO1FB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