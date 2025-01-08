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
var GoodsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsService = void 0;
// 导入所需的模块和装饰器
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const Goods_1 = require("../../entity/Goods");
const Zero0Error_1 = require("../common/model/Zero0Error");
const shop_service_1 = require("./shop.service");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const MultipartFile_1 = require("../../entity/MultipartFile");
const fileUtils = require("../common/utils/fileUtils");
const _ = require("lodash");
/**
 * 商品服务类
 */
let GoodsService = GoodsService_1 = class GoodsService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 配置项：域名
        this.domain = { domainName: "" };
        // 应用实例
        this.app = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${GoodsService_1 === null || GoodsService_1 === void 0 ? void 0 : GoodsService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
    , ( SELECT name FROM goods_category WHERE goods_category.id = t.goods_category_id ) AS goods_category_name
    , ( CASE t.approve_status WHEN 'onsale' THEN '上架出售中' ELSE '仓库中' END ) approve_status_cn
    , ( CASE t.sub_stock WHEN 'pay' THEN '付款减库存' WHEN 'delivery' THEN '出库减库存' ELSE '下单减库存' END ) AS sub_stock_cn
    , ( CASE t.delivery WHEN 'delivery' THEN '需物流' ELSE '电子凭证不需物流' END ) AS delivery_cn
    , ( length * breadth * height ) AS volume
    , ( CASE t.unit WHEN 'mass' THEN '质量(公斤kg)' WHEN 'volume' THEN '体积(毫升ml)' WHEN 'time' THEN '时间(分minute)' WHEN 'length' THEN '距离(公里km)' WHEN 'area' THEN '面积(平方米m2)' ELSE '件' END ) AS unit_cn 
    , IFNULL(( SELECT uri FROM multipart_file WHERE ext_id = t.id LIMIT 0, 1 ), '${GoodsService_1.emptyGoodsImg}') AS img 
     `;
        // 注入商品实体模型
        this.repository = null;
        // 注入店铺服务
        this.shopService = null;
        // 注入文件上传实体模型
        this.multipartFileRepository = null;
    }
    /**
     * 分页查询商品数据
     * @param goodsCategoryId - 商品分类ID
     * @param approveStatus - 商品审核状态
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(goodsCategoryId = "", approveStatus = "", query = "", params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // 查询条件字符串
        let whereSql = " ";
        // 根据商品分类ID筛选
        if (goodsCategoryId) {
            whereSql += ` AND t.goods_category_id = '${goodsCategoryId}' `;
        }
        // 根据商品审核状态筛选
        if (approveStatus) {
            whereSql += ` AND t.approve_status = '${approveStatus}' `;
        }
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
        // 遍历查询结果,将查询结果中异步读取到redis
        (_h = this === null || this === void 0 ? void 0 : this.getToRedis) === null || _h === void 0 ? void 0 : _h.call(this, (_j = _ === null || _ === void 0 ? void 0 : _.map) === null || _j === void 0 ? void 0 : _j.call(_, data === null || data === void 0 ? void 0 : data.list, "id"));
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
     * 根据ID查询商品数据
     * @param id - 商品ID
     * @param shopBuyerId - 店铺买家ID
     * @returns 查询结果
     */
    async getById(id) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 根据id查询一条数据
        const goods = await ((_a = super.getByIdBase) === null || _a === void 0 ? void 0 : _a.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql));
        if (!goods) {
            return null;
        }
        const skus = {};
        const properties = [];
        let showAddCart = true;
        // 获取店铺信息
        const shop = await ((_c = (_b = this === null || this === void 0 ? void 0 : this.shopService) === null || _b === void 0 ? void 0 : _b.getById) === null || _c === void 0 ? void 0 : _c.call(_b, goods === null || goods === void 0 ? void 0 : goods.shopId));
        // 判断是否显示添加购物车按钮
        if ((shop === null || shop === void 0 ? void 0 : shop.cart) === "0") {
            showAddCart = false;
        }
        goods.skus = skus;
        goods.properties = properties;
        goods.showAddCart = showAddCart;
        // 获取商品图片信息
        const multipartFiles = await ((_e = this === null || this === void 0 ? void 0 : (_d = this.multipartFileRepository).findBy) === null || _e === void 0 ? void 0 : _e.call(_d, { extId: id }));
        const imgs = [];
        if (multipartFiles) {
            for (const multipartFile of multipartFiles) {
                // 拼接图片URL
                (_f = imgs.push) === null || _f === void 0 ? void 0 : _f.call(imgs, "https://" + (this === null || this === void 0 ? void 0 : this.domain.domainName) + multipartFile.uri);
            }
            // 拼接商品主图URL
            goods.img = "https://" + (this === null || this === void 0 ? void 0 : this.domain.domainName) + goods.img;
        }
        else {
            // 添加默认图片
            (_g = imgs.push) === null || _g === void 0 ? void 0 : _g.call(imgs, GoodsService_1.emptyGoodsImg);
        }
        goods.imgs = imgs;
        return goods;
    }
    /**
     * 删除商品数据
     * @param ids - 商品ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = GoodsService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        } // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新商品数据
     * @param obj - 商品对象
     * @param imgs - 商品图片
     * @returns 更新后的商品对象
     */
    async update(obj, imgs = "") {
        // 删除redis缓存
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        const key = (GoodsService_1 === null || GoodsService_1 === void 0 ? void 0 : GoodsService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, GoodsService_1 === null || GoodsService_1 === void 0 ? void 0 : GoodsService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id));
        if (uniqueText) {
            // 某unique字段值已存在，抛出异常，程序处理终止
            const log = uniqueText + "已存在，操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        let log = "";
        // 新增数据，主键id的随机字符串值，由后端typeorm
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
            obj === null || obj === void 0 ? true : delete obj.id;
        }
        (_g = (_f = this === null || this === void 0 ? void 0 : this.logger) === null || _f === void 0 ? void 0 : _f.info) === null || _g === void 0 ? void 0 : _g.call(_f, "新增或修改商品");
        if (!(obj === null || obj === void 0 ? void 0 : obj.name) || !(obj === null || obj === void 0 ? void 0 : obj.goodsCategoryId) || !(obj === null || obj === void 0 ? void 0 : obj.goodsSn)) {
            log = "商品名称/商品分类/商品货号某些内容为空";
            throw new Zero0Error_1.Zero0Error(log, "5000");
        }
        if (!(obj === null || obj === void 0 ? void 0 : obj.approveStatus)) {
            obj.approveStatus = "instock";
        }
        if (!(obj === null || obj === void 0 ? void 0 : obj.title)) {
            obj.title = obj === null || obj === void 0 ? void 0 : obj.name;
        }
        if (!(obj === null || obj === void 0 ? void 0 : obj.quota) || (obj === null || obj === void 0 ? void 0 : obj.quota) < 1) {
            obj.quota = 1000000000;
        }
        if (!(obj === null || obj === void 0 ? void 0 : obj.startSaleNum) || (obj === null || obj === void 0 ? void 0 : obj.startSaleNum) < 1) {
            obj.startSaleNum = 1;
        }
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_j = (_h = this === null || this === void 0 ? void 0 : this.repository) === null || _h === void 0 ? void 0 : _h.save) === null || _j === void 0 ? void 0 : _j.call(_h, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_k = super.sortOrder) === null || _k === void 0 ? void 0 : _k.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GoodsService_1 === null || GoodsService_1 === void 0 ? void 0 : GoodsService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            await (this === null || this === void 0 ? void 0 : this.imgUpdate(imgs, obj === null || obj === void 0 ? void 0 : obj.id));
            return null;
        }
        let old = await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.findOneById) === null || _m === void 0 ? void 0 : _m.call(_l, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_p = (_o = this === null || this === void 0 ? void 0 : this.repository) === null || _o === void 0 ? void 0 : _o.save) === null || _p === void 0 ? void 0 : _p.call(_o, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_q = super.sortOrder) === null || _q === void 0 ? void 0 : _q.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GoodsService_1 === null || GoodsService_1 === void 0 ? void 0 : GoodsService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            await (this === null || this === void 0 ? void 0 : this.imgUpdate(imgs, obj === null || obj === void 0 ? void 0 : obj.id));
            return null;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        await (this === null || this === void 0 ? void 0 : this.imgUpdate(imgs, old === null || old === void 0 ? void 0 : old.id));
        await ((_s = (_r = this === null || this === void 0 ? void 0 : this.repository) === null || _r === void 0 ? void 0 : _r.save) === null || _s === void 0 ? void 0 : _s.call(_r, old)); // 修改数据
    }
    /**
     * 更新审批状态
     * @param id - 商品ID
     * @returns 更新后的商品对象
     */
    async updateApproveStatus(id) {
        return null;
    }
    /**
     * 商品下架
     * @param goodsId - 商品ID
     * @returns 无返回值
     */
    async instock(goodsId) {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "商品下架");
        const goods = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, goodsId));
        goods.approveStatus = "instock";
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, goods));
        return;
    }
    /**
     * 商品上架
     * @param goodsId - 商品ID
     * @returns 无返回值
     */
    async onsale(goodsId) {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "商品上架");
        const goods = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, goodsId));
        goods.approveStatus = "onsale";
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, goods));
        return;
    }
    /**
     * 商品数量
     * @param shopId - 店铺ID
     * @returns 商品数量
     */
    async goodsCount(shopId) {
        return null;
    }
    /**
     * 库存变更
     * @param goodsId - 商品ID
     * @param goodsSkuId - 商品SKU ID
     * @param skuList - SKU列表
     * @param quantity - 数量
     * @returns 无返回值
     */
    async countStock(goodsId, goodsSkuId, skuList, quantity) {
        // let log = '';
        var _a, _b, _c, _d;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "判断商品库存是否充足,是否能满足此次购买所需库存");
        // const goods: Goods = await this?.repository?.findOneById?.(goodsId);
        (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.call(_c, "多规格商品");
        // TODO
    }
    /**
     * 增加库存
     * @param goodsId - 商品ID
     * @param goodsSkuId - 商品SKU ID
     * @param quantity - 数量
     * @returns 无返回值
     */
    async addStock(goodsId, goodsSkuId, quantity) {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "增加库存");
        return null;
    }
    /**
     * 减少库存
     * @param goodsId - 商品ID
     * @param goodsSkuId - 商品SKU ID
     * @param quantity - 数量
     * @returns 无返回值
     */
    async reduceStock(goodsId, goodsSkuId, quantity) {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "减少库存");
        return null;
    }
    async imgUpdate(imgs = "", goodsId = "") {
        var _a, _b, _c, _d, _e;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.multipartFileRepository) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, { extId: goodsId }));
        if (!imgs)
            return;
        const imgArr = (_c = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _c === void 0 ? void 0 : _c.call(JSON, decodeURIComponent === null || decodeURIComponent === void 0 ? void 0 : decodeURIComponent(imgs));
        if (!imgArr)
            return;
        for (const element of imgArr) {
            const multipartFile = new MultipartFile_1.MultipartFile();
            multipartFile.uri = element;
            multipartFile.extId = goodsId;
            await ((_e = (_d = this === null || this === void 0 ? void 0 : this.multipartFileRepository) === null || _d === void 0 ? void 0 : _d.save) === null || _e === void 0 ? void 0 : _e.call(_d, multipartFile));
        }
    }
    async imgUpload(files, query) {
        // 一个商品分类只能对应一个图片，所以上传新图片前删除旧图片
        var _a, _b, _c;
        // 得到当前上传文件的暂存文件路径
        const file = files === null || files === void 0 ? void 0 : files[0];
        const uri = fileUtils === null || fileUtils === void 0 ? void 0 : fileUtils.copySync(file, "goods", (_a = this === null || this === void 0 ? void 0 : this.app) === null || _a === void 0 ? void 0 : _a.getAppDir());
        // public/fileLoad/upload/新文件名，作为multipart_file表的uri字段值，业务ID（如传送的是车辆的驾驶证，则业务ID是car表的pid），作为multipart_file表的ext_id,ext_type是car_行驶证的英文
        const multipartFile = new MultipartFile_1.MultipartFile();
        multipartFile.uri = uri;
        multipartFile.extId = query === null || query === void 0 ? void 0 : query.id;
        // multipartFile.extType = query?.mimeType
        await ((_c = (_b = this === null || this === void 0 ? void 0 : this.multipartFileRepository) === null || _b === void 0 ? void 0 : _b.save) === null || _c === void 0 ? void 0 : _c.call(_b, multipartFile));
        // 把multipart_file对象信息返回
        return multipartFile;
    }
};
// 商品图片为空时的默认图片
GoodsService.emptyGoodsImg = "http://cdn.uviewui.com/uview/empty/data.png";
// 查询的数据库表名称
GoodsService.TABLE_NAME = "goods";
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], GoodsService.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.Config)("domain"),
    __metadata("design:type", Object)
], GoodsService.prototype, "domain", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], GoodsService.prototype, "app", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Goods_1.Goods),
    __metadata("design:type", typeorm_1.Repository)
], GoodsService.prototype, "repository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", shop_service_1.ShopService)
], GoodsService.prototype, "shopService", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(MultipartFile_1.MultipartFile),
    __metadata("design:type", typeorm_1.Repository)
], GoodsService.prototype, "multipartFileRepository", void 0);
GoodsService = GoodsService_1 = __decorate([
    (0, decorator_1.Provide)()
], GoodsService);
exports.GoodsService = GoodsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3RyYWRlL2dvb2RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxtREFBMkU7QUFFM0UsaUVBQTZEO0FBRzdELHFDQUFxQztBQUNyQywrQ0FBc0Q7QUFDdEQsOENBQTJDO0FBRTNDLDJEQUF3RDtBQUN4RCxpREFBNkM7QUFFN0MscURBQXFEO0FBQ3JELHFEQUFxRDtBQUNyRCw4REFBMkQ7QUFDM0QsdURBQXVEO0FBQ3ZELDRCQUE2QjtBQUU3Qjs7R0FFRztBQUVILElBQWEsWUFBWSxvQkFBekIsTUFBYSxZQUFhLFNBQVEsMEJBQVc7SUFBN0M7O1FBQ0UsUUFBUTtRQUVBLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0IsU0FBUztRQUVELFdBQU0sR0FBUSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUV6QyxPQUFPO1FBRUMsUUFBRyxHQUFnQixJQUFJLENBQUM7UUFRaEMsZUFBZTtRQUNQLFlBQU8sR0FBRyxTQUFTLGNBQVksYUFBWixjQUFZLHVCQUFaLGNBQVksQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUV6RCxzQkFBc0I7UUFDZCxjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU07Ozs7Ozs7bUZBT3VDLGNBQVksQ0FBQyxhQUFhO01BQ3ZHLENBQUM7UUFFTCxXQUFXO1FBRUgsZUFBVSxHQUFzQixJQUFJLENBQUM7UUFFN0MsU0FBUztRQUVELGdCQUFXLEdBQWdCLElBQUksQ0FBQztRQUV4QyxhQUFhO1FBRUwsNEJBQXVCLEdBQThCLElBQUksQ0FBQztJQWthcEUsQ0FBQztJQWhhQzs7Ozs7Ozs7O09BU0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUNmLGVBQWUsR0FBRyxFQUFFLEVBQ3BCLGFBQWEsR0FBRyxFQUFFLEVBQ2xCLEtBQUssR0FBRyxFQUFFLEVBQ1YsTUFBYyxFQUNkLFFBQWtCLEVBQ2xCLElBQVU7O1FBRVYsVUFBVTtRQUNWLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUVuQixhQUFhO1FBQ2IsSUFBSSxlQUFlLEVBQUU7WUFDbkIsUUFBUSxJQUFJLCtCQUErQixlQUFlLElBQUksQ0FBQztTQUNoRTtRQUVELGFBQWE7UUFDYixJQUFJLGFBQWEsRUFBRTtZQUNqQixRQUFRLElBQUksNEJBQTRCLGFBQWEsSUFBSSxDQUFDO1NBQzNEO1FBRUQsa0JBQWtCO1FBQ2xCLFFBQVEsSUFBSSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLHlEQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRTlELGVBQWU7UUFDZixRQUFRO1lBQ04sQ0FBQSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxjQUFjLHlEQUFHLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLENBQUM7aUJBQzdDLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGFBQWEseURBQ3JCLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGFBQWEseURBQUcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsS0FBSyxxREFBRyxNQUFNLENBQUMsRUFBRTtvQkFDL0MsU0FBUztvQkFDVCxVQUFVO2lCQUNYLENBQUMsQ0FDSCxDQUFBO2lCQUNELE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEtBQUsseURBQUcsS0FBSyxDQUFDLENBQUEsQ0FBQztRQUUzQixvQkFBb0I7UUFDcEIsTUFBTSxJQUFJLEdBQVEsTUFBTSxDQUFBLE1BQUEsS0FBSyxDQUFDLFFBQVEscURBQ3BDLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxTQUFTLEVBQ2YsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sRUFDYixRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksQ0FDTCxDQUFBLENBQUM7UUFFRiwwQkFBMEI7UUFFMUIsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsVUFBVSxxREFBRyxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxHQUFHLGtEQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsSUFBRyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQUksQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUSxJQUFHLENBQUMsRUFBRTtZQUN0Qiw4RUFBOEU7WUFDOUUsT0FBTyxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxLQUFLLGtEQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHO1FBQzFCLGFBQWE7O1FBRWIsS0FBSyxNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUU7WUFDcEIsTUFBTSxDQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8scURBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBVTs7UUFDN0IsYUFBYTtRQUNiLE1BQU0sS0FBSyxHQUFRLE1BQU0sQ0FBQSxNQUFBLEtBQUssQ0FBQyxXQUFXLHFEQUN4QyxFQUFFLEVBQ0YsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFNBQVMsRUFDZixJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsT0FBTyxDQUNkLENBQUEsQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsTUFBTSxJQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sVUFBVSxHQUFVLEVBQUUsQ0FBQztRQUM3QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFdkIsU0FBUztRQUNULE1BQU0sSUFBSSxHQUFTLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFdBQVcsMENBQUUsT0FBTyxtREFBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsTUFBTSxDQUFDLENBQUEsQ0FBQztRQUVyRSxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLE1BQUssR0FBRyxFQUFFO1lBQ3RCLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDckI7UUFFRCxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM5QixLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUVoQyxXQUFXO1FBQ1gsTUFBTSxjQUFjLEdBQ2xCLE1BQU0sQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLDZCQUFKLElBQUksQ0FBRSx1QkFBdUIsRUFBQyxNQUFNLG1EQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztRQUU5RCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7UUFFMUIsSUFBSSxjQUFjLEVBQUU7WUFDbEIsS0FBSyxNQUFNLGFBQWEsSUFBSSxjQUFjLEVBQUU7Z0JBQzFDLFVBQVU7Z0JBQ1YsTUFBQSxJQUFJLENBQUMsSUFBSSxxREFBRyxVQUFVLElBQUcsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUEsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkU7WUFDRCxZQUFZO1lBQ1osS0FBSyxDQUFDLEdBQUcsR0FBRyxVQUFVLElBQUcsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQzlEO2FBQU07WUFDTCxTQUFTO1lBQ1QsTUFBQSxJQUFJLENBQUMsSUFBSSxxREFBRyxjQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDekM7UUFFRCxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVsQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFhO1FBQzVCLFlBQVk7O1FBRVosS0FBSyxNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUU7WUFDcEIsTUFBTSxHQUFHLEdBQUcsY0FBWSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBRS9DLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFlBQVksMENBQUUsR0FBRyxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDO1NBQ3RDLENBQUMsc0JBQXNCO1FBRXhCLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsTUFBTSxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBVSxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ3ZDLFlBQVk7O1FBRVosTUFBTSxHQUFHLEdBQUcsQ0FBQSxjQUFZLGFBQVosY0FBWSx1QkFBWixjQUFZLENBQUUsVUFBVSxJQUFHLElBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEVBQUUsRUFBRSxDQUFDO1FBRXJELE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFlBQVksMENBQUUsR0FBRyxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDO1FBRXJDLFdBQVc7UUFDWCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUEsTUFBQSxLQUFLLENBQUMsTUFBTSxxREFDbkMsY0FBWSxhQUFaLGNBQVksdUJBQVosY0FBWSxDQUFFLFVBQVUsRUFDeEIsRUFBRSxFQUNGLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxFQUFFLENBQ1IsQ0FBQSxDQUFDO1FBRUYsSUFBSSxVQUFVLEVBQUU7WUFDZCw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUNwQyxNQUFNLFVBQVUsR0FBZSxJQUFJLHVCQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNELE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxLQUFLLG1EQUFHLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2QyxNQUFNLFVBQVUsQ0FBQztTQUNsQjtRQUVELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLDhCQUE4QjtRQUU5QixJQUFJLENBQUMsQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsRUFBRSxDQUFBLEVBQUU7WUFDWixnQ0FBZ0M7WUFDaEMsR0FBRyxHQUFHLCtCQUErQixDQUFDO1lBQy9CLEdBQUcsYUFBSCxHQUFHLDRCQUFILEdBQUcsQ0FBRSxFQUFFLENBQUM7U0FDaEI7UUFFRCxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxTQUFTLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsSUFBSSxDQUFBLElBQUksQ0FBQyxDQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxlQUFlLENBQUEsSUFBSSxDQUFDLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sQ0FBQSxFQUFFO1lBQ3hELEdBQUcsR0FBRyxzQkFBc0IsQ0FBQztZQUU3QixNQUFNLElBQUksdUJBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbkM7UUFFRCxJQUFJLENBQUMsQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsYUFBYSxDQUFBLEVBQUU7WUFDdkIsR0FBRyxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDL0I7UUFFRCxJQUFJLENBQUMsQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsS0FBSyxDQUFBLEVBQUU7WUFDZixHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxJQUFJLENBQUM7U0FDdkI7UUFFRCxJQUFJLENBQUMsQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsS0FBSyxDQUFBLElBQUksQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsS0FBSyxJQUFHLENBQUMsRUFBRTtZQUNqQyxHQUFHLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUN4QjtRQUVELElBQUksQ0FBQyxDQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxZQUFZLENBQUEsSUFBSSxDQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxZQUFZLElBQUcsQ0FBQyxFQUFFO1lBQy9DLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxDQUFDLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEVBQUUsQ0FBQSxFQUFFO1lBQ1osZ0NBQWdDO1lBQ2hDLEdBQUcsR0FBRywrQkFBK0IsQ0FBQztZQUMvQixHQUFHLGFBQUgsR0FBRyw0QkFBSCxHQUFHLENBQUUsRUFBRSxDQUFDO1lBRWYsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsVUFBVSwwQ0FBRSxJQUFJLG1EQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxnQkFBZ0I7WUFFckQsSUFBSSxDQUFDLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFFBQVEsQ0FBQSxFQUFFO2dCQUNsQixNQUFNLENBQUEsTUFBQSxLQUFLLENBQUMsU0FBUyxxREFBRyxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBWSxhQUFaLGNBQVksdUJBQVosY0FBWSxDQUFFLFVBQVUsQ0FBQyxDQUFBLENBQUMsQ0FBQywyQkFBMkI7YUFDcEc7WUFFRCxNQUFNLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEVBQUUsQ0FBQyxDQUFBLENBQUM7WUFFckMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQUksR0FBRyxHQUFVLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsV0FBVyxtREFBRyxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLCtDQUErQztRQUVoSCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsMkJBQTJCO1lBRTNCLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsSUFBSSxtREFBRyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsZ0JBQWdCO1lBRXJELElBQUksQ0FBQyxDQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxRQUFRLENBQUEsRUFBRTtnQkFDbEIsTUFBTSxDQUFBLE1BQUEsS0FBSyxDQUFDLFNBQVMscURBQUcsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQVksYUFBWixjQUFZLHVCQUFaLGNBQVksQ0FBRSxVQUFVLENBQUMsQ0FBQSxDQUFDLENBQUMsMkJBQTJCO2FBQ3BHO1lBRUQsTUFBTSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxFQUFFLENBQUMsQ0FBQSxDQUFDO1lBRXJDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFTSxHQUFHLGFBQUgsR0FBRyw0QkFBSCxHQUFHLENBQUUsRUFBRSxDQUFDO1FBRWYsR0FBRyxHQUFHO1lBQ0osR0FBRyxHQUFHO1lBQ04sR0FBRyxHQUFHO1NBQ1AsQ0FBQztRQUVGLE1BQU0sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztRQUVyQyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLDBDQUFFLElBQUksbURBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLE9BQU87SUFDOUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBVTtRQUN6QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFlOztRQUNsQyxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxNQUFNLENBQUMsQ0FBQztRQUU3QixNQUFNLEtBQUssR0FBVSxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLDBDQUFFLFdBQVcsbURBQUcsT0FBTyxDQUFDLENBQUEsQ0FBQztRQUVwRSxLQUFLLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUVoQyxNQUFNLENBQUEsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLDBDQUFFLElBQUksbURBQUcsS0FBSyxDQUFDLENBQUEsQ0FBQztRQUV0QyxPQUFPO0lBQ1QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWU7O1FBQ2pDLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLE1BQU0sQ0FBQyxDQUFDO1FBRTdCLE1BQU0sS0FBSyxHQUFVLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsV0FBVyxtREFBRyxPQUFPLENBQUMsQ0FBQSxDQUFDO1FBRXBFLEtBQUssQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBRS9CLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVUsMENBQUUsSUFBSSxtREFBRyxLQUFLLENBQUMsQ0FBQSxDQUFDO1FBRXRDLE9BQU87SUFDVCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBYztRQUNwQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FDckIsT0FBZSxFQUNmLFVBQWtCLEVBQ2xCLE9BQWUsRUFDZixRQUFnQjtRQUVoQixnQkFBZ0I7O1FBRWhCLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLDBCQUEwQixDQUFDLENBQUM7UUFFakQsdUVBQXVFO1FBRXZFLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLE9BQU87SUFDVCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLFFBQVEsQ0FDbkIsT0FBZSxFQUNmLFVBQWtCLEVBQ2xCLFFBQWdCOztRQUVoQixNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sMENBQUUsSUFBSSxtREFBRyxNQUFNLENBQUMsQ0FBQztRQUU3QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsV0FBVyxDQUN0QixPQUFlLEVBQ2YsVUFBa0IsRUFDbEIsUUFBZ0I7O1FBRWhCLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxJQUFJLG1EQUFHLE1BQU0sQ0FBQyxDQUFDO1FBRTdCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsRUFBRTs7UUFDN0MsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsdUJBQXVCLDBDQUFFLE1BQU0sbURBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDO1FBRWxFLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTztRQUVsQixNQUFNLE1BQU0sR0FBVSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLHFEQUFHLGtCQUFrQixhQUFsQixrQkFBa0IsdUJBQWxCLGtCQUFrQixDQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPO1FBRXBCLEtBQUssTUFBTSxPQUFPLElBQUksTUFBTSxFQUFFO1lBQzVCLE1BQU0sYUFBYSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO1lBRTFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDO1lBRTVCLGFBQWEsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBRTlCLE1BQU0sQ0FBQSxNQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLHVCQUF1QiwwQ0FBRSxJQUFJLG1EQUFHLGFBQWEsQ0FBQyxDQUFBLENBQUM7U0FDNUQ7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFZLEVBQUUsS0FBVTtRQUM3QywrQkFBK0I7O1FBRS9CLGtCQUFrQjtRQUVsQixNQUFNLElBQUksR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsQ0FBQyxDQUFDLENBQUM7UUFFeEIsTUFBTSxHQUFHLEdBQVcsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLFFBQVEsQ0FDckMsSUFBSSxFQUNKLE9BQU8sRUFDUCxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLFNBQVMsRUFBRSxDQUN2QixDQUFDO1FBRUYscUlBQXFJO1FBRXJJLE1BQU0sYUFBYSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO1FBRTFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRXhCLGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEVBQUUsQ0FBQztRQUVoQywwQ0FBMEM7UUFFMUMsTUFBTSxDQUFBLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsdUJBQXVCLDBDQUFFLElBQUksbURBQUcsYUFBYSxDQUFDLENBQUEsQ0FBQztRQUUzRCx3QkFBd0I7UUFFeEIsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztDQUNGLENBQUE7QUFoY0MsZUFBZTtBQUNELDBCQUFhLEdBQUcsNkNBQThDLENBQUE7QUFFNUUsWUFBWTtBQUNFLHVCQUFVLEdBQUcsT0FBUSxDQUFBO0FBZG5DO0lBREMsSUFBQSxrQkFBTSxHQUFFOzs0Q0FDc0I7QUFJL0I7SUFEQyxJQUFBLGtCQUFNLEVBQUMsUUFBUSxDQUFDOzs0Q0FDd0I7QUFJekM7SUFEQyxJQUFBLGVBQUcsR0FBRTs7eUNBQzBCO0FBd0JoQztJQURDLElBQUEsMkJBQWlCLEVBQUMsYUFBSyxDQUFDOzhCQUNMLG9CQUFVO2dEQUFlO0FBSTdDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNZLDBCQUFXO2lEQUFRO0FBSXhDO0lBREMsSUFBQSwyQkFBaUIsRUFBQyw2QkFBYSxDQUFDOzhCQUNBLG9CQUFVOzZEQUF1QjtBQTNDdkQsWUFBWTtJQUR4QixJQUFBLG1CQUFPLEdBQUU7R0FDRyxZQUFZLENBNmN4QjtBQTdjWSxvQ0FBWSJ9