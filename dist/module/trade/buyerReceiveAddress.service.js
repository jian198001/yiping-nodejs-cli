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
var BuyerReceiveAddressService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerReceiveAddressService = void 0;
/**
 * 导入MidwayJS的依赖注入和日志装饰器
 */
const decorator_1 = require("@midwayjs/decorator");
/**
 * 导入自定义的基础服务类
 */
const base_service_1 = require("../common/service/base.service");
/**
 * 导入TypeORM的Repository类
 */
const typeorm_1 = require("typeorm");
/**
 * 导入MidwayJS的实体模型注入装饰器
 */
const typeorm_2 = require("@midwayjs/typeorm");
/**
 * 导入买家收货地址实体类
 */
const BuyerReceiveAddress_1 = require("../../entity/BuyerReceiveAddress");
/**
 * 导入店铺实体类
 */
const Shop_1 = require("../../entity/Shop");
/**
 * 导入自定义的错误类
 */
const Zero0Error_1 = require("../common/model/Zero0Error");
/**
 * 导入Lodash库
 */
const _ = require("lodash");
/**
 * 导入自定义的SQL工具类
 */
const sqlUtils = require("../common/utils/sqlUtils");
/**
 * 导入自定义的字符串工具类
 */
const strUtils = require("../common/utils/strUtils");
/**
 * 导入店铺买家服务类
 */
const shopBuyer_service_1 = require("./shopBuyer.service");
/**
 * 买家收货地址服务类
 */
let BuyerReceiveAddressService = BuyerReceiveAddressService_1 = class BuyerReceiveAddressService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${BuyerReceiveAddressService_1 === null || BuyerReceiveAddressService_1 === void 0 ? void 0 : BuyerReceiveAddressService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
     `;
        this.repository = null;
        this.shopRepository = null;
        this.shopBuyerService = null;
    }
    /**
     * 分页查询买家收货地址
     * @param shopBuyerId - 店铺买家ID
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    async page(shopBuyerId = '', query, params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let whereSql = ' '; // 查询条件字符串
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
        // 处理前端的表格中筛选需求
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize',]))) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
        const shopBuyer = await ((_h = this === null || this === void 0 ? void 0 : (_g = this.shopBuyerService).getById) === null || _h === void 0 ? void 0 : _h.call(_g, shopBuyerId));
        // 添加查询条件，限制买家ID
        whereSql += ` AND t.buyer_id = '${shopBuyer.buyerId}' `;
        // 执行查询语句并返回page对象结果
        const data = await ((_j = super.pageBase) === null || _j === void 0 ? void 0 : _j.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
        // 遍历查询结果,将查询结果异步读取到redis
        // 遍历查询结果,将查询结果中异步读取到redis
        (_k = this === null || this === void 0 ? void 0 : this.getToRedis) === null || _k === void 0 ? void 0 : _k.call(this, (_l = _ === null || _ === void 0 ? void 0 : _.map) === null || _l === void 0 ? void 0 : _l.call(_, data === null || data === void 0 ? void 0 : data.list, 'id'));
        if ((page === null || page === void 0 ? void 0 : page.pageSize) > 0) {
            return data;
        }
        if ((page === null || page === void 0 ? void 0 : page.pageSize) < 1) {
            // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
            return (_m = _ === null || _ === void 0 ? void 0 : _.keyBy) === null || _m === void 0 ? void 0 : _m.call(_, data === null || data === void 0 ? void 0 : data.list, "value");
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
     * 根据ID查询买家收货地址
     * @param id - 收货地址ID
     * @returns Promise<any> - 返回查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = BuyerReceiveAddressService_1.TABLE_NAME + `:${id}`;
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
     * 删除买家收货地址
     * @param ids - 收货地址ID数组
     * @returns Promise<void> - 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = BuyerReceiveAddressService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新买家收货地址
     * @param obj - 买家收货地址对象
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<BuyerReceiveAddress> - 返回更新后的买家收货地址对象
     */
    async update(obj, shopBuyerId) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        const shopBuyer = await ((_b = this === null || this === void 0 ? void 0 : (_a = this.shopBuyerService).getById) === null || _b === void 0 ? void 0 : _b.call(_a, shopBuyerId));
        obj.buyerId = shopBuyer.buyerId;
        let log = '';
        // 删除redis缓存
        const key = (BuyerReceiveAddressService_1 === null || BuyerReceiveAddressService_1 === void 0 ? void 0 : BuyerReceiveAddressService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.redisService) === null || _c === void 0 ? void 0 : _c.del) === null || _d === void 0 ? void 0 : _d.call(_c, key));
        // 字段非重复性验证
        const uniqueText = await ((_e = super.unique) === null || _e === void 0 ? void 0 : _e.call(this, BuyerReceiveAddressService_1 === null || BuyerReceiveAddressService_1 === void 0 ? void 0 : BuyerReceiveAddressService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
        if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + '已存在，操作失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_g = (_f = this === null || this === void 0 ? void 0 : this.logger) === null || _f === void 0 ? void 0 : _f.error) === null || _g === void 0 ? void 0 : _g.call(_f, log, zero0Error);
            throw zero0Error;
        }
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
            obj === null || obj === void 0 ? true : delete obj.id;
        }
        (_j = (_h = this === null || this === void 0 ? void 0 : this.logger) === null || _h === void 0 ? void 0 : _h.info) === null || _j === void 0 ? void 0 : _j.call(_h, '首先判断此地址是否已存在');
        (_l = (_k = this === null || this === void 0 ? void 0 : this.logger) === null || _k === void 0 ? void 0 : _k.info) === null || _l === void 0 ? void 0 : _l.call(_k, '此买家没有设置任何地址信息,此地址将保存为默认地址');
        // 通过buyerId取得buyerId
        const buyerId = '';
        const number = await ((_m = this === null || this === void 0 ? void 0 : this.repository) === null || _m === void 0 ? void 0 : _m.countBy({
            buyerId: buyerId,
        }));
        if (number < 1) {
            obj.defaultStatus = 1;
            (_p = (_o = this === null || this === void 0 ? void 0 : this.repository) === null || _o === void 0 ? void 0 : _o.save) === null || _p === void 0 ? void 0 : _p.call(_o, obj);
            return;
        }
        if (obj.defaultStatus === 0) {
            (_r = (_q = this === null || this === void 0 ? void 0 : this.logger) === null || _q === void 0 ? void 0 : _q.info) === null || _r === void 0 ? void 0 : _r.call(_q, '此地址不是默认地址');
            (_t = (_s = this === null || this === void 0 ? void 0 : this.repository) === null || _s === void 0 ? void 0 : _s.save) === null || _t === void 0 ? void 0 : _t.call(_s, obj);
            return;
        }
        (_v = (_u = this === null || this === void 0 ? void 0 : this.logger) === null || _u === void 0 ? void 0 : _u.info) === null || _v === void 0 ? void 0 : _v.call(_u, '此地址是默认地址');
        // 将此会员的所有其它地址都设置为非默认地址，然后再将此地址设置为默认地址
        const sql = ` UPDATE buyer_receive_address SET default_status = '0' WHERE buyer_id = '${buyerId}' `;
        await ((_w = this === null || this === void 0 ? void 0 : this.query) === null || _w === void 0 ? void 0 : _w.call(this, sql));
        await ((_y = (_x = this === null || this === void 0 ? void 0 : this.repository) === null || _x === void 0 ? void 0 : _x.save) === null || _y === void 0 ? void 0 : _y.call(_x, obj));
    }
    /**
     * 获取买家默认收货地址
     * @param buyerId - 买家ID
     * @param shopId - 店铺ID
     * @returns Promise<BuyerReceiveAddress> - 返回默认收货地址对象
     */
    async getDefalut(buyerId, shopId = '') {
        var _a, _b, _c, _d, _e, _f;
        // 记录日志，确定此店铺的物流范围是全球还是本地
        this;
        const shop = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.shopRepository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, shopId)); // 店铺信息
        const deliveryArea = shop.deliveryArea; // 本店铺对应的运营区域TODO
        let sql = ` SELECT t.* FROM buyer_receive_address t WHERE t.buyer_id = '${buyerId}' `;
        if ((shop) && deliveryArea !== 'global') {
            (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.call(_c, '此店铺的物流范围是本地');
            sql =
                sql +
                    ` AND t.province = '${shop.province}' AND t.city = '${shop.city}' `;
            if (shop.region) {
                sql += ` AND t.region = '${shop.region}' `;
            }
        }
        const order = ' ORDER BY t.default_status DESC, order_num DESC ';
        const sqlAddress = sql + order;
        const addressList = await ((_e = this === null || this === void 0 ? void 0 : this.query) === null || _e === void 0 ? void 0 : _e.call(this, sqlAddress));
        if (addressList) {
            return (_f = _ === null || _ === void 0 ? void 0 : _.head) === null || _f === void 0 ? void 0 : _f.call(_, addressList);
        }
        return null;
    }
};
// 查询的数据库表名称
BuyerReceiveAddressService.TABLE_NAME = 'buyer_receive_address';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerReceiveAddressService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(BuyerReceiveAddress_1.BuyerReceiveAddress),
    __metadata("design:type", typeorm_1.Repository)
], BuyerReceiveAddressService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Shop_1.Shop),
    __metadata("design:type", typeorm_1.Repository)
], BuyerReceiveAddressService.prototype, "shopRepository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", shopBuyer_service_1.ShopBuyerService)
], BuyerReceiveAddressService.prototype, "shopBuyerService", void 0);
BuyerReceiveAddressService = BuyerReceiveAddressService_1 = __decorate([
    (0, decorator_1.Provide)()
], BuyerReceiveAddressService);
exports.BuyerReceiveAddressService = BuyerReceiveAddressService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5ZXJSZWNlaXZlQWRkcmVzcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvdHJhZGUvYnV5ZXJSZWNlaXZlQWRkcmVzcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILG1EQUE4RDtBQUM5RDs7R0FFRztBQUNILGlFQUE2RDtBQVM3RDs7R0FFRztBQUNILHFDQUFxQztBQUNyQzs7R0FFRztBQUNILCtDQUFzRDtBQUN0RDs7R0FFRztBQUNILDBFQUF1RTtBQUt2RTs7R0FFRztBQUNILDRDQUF5QztBQUN6Qzs7R0FFRztBQUNILDJEQUF3RDtBQUN4RDs7R0FFRztBQUNILDRCQUE2QjtBQUM3Qjs7R0FFRztBQUNILHFEQUFxRDtBQUNyRDs7R0FFRztBQUNILHFEQUFxRDtBQUNyRDs7R0FFRztBQUNILDJEQUF1RDtBQUV2RDs7R0FFRztBQUVILElBQWEsMEJBQTBCLGtDQUF2QyxNQUFhLDBCQUEyQixTQUFRLDBCQUFXO0lBQTNEOztRQUdVLFdBQU0sR0FBWSxJQUFJLENBQUE7UUFLOUIsZUFBZTtRQUNQLFlBQU8sR0FBRyxTQUFTLDRCQUEwQixhQUExQiw0QkFBMEIsdUJBQTFCLDRCQUEwQixDQUFFLFVBQVUsS0FBSyxDQUFDO1FBQ3hFLHNCQUFzQjtRQUNiLGNBQVMsR0FBRyxJQUFJLDBCQUFXLENBQUMsTUFBTTs7TUFFdEMsQ0FBQTtRQUdJLGVBQVUsR0FBb0MsSUFBSSxDQUFDO1FBR25ELG1CQUFjLEdBQXFCLElBQUksQ0FBQztRQUd4QyxxQkFBZ0IsR0FBcUIsSUFBSSxDQUFDO0lBNFBwRCxDQUFDO0lBMVBDOzs7Ozs7OztPQVFHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixXQUFXLEdBQUcsRUFBRSxFQUNoQixLQUFhLEVBQUUsTUFBYyxFQUFFLFFBQWtCLEVBQ2pELElBQVU7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