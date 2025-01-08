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
var BuyerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const Buyer_1 = require("../../entity/Buyer");
const Zero0Error_1 = require("../common/model/Zero0Error");
const ShopBuyer_1 = require("../../entity/ShopBuyer");
const user_service_1 = require("../partcApi/tencent/wx/ma/service/user.service");
const UserOpenId_1 = require("../../entity/UserOpenId");
const _ = require("lodash");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const tradeOrder_service_1 = require("./tradeOrder.service");
const credentials_service_1 = require("../partcApi/google/credentials.service");
const crypto = require('../common/utils/crypto');
let BuyerService = BuyerService_1 = class BuyerService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${BuyerService_1 === null || BuyerService_1 === void 0 ? void 0 : BuyerService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
     `;
        this.repository = null;
        this.shopBuyerRepository = null;
        this.userOpenIdRepository = null;
        this.tradeOrderService = null;
        this.userService = null;
        this.credentialsService = null;
    }
    async page(query = '', params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let whereSql = ' '; // 查询条件字符串
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue); // 处理前端的搜索字符串的搜索需求
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize',]))) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query)); // 处理前端的表格中筛选需求
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
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = BuyerService_1.TABLE_NAME + `:${id}`;
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
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = BuyerService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let log = '';
        // 字段非重复性验证
        const uniqueText = await ((_a = super.unique) === null || _a === void 0 ? void 0 : _a.call(this, BuyerService_1 === null || BuyerService_1 === void 0 ? void 0 : BuyerService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
        if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + '已存在，操作失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_c = (_b = this === null || this === void 0 ? void 0 : this.logger) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.call(_b, log, zero0Error);
            throw zero0Error;
        }
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_e = (_d = this === null || this === void 0 ? void 0 : this.repository) === null || _d === void 0 ? void 0 : _d.save) === null || _e === void 0 ? void 0 : _e.call(_d, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_f = super.sortOrder) === null || _f === void 0 ? void 0 : _f.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, BuyerService_1 === null || BuyerService_1 === void 0 ? void 0 : BuyerService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.findOneById) === null || _h === void 0 ? void 0 : _h.call(_g, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_l = super.sortOrder) === null || _l === void 0 ? void 0 : _l.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, BuyerService_1 === null || BuyerService_1 === void 0 ? void 0 : BuyerService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        await ((_o = (_m = this === null || this === void 0 ? void 0 : this.repository) === null || _m === void 0 ? void 0 : _m.save) === null || _o === void 0 ? void 0 : _o.call(_m, old)); // 修改数据
    }
    async buyerLogin(usernamePasswordToken, shopId = '') {
        var _a;
        let log = '';
        const count = await ((_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.countBy({ username: usernamePasswordToken.username, }));
        if (count < 1) {
            log = '用户名不存在，将直接新建用户';
            console.log(log);
            delete usernamePasswordToken.id;
            await (this === null || this === void 0 ? void 0 : this.reg(shopId, { ...usernamePasswordToken, }, 'buyer'));
        }
        const user = await (this === null || this === void 0 ? void 0 : this.login(usernamePasswordToken, shopId));
        return user;
    }
    async sellerLogin(usernamePasswordToken, shopId = '') {
        var _a;
        let log = '';
        const count = await ((_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.countBy({ username: usernamePasswordToken.username, }));
        if (count < 1) {
            log = '用户名不存在，将直接新建用户';
            console.log(log);
            delete usernamePasswordToken.id;
            await (this === null || this === void 0 ? void 0 : this.reg(shopId, { ...usernamePasswordToken, }, 'seller'));
        }
        const user = await (this === null || this === void 0 ? void 0 : this.login(usernamePasswordToken, shopId));
        return user;
    }
    async login(usernamePasswordToken, shopId = '') {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let log = '';
        console.log('用户登陆');
        const password = (_a = crypto === null || crypto === void 0 ? void 0 : crypto.md5) === null || _a === void 0 ? void 0 : _a.call(crypto, usernamePasswordToken.password);
        const whereSql = ` AND t.username = '${usernamePasswordToken.username}' AND t.password = '${password}' `;
        const anies = await ((_b = super.arrBase) === null || _b === void 0 ? void 0 : _b.call(this, null, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql));
        if (!anies) {
            log = '用户名或密码错误';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '401');
            (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.call(_c, log, zero0Error);
            throw zero0Error;
        }
        const buyerId = (_e = anies === null || anies === void 0 ? void 0 : anies[0]) === null || _e === void 0 ? void 0 : _e.id;
        let shopBuyer = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _f === void 0 ? void 0 : _f.findOne) === null || _g === void 0 ? void 0 : _g.call(_f, {
            where: { shopId: shopId, buyerId: buyerId },
        }));
        if (!shopBuyer) {
            shopBuyer = new ShopBuyer_1.ShopBuyer();
            shopBuyer.shopId = shopId;
            shopBuyer.buyerId = buyerId;
            shopBuyer.code = await ((_h = super.getCode) === null || _h === void 0 ? void 0 : _h.call(this, null, 'shop_buyer', 8));
            await ((_k = (_j = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, shopBuyer));
        }
        return shopBuyer;
    }
    async loginWxma(code = 'the code is a mock one', shopId = '') {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const userInfo = await ((_a = this === null || this === void 0 ? void 0 : this.userService) === null || _a === void 0 ? void 0 : _a.login(code, shopId, 'buyer'));
        const userRole = 'buyer';
        const namespace = 'wxma';
        // 查询有无此wxMaUserInfo对应的userOpenId信息，无则新建，有则返回信息TODO 整理成独立的方法
        const sql = ` SELECT t.user_id FROM user_open_id t WHERE t.open_id = '${userInfo.openid}' AND t.app_id = '${userInfo.appId}' AND t.user_role = '${userRole}' AND t.namespace = '${namespace}' `;
        const result = await ((_b = super.query) === null || _b === void 0 ? void 0 : _b.call(this, sql));
        let buyerId = '';
        if (!result) {
            // 此微信用户未登录过，进行注册
            const buyer = new Buyer_1.Buyer();
            await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.save) === null || _d === void 0 ? void 0 : _d.call(_c, buyer));
            const userOpenId = new UserOpenId_1.UserOpenId();
            userOpenId.appId = userInfo === null || userInfo === void 0 ? void 0 : userInfo.appId;
            userOpenId.openId = userInfo === null || userInfo === void 0 ? void 0 : userInfo.openid;
            userOpenId.namespace = namespace;
            userOpenId.userRole = userRole;
            userOpenId.userId = buyer === null || buyer === void 0 ? void 0 : buyer.id;
            await ((_f = (_e = this === null || this === void 0 ? void 0 : this.userOpenIdRepository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, userOpenId));
            buyerId = buyer === null || buyer === void 0 ? void 0 : buyer.id;
        }
        else {
            buyerId = (_g = result === null || result === void 0 ? void 0 : result[0]) === null || _g === void 0 ? void 0 : _g.user_id;
        }
        let shopBuyer = await ((_j = (_h = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _h === void 0 ? void 0 : _h.findOne) === null || _j === void 0 ? void 0 : _j.call(_h, {
            where: { shopId: shopId, buyerId: buyerId },
        }));
        if (!shopBuyer) {
            shopBuyer = new ShopBuyer_1.ShopBuyer();
            shopBuyer.shopId = shopId;
            shopBuyer.buyerId = buyerId;
            shopBuyer.code = await ((_k = super.getCode) === null || _k === void 0 ? void 0 : _k.call(this, null, 'shop_buyer', 8));
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, shopBuyer));
        }
        return shopBuyer;
    }
    async loginGoogle(googleCredentials, shopId = '') {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        googleCredentials.googleId = googleCredentials.id;
        const userInfo = await (this === null || this === void 0 ? void 0 : this.credentialsService.update(googleCredentials));
        const userRole = 'buyer';
        const namespace = 'google';
        // 查询有无此wxMaUserInfo对应的userOpenId信息，无则新建，有则返回信息TODO 整理成独立的方法
        const sql = ` SELECT t.user_id FROM user_open_id t WHERE t.open_id = '${userInfo.googleId}' AND t.user_role = '${userRole}' AND t.namespace = '${namespace}' `;
        const result = await ((_a = super.query) === null || _a === void 0 ? void 0 : _a.call(this, sql));
        let buyerId = '';
        if (!result) {
            // 此微信用户未登录过，进行注册
            const buyer = new Buyer_1.Buyer();
            await ((_c = (_b = this === null || this === void 0 ? void 0 : this.repository) === null || _b === void 0 ? void 0 : _b.save) === null || _c === void 0 ? void 0 : _c.call(_b, buyer));
            const userOpenId = new UserOpenId_1.UserOpenId();
            userOpenId.openId = userInfo === null || userInfo === void 0 ? void 0 : userInfo.googleId;
            userOpenId.namespace = namespace;
            userOpenId.userRole = userRole;
            userOpenId.userId = buyer === null || buyer === void 0 ? void 0 : buyer.id;
            await ((_e = (_d = this === null || this === void 0 ? void 0 : this.userOpenIdRepository) === null || _d === void 0 ? void 0 : _d.save) === null || _e === void 0 ? void 0 : _e.call(_d, userOpenId));
            buyerId = buyer === null || buyer === void 0 ? void 0 : buyer.id;
        }
        else {
            buyerId = (_f = result === null || result === void 0 ? void 0 : result[0]) === null || _f === void 0 ? void 0 : _f.user_id;
        }
        let shopBuyer = await ((_h = (_g = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _g === void 0 ? void 0 : _g.findOne) === null || _h === void 0 ? void 0 : _h.call(_g, {
            where: { shopId: shopId, buyerId: buyerId },
        }));
        if (!shopBuyer) {
            shopBuyer = new ShopBuyer_1.ShopBuyer();
            shopBuyer.shopId = shopId;
            shopBuyer.buyerId = buyerId;
            shopBuyer.code = await ((_j = super.getCode) === null || _j === void 0 ? void 0 : _j.call(this, null, 'shop_buyer', 8));
            await ((_l = (_k = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _k === void 0 ? void 0 : _k.save) === null || _l === void 0 ? void 0 : _l.call(_k, shopBuyer));
        }
        return shopBuyer;
    }
    async getPhoneNumberInfo(code, shopId = '', encryptedData, ivStr) { }
    async reg(shopId = '', buyer, userRole = '') {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let log = '';
        buyer.password = (_a = crypto === null || crypto === void 0 ? void 0 : crypto.md5) === null || _a === void 0 ? void 0 : _a.call(crypto, buyer.password);
        const count = await ((_b = this === null || this === void 0 ? void 0 : this.repository) === null || _b === void 0 ? void 0 : _b.countBy({
            username: buyer.username,
        }));
        if (count > 0) {
            log = '用户名已存在,注册失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.call(_c, log, zero0Error);
            throw zero0Error;
        }
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, buyer));
        const countShopBuyer = await ((_g = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _g === void 0 ? void 0 : _g.countBy({
            buyerId: buyer.id,
            shopId: shopId,
        }));
        if (countShopBuyer) {
            return buyer;
        }
        const shopBuyer = new ShopBuyer_1.ShopBuyer();
        shopBuyer.buyerId = buyer.id;
        shopBuyer.shopId = shopId;
        shopBuyer.userRole = userRole;
        await ((_j = (_h = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _h === void 0 ? void 0 : _h.save) === null || _j === void 0 ? void 0 : _j.call(_h, shopBuyer));
        return buyer;
    }
    async imgUpload(files, id) { }
    async uploadFile(file, id) { }
    async imgDel(fileId) { }
    async updateNicknameAndGender(obj, birthDateStr, code, shopId = '') { }
    async balanceAdd(shopBuyerId = '', amount, shopId = '') {
        var _a, _b, _c, _d, _e, _f;
        let log = '';
        if (!(amount) || amount < 0.01) {
            log = '金额不能小于0.01元';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, log, zero0Error);
            throw zero0Error;
        }
        const buyerId = '';
        const shopBuyer = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _c === void 0 ? void 0 : _c.findOneBy) === null || _d === void 0 ? void 0 : _d.call(_c, {
            buyerId: buyerId,
            shopId: shopId,
        }));
        let balance = shopBuyer.balance;
        if (!balance) {
            balance = 0.0;
        }
        balance = _ === null || _ === void 0 ? void 0 : _.add(balance, amount);
        shopBuyer.balance = balance;
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, shopBuyer));
        return shopBuyer;
    }
    async bind(shopId = '', shopBuyerId = '', openId) {
        return null;
    }
    async batchesTransfer(shopId = '', transferDetailList = []) {
        var _a;
        /**
         * 发起商家转账零钱
         * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_1.shtml
         */
        const wxpay = await ((_a = this === null || this === void 0 ? void 0 : this.tradeOrderService) === null || _a === void 0 ? void 0 : _a.getWxpay(shopId));
        const transferDetailList1 = [
            {
                out_detail_no: 'aaaaaaaaaaaaaaaaaaaaaaa',
                /** 转账金额(分) */
                transfer_amount: 1,
                /** 转账备注 */
                transfer_remark: '测试转账',
                /** 用户在直连商户应用下的用户标示 */
                openid: 'oyqG0689ons_qg8NfEi-Pw5K553Y',
            },
        ];
        const input = {
            /** 商家批次单号 */
            out_batch_no: 'aaaaaaaaaaaaaaaaaaaaaaa',
            /** 批次名称 */
            batch_name: '测试转账到零钱',
            /** 批次备注 */
            batch_remark: '测试转账到零钱',
            /** 转账总金额(分) */
            total_amount: 1,
            /** 转账总笔数 */
            total_num: 1,
            /** 转账明细列表 */
            transfer_detail_list: transferDetailList1,
        };
        const dataOutput = await (wxpay === null || wxpay === void 0 ? void 0 : wxpay.batches_transfer(input));
        console.log(dataOutput);
    }
};
// 查询的数据库表名称
BuyerService.TABLE_NAME = 'buyer';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], BuyerService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(Buyer_1.Buyer),
    __metadata("design:type", typeorm_2.Repository)
], BuyerService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(ShopBuyer_1.ShopBuyer),
    __metadata("design:type", typeorm_2.Repository)
], BuyerService.prototype, "shopBuyerRepository", void 0);
__decorate([
    (0, typeorm_1.InjectEntityModel)(UserOpenId_1.UserOpenId),
    __metadata("design:type", typeorm_2.Repository)
], BuyerService.prototype, "userOpenIdRepository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", tradeOrder_service_1.TradeOrderService)
], BuyerService.prototype, "tradeOrderService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], BuyerService.prototype, "userService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", credentials_service_1.CredentialsService)
], BuyerService.prototype, "credentialsService", void 0);
BuyerService = BuyerService_1 = __decorate([
    (0, decorator_1.Provide)()
], BuyerService);
exports.BuyerService = BuyerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3RyYWRlL2J1eWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RDtBQUM5RCxpRUFBNkQ7QUFHN0QsK0NBQXNEO0FBQ3RELHFDQUFxQztBQUNyQyw4Q0FBMkM7QUFFM0MsMkRBQXdEO0FBQ3hELHNEQUFtRDtBQUNuRCxpRkFBNkU7QUFDN0Usd0RBQXFEO0FBRXJELDRCQUE2QjtBQUc3QixxREFBcUQ7QUFDckQscURBQXFEO0FBRXJELDZEQUF5RDtBQUV6RCxnRkFBNEU7QUFFNUUsTUFBTSxNQUFNLEdBQVEsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFHdEQsSUFBYSxZQUFZLG9CQUF6QixNQUFhLFlBQWEsU0FBUSwwQkFBVztJQUE3Qzs7UUFHVSxXQUFNLEdBQVksSUFBSSxDQUFBO1FBSzlCLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxjQUFZLGFBQVosY0FBWSx1QkFBWixjQUFZLENBQUUsVUFBVSxLQUFLLENBQUM7UUFDMUQsc0JBQXNCO1FBQ2IsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNOztNQUV0QyxDQUFBO1FBR0ksZUFBVSxHQUFzQixJQUFJLENBQUM7UUFHckMsd0JBQW1CLEdBQTBCLElBQUksQ0FBQztRQUdsRCx5QkFBb0IsR0FBMkIsSUFBSSxDQUFDO1FBR3BELHNCQUFpQixHQUFzQixJQUFJLENBQUM7UUFHNUMsZ0JBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBR2hDLHVCQUFrQixHQUF1QixJQUFJLENBQUM7SUErZ0J4RCxDQUFDO0lBN2dCUSxLQUFLLENBQUMsSUFBSSxDQUNmLEtBQUssR0FBRyxFQUFFLEVBQUUsTUFBYyxFQUMxQixRQUFrQixFQUNsQixJQUFVO1FBRVYsV0FBVzs7UUFFWCxJQUFJLFFB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