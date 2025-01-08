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
var PurchaseOrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const Page_1 = require("../common/model/Page");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const PurchaseOrder_1 = require("../../entity/PurchaseOrder");
const Material_1 = require("../../entity/Material");
const PurchaseOrderItem_1 = require("../../entity/PurchaseOrderItem");
const ShopBuyer_1 = require("../../entity/ShopBuyer");
const BuyerReceiveAddress_1 = require("../../entity/BuyerReceiveAddress");
const Zero0Error_1 = require("../common/model/Zero0Error");
const DeliveryList_1 = require("../../entity/DeliveryList");
const _ = require("lodash");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const Stock_1 = require("../../entity/Stock");
const user_service_1 = require("../auth/user.service");
const moment = require('moment');
let PurchaseOrderService = PurchaseOrderService_1 = class PurchaseOrderService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.orderNotifyWxpayReturnStr = ' <xml> <return_code><![CDATA[SUCCESS]]></return_code> <return_msg><![CDATA[OK]]></return_msg> </xml> ';
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${PurchaseOrderService_1 === null || PurchaseOrderService_1 === void 0 ? void 0 : PurchaseOrderService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  , ( SELECT COUNT(*) AS item_count FROM purchase_order_item WHERE purchase_order_item.order_id = t.id ) AS item_count 
  , ( CASE t.trade_state WHEN 'submit' THEN '待入库' WHEN 'stock' THEN '已采购完成' ELSE '待提交' END ) AS trade_state_cn
  , ( SELECT username FROM user WHERE user.id = t.create_user_id ) AS username
     `;
        this.repository = null;
        this.purchaseOrderItemRepository = null;
        this.shopBuyerRepository = null;
        this.materialRepository = null;
        this.buyerReceiveAddressRepository = null;
        this.deliveryListRepository = null;
        this.stockRepository = null;
        this.userService = null;
    }
    async page(userId, tradeState = '', query = '', params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        // 只有管理员可以管理采购单，其它角色看到的是空列表
        const user = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.userService) === null || _a === void 0 ? void 0 : _a.getById) === null || _b === void 0 ? void 0 : _b.call(_a, userId));
        const roleIds = user === null || user === void 0 ? void 0 : user.roleIds;
        if (!((_c = roleIds === null || roleIds === void 0 ? void 0 : roleIds.includes) === null || _c === void 0 ? void 0 : _c.call(roleIds, '1'))) {
            return new Page_1.Page();
        }
        let whereSql = ' '; // 查询条件字符串
        if (tradeState) {
            whereSql += ` AND t.trade_state = '${tradeState}' `;
        }
        whereSql += (_d = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _d === void 0 ? void 0 : _d.call(sqlUtils, ['title'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue); // 处理前端的搜索字符串的搜索需求
        // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
        // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
        // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
        whereSql += ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, (_g = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _g === void 0 ? void 0 : _g.call(strUtils, (_h = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _h === void 0 ? void 0 : _h.call(JSON, params), ['current', 'pageSize',]))) + ((_j = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _j === void 0 ? void 0 : _j.call(sqlUtils, query)); // 处理前端的表格中筛选需求
        // 执行查询语句并返回page对象结果
        const data = await ((_k = super.pageBase) === null || _k === void 0 ? void 0 : _k.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
        // 遍历查询结果,将查询结果异步读取到redis
        // 遍历查询结果,将查询结果中异步读取到redis
        (_l = this === null || this === void 0 ? void 0 : this.getToRedis) === null || _l === void 0 ? void 0 : _l.call(this, (_m = _ === null || _ === void 0 ? void 0 : _.map) === null || _m === void 0 ? void 0 : _m.call(_, data === null || data === void 0 ? void 0 : data.list, 'id'));
        if ((page === null || page === void 0 ? void 0 : page.pageSize) > 0) {
            return data;
        }
        if ((page === null || page === void 0 ? void 0 : page.pageSize) < 1) {
            // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
            return (_o = _ === null || _ === void 0 ? void 0 : _.keyBy) === null || _o === void 0 ? void 0 : _o.call(_, data === null || data === void 0 ? void 0 : data.list, "value");
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
        const key = PurchaseOrderService_1.TABLE_NAME + `:${id}`;
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
    async del(idsArr) {
        var _a, _b;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, idsArr));
    }
    async submit(id = '') {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d;
        const purchaseOrder = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, id));
        purchaseOrder.tradeState = 'submit';
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.save) === null || _d === void 0 ? void 0 : _d.call(_c, purchaseOrder));
        return purchaseOrder;
    }
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = '';
        // 删除redis缓存
        const key = (PurchaseOrderService_1 === null || PurchaseOrderService_1 === void 0 ? void 0 : PurchaseOrderService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, PurchaseOrderService_1 === null || PurchaseOrderService_1 === void 0 ? void 0 : PurchaseOrderService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, PurchaseOrderService_1 === null || PurchaseOrderService_1 === void 0 ? void 0 : PurchaseOrderService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, PurchaseOrderService_1 === null || PurchaseOrderService_1 === void 0 ? void 0 : PurchaseOrderService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
    async updateItem(obj, purchaseOrderItem, type) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let log = '';
        if (type === 'input') {
            // 新增新物料
            // 判断物料名称及规格型号是否重复
            const countUnique = await ((_a = this === null || this === void 0 ? void 0 : this.materialRepository) === null || _a === void 0 ? void 0 : _a.countBy({ name: obj.name, sku: obj.sku }));
            if (countUnique > 0) {
                log = '同名称及规格型号物料已存在,操作失败';
                const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
                (_c = (_b = this === null || this === void 0 ? void 0 : this.logger) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.call(_b, log, zero0Error);
                throw zero0Error;
            }
            await ((_e = (_d = this === null || this === void 0 ? void 0 : this.materialRepository) === null || _d === void 0 ? void 0 : _d.save) === null || _e === void 0 ? void 0 : _e.call(_d, obj));
            purchaseOrderItem.materialId = obj === null || obj === void 0 ? void 0 : obj.id;
        }
        // 判断此物料id在此采购单的其它明细中是否已存在，如存在，则累加
        const materialId = purchaseOrderItem === null || purchaseOrderItem === void 0 ? void 0 : purchaseOrderItem.materialId;
        const orderId = purchaseOrderItem === null || purchaseOrderItem === void 0 ? void 0 : purchaseOrderItem.orderId;
        const one = await ((_g = (_f = this === null || this === void 0 ? void 0 : this.purchaseOrderItemRepository) === null || _f === void 0 ? void 0 : _f.findOneBy) === null || _g === void 0 ? void 0 : _g.call(_f, {
            orderId: orderId,
            materialId: materialId,
        }));
        if (one) {
            one.quantity =
                (parseInt === null || parseInt === void 0 ? void 0 : parseInt((one === null || one === void 0 ? void 0 : one.quantity) + '')) +
                    (parseInt === null || parseInt === void 0 ? void 0 : parseInt((purchaseOrderItem === null || purchaseOrderItem === void 0 ? void 0 : purchaseOrderItem.quantity) + ''));
            await ((_j = (_h = this === null || this === void 0 ? void 0 : this.purchaseOrderItemRepository) === null || _h === void 0 ? void 0 : _h.save) === null || _j === void 0 ? void 0 : _j.call(_h, one));
            return one;
        }
        await ((_l = (_k = this === null || this === void 0 ? void 0 : this.purchaseOrderItemRepository) === null || _k === void 0 ? void 0 : _k.save) === null || _l === void 0 ? void 0 : _l.call(_k, purchaseOrderItem));
        return null;
    }
    async buy(map, shopBuyerId = '', priceUnit) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '立即购买');
        const priceMul = (_c = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _c === void 0 ? void 0 : _c.call(_, 1, priceUnit);
        let log = '';
        const data = map === null || map === void 0 ? void 0 : map.data;
        const materialId = data === null || data === void 0 ? void 0 : data.materialId;
        const quantity = data === null || data === void 0 ? void 0 : data.selectedNum;
        const selectedSkuComb = data === null || data === void 0 ? void 0 : data.selectedSkuComb;
        const material = await ((_e = (_d = this === null || this === void 0 ? void 0 : this.materialRepository) === null || _d === void 0 ? void 0 : _d.findOneById) === null || _e === void 0 ? void 0 : _e.call(_d, materialId));
        const quota = material === null || material === void 0 ? void 0 : material.quota;
        const startSaleNum = material === null || material === void 0 ? void 0 : material.startSaleNum;
        if (quota && quantity > quota) {
            log = '购买数量大于限购数,购买失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_g = (_f = this === null || this === void 0 ? void 0 : this.logger) === null || _f === void 0 ? void 0 : _f.error) === null || _g === void 0 ? void 0 : _g.call(_f, log, zero0Error);
            throw zero0Error;
        }
        if (startSaleNum && quantity < startSaleNum) {
            log = '购买数量小于起售数量,购买失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_j = (_h = this === null || this === void 0 ? void 0 : this.logger) === null || _h === void 0 ? void 0 : _h.error) === null || _j === void 0 ? void 0 : _j.call(_h, log, zero0Error);
            throw zero0Error;
        }
        const tradeOrder = new PurchaseOrder_1.PurchaseOrder();
        tradeOrder.shopBuyerId = shopBuyerId;
        tradeOrder.shopId = material === null || material === void 0 ? void 0 : material.shopId;
        tradeOrder.tradeState = 'NOTPAY';
        tradeOrder.delivery = 'eticket';
        tradeOrder.freightPayer = 'shop';
        if ((material === null || material === void 0 ? void 0 : material.delivery) === 'delivery') {
            tradeOrder.delivery = 'delivery';
        }
        if ((material === null || material === void 0 ? void 0 : material.freightPayer) === 'shop') {
            tradeOrder.freightPayer = 'shop';
        }
        (_l = (_k = this === null || this === void 0 ? void 0 : this.repository) === null || _k === void 0 ? void 0 : _k.save) === null || _l === void 0 ? void 0 : _l.call(_k, tradeOrder);
        const orderItem = new PurchaseOrderItem_1.PurchaseOrderItem();
        orderItem.materialId = materialId;
        orderItem.shopBuyerId = shopBuyerId;
        orderItem.quantity = quantity;
        orderItem.materialName = material === null || material === void 0 ? void 0 : material.name;
        orderItem.orderId = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.id;
        let price = 0.0;
        if (selectedSkuComb) {
            price = selectedSkuComb === null || selectedSkuComb === void 0 ? void 0 : selectedSkuComb.price;
            price = (_m = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _m === void 0 ? void 0 : _m.call(_, price, priceMul);
            const materialSkuId = selectedSkuComb === null || selectedSkuComb === void 0 ? void 0 : selectedSkuComb.id;
            const propertyPrice = selectedSkuComb === null || selectedSkuComb === void 0 ? void 0 : selectedSkuComb.property_price;
            const properties = selectedSkuComb === null || selectedSkuComb === void 0 ? void 0 : selectedSkuComb.properties;
            orderItem.materialSkuId = materialSkuId;
            orderItem.properties = JSON === null || JSON === void 0 ? void 0 : JSON.stringify(properties);
            orderItem.propertyPrice = propertyPrice;
        }
        orderItem.price = price;
        (_p = (_o = this === null || this === void 0 ? void 0 : this.purchaseOrderItemRepository) === null || _o === void 0 ? void 0 : _o.save) === null || _p === void 0 ? void 0 : _p.call(_o, orderItem);
        let totalAmount = 0.0;
        totalAmount =
            totalAmount + ((_q = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _q === void 0 ? void 0 : _q.call(_, orderItem === null || orderItem === void 0 ? void 0 : orderItem.price, orderItem === null || orderItem === void 0 ? void 0 : orderItem.quantity));
        tradeOrder.totalAmount = totalAmount;
        const number = await ((_r = this === null || this === void 0 ? void 0 : this.getPostFee) === null || _r === void 0 ? void 0 : _r.call(this, tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.id));
        tradeOrder.postFee = number;
        tradeOrder.totalAmount = (_s = _ === null || _ === void 0 ? void 0 : _.add) === null || _s === void 0 ? void 0 : _s.call(_, tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.totalAmount, number);
        await ((_u = (_t = this === null || this === void 0 ? void 0 : this.repository) === null || _t === void 0 ? void 0 : _t.save) === null || _u === void 0 ? void 0 : _u.call(_t, tradeOrder));
        (_w = (_v = this === null || this === void 0 ? void 0 : this.logger) === null || _v === void 0 ? void 0 : _v.info) === null || _w === void 0 ? void 0 : _w.call(_v, '判断每个物料是否下单减库存,如果是,则减去库存');
        await ((_x = this === null || this === void 0 ? void 0 : this.subStock) === null || _x === void 0 ? void 0 : _x.call(this, tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.id, 'order'));
        return tradeOrder;
    }
    async createOrder(shopBuyerId = '', shopId = '') {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '创建订单');
        (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.call(_c, '获取购物车信息');
        (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.info) === null || _f === void 0 ? void 0 : _f.call(_e, '判断购物车中的物料库存是否足够');
        const tradeOrder = new PurchaseOrder_1.PurchaseOrder();
        tradeOrder.id = await (this === null || this === void 0 ? void 0 : this.getOutPurchaseNo());
        tradeOrder.shopBuyerId = shopBuyerId;
        tradeOrder.shopId = shopId;
        tradeOrder.delivery = 'eticket';
        tradeOrder.freightPayer = 'shop';
        const totalAmount = 0.0;
        tradeOrder.totalAmount = totalAmount;
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, tradeOrder));
        tradeOrder.totalAmount = totalAmount;
        await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, tradeOrder));
        const number = await (this === null || this === void 0 ? void 0 : this.getPostFee(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.id));
        tradeOrder.postFee = number;
        tradeOrder.totalAmount = _ === null || _ === void 0 ? void 0 : _.add(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.totalAmount, number);
        await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, tradeOrder));
        (_p = (_o = this === null || this === void 0 ? void 0 : this.logger) === null || _o === void 0 ? void 0 : _o.info) === null || _p === void 0 ? void 0 : _p.call(_o, '形成订单后,将购物车清空');
        (_r = (_q = this === null || this === void 0 ? void 0 : this.logger) === null || _q === void 0 ? void 0 : _q.info) === null || _r === void 0 ? void 0 : _r.call(_q, '判断每个物料是否下单减库存,如果是,则减去库存');
        await (this === null || this === void 0 ? void 0 : this.subStock(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.id, 'order'));
        return tradeOrder;
    }
    async getPostFee(orderId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '得到订单运费金额(元)');
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== 'NOTPAY') {
            log = '订单不是未支付状态,无法计算运费';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        const postFee = 0.0;
        const delivery = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.delivery;
        if (delivery === 'eticket') {
            (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.call(_g, '虚拟物料无需运费,运费为0');
            return postFee;
        }
        const freightPayer = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.freightPayer;
        if (freightPayer === 'shop') {
            (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.info) === null || _k === void 0 ? void 0 : _k.call(_j, '卖家承担运费（包邮）的物料,无需运费,运费为0');
            return postFee;
        }
        const receiverAddressId = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.receiverAddressId;
        if (!receiverAddressId) {
            (_m = (_l = this === null || this === void 0 ? void 0 : this.logger) === null || _l === void 0 ? void 0 : _l.info) === null || _m === void 0 ? void 0 : _m.call(_l, '订单未设置收货地址,无法计算运费');
            return postFee;
        }
        (_p = (_o = this === null || this === void 0 ? void 0 : this.logger) === null || _o === void 0 ? void 0 : _o.info) === null || _p === void 0 ? void 0 : _p.call(_o, '全国运费');
        return postFee;
    }
    async getOutPurchaseNo() {
        var _a, _b, _c;
        return (((_b = (_a = moment === null || moment === void 0 ? void 0 : moment()) === null || _a === void 0 ? void 0 : _a.format) === null || _b === void 0 ? void 0 : _b.call(_a, 'YYYYMMDDHHmmss')) +
            ((_c = _ === null || _ === void 0 ? void 0 : _.random) === null || _c === void 0 ? void 0 : _c.call(_, 1000000000000000, 9999999999999999, false)));
    }
    async updateAddress(id, addressId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '设置订单收货地址');
        const buyerReceiveAddress = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.buyerReceiveAddressRepository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, addressId));
        const tradeOrder = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.findOneById) === null || _f === void 0 ? void 0 : _f.call(_e, id));
        tradeOrder.receiverAddressId = addressId;
        tradeOrder.province = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.province;
        tradeOrder.city = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.city;
        tradeOrder.region = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.region;
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, tradeOrder));
        const postFee = await (this === null || this === void 0 ? void 0 : this.getPostFee(id));
        tradeOrder.postFee = postFee;
        tradeOrder.totalAmount = _ === null || _ === void 0 ? void 0 : _.add(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.totalAmount, tradeOrder.postFee);
        await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, tradeOrder));
        return tradeOrder;
    }
    async orderCount(shopBuyerId = '', shopId = '') { }
    async alipayWapPay(orderId) { }
    async alipayRefund(orderId) { }
    async alipayClose(orderId) { }
    async wxpayUnifiedOrder(orderId) {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '进行微信支付统一下单的订单预创建');
    }
    async callParseOrderNotifyResult(xmlData) {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '订单支付成功异步通知消息');
        // let payAppId = ''
        const outPurchaseNo = '';
        let resultCode = '';
        if (resultCode !== 'SUCCESS' || !(outPurchaseNo)) {
            return this === null || this === void 0 ? void 0 : this.orderNotifyWxpayReturnStr;
        }
        this === null || this === void 0 ? void 0 : this.orderSuccess(outPurchaseNo, 'wxpay');
        return this === null || this === void 0 ? void 0 : this.orderNotifyWxpayReturnStr;
    }
    async orderSuccess(outPurchaseNo, payType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '订单支付成功,更新订单状态');
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, outPurchaseNo));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== 'NOTPAY') {
            log = '该订单不是未支付的状态,无法进行修改价格的操作';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        tradeOrder.tradeState = 'SUCCESS';
        tradeOrder.payType = payType;
        tradeOrder.payTime = new Date();
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, tradeOrder));
        (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.info) === null || _k === void 0 ? void 0 : _k.call(_j, '如果是付款减库存,则进行物料库存减少操作');
        this === null || this === void 0 ? void 0 : this.subStock(outPurchaseNo, 'pay');
    }
    async subStock(orderId, subStockType) {
        var _a, _b;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '进行物料减库存操作,将订单占用的库存从物料库存中减去');
    }
    async refund(orderId) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '已支付的订单申请退款');
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== 'SUCCESS') {
            log = '该订单不是已支付状态,无法申请退款';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        tradeOrder.tradeState = 'REFUND';
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, tradeOrder));
    }
    async updateTotalAmount(orderId, newTotalAmount) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '未支付的订单进行修改订单价格操作');
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== 'NOTPAY') {
            log = '该订单不是未支付的状态,无法进行修改价格的操作';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        if (!(newTotalAmount) || newTotalAmount < 0.01) {
            log = '该订单修改后的价格过小';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.call(_g, log, zero0Error);
            throw zero0Error;
        }
        tradeOrder.totalAmount = newTotalAmount;
        await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, tradeOrder));
    }
    async updateShopMemo(orderId, memo) {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '订单进行修改卖家备注操作');
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        tradeOrder.shopMemo = memo;
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, tradeOrder));
    }
    async updateMessage(orderId, message) {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '订单进行修改买家留言操作');
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        tradeOrder.message = message;
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, tradeOrder));
    }
    async auditRefund(orderId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '已支付并申请退款的订单进行退款操作');
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        const payType = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.payType;
        if (tradeState !== 'REFUND') {
            log = '该订单不是已支付并申请退款的状态,无法进行退款操作';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        if (payType === 'wxpay') {
            // TODO
        }
        else if (payType === 'alipay') {
            // TODO
        }
        else if (payType === 'balance') {
            await (this === null || this === void 0 ? void 0 : this.refundBalance(orderId));
        }
        tradeOrder.tradeState = 'CLOSED';
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, tradeOrder));
        (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.info) === null || _k === void 0 ? void 0 : _k.call(_j, '进行库存回退操作');
        (_l = this === null || this === void 0 ? void 0 : this.refundStock) === null || _l === void 0 ? void 0 : _l.call(this, orderId);
    }
    async close(orderId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '进行未支付订单关闭操作,将订单占用的库存回退到物料库存中');
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        const payType = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.payType;
        if (tradeState !== 'NOTPAY') {
            log = '该订单不是未支付的状态,无法进行关闭操作';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        if (payType === 'wxpay') {
            // TODO
        }
        else if (payType === 'alipay') {
            // TODO
        }
        tradeOrder.tradeState = 'CLOSED';
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, tradeOrder));
        (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.info) === null || _k === void 0 ? void 0 : _k.call(_j, '进行库存回退操作');
        (_l = this === null || this === void 0 ? void 0 : this.refundStock) === null || _l === void 0 ? void 0 : _l.call(this, orderId);
    }
    async refundStock(orderId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '进行订单库存回退操作,将订单占用的库存回退到物料库存中');
        const orderItems = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.purchaseOrderItemRepository) === null || _c === void 0 ? void 0 : _c.findBy) === null || _d === void 0 ? void 0 : _d.call(_c, { orderId: orderId }));
        for (const orderItem of orderItems) {
            const material = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.materialRepository) === null || _e === void 0 ? void 0 : _e.findOneById) === null || _f === void 0 ? void 0 : _f.call(_e, orderItem === null || orderItem === void 0 ? void 0 : orderItem.materialId));
            const subStock1 = material === null || material === void 0 ? void 0 : material.subStock;
            if (subStock1 !== 'order' && subStock1 !== 'pay') {
                continue;
            }
            const materialSkuId = orderItem.materialSkuId;
            if (!materialSkuId) {
                (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.call(_g, '单规格物料');
                material.stock = (material === null || material === void 0 ? void 0 : material.stock) + orderItem.quantity;
                await ((_k = (_j = this === null || this === void 0 ? void 0 : this.materialRepository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, material));
            }
        }
    }
    async callParseRefundNotifyResult(xmlData) {
        return this === null || this === void 0 ? void 0 : this.orderNotifyWxpayReturnStr;
    }
    async setDelivery(orderId, deliveryCompany, deliveryTrackNo, needDelivery, isOthers) { }
    async payBalance(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '订单进行买家余额支付');
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, id));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== 'NOTPAY') {
            log = '订单不是未支付状态,支付失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        const shopBuyer = await ((_h = (_g = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _g === void 0 ? void 0 : _g.findOneBy) === null || _h === void 0 ? void 0 : _h.call(_g, {
            id: tradeOrder.shopBuyerId,
        }));
        const balance = shopBuyer.balance;
        if (!(balance) || balance < 0.01) {
            log = '买家余额不足,支付失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.error) === null || _k === void 0 ? void 0 : _k.call(_j, log, zero0Error);
            throw zero0Error;
        }
        const totalAmount = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.totalAmount;
        if (balance < totalAmount) {
            log = '买家余额不足,支付失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_m = (_l = this === null || this === void 0 ? void 0 : this.logger) === null || _l === void 0 ? void 0 : _l.error) === null || _m === void 0 ? void 0 : _m.call(_l, log, zero0Error);
            throw zero0Error;
        }
        shopBuyer.balance = (_o = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _o === void 0 ? void 0 : _o.call(_, balance, totalAmount);
        await ((_q = (_p = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _p === void 0 ? void 0 : _p.save) === null || _q === void 0 ? void 0 : _q.call(_p, shopBuyer));
    }
    async refundBalance(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '订单进行买家余额退款');
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, id));
        const payType = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.payType;
        if (payType !== 'balance') {
            return;
        }
        const shopBuyer = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _e === void 0 ? void 0 : _e.findOneBy) === null || _f === void 0 ? void 0 : _f.call(_e, {
            id: tradeOrder.shopBuyerId,
        }));
        shopBuyer.balance = shopBuyer.balance + tradeOrder.totalAmount;
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, shopBuyer));
    }
    async bonusToAmount(bonus, rate) {
        var _a, _b, _c, _d, _e;
        let log = '';
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '积分转换成金额(元)');
        if (!bonus) {
            log = '积分过小，转换失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.call(_c, log, zero0Error);
            throw zero0Error;
        }
        return (_e = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _e === void 0 ? void 0 : _e.call(_, bonus, rate);
    }
    async send(orderId, deliveryList) {
        // 标识符名称来自微信小商店
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '订单发货');
        (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.call(_c, '发货方式由用户在下单时选择，发货时已经默认了发货方式，因此发货时无需传入发货方式参数。拆单发货时，如果订单中含有多件同样的物料(相同的product_id和相同的sku_id)，这些物料必须在同一个包裹里一起发出。已经完成售后的物料不能进行发货');
        let log = '';
        const tradeOrder = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.findOneById) === null || _f === void 0 ? void 0 : _f.call(_e, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== 'SUCCESS') {
            log = '该订单不是已支付的状态,无法进行发货操作';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.call(_g, log, zero0Error);
            throw zero0Error;
        }
        if (deliveryList) {
            for (const deliveryListElement of deliveryList) {
                let deliveryListObj = new DeliveryList_1.DeliveryList();
                deliveryListObj = (_j = _ === null || _ === void 0 ? void 0 : _.assign) === null || _j === void 0 ? void 0 : _j.call(_, deliveryListObj, deliveryListElement);
                await ((_l = (_k = this === null || this === void 0 ? void 0 : this.deliveryListRepository) === null || _k === void 0 ? void 0 : _k.save) === null || _l === void 0 ? void 0 : _l.call(_k, deliveryListObj));
            }
        }
        tradeOrder.tradeState = 'DELIVERY';
        await ((_o = (_m = this === null || this === void 0 ? void 0 : this.repository) === null || _m === void 0 ? void 0 : _m.save) === null || _o === void 0 ? void 0 : _o.call(_m, tradeOrder));
    }
    async purchaseInstock(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        for (const item of data === null || data === void 0 ? void 0 : data.item) {
            if (!item.exp) {
                continue;
            }
            const one = await ((_b = this === null || this === void 0 ? void 0 : (_a = this.purchaseOrderItemRepository).findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, item === null || item === void 0 ? void 0 : item.id));
            one.exp = item.exp;
            await (this === null || this === void 0 ? void 0 : this.purchaseOrderItemRepository.save(one));
        }
        const id = data === null || data === void 0 ? void 0 : data.id;
        // 首先更新采购明细单中各个商品的失效期
        // 读取采购单明细列表
        const orderItems = await ((_d = this === null || this === void 0 ? void 0 : (_c = this.purchaseOrderItemRepository).findBy) === null || _d === void 0 ? void 0 : _d.call(_c, { orderId: id }));
        // 取出对应的物流信息
        for (const item of orderItems) {
            const materialId = item === null || item === void 0 ? void 0 : item.materialId;
            const quantity = item === null || item === void 0 ? void 0 : item.quantity;
            const exp = item === null || item === void 0 ? void 0 : item.exp;
            // 根据物料ID和有效期，查询此物料对应的库存信息
            let stock = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.stockRepository) === null || _e === void 0 ? void 0 : _e.findOneBy) === null || _f === void 0 ? void 0 : _f.call(_e, {
                materialId: materialId,
                exp: exp,
            }));
            // 按照库存中有效期信息，来更新库存信息
            // 如果库存已存在
            if (stock) {
                stock.quantity = (stock === null || stock === void 0 ? void 0 : stock.quantity) + quantity;
            }
            else {
                stock = new Stock_1.Stock();
                stock = {
                    ...stock,
                    ...item,
                };
            }
            await ((_h = (_g = this === null || this === void 0 ? void 0 : this.stockRepository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, stock));
        }
        const obj = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, id));
        obj.tradeState = 'stock';
        await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj));
    }
};
// 查询的数据库表名称
PurchaseOrderService.TABLE_NAME = 'purchase_order';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], PurchaseOrderService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(PurchaseOrder_1.PurchaseOrder),
    __metadata("design:type", typeorm_1.Repository)
], PurchaseOrderService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(PurchaseOrderItem_1.PurchaseOrderItem),
    __metadata("design:type", typeorm_1.Repository)
], PurchaseOrderService.prototype, "purchaseOrderItemRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(ShopBuyer_1.ShopBuyer),
    __metadata("design:type", typeorm_1.Repository)
], PurchaseOrderService.prototype, "shopBuyerRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Material_1.Material),
    __metadata("design:type", typeorm_1.Repository)
], PurchaseOrderService.prototype, "materialRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(BuyerReceiveAddress_1.BuyerReceiveAddress),
    __metadata("design:type", typeorm_1.Repository)
], PurchaseOrderService.prototype, "buyerReceiveAddressRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(DeliveryList_1.DeliveryList),
    __metadata("design:type", typeorm_1.Repository)
], PurchaseOrderService.prototype, "deliveryListRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Stock_1.Stock),
    __metadata("design:type", typeorm_1.Repository)
], PurchaseOrderService.prototype, "stockRepository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], PurchaseOrderService.prototype, "userService", void 0);
PurchaseOrderService = PurchaseOrderService_1 = __decorate([
    (0, decorator_1.Provide)()
], PurchaseOrderService);
exports.PurchaseOrderService = PurchaseOrderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyY2hhc2VPcmRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvcHVyY2hhc2UvcHVyY2hhc2VPcmRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEQ7QUFDOUQsaUVBQTZEO0FBRTdELCtDQUE0QztBQUM1QyxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBQ3RELDhEQUEyRDtBQUczRCxvREFBaUQ7QUFDakQsc0VBQW1FO0FBQ25FLHNEQUFtRDtBQUNuRCwwRUFBdUU7QUFDdkUsMkRBQXdEO0FBQ3hELDREQUF5RDtBQUV6RCw0QkFBNkI7QUFFN0IscURBQXFEO0FBQ3JELHFEQUFxRDtBQUVyRCw4Q0FBMkM7QUFDM0MsdURBQW1EO0FBRW5ELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUdqQyxJQUFhLG9CQUFvQiw0QkFBakMsTUFBYSxvQkFBcUIsU0FBUSwwQkFBVztJQUFyRDs7UUFDVSw4QkFBeUIsR0FDL0IsdUdBQXVHLENBQUM7UUFHbEcsV0FBTSxHQUFZLElBQUksQ0FBQTtRQUs5QixlQUFlO1FBQ1AsWUFBTyxHQUFHLFNBQVMsc0JBQW9CLGFBQXBCLHNCQUFvQix1QkFBcEIsc0JBQW9CLENBQUUsVUFBVSxLQUFLLENBQUM7UUFDakUsc0JBQXNCO1FBQ2QsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNOzs7O01BSXRDLENBQUM7UUFHRyxlQUFVLEdBQThCLElBQUksQ0FBQztRQUc3QyxnQ0FBMkIsR0FBa0MsSUFBSSxDQUFDO1FBR2xFLHdCQUFtQixHQUEwQixJQUFJLENBQUM7UUFHbEQsdUJBQWtCLEdBQXlCLElBQUksQ0FBQztRQUdoRCxrQ0FBNkIsR0FBb0MsSUFBSSxDQUFDO1FBR3RFLDJCQUFzQixHQUE2QixJQUFJLENBQUM7UUFHeEQsb0JB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