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
var CartItemService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const CartItem_1 = require("../../entity/CartItem");
const goods_service_1 = require("./goods.service");
const Zero0Error_1 = require("../common/model/Zero0Error");
const goodsMessage_service_1 = require("./goodsMessage.service");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
let CartItemService = CartItemService_1 = class CartItemService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${CartItemService_1 === null || CartItemService_1 === void 0 ? void 0 : CartItemService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  

    , ( SELECT name FROM goods WHERE t.goods_id = goods.id ) AS goods_name

    , ( SELECT price FROM goods WHERE t.goods_id = goods.id ) AS price

     `;
        this.repository = null;
        this.goodsService = null;
        this.goodsMessageService = null;
    }
    /**
     * 分页查询购物车项
     * @param shopId - 店铺ID
     * @param shopBuyerId - 店铺买家ID
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    async page(shopId = '', shopBuyerId, query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g;
        // 查询条件字符串
        let whereSql = ' ';
        // 添加店铺ID查询条件
        if (shopId) {
            whereSql += ` AND t.shop_id = '${shopId}' `;
        }
        // 添加店铺买家ID查询条件
        whereSql += ` AND t.shop_buyer_id = '${shopBuyerId}' `;
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
        // 处理前端的表格中筛选需求
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize',]))) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query));
        console.log(whereSql);
        // 执行分页查询
        const pageBase = await ((_g = super.pageBase) === null || _g === void 0 ? void 0 : _g.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
        console.log('test');
        console.log(pageBase);
        // 返回分页查询结果
        return pageBase;
    }
    /**
     * 统计购物车项数量
     * @param shopId - 店铺ID
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<number> - 返回购物车项数量
     */
    async count(shopId = '', shopBuyerId) {
        var _a, _b;
        // 查询条件字符串
        let whereSql = ' ';
        // 添加店铺ID查询条件
        if (shopId) {
            whereSql += ` AND t.shop_id = '${shopId}' `;
        }
        // 添加店铺买家ID查询条件
        whereSql += ` AND t.shop_buyer_id = '${shopBuyerId}' `;
        // 构建查询总数的SQL语句
        const sqlCount = (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.selectCount) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, this === null || this === void 0 ? void 0 : this.fromSql, whereSql);
        // 执行查询总数的SQL语句
        const resultCount = await ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.call(this, sqlCount));
        // 获取查询结果中的总数
        const head = _ === null || _ === void 0 ? void 0 : _.head(resultCount);
        // 返回总数
        return head.count_0;
    }
    /**
     * 根据ID查询购物车项
     * @param id - 购物车项ID
     * @returns Promise<any> - 返回查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = CartItemService_1.TABLE_NAME + `:${id}`;
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
     * 删除购物车项
     * @param ids - 购物车项ID数组
     * @returns Promise<void> - 无返回值
     */
    async del(ids) {
        var _a, _b;
        // 删除购物车项
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, ids));
    }
    /**
     * 更新购物车项
     * @param obj - 购物车项对象
     * @returns Promise<CartItem> - 返回更新后的购物车项对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let log = '';
        // 字段非重复性验证
        const uniqueText = await ((_a = super.unique) === null || _a === void 0 ? void 0 : _a.call(this, CartItemService_1 === null || CartItemService_1 === void 0 ? void 0 : CartItemService_1.TABLE_NAME, null, obj === null || obj === void 0 ? void 0 : obj.id));
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
            // 保存购物车项
            await ((_e = (_d = this === null || this === void 0 ? void 0 : this.repository) === null || _d === void 0 ? void 0 : _d.save) === null || _e === void 0 ? void 0 : _e.call(_d, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                // 新增数据时，设置此条数据的orderNum排序值
                await ((_f = super.sortOrder) === null || _f === void 0 ? void 0 : _f.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, CartItemService_1 === null || CartItemService_1 === void 0 ? void 0 : CartItemService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        let old = await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.findOneById) === null || _h === void 0 ? void 0 : _h.call(_g, obj === null || obj === void 0 ? void 0 : obj.id));
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            // 保存购物车项
            await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                // 新增数据时，设置此条数据的orderNum排序值
                await ((_l = super.sortOrder) === null || _l === void 0 ? void 0 : _l.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, CartItemService_1 === null || CartItemService_1 === void 0 ? void 0 : CartItemService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        // 修改数据
        await ((_o = (_m = this === null || this === void 0 ? void 0 : this.repository) === null || _m === void 0 ? void 0 : _m.save) === null || _o === void 0 ? void 0 : _o.call(_m, old)); // 修改数据
    }
    /**
     * 保存购物车项
     * @param map - 购物车项数据
     * @param shopBuyerId - 店铺买家ID
     * @param priceUnit - 价格单位
     * @returns Promise<void> - 无返回值
     */
    async save(map, shopBuyerId, priceUnit) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        let log = '';
        const priceMul = (_a = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _a === void 0 ? void 0 : _a.call(_, 1, priceUnit);
        const data = map === null || map === void 0 ? void 0 : map.data;
        const goodsId = data === null || data === void 0 ? void 0 : data.goodsId;
        const quantity = data === null || data === void 0 ? void 0 : data.selectedNum;
        const selectedSkuComb = data === null || data === void 0 ? void 0 : data.selectedSkuComb;
        const goods = null;
        const quota = goods === null || goods === void 0 ? void 0 : goods.quota;
        const startSaleNum = goods === null || goods === void 0 ? void 0 : goods.startSaleNum;
        let price = 0;
        const goodsSkuId = '';
        const propertyPrice = 0.0;
        const list = '';
        const skuListNew = [];
        if ((quota) && quantity > quota) {
            log = '购买数量大于限购数,购买失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_c = (_b = this === null || this === void 0 ? void 0 : this.logger) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.call(_b, log, zero0Error);
            throw zero0Error;
        }
        if ((startSaleNum) && quantity < startSaleNum) {
            log = '购买数量小于起售数量,购买失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        if (selectedSkuComb) {
            price = selectedSkuComb === null || selectedSkuComb === void 0 ? void 0 : selectedSkuComb.price;
            price = (_f = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _f === void 0 ? void 0 : _f.call(_, price, priceMul);
            // let goodsSkuId: string = selectedSkuComb?.id;
            // let propertyPrice: number = selectedSkuComb?.property_price;
            let properties = selectedSkuComb === null || selectedSkuComb === void 0 ? void 0 : selectedSkuComb.properties;
            properties = await (this === null || this === void 0 ? void 0 : this.propertiesPriceMul(properties, priceUnit));
            const propertiesPriceSum = await (this === null || this === void 0 ? void 0 : this.propertiesSum(properties));
            price = _ === null || _ === void 0 ? void 0 : _.add(price, propertiesPriceSum);
            // let list: string = selectedSkuComb?.list;
            // let skuListCn: string = await this?.skuService?.getSkuListCn(list, null, null, );
            // let skuListNew: any[] = JSON?.parse?.(list);
        }
        (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.call(_g, '查询此买家已有的购物车信息,将相同商品取出,进行SKU规格比较,看是否相同,如果相同,则重新计算数量和单价,如果不同,则新增购物车信息');
        const cartItems = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findBy) === null || _k === void 0 ? void 0 : _k.call(_j, {
            goodsId: goodsId,
            shopBuyerId: shopBuyerId,
        }));
        if (!cartItems) {
            (_m = (_l = this === null || this === void 0 ? void 0 : this.logger) === null || _l === void 0 ? void 0 : _l.info) === null || _m === void 0 ? void 0 : _m.call(_l, '此买家购物车中不存在相同商品');
            const cartItem = new CartItem_1.CartItem();
            cartItem.goodsId = goodsId;
            cartItem.shopBuyerId = shopBuyerId;
            cartItem.quantity = quantity;
            cartItem.shopId = goods === null || goods === void 0 ? void 0 : goods.shopId;
            cartItem.goodsName = goods === null || goods === void 0 ? void 0 : goods.name;
            (_p = (_o = this === null || this === void 0 ? void 0 : this.repository) === null || _o === void 0 ? void 0 : _o.save) === null || _p === void 0 ? void 0 : _p.call(_o, cartItem);
            return;
        }
        if (!(goodsSkuId) || !(list) || !(skuListNew)) {
            (_r = (_q = this === null || this === void 0 ? void 0 : this.logger) === null || _q === void 0 ? void 0 : _q.info) === null || _r === void 0 ? void 0 : _r.call(_q, '此买家购买的是单规格商品,并且此商品在购物车中已购买过,则更新数量及单价信息');
            const cartItem1 = (_s = _ === null || _ === void 0 ? void 0 : _.head) === null || _s === void 0 ? void 0 : _s.call(_, cartItems);
            const quantity1 = cartItem1.quantity;
            // let price1: number = cartItem1.price;
            let propertyPriceExist = 0.0;
            if (cartItem1.propertyPrice) {
                propertyPriceExist = cartItem1.propertyPrice;
            }
            const messages1 = cartItem1.messages;
            const cartMessages1 = cartItem1.cartMessages;
            const priceNew = 0.0;
            cartItem1.price = priceNew;
            cartItem1.quantity = _ === null || _ === void 0 ? void 0 : _.add(quantity, quantity1);
            cartItem1.propertyPrice = _ === null || _ === void 0 ? void 0 : _.add(propertyPriceExist, propertyPrice);
            cartItem1.messages = await ((_t = this === null || this === void 0 ? void 0 : this.goodsMessageService) === null || _t === void 0 ? void 0 : _t.insertMessages(messages1, null));
            cartItem1.cartMessages = await ((_u = this === null || this === void 0 ? void 0 : this.goodsMessageService) === null || _u === void 0 ? void 0 : _u.insertMessages(cartMessages1, null));
            (_w = (_v = this === null || this === void 0 ? void 0 : this.repository) === null || _v === void 0 ? void 0 : _v.save) === null || _w === void 0 ? void 0 : _w.call(_v, cartItem1);
        }
    }
    async propertiesSum(list) {
        let sum = 0.0;
        if (!list) {
            return sum;
        }
        for (const property of list) {
            const v = property.v;
            if (!v) {
                continue;
            }
            for (const vElement of v) {
                const price = vElement.price;
                sum = _ === null || _ === void 0 ? void 0 : _.add(sum, price);
            }
        }
        return sum;
    }
    async propertiesPriceMul(list, priceUnit) {
        var _a;
        if (!list) {
            return null;
        }
        for (const property of list) {
            const v = property.v;
            if (!v) {
                continue;
            }
            for (const vElement of v) {
                let price = vElement.price;
                price = (_a = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _a === void 0 ? void 0 : _a.call(_, price, priceUnit);
                vElement.price = price;
            }
        }
        return list;
    }
    async add(cartItem) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '根据会员id,商品id和规格获取购物车中商品,查看此商品在购物车中是否存在');
        const existCartItem = await (this === null || this === void 0 ? void 0 : this.getCartItem(cartItem));
        if (!existCartItem) {
            (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.call(_c, '此商品在购物车中不存在');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, cartItem);
            return null;
        }
        (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.call(_g, '此商品在购物车中已存在');
        existCartItem.quantity =
            (parseInt === null || parseInt === void 0 ? void 0 : parseInt(existCartItem.quantity + '')) + (parseInt === null || parseInt === void 0 ? void 0 : parseInt(cartItem.quantity + ''));
        (_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, existCartItem);
        return existCartItem;
    }
    async getCartItem(cartItem) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '根据会员id,商品id和规格获取购物车中商品');
        const where = {
            shopId: cartItem.shopId,
            shopBuyerId: cartItem.shopBuyerId,
            goodsId: cartItem.goodsId,
        };
        if (cartItem.goodsSkuId) {
            where.goodsSkuId = cartItem === null || cartItem === void 0 ? void 0 : cartItem.goodsSkuId;
        }
        const cartItems = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findBy) === null || _d === void 0 ? void 0 : _d.call(_c, where));
        if (!cartItems) {
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.info) === null || _f === void 0 ? void 0 : _f.call(_e, '此商品在购物车中不存在');
            return null;
        }
        (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.call(_g, '此商品在购物车中已存在');
        return (_j = _ === null || _ === void 0 ? void 0 : _.head) === null || _j === void 0 ? void 0 : _j.call(_, cartItems);
    }
    async updateQuantity(id, quantity) {
        var _a, _b, _c, _d, _e, _f, _g;
        let cartItem = null;
        if (quantity < 1) {
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, { id: id }));
            return;
        }
        cartItem = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, id));
        (_e = this === null || this === void 0 ? void 0 : this.goodsService) === null || _e === void 0 ? void 0 : _e.countStock(cartItem.goodsId, cartItem.goodsSkuId, cartItem.skuList, quantity);
        cartItem.quantity = quantity;
        await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, cartItem));
    }
    async clear(shopId = '', shopBuyerId) {
        var _a;
        const cartItem = new CartItem_1.CartItem();
        cartItem.shopId = shopId;
        cartItem.shopBuyerId = shopBuyerId;
        await ((_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.remove(cartItem));
        return cartItem;
    }
};
CartItemService.TABLE_NAME = 'cart_item';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], CartItemService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(CartItem_1.CartItem),
    __metadata("design:type", typeorm_1.Repository)
], CartItemService.prototype, "repository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", goods_service_1.GoodsService)
], CartItemService.prototype, "goodsService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", goodsMessage_service_1.GoodsMessageService)
], CartItemService.prototype, "goodsMessageService", void 0);
CartItemService = CartItemService_1 = __decorate([
    (0, decorator_1.Provide)()
], CartItemService);
exports.CartItemService = CartItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydEl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3RyYWRlL2NhcnRJdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RDtBQUM5RCxpRUFBNkQ7QUFHN0QscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUN0RCxvREFBaUQ7QUFHakQsbURBQStDO0FBQy9DLDJEQUF3RDtBQUN4RCxpRUFBNkQ7QUFFN0QscURBQXFEO0FBQ3JELHFEQUFxRDtBQUVyRCw0QkFBNEI7QUFHNUIsSUFBYSxlQUFlLHVCQUE1QixNQUFhLGVBQWdCLFNBQVEsMEJBQVc7SUFBaEQ7O1FBR1UsV0FBTSxHQUFZLElBQUksQ0FBQTtRQUk5QixlQUFlO1FBQ1AsWUFBTyxHQUFHLFNBQVMsaUJBQWUsYUFBZixpQkFBZSx1QkFBZixpQkFBZSxDQUFFLFVBQVUsS0FBSyxDQUFDO1FBQzdELHNCQUFzQjtRQUNiLGNBQVMsR0FBRyxJQUFJLDBCQUFXLENBQUMsTUFBTTs7Ozs7O01BTXRDLENBQUM7UUFHRyxlQUFVLEdBQXlCLElBQUksQ0FBQztRQUd4QyxpQkFBWSxHQUFpQixJQUFJLENBQUM7UUFHbEMsd0JBQW1CLEdBQXdCLElBQUksQ0FBQztJQXFmMUQsQ0FBQztJQW5mQzs7Ozs7Ozs7O09BU0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUNmLE1BQU0sR0FBRyxFQUFFLEVBQ1gsV0FBVyxFQUNYLEtBQWEsRUFBRSxNQUFjLEVBQzdCLFFBQWtCLEVBQ2xCLElBQVU7O1FBRVYsVUFBVTtRQUNWLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQTtRQUVsQixhQUFhO1FBQ2IsSUFBSSxNQUFNLEVBQUU7WUFDVixRQUFRLElBQUkscUJBQXFCLE1BQU0sSUFBSSxDQUFDO1NBQzdDO1FBRUQsZUFBZTtRQUNmLFFBQVEsSUFBSSwyQkFBMkIs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