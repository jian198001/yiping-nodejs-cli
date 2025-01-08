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
var MaterialService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const Material_1 = require("../../entity/Material");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
/**
 * 物料服务类
 * 提供物料的分页查询、根据ID查询、删除、更新、上架、下架、库存统计、增加库存、减少库存等功能
 */
let MaterialService = MaterialService_1 = class MaterialService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${MaterialService_1 === null || MaterialService_1 === void 0 ? void 0 : MaterialService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = `  SELECT t.*
  , ( CONCAT(t.name, '-', t.sku)) AS label
  , ( CONCAT(t.name, '-', t.sku)) AS text
  , t.id AS value 
  , ( CASE t.approve_status WHEN 'onsale' THEN '上架出售中' ELSE '仓库中' END ) approve_status_cn
  , ( CASE t.sub_stock WHEN 'pay' THEN '付款减库存' WHEN 'delivery' THEN '出库减库存' ELSE '下单减库存' END ) AS sub_stock_cn
  , ( CASE t.delivery WHEN 'delivery' THEN '需物流' ELSE '电子凭证不需物流' END ) AS delivery_cn
        , ( length * breadth * height ) AS volume
     `;
        // 注入Material实体的Repository
        this.repository = null;
    }
    /**
     * 分页查询物料
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(query = '', params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        console.log('test page');
        let whereSql = ' '; // 查询条件字符串
        let parameters = [];
        if (params && params.length > 3) {
            parameters = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, params);
        }
        // 处理前端的表格中筛选需求
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, (_c = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _c === void 0 ? void 0 : _c.call(strUtils, parameters, ['current', 'pageSize',]))) + ((_d = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _d === void 0 ? void 0 : _d.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue)) + ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
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
     * 根据ID查询物料
     * @param id - 物料ID
     * @param shopBuyerId - 店铺买家ID
     * @returns 查询结果
     */
    async getById(id) {
        // 根据id查询一条数据
        var _a;
        return (_a = super.getByIdBase) === null || _a === void 0 ? void 0 : _a.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql);
    }
    /**
     * 根据ID数组删除物料
     * @param ids - 物料ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = MaterialService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新物料
     * @param obj - 物料对象
     * @returns 更新后的物料对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let log = "";
        // 删除redis缓存
        const key = (MaterialService_1 === null || MaterialService_1 === void 0 ? void 0 : MaterialService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, MaterialService_1 === null || MaterialService_1 === void 0 ? void 0 : MaterialService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
        }
        (_g = (_f = this === null || this === void 0 ? void 0 : this.logger) === null || _f === void 0 ? void 0 : _f.info) === null || _g === void 0 ? void 0 : _g.call(_f, '新增或修改商品');
        if (!(obj === null || obj === void 0 ? void 0 : obj.name) ||
            !(obj === null || obj === void 0 ? void 0 : obj.materialCategoryId) ||
            !(obj === null || obj === void 0 ? void 0 : obj.materialSn)) {
            log = '商品名称/商品分类/商品货号某些内容为空';
            throw new Zero0Error_1.Zero0Error(log, '5000');
        }
        if (!obj.price || (obj === null || obj === void 0 ? void 0 : obj.price) < 0.01) {
            log = '商品价格设置错误';
            throw new Zero0Error_1.Zero0Error(log, '5000');
        }
        if (!(obj === null || obj === void 0 ? void 0 : obj.approveStatus)) {
            obj.approveStatus = 'instock';
        }
        if (!(obj === null || obj === void 0 ? void 0 : obj.title)) {
            obj.title = obj === null || obj === void 0 ? void 0 : obj.name;
        }
        if (!(obj === null || obj === void 0 ? void 0 : obj.originPrice)) {
            obj.originPrice = obj === null || obj === void 0 ? void 0 : obj.price;
        }
        if (!(obj === null || obj === void 0 ? void 0 : obj.quota) || (obj === null || obj === void 0 ? void 0 : obj.quota) < 1) {
            obj.quota = 1000000000;
        }
        if (!(obj === null || obj === void 0 ? void 0 : obj.startSaleNum) || (obj === null || obj === void 0 ? void 0 : obj.startSaleNum) < 1) {
            obj.startSaleNum = 1;
        }
        await ((_j = (_h = this === null || this === void 0 ? void 0 : this.repository) === null || _h === void 0 ? void 0 : _h.save) === null || _j === void 0 ? void 0 : _j.call(_h, obj)); // insert update
        if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
            await ((_k = super.sortOrder) === null || _k === void 0 ? void 0 : _k.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, MaterialService_1 === null || MaterialService_1 === void 0 ? void 0 : MaterialService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
        }
        return null;
    }
    /**
     * 更新物料审批状态
     * @param id - 物料ID
     * @returns 更新后的物料对象
     */
    async updateApproveStatus(id) {
        return null;
    }
    /**
     * 下架物料
     * @param materialId - 物料ID
     * @returns 无返回值
     */
    async instock(materialId) {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '商品下架');
        const material = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, materialId));
        material.approveStatus = 'instock';
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, material));
        return;
    }
    /**
     * 上架物料
     * @param materialId - 物料ID
     * @returns 无返回值
     */
    async onsale(materialId) {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '商品上架');
        const material = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, materialId));
        material.approveStatus = 'onsale';
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, material));
        return;
    }
    /**
     * 物料统计
     * @param shopId - 店铺ID
     * @returns 物料数量
     */
    async materialCount(shopId) {
        return null;
    }
    /**
     * 库存统计
     * @param materialId - 物料ID
     * @param materialSkuId - 物料SKU ID
     * @param skuList - SKU列表
     * @param quantity - 数量
     * @returns 无返回值
     */
    async countStock(materialId, materialSkuId, skuList, quantity) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '判断商品库存是否充足,是否能满足此次购买所需库存');
        const material = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, materialId));
        (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.info) === null || _f === void 0 ? void 0 : _f.call(_e, '多规格商品');
        // TODO
        (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.call(_g, '单规格商品');
        if (quantity > material.stock) {
            log = '商品' + material.name + '库存不足';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.error) === null || _k === void 0 ? void 0 : _k.call(_j, log, zero0Error);
            throw zero0Error;
        }
    }
    /**
     * 增加库存
     * @param materialId - 物料ID
     * @param materialSkuId - 物料SKU ID
     * @param quantity - 数量
     * @returns 无返回值
     */
    async addStock(materialId, materialSkuId, quantity) {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '增加库存');
        return null;
    }
    /**
     * 减少库存
     * @param materialId - 物料ID
     * @param materialSkuId - 物料SKU ID
     * @param quantity - 数量
     * @returns 无返回值
     */
    async reduceStock(materialId, materialSkuId, quantity) {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '减少库存');
        return null;
    }
};
// 查询的数据库表名称
MaterialService.TABLE_NAME = 'material';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], MaterialService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Material_1.Material),
    __metadata("design:type", typeorm_1.Repository)
], MaterialService.prototype, "repository", void 0);
MaterialService = MaterialService_1 = __decorate([
    (0, decorator_1.Provide)()
], MaterialService);
exports.MaterialService = MaterialService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3B1cmNoYXNlL21hdGVyaWFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCxpRUFBNkQ7QUFHN0QscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUN0RCxvREFBaUQ7QUFHakQsMkRBQXdEO0FBRXhELHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsNEJBQTZCO0FBRTdCOzs7R0FHRztBQUVILElBQWEsZUFBZSx1QkFBNUIsTUFBYSxlQUFnQixTQUFRLDBCQUFXO0lBQWhEOztRQUVFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSy9CLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxpQkFBZSxhQUFmLGlCQUFlLHVCQUFmLGlCQUFlLENBQUUsVUFBVSxLQUFLLENBQUM7UUFFNUQsc0JBQXNCO1FBQ2QsY0FBUyxHQUFHOzs7Ozs7OztNQVFoQixDQUFDO1FBRUwsMEJBQTBCO1FBRWxCLGVBQVUsR0FBeUIsSUFBSSxDQUFDO0lBNlNsRCxDQUFDO0lBM1NDOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUNmLEtBQUssR0FBRyxFQUFFLEVBQUUsTUFBYyxFQUFFLFFBQWtCLEVBQzlDLElBQVU7UUFFVixXQUFXOztRQUVYLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekIsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFBLENBQUMsVUFBVTtRQUU3QixJQUFJLFVBQVUsR0FBVSxFQUFFLENBQUE7UUFFMUIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFL0IsVUFBVSxHQUFHLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEtBQUsscURB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