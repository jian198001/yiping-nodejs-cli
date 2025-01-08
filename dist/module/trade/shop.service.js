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
var ShopService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const Shop_1 = require("../../entity/Shop");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const WxPayConfig_1 = require("../../entity/WxPayConfig");
const AlipayConfig_1 = require("../../entity/AlipayConfig");
const Address_1 = require("../../entity/Address");
const _ = require("lodash");
let ShopService = ShopService_1 = class ShopService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${ShopService_1 === null || ShopService_1 === void 0 ? void 0 : ShopService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  

  , ( CASE t.cart WHEN '0' THEN '不支持' ELSE '支持' END ) AS cart_str

  , ( CASE t.express WHEN '1' THEN '是' ELSE '否' END ) AS express_str

  , ( CASE t.same_city WHEN '1' THEN '是' ELSE '否' END ) AS same_city_str

  , ( CASE t.obs WHEN '1' THEN '是' ELSE '否' END ) AS obs_str

  , ( CASE t.non_business_hours_show WHEN 'goods' THEN '展示商品,但无法下单' ELSE '可下单支付预订,但延时配送' END ) AS non_business_hours_show_str

  , ( CASE t.refund WHEN '1' THEN '订单是已支付状态下,不需人工审核可直接退款' WHEN '2' THEN '订单是已支付未核销状态下,不需人工审核可直接退款' ELSE '任何状态下都需要人工审核才可以退款' END ) AS refund_str

  , ( CASE t.status WHEN '1' THEN '营业中' ELSE '未营业' END ) AS status_str

  , ( SELECT app_id FROM wx_pay_config WHERE wx_pay_config.shop_id = t.id ) AS app_id_wxpay 

  , ( SELECT app_secret FROM wx_pay_config WHERE wx_pay_config.shop_id = t.id ) AS app_secret 

  , ( SELECT mch_id FROM wx_pay_config WHERE wx_pay_config.shop_id = t.id ) AS mch_id 

  , ( SELECT mch_key FROM wx_pay_config WHERE wx_pay_config.shop_id = t.id ) AS mch_key 

  , ( SELECT key_path FROM wx_pay_config WHERE wx_pay_config.shop_id = t.id ) AS key_path 

  , ( SELECT app_id FROM alipay_config WHERE alipay_config.shop_id = t.id ) AS app_id_alipay 

  , ( SELECT merchant_private_key FROM alipay_config WHERE alipay_config.shop_id = t.id ) AS merchant_private_key 

  , ( SELECT merchant_cert_path FROM alipay_config WHERE alipay_config.shop_id = t.id ) AS merchant_cert_path 

     `;
        this.repository = null;
        this.addressRepository = null;
        this.wxPayConfigRepository = null;
        this.alipayConfigRepository = null;
    }
    /**
     * 分页查询店铺列表
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     * @description 根据前端的搜索、筛选条件，分页查询店铺列表，并返回符合条件的店铺信息
     */
    async page(query = '', params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let whereSql = ' '; // 查询条件字符串
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        // 处理前端的表格中筛选需求
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize',]))) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
        // 执行查询语句并返回page对象结果
        const data = await ((_g = super.pageBase) === null || _g === void 0 ? void 0 : _g.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
        // 遍历查询结果,将查询结果异步读取到redis
        // 遍历查询结果,将查询结果中异步读取到redis
        (_h = this === null || this === void 0 ? void 0 : this.getToRedis) === null || _h === void 0 ? void 0 : _h.call(this, (_j = _ === null || _ === void 0 ? void 0 : _.map) === null || _j === void 0 ? void 0 : _j.call(_, data === null || data === void 0 ? void 0 : data.list, 'id'));
        if ((page === null || page === void 0 ? void 0 : page.pageSize) > 0) {
            // 返回分页数据
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
     * 根据ID查询店铺信息
     * @param id - 店铺ID
     * @returns Promise<any> - 返回查询到的店铺信息
     * @description 根据id查询一条数据，包括店铺的基本信息、微信支付配置和支付宝支付配置
     */
    async getById(id = '') {
        // 根据id查询一条数据
        var _a;
        const obj = await ((_a = super.getByIdBase) === null || _a === void 0 ? void 0 : _a.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql));
        obj.confWxpay = true;
        obj.confAlipay = false;
        return obj;
    }
    /**
     * 根据店铺代码获取店铺信息
     * @param code - 店铺代码
     * @returns Promise<Shop> - 返回查询到的店铺信息
     */
    async getByCode(code = '') {
        var _a, _b;
        // 使用TypeORM的findOneBy方法根据店铺代码查询店铺信息
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOneBy) === null || _b === void 0 ? void 0 : _b.call(_a, { code: code }));
    }
    /**
     * 删除指定ID的店铺
     * @param ids - 要删除的店铺ID数组
     * @returns Promise<void> - 无返回值
     */
    async del(ids) {
        var _a, _b;
        // 使用TypeORM的delete方法删除指定ID的店铺
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新店铺信息，包括地址、微信支付配置和支付宝支付配置
     * @param obj - 店铺信息对象
     * @param address - 地址信息对象
     * @param wxPayConfig - 微信支付配置对象
     * @param alipayConfig - 支付宝支付配置对象
     * @returns Promise<Shop> - 返回更新后的店铺信息
     */
    async update(obj, address = null, wxPayConfig = null, alipayConfig = null) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
        let log = '';
        // 删除redis缓存
        const key = (ShopService_1 === null || ShopService_1 === void 0 ? void 0 : ShopService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, ShopService_1 === null || ShopService_1 === void 0 ? void 0 : ShopService_1.TABLE_NAME, [{ label: 'name', value: obj.name, text: '名称' }], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
            await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, ShopService_1 === null || ShopService_1 === void 0 ? void 0 : ShopService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
        }
        else {
            let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
            if (!old) {
                // 新增数据，主键id的随机字符串值，由前端页面提供
                await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
                if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                    await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, ShopService_1 === null || ShopService_1 === void 0 ? void 0 : ShopService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
                }
            }
            else {
                obj === null || obj === void 0 ? true : delete obj.id;
                old = {
                    ...old,
                    ...obj,
                };
                await ((_q = (_p = this === null || this === void 0 ? void 0 : this.repository) === null || _p === void 0 ? void 0 : _p.save) === null || _q === void 0 ? void 0 : _q.call(_p, old)); // 修改数据
                obj.id = old === null || old === void 0 ? void 0 : old.id;
            }
        }
        // update address
        let addressNew = await ((_s = (_r = this === null || this === void 0 ? void 0 : this.addressRepository) === null || _r === void 0 ? void 0 : _r.findOne) === null || _s === void 0 ? void 0 : _s.call(_r, {
            where: { shopId: obj === null || obj === void 0 ? void 0 : obj.id },
        }));
        if (!addressNew) {
            address.shopId = obj === null || obj === void 0 ? void 0 : obj.id;
            await ((_u = (_t = this === null || this === void 0 ? void 0 : this.addressRepository) === null || _t === void 0 ? void 0 : _t.save) === null || _u === void 0 ? void 0 : _u.call(_t, address));
        }
        else {
            addressNew = {
                ...addressNew,
                ...address,
                shopId: obj === null || obj === void 0 ? void 0 : obj.id,
                id: addressNew === null || addressNew === void 0 ? void 0 : addressNew.id,
            };
            await ((_w = (_v = this === null || this === void 0 ? void 0 : this.addressRepository) === null || _v === void 0 ? void 0 : _v.save) === null || _w === void 0 ? void 0 : _w.call(_v, addressNew));
        }
        // update wxpayConfig
        let wxPayConfigNew = await ((_y = (_x = this === null || this === void 0 ? void 0 : this.wxPayConfigRepository) === null || _x === void 0 ? void 0 : _x.findOne) === null || _y === void 0 ? void 0 : _y.call(_x, { where: { shopId: obj === null || obj === void 0 ? void 0 : obj.id } }));
        if (!wxPayConfigNew) {
            wxPayConfig.shopId = obj === null || obj === void 0 ? void 0 : obj.id;
            await ((_0 = (_z = this === null || this === void 0 ? void 0 : this.wxPayConfigRepository) === null || _z === void 0 ? void 0 : _z.save) === null || _0 === void 0 ? void 0 : _0.call(_z, wxPayConfig));
        }
        else {
            wxPayConfigNew = {
                ...wxPayConfigNew,
                ...wxPayConfig,
                shopId: obj === null || obj === void 0 ? void 0 : obj.id,
                id: wxPayConfigNew === null || wxPayConfigNew === void 0 ? void 0 : wxPayConfigNew.id,
            };
            await ((_2 = (_1 = this === null || this === void 0 ? void 0 : this.wxPayConfigRepository) === null || _1 === void 0 ? void 0 : _1.save) === null || _2 === void 0 ? void 0 : _2.call(_1, wxPayConfigNew));
        }
        // update alipayConfig
        let alipayConfigNew = await ((_4 = (_3 = this === null || this === void 0 ? void 0 : this.alipayConfigRepository) === null || _3 === void 0 ? void 0 : _3.findOne) === null || _4 === void 0 ? void 0 : _4.call(_3, {
            where: { shopId: obj === null || obj === void 0 ? void 0 : obj.id },
        }));
        if (!alipayConfigNew) {
            alipayConfig.shopId = obj === null || obj === void 0 ? void 0 : obj.id;
            await ((_6 = (_5 = this === null || this === void 0 ? void 0 : this.alipayConfigRepository) === null || _5 === void 0 ? void 0 : _5.save) === null || _6 === void 0 ? void 0 : _6.call(_5, alipayConfig));
        }
        else {
            alipayConfigNew = {
                ...alipayConfigNew,
                ...alipayConfig,
                shopId: obj === null || obj === void 0 ? void 0 : obj.id,
                id: alipayConfigNew === null || alipayConfigNew === void 0 ? void 0 : alipayConfigNew.id,
            };
            await ((_8 = (_7 = this === null || this === void 0 ? void 0 : this.alipayConfigRepository) === null || _7 === void 0 ? void 0 : _7.save) === null || _8 === void 0 ? void 0 : _8.call(_7, alipayConfigNew));
        }
        return obj;
    }
    /**
     * 配置微信支付信息
     * @param appId - 微信支付的应用ID
     * @param mchId - 微信支付的商户ID
     * @param mchKey - 微信支付的商户密钥
     * @param keyPath - 微信支付的密钥路径
     * @returns Promise<boolean> - 返回配置是否成功
     */
    async confWxpay(appId, mchId, mchKey, keyPath) {
        var _a, _b;
        // 记录日志：判断是否已配置完整的微信支付信息
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '判断是否已配置完整的微信支付信息');
        // 判断配置信息是否完整
        if (
        // 如果appId为空
        !(appId) ||
            // 如果mchId为空
            !(mchId) ||
            // 如果mchKey为空
            !(mchKey) ||
            // 如果keyPath为空
            !(keyPath)) {
            // 返回false表示配置失败
            return false;
        }
        // 判断appId长度是否在有效范围内
        if ((appId === null || appId === void 0 ? void 0 : appId.length) < 14 || (appId === null || appId === void 0 ? void 0 : appId.length) > 22) {
            // 返回false表示配置失败
            return false;
        }
        // 判断mchId长度是否在有效范围内
        if ((mchId === null || mchId === void 0 ? void 0 : mchId.length) < 6 || (mchId === null || mchId === void 0 ? void 0 : mchId.length) > 14) {
            // 返回false表示配置失败
            return false;
        }
        // 判断mchKey长度是否在有效范围内
        return (mchKey === null || mchKey === void 0 ? void 0 : mchKey.length) >= 30 || (mchKey === null || mchKey === void 0 ? void 0 : mchKey.length) <= 34;
    }
    /**
     * 配置支付宝支付信息
     * @param appId - 支付宝应用ID
     * @param merchantPrivateKey - 商户私钥
     * @param merchantCertPath - 商户证书路径
     * @returns Promise<boolean> - 返回配置是否成功
     */
    async confAlipay(appId, merchantPrivateKey, merchantCertPath) {
        var _a, _b;
        // 记录日志：判断是否已配置完整的支付宝支付信息
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '判断是否已配置完整的支付宝支付信息');
        // 判断配置信息是否完整
        return !(
        // 如果appId为空
        !(appId) ||
            // 如果merchantPrivateKey为空
            !(merchantPrivateKey) ||
            // 如果merchantCertPath为空
            !(merchantCertPath));
    }
    /**
     * 获取店铺的支付配置信息
     * @param id - 店铺ID
     * @returns Promise<void> - 无返回值
     * @description mall是商城，下面会有多个shop，mall和shop都保存有商户的收款信息，有两种情况会从mall读取收款配置信息，1是卖家向商城付款，2是卖家没有自己的收款账户，钱先打进商城的收款账户，然后再转给卖家
     */
    async getPayConfig(id) { }
    /**
     * 用户登录
     * @param usernamePasswordToken - 包含用户名和密码的对象
     * @returns Promise<Shop> - 返回登录成功的店铺信息
     */
    async login(usernamePasswordToken) {
        // 返回null表示登录失败
        return null;
    }
    /**
     * 上传微信支付密钥文件
     * @param map - 包含文件内容的对象
     * @param fileName - 文件名
     * @param fileType - 文件类型
     * @param shopId - 店铺ID
     * @returns Promise<void> - 无返回值
     */
    async wxpayKeyFileUpload(map, fileName, fileType, shopId = '') { }
    /**
     * 上传支付宝商户证书文件
     * @param map - 包含文件内容的对象
     * @param fileName - 文件名
     * @param fileType - 文件类型
     * @param shopId - 店铺ID
     * @returns Promise<void> - 无返回值
     */
    async alipayMerchantCertFileUpload(map, fileName, fileType, shopId = '') { }
    /**
     * 更新店铺的微信支付配置
     * @param shopId - 店铺ID
     * @param appIdWxpay - 微信支付的应用ID
     * @param mchId - 微信支付的商户ID
     * @param mchKey - 微信支付的商户密钥
     * @returns Promise<void> - 无返回值
     */
    async updateWxPayConfig(shopId = '', appIdWxpay, mchId, mchKey) { }
    /**
     * 更新店铺的支付宝支付配置
     * @param shopId - 店铺ID
     * @param appIdAlipay - 支付宝支付的应用ID
     * @param merchantPrivateKey - 支付宝支付的商户私钥
     * @returns Promise<void> - 无返回值
     */
    async updateAlipayConfig(shopId = '', appIdAlipay, merchantPrivateKey) { }
    /**
     * 更新店铺的许可证信息
     * @param obj - 包含许可证信息的对象
     * @returns Promise<void> - 无返回值
     */
    async updateLicense(obj) { }
    /**
     * 上传图片到本地多媒体素材库并持久化到数据库
     * @returns Promise<void> - 无返回值
     */
    async imgUpload() { }
    /**
     * 上传文件到本地多媒体素材库并持久化到数据库
     * @returns Promise<void> - 无返回值
     */
    async uploadFile() {
        // 新增本地多媒体素材持久化到数据库中,操作方式:同步
    }
    /**
     * 根据文件ID删除图片
     * @param fileId - 图片文件ID
     * @returns Promise<void> - 无返回值
     */
    async imgDel(fileId) { }
    /**
     * 将店铺与用户进行绑定
     * @param shopSellerMap - 包含店铺与用户绑定信息的对象
     * @returns Promise<void> - 无返回值
     */
    async bindUser(shopSellerMap) { }
    /**
     * 查询指定店铺支持的配送方式
     * @param shopId - 店铺ID
     * @returns Promise<any> - 返回支持的配送方式信息
     */
    async supportedShippingmethods(shopId = '') {
        // 标识符名称来自微信小商店
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '查询配送方式');
        // supported_shipping_methods.express		是否开启快递配送
        // supported_shipping_methods.same_city		是否开启同城配送
        // supported_shipping_methods.pickup	是否开启线下自提
    }
};
// 查询的数据库表名称
ShopService.TABLE_NAME = 'shop';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], ShopService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Shop_1.Shop),
    __metadata("design:type", typeorm_1.Repository)
], ShopService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Address_1.Address),
    __metadata("design:type", typeorm_1.Repository)
], ShopService.prototype, "addressRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(WxPayConfig_1.WxPayConfig),
    __metadata("design:type", typeorm_1.Repository)
], ShopService.prototype, "wxPayConfigRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(AlipayConfig_1.AlipayConfig),
    __metadata("design:type", typeorm_1.Repository)
], ShopService.prototype, "alipayConfigRepository", void 0);
ShopService = ShopService_1 = __decorate([
    (0, decorator_1.Provide)()
], ShopService);
exports.ShopService = ShopService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvdHJhZGUvc2hvcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsaUVBQTZEO0FBRzdELHFDQUFxQztBQUNyQywrQ0FBc0Q7QUFDdEQsNENBQXlDO0FBSXpDLDJEQUF3RDtBQUV4RCxxREFBcUQ7QUFDckQscURBQXFEO0FBRXJELDBEQUF1RDtBQUN2RCw0REFBeUQ7QUFDekQsa0RBQStDO0FBQy9DLDRCQUE2QjtBQUU3QixJQUFhLFdBQVcsbUJBQXhCLE1BQWEsV0FBWSxTQUFRLDBCQUFXO0lBQTVDOztRQUVVLFdBQU0sR0FBWSxJQUFJLENBQUE7UUFLOUIsZUFBZTtRQUNQLFlBQU8sR0FBRyxTQUFTLGFBQVcsYUFBWCxhQUFXLHVCQUFYLGFBQVcsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUN6RCxzQkFBc0I7UUFDYixjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BZ0N0QyxDQUFDO1FBR0csZUFBVSxHQUFxQixJQUFJLENBQUM7UUFHcEMsc0JBQWlCLEdBQXdCLElBQUksQ0FBQztRQUc5QywwQkFBcUIsR0FBNEIsSUFBSSxDQUFDO1FBR3RELDJCQUFzQixHQUE2QixJQUFJLENBQUM7SUFnY2xFLENBQUM7SUEvYkM7Ozs7Ozs7O09BUUc7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUNmLEtBQUssR0FBRyxFQUFFLEVBQUUsTUFBYyxFQUFFLFFBQWtCLEVBQzlDLElBQVU7UUFFVixXQUFXOztRQUVYLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQSxDQUFDLFVBQVU7UUFFN0Isa0JBQWtCO1FBQ2xCLFFBQVEsSUFBSSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEs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