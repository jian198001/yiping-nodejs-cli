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
var ShopBuyerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopBuyerService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const ShopBuyer_1 = require("../../entity/ShopBuyer");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const user_service_1 = require("../partcApi/tencent/wx/ma/service/user.service");
const shop_service_1 = require("./shop.service");
const _ = require("lodash");
let ShopBuyerService = ShopBuyerService_1 = class ShopBuyerService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 消费者服务
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${ShopBuyerService_1 === null || ShopBuyerService_1 === void 0 ? void 0 : ShopBuyerService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  

  , ( SELECT username FROM buyer WHERE buyer.id = t.buyer_id ) AS username

  , ( SELECT t1.code FROM ${ShopBuyerService_1 === null || ShopBuyerService_1 === void 0 ? void 0 : ShopBuyerService_1.TABLE_NAME} t1 WHERE t.parent_id = t1.id ) AS parent_code  

  , ( SELECT COUNT(*) FROM ${ShopBuyerService_1 === null || ShopBuyerService_1 === void 0 ? void 0 : ShopBuyerService_1.TABLE_NAME} t2 WHERE t2.parent_id = t.id ) AS children_count -- 我邀请的人数量

  , ( SELECT COUNT(*) FROM trade_order WHERE shop_buyer_id = t.id ) AS order_count -- 订单数量

  , ( SELECT COUNT(*) FROM profit_sharing WHERE account = t.id ) AS profit_sharing_count -- 分账数量

     `;
        this.repository = null;
        this.userService = null;
        this.shopService = null;
        this.log = "";
    }
    /**
     * 分页查询店铺买家列表
     * @param parentShopBuyerId - 父级店铺买家ID
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     * @description 根据父级店铺买家ID、查询字符串、参数字符串、请求参数对象和分页对象，分页查询店铺买家列表，并返回符合条件的店铺买家信息
     */
    async page(parentShopBuyerId = "", query, params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        console === null || console === void 0 ? void 0 : console.log(this === null || this === void 0 ? void 0 : this.log);
        // 初始化查询条件字符串
        let whereSql = " "; // 查询条件字符串
        // 如果父级店铺买家ID存在，则添加到查询条件中
        if (parentShopBuyerId) {
            whereSql += ` AND t.parent_id = '${parentShopBuyerId}' `;
        }
        // 使用sqlUtils?.like处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ["code"], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue); // 处理前端的搜索字符串的搜索需求
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        // 使用sqlUtils?.whereOrFilters处理前端的表格中筛选需求
        whereSql += (_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters); // 处理前端的表格中筛选需求
        // 使用sqlUtils?.mulColumnLike处理pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句
        whereSql += (_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize',]));
        // 使用sqlUtils?.query处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        whereSql += (_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query);
        // 执行查询语句并返回page对象结果
        // 执行分页查询
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
            return (_k = _ === null || _ === void 0 ? void 0 : _.keyBy) === null || _k === void 0 ? void 0 : _k.call(_, data === null || data === void 0 ? void 0 : data.list, 'value');
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
     * 根据ID查询店铺买家信息
     * @param id - 店铺买家ID
     * @returns Promise<any> - 返回查询到的店铺买家信息
     * @description 根据ID查询一条店铺买家数据，包括店铺买家的基本信息、关联的买家用户名、父级店铺买家代码、子级店铺买家数量、订单数量和分账数量
     */
    async getById(id = "") {
        // 根据id查询一条数据
        var _a;
        // 调用父类的getByIdBase方法，根据ID查询店铺买家信息
        // this?.selectSql 和 this?.fromSql 是预定义的查询字段和表名
        return (_a = super.getByIdBase) === null || _a === void 0 ? void 0 : _a.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql);
    }
    /**
     * 根据店铺买家代码获取店铺买家信息
     * @param code - 店铺买家代码
     * @returns Promise<ShopBuyer> - 返回查询到的店铺买家信息
     * @description 根据店铺买家代码查询店铺买家信息，如果未找到则返回null
     */
    async getByCode(code = "") {
        var _a, _b;
        // 使用TypeORM的findOneBy方法根据店铺买家代码查询店铺买家信息
        return await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOneBy) === null || _b === void 0 ? void 0 : _b.call(_a, { code: code }));
    }
    /**
     * 删除指定ID的店铺买家
     * @param ids - 要删除的店铺买家ID数组
     * @returns Promise<void> - 无返回值
     * @description 根据提供的店铺买家ID数组，删除对应的店铺买家记录
     */
    async del(ids) {
        var _a, _b;
        // 使用TypeORM的delete方法删除指定ID的店铺买家
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新店铺买家信息
     * @param obj - 店铺买家对象
     * @returns Promise<ShopBuyer> - 返回更新后的店铺买家对象
     * @description 根据提供的店铺买家对象，更新店铺买家信息，如果店铺买家不存在则新增，存在则修改
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = "";
        // 删除redis缓存
        const key = (ShopBuyerService_1 === null || ShopBuyerService_1 === void 0 ? void 0 : ShopBuyerService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, ShopBuyerService_1 === null || ShopBuyerService_1 === void 0 ? void 0 : ShopBuyerService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id));
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, ShopBuyerService_1 === null || ShopBuyerService_1 === void 0 ? void 0 : ShopBuyerService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, ShopBuyerService_1 === null || ShopBuyerService_1 === void 0 ? void 0 : ShopBuyerService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
     * 更新店铺买家的场景信息
     * @param scene - 新的场景信息
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<string> - 返回更新结果的状态码
     * @description 根据提供的场景信息和店铺买家ID，更新店铺买家的场景信息，如果场景信息已存在则返回相应状态码，否则更新场景信息并返回成功状态码
     */
    async updateScene(scene = "", shopBuyerId) {
        var _a, _b, _c, _d, _e, _f, _g;
        let data = "";
        // 根据店铺买家ID查询店铺买家信息
        const shopBuyer = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, shopBuyerId));
        // 如果店铺买家的场景信息已存在，则返回"myScene"
        if (shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.scene) {
            data = "myScene";
            return data;
        }
        // 根据场景信息查询父级店铺买家信息
        const parent = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneBy) === null || _d === void 0 ? void 0 : _d.call(_c, {
            code: scene,
        }));
        // 如果父级店铺买家不存在或与当前店铺买家相同，则返回"sceneIsError"
        if (!(parent) || shopBuyerId === (parent === null || parent === void 0 ? void 0 : parent.id)) {
            data = "sceneIsError";
            return data;
        }
        // 如果父级店铺买家的场景信息为空，则返回"parentSceneIsEmpty"
        if (!(parent === null || parent === void 0 ? void 0 : parent.scene)) {
            data = "parentSceneIsEmpty";
            return data;
        }
        // 设置店铺买家的父级ID和场景信息
        shopBuyer.parentId = parent.id;
        shopBuyer.scene = await ((_e = super.getCode) === null || _e === void 0 ? void 0 : _e.call(this, parent.scene, ShopBuyerService_1 === null || ShopBuyerService_1 === void 0 ? void 0 : ShopBuyerService_1.TABLE_NAME, 4, "scene"));
        // 保存更新后的店铺买家信息
        await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, shopBuyer));
        // 返回"myScene"表示更新成功
        data = "myScene";
        return data;
    }
    /**
     * 获取店铺买家的二维码
     * @param shopId - 店铺ID
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<any> - 返回包含二维码信息的对象
     * @description 根据店铺ID和店铺买家ID生成或获取店铺买家的二维码，如果已生成则直接返回，否则生成新的二维码并保存
     */
    async getQrcode(shopId = "", shopBuyerId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        // 如果店铺买家ID为空，则返回null
        if (!shopBuyerId) {
            return null;
        }
        // 根据店铺买家ID查询店铺买家信息
        const shopBuyer = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, shopBuyerId));
        // 如果店铺买家不存在，则返回null
        if (!shopBuyer) {
            return null;
        }
        // 初始化返回数据对象
        const data = {
            code: shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.code,
        };
        // 如果店铺买家的场景为空，则设置返回码为"parentSceneIsEmpty"
        if (!(shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.scene)) {
            data.code = "parentSceneIsEmpty";
        }
        // 如果店铺买家的二维码图片已存在，则直接返回二维码图片
        if (shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.img) {
            data.img = shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.img;
            return data;
        }
        // 如果店铺买家的二维码代码为空，则生成新的二维码代码
        if (!(shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.code)) {
            shopBuyer.code = await ((_c = super.getCode) === null || _c === void 0 ? void 0 : _c.call(this, null, "shop_buyer", 8));
        }
        // 根据店铺ID查询店铺信息
        const shop = await ((_e = this === null || this === void 0 ? void 0 : (_d = this.shopService).getById) === null || _e === void 0 ? void 0 : _e.call(_d, shopId));
        // 获取店铺的访问令牌
        const accessToken = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.userService) === null || _f === void 0 ? void 0 : _f.getAccessToken) === null || _g === void 0 ? void 0 : _g.call(_f, shopId));
        // 构建场景字符串
        const scene = `s=${shop.code}&b=${shopBuyer.code}`;
        // 根据场景字符串和访问令牌生成二维码图片
        const img = await ((_j = (_h = this === null || this === void 0 ? void 0 : this.userService) === null || _h === void 0 ? void 0 : _h.getwxacodeunlimit) === null || _j === void 0 ? void 0 : _j.call(_h, scene, accessToken));
        // 将生成的二维码图片保存到店铺买家信息中
        shopBuyer.img = img;
        await ((_l = (_k = this === null || this === void 0 ? void 0 : this.repository) === null || _k === void 0 ? void 0 : _k.save) === null || _l === void 0 ? void 0 : _l.call(_k, shopBuyer));
        // 设置返回数据中的二维码图片
        data.img = shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.img;
        // 返回包含二维码信息的对象
        return data;
    }
    /**
     * 根据店铺买家ID获取其父级店铺买家
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<any> - 返回查询到的父级店铺买家信息
     * @description 根据店铺买家ID查询其父级店铺买家，如果未找到则返回null
     */
    async getParent(shopBuyerId = "") {
        var _a, _b, _c, _d, _e;
        // 根据id查询一条数据
        const shopBuyer = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, shopBuyerId));
        // 如果店铺买家不存在或场景为空，则返回null
        if (!(shopBuyer) || !(shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.scene)) {
            return null;
        }
        // 获取子场景
        const childrenScene = (_d = (_c = shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.scene) === null || _c === void 0 ? void 0 : _c.substring) === null || _d === void 0 ? void 0 : _d.call(_c, 0, shopBuyer.scene.length - 4);
        // 构建SQL查询语句
        const whereSql = ` AND t.scene = '${childrenScene}' `;
        // 执行SQL查询
        const arr = await ((_e = super.arrBase) === null || _e === void 0 ? void 0 : _e.call(this, null, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql));
        // 如果查询结果为空，则返回null
        if (!arr) {
            return null;
        }
        // 返回查询结果
        return arr === null || arr === void 0 ? void 0 : arr[0];
    }
    /**
     * 根据店铺买家ID获取其所有子级店铺买家
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<any[]> - 返回查询到的子级店铺买家列表
     * @description 根据店铺买家ID查询其所有子级店铺买家，如果未找到则返回空数组
     */
    async getChildren(shopBuyerId = "") {
        // 返回一个空数组
        return [];
    }
    /**
     * 根据用户名和店铺ID查找店铺买家
     * @param username - 用户名
     * @param shopId - 店铺ID
     * @returns Promise<any> - 返回查询到的店铺买家信息
     * @description 根据用户名和店铺ID查询店铺买家信息，如果未找到则抛出异常
     */
    async findByUsername(username, shopId) {
        var _a, _b, _c;
        // 记录日志
        let log = "";
        // 构建SQL查询语句
        let sql = ` SELECT t.* FROM shop_buyer t WHERE t.shop_id = '${shopId}' AND t.buyer_id IN ( SELECT id FROM buyer WHERE buyer.username = '${username}' ) `;
        // 执行SQL查询
        const result = await ((_a = super.query) === null || _a === void 0 ? void 0 : _a.call(this, sql));
        // 如果查询结果为空，则抛出异常
        if (!result) {
            // 记录日志
            log = "查找的用户名不存在，操作失败";
            // 创建Zero0Error对象
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            // 记录错误日志
            (_c = (_b = this === null || this === void 0 ? void 0 : this.logger) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.call(_b, log, zero0Error);
            // 抛出异常
            throw zero0Error;
        }
        // 返回查询结果
        return result === null || result === void 0 ? void 0 : result[0];
    }
};
ShopBuyerService.TABLE_NAME = "shop_buyer";
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], ShopBuyerService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(ShopBuyer_1.ShopBuyer),
    __metadata("design:type", typeorm_1.Repository)
], ShopBuyerService.prototype, "repository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], ShopBuyerService.prototype, "userService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", shop_service_1.ShopService)
], ShopBuyerService.prototype, "shopService", void 0);
ShopBuyerService = ShopBuyerService_1 = __decorate([
    (0, decorator_1.Provide)()
], ShopBuyerService);
exports.ShopBuyerService = ShopBuyerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcEJ1eWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS90cmFkZS9zaG9wQnV5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThEO0FBQzlELGlFQUE2RDtBQUc3RCxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBQ3RELHNEQUFtRDtBQUluRCwyREFBd0Q7QUFFeEQscURBQXFEO0FBQ3JELHFEQUFxRDtBQUVyRCxpRkFBNkU7QUFDN0UsaURBQTZDO0FBRTdDLDRCQUE2QjtBQUU3QixJQUFhLGdCQUFnQix3QkFBN0IsTUFBYSxnQkFBaUIsU0FBUSwwQkFBVztJQUFqRDs7UUFDRSxRQUFRO1FBRUEsV0FBTSxHQUFZLElBQUksQ0FBQztRQUkvQixlQUFlO1FBQ1AsWUFBTyxHQUFHLFNBQVMsa0JBQWdCLGFBQWhCLGtCQUFnQix1QkFBaEIsa0JBQWdCLENBQUUsVUFBVSxLQUFLLENBQUM7UUFDOUQsc0JBQXNCO1FBQ2IsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNOzs7OzRCQUloQixrQkFBZ0IsYUFBaEIsa0JBQWdCLHVCQUFoQixrQkFBZ0IsQ0FBRSxVQUFVOzs2QkFFM0Isa0JBQWdCLGFBQWhCLGtCQUFnQix1QkFBaEIsa0JBQWdCLENBQUUsVUFBVTs7Ozs7O01BTW5ELENBQUM7UUFHRyxlQUFVLEdBQTBCLElBQUksQ0FBQztRQUd6QyxnQkFBVyxHQUFnQixJQUFJLENBQUM7UUFHaEMsZ0JBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBRWhDLFFBQUcsR0FBRyxFQUFFLENBQUM7SUF1WW5CLENBQUM7SUF0WUM7Ozs7Ozs7OztPQVNHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixpQkFBaUIsR0FBRyxFQUFFLEVBQ3RCLEtBQWEsRUFDYixNQUFjLEVBQ2QsUUFBa0IsRUFDbEIsSUFBVTtRQUVW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