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
var TradeOrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeOrderService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const ReqParam_1 = require("../common/model/ReqParam");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const TradeOrder_1 = require("../../entity/TradeOrder");
const Goods_1 = require("../../entity/Goods");
const OrderItem_1 = require("../../entity/OrderItem");
const ShopBuyer_1 = require("../../entity/ShopBuyer");
const BuyerReceiveAddress_1 = require("../../entity/BuyerReceiveAddress");
const Shop_1 = require("../../entity/Shop");
const deliveryTemplateLocale_service_1 = require("./deliveryTemplateLocale.service");
const deliveryTemplateGlobal_service_1 = require("./deliveryTemplateGlobal.service");
const cartItem_service_1 = require("./cartItem.service");
const buyerReceiveAddress_service_1 = require("./buyerReceiveAddress.service");
const Zero0Error_1 = require("../common/model/Zero0Error");
const goods_service_1 = require("./goods.service");
const goodsMessage_service_1 = require("./goodsMessage.service");
const DeliveryList_1 = require("../../entity/DeliveryList");
const _ = require("lodash");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const arrayUtils = require("../common/utils/arrayUtils");
const user_service_1 = require("../partcApi/tencent/wx/ma/service/user.service");
const moment = require("moment");
const shopBuyer_service_1 = require("./shopBuyer.service");
let TradeOrderService = TradeOrderService_1 = class TradeOrderService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 交易订单服务
        this.quitUrl = "";
        this.returnUrl = "";
        this.domain = { domainName: "" };
        this.logger = null;
        this.app = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${TradeOrderService_1 === null || TradeOrderService_1 === void 0 ? void 0 : TradeOrderService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  , ( CASE t.pay_type WHEN 'wxpay' THEN '微信支付' WHEN 'alipay' THEN '支付宝' ELSE '未支付或其它支付方式' END ) AS pay_type_cn
  , ( CASE t.trade_state WHEN 'SUCCESS' THEN '已付款' WHEN 'DELIVERY' THEN '已发货' WHEN 'CLOSED' THEN '已关闭' WHEN 'REFUND' THEN '申请退款' ELSE '待付款' END ) AS trade_state_cn
  , ( CASE WHEN ( SELECT COUNT(*) AS count_item FROM order_item WHERE t.total_amount >= .01 AND t.id = order_item.order_id ) < 1 THEN '收银订单' ELSE '商品订单' END ) AS count_item 
  , ( SELECT SUM( quantity ) AS sum_quantity FROM order_item WHERE t.id = order_item.order_id ) AS sum_quantity
  , ( SELECT SUM( price * quantity ) AS goods_amount FROM order_item WHERE t.id = order_item.order_id ) AS goods_amount 

  , ( DATE_format?.(create_date, '%Y-%m-%d %H:%i:%S') ) AS create_date_str -- 下单时间,例:1980-01-01 08:00:00

     `;
        this.selectSqlOrderItem = ` ${base_service_1.BaseService.selSql} 
  
  `;
        this.fromSqlOrderItem = " FROM order_item t ";
        this.repository = null;
        this.orderItemRepository = null;
        this.shopBuyerRepository = null;
        this.goodsRepository = null;
        this.buyerReceiveAddressRepository = null;
        this.shopRepository = null;
        this.deliveryListRepository = null;
        this.deliveryTemplateLocaleService = null;
        this.deliveryTemplateGlobalService = null;
        this.cartItemService = null;
        this.buyerReceiveAddressService = null;
        this.goodsService = null;
        this.goodsMessageService = null;
        this.userService = null;
    }
    async page(tradeState = "", shopId = "", shopBuyerId, query, params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let whereSql = " "; // 查询条件字符串
        let parameters = [];
        if (params && params.length > 3) {
            parameters = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, params);
        }
        whereSql +=
            ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) +
                ((_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, parameters, ["current", "pageSize"]))) +
                ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, ["outTradeNo"], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue)) +
                ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query)); // 处理前端的表格中筛选需求
        if (shopBuyerId) {
            whereSql += ` AND t.shop_buyer_id = '${shopBuyerId}' `;
        }
        if (tradeState) {
            whereSql += ` AND t.trade_state = '${tradeState}' `;
        }
        const pageNew = await ((_g = super.pageBase) === null || _g === void 0 ? void 0 : _g.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
        if (!pageNew || !(pageNew === null || pageNew === void 0 ? void 0 : pageNew.list)) {
            return pageNew;
        }
        const ids = [];
        for (const element of pageNew === null || pageNew === void 0 ? void 0 : pageNew.list) {
            (_h = ids === null || ids === void 0 ? void 0 : ids.push) === null || _h === void 0 ? void 0 : _h.call(ids, element === null || element === void 0 ? void 0 : element.id);
        }
        const whereSqlOrderItem = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOr("order_id", ids);
        const childrens = await ((_j = super.arrBase) === null || _j === void 0 ? void 0 : _j.call(this, new ReqParam_1.ReqParam(), this === null || this === void 0 ? void 0 : this.selectSqlOrderItem, this === null || this === void 0 ? void 0 : this.fromSqlOrderItem, whereSqlOrderItem));
        if (!childrens) {
            return pageNew;
        }
        const childrenMap = (_k = arrayUtils === null || arrayUtils === void 0 ? void 0 : arrayUtils.keyObj) === null || _k === void 0 ? void 0 : _k.call(arrayUtils, childrens, "order_id");
        for (const element of pageNew === null || pageNew === void 0 ? void 0 : pageNew.list) {
            element.orderItems = childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap[element === null || element === void 0 ? void 0 : element.id];
        }
        return pageNew;
    }
    async getById(id = "") {
        // 根据id查询一条数据
        var _a, _b, _c;
        let log = "";
        if (!id) {
            log = "订单id错误,操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, log, zero0Error);
            throw zero0Error;
        }
        const getById = await ((_c = super.getByIdBase) === null || _c === void 0 ? void 0 : _c.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql));
        getById.orderItems = await (this === null || this === void 0 ? void 0 : this.getOrderItems(id));
        return getById;
    }
    async getOrderItems(orderId = "") {
        var _a;
        const reqParam = null;
        const whereSql = ` AND t.order_id = '${orderId}' `;
        return (_a = super.arrBase) === null || _a === void 0 ? void 0 : _a.call(this, reqParam, this === null || this === void 0 ? void 0 : this.selectSqlOrderItem, this === null || this === void 0 ? void 0 : this.fromSqlOrderItem, whereSql);
    }
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = TradeOrderService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        } // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = "";
        // 删除redis缓存
        const key = (TradeOrderService_1 === null || TradeOrderService_1 === void 0 ? void 0 : TradeOrderService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, TradeOrderService_1 === null || TradeOrderService_1 === void 0 ? void 0 : TradeOrderService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, TradeOrderService_1 === null || TradeOrderService_1 === void 0 ? void 0 : TradeOrderService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, TradeOrderService_1 === null || TradeOrderService_1 === void 0 ? void 0 : TradeOrderService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
    async amountBuy(totalAmount = 0.0, message = "", shopBuyerId, shopMemo = "") {
        // 无商品订单、收银订单
        var _a, _b, _c, _d;
        let log = "";
        if (totalAmount && totalAmount < 0.01) {
            log = "支付金额过小,支付失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, log, zero0Error);
            throw zero0Error;
        }
        const tradeOrder = new TradeOrder_1.TradeOrder();
        const outTradeNo = this === null || this === void 0 ? void 0 : this.getOutTradeNo();
        tradeOrder.id = outTradeNo;
        tradeOrder.outTradeNo = outTradeNo;
        tradeOrder.shopBuyerId = shopBuyerId;
        tradeOrder.tradeState = "NOTPAY";
        tradeOrder.delivery = "eticket";
        tradeOrder.message = message;
        tradeOrder.totalAmount = totalAmount;
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.save) === null || _d === void 0 ? void 0 : _d.call(_c, tradeOrder));
        return tradeOrder;
    }
    async buy(map = {}, shopBuyerId, priceUnit = 1) {
        // priceUnit可选值为1或者.01或者100，是为了处理页面显示的金额信息和数据库中存储的商品价格信息单位可能不一致的问题，页面显示金额信息可能是分为单位，数据库中存储价格信息可能是元为单位
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        // map内各标识符名称来自有赞
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "商品详情-立即购买");
        // 针对一个商品下单，选择商品sku和数量
        let log = "";
        const data = (_d = (_c = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _c === void 0 ? void 0 : _c.call(JSON, map === null || map === void 0 ? void 0 : map.data)) === null || _d === void 0 ? void 0 : _d.data; // 订单数据
        const goodsId = data === null || data === void 0 ? void 0 : data.goodsId; // 商品id
        const quantity = data === null || data === void 0 ? void 0 : data.selectedNum; // 购买数量
        const messages = data === null || data === void 0 ? void 0 : data.messages;
        const cartMessages = data === null || data === void 0 ? void 0 : data.cartMessages;
        const goods = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.goodsRepository) === null || _e === void 0 ? void 0 : _e.findOneById) === null || _f === void 0 ? void 0 : _f.call(_e, goodsId)); // 查询商品信息
        const quota = goods === null || goods === void 0 ? void 0 : goods.quota; // 此商品的限购数
        const startSaleNum = goods === null || goods === void 0 ? void 0 : goods.startSaleNum; // 起售数量
        if (quota && quantity > quota) {
            log = "购买数量大于限购数,购买失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.call(_g, log, zero0Error);
            throw zero0Error;
        }
        if (startSaleNum && quantity < startSaleNum) {
            log = "购买数量小于起售数量,购买失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.error) === null || _k === void 0 ? void 0 : _k.call(_j, log, zero0Error);
            throw zero0Error;
        }
        const buyerReceiveAddress = await ((_l = this === null || this === void 0 ? void 0 : this.buyerReceiveAddressService) === null || _l === void 0 ? void 0 : _l.getDefalut(shopBuyerId, goods === null || goods === void 0 ? void 0 : goods.shopId));
        // 取得当前用户默认收货地址信息,设置为订单收货地址,用户在提交订单前,可以修改这个地址
        const tradeOrder = new TradeOrder_1.TradeOrder();
        const outTradeNo = this === null || this === void 0 ? void 0 : this.getOutTradeNo();
        tradeOrder.id = outTradeNo;
        tradeOrder.outTradeNo = outTradeNo;
        tradeOrder.shopBuyerId = shopBuyerId;
        tradeOrder.shopId = goods === null || goods === void 0 ? void 0 : goods.shopId;
        if (!(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.shopId)) {
            const shopBuyer = await ((_o = (_m = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _m === void 0 ? void 0 : _m.findOneById) === null || _o === void 0 ? void 0 : _o.call(_m, shopBuyerId));
            tradeOrder.shopId = shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.shopId;
        }
        // 创建订单时,订单肯定是未支付状态,所以设置订单状态为未支付
        tradeOrder.tradeState = "";
        if (buyerReceiveAddress) {
            tradeOrder.receiverAddressId = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.id;
            tradeOrder.province = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.province;
            tradeOrder.city = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.city;
            tradeOrder.region = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.region;
        }
        // 订单默认的物流状态是虚拟物品，不需要物流，当订单中的任一商品需物流时，则整个订单将变为需物流的状态
        tradeOrder.delivery = "eticket";
        if ((goods === null || goods === void 0 ? void 0 : goods.delivery) === "delivery") {
            tradeOrder.delivery = "delivery";
        }
        await ((_q = (_p = this === null || this === void 0 ? void 0 : this.repository) === null || _p === void 0 ? void 0 : _p.save) === null || _q === void 0 ? void 0 : _q.call(_p, tradeOrder));
        const orderItem = new OrderItem_1.OrderItem();
        orderItem.goodsId = goodsId;
        orderItem.shopBuyerId = shopBuyerId;
        orderItem.quantity = quantity;
        orderItem.goodsName = goods === null || goods === void 0 ? void 0 : goods.name;
        orderItem.orderId = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.id;
        orderItem.messages = await ((_r = this === null || this === void 0 ? void 0 : this.goodsMessageService) === null || _r === void 0 ? void 0 : _r.insertMessages(null, messages));
        orderItem.cartMessages =
            await ((_s = this === null || this === void 0 ? void 0 : this.goodsMessageService) === null || _s === void 0 ? void 0 : _s.insertCartMessages(null, cartMessages));
        (_u = (_t = this === null || this === void 0 ? void 0 : this.orderItemRepository) === null || _t === void 0 ? void 0 : _t.save) === null || _u === void 0 ? void 0 : _u.call(_t, orderItem);
        let totalAmount = 0.0;
        totalAmount =
            totalAmount + ((_v = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _v === void 0 ? void 0 : _v.call(_, orderItem === null || orderItem === void 0 ? void 0 : orderItem.price, orderItem === null || orderItem === void 0 ? void 0 : orderItem.quantity));
        tradeOrder.totalAmount = totalAmount;
        // 得到订单运费金额(元)
        const postFee = await (this === null || this === void 0 ? void 0 : this.getPostFee(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.id));
        tradeOrder.postFee = postFee;
        tradeOrder.totalAmount = _ === null || _ === void 0 ? void 0 : _.add(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.totalAmount, postFee);
        await ((_x = (_w = this === null || this === void 0 ? void 0 : this.repository) === null || _w === void 0 ? void 0 : _w.save) === null || _x === void 0 ? void 0 : _x.call(_w, tradeOrder));
        (_z = (_y = this === null || this === void 0 ? void 0 : this.logger) === null || _y === void 0 ? void 0 : _y.info) === null || _z === void 0 ? void 0 : _z.call(_y, "判断每个商品是否下单减库存,如果是,则减去库存");
        await (this === null || this === void 0 ? void 0 : this.subStock(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.id, "order"));
        return tradeOrder;
    }
    async createOrder(shopBuyerId = "", shopId = "", cartItems = []) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
        let log = "";
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "创建订单");
        (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.call(_c, "获取购物车信息");
        let anies = null;
        if (cartItems) {
            // 查询购物车中多条信息
            const whereSql = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOr("id", cartItems);
            const fromSql = ` FROM ${cartItem_service_1.CartItemService === null || cartItem_service_1.CartItemService === void 0 ? void 0 : cartItem_service_1.CartItemService.TABLE_NAME} t `;
            const selectSql = ` ${base_service_1.BaseService.selSql} `;
            const sql = (_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.selectPage) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, selectSql, fromSql, whereSql, (_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.orderBy) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, "order_num", "t", " DESC "), " ");
            anies = await ((_g = super.query) === null || _g === void 0 ? void 0 : _g.call(this, sql));
        }
        else {
            anies = [];
        }
        if (!anies) {
            log = "购物车为空,创建订单失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_j = (_h = this === null || this === void 0 ? void 0 : this.logger) === null || _h === void 0 ? void 0 : _h.error) === null || _j === void 0 ? void 0 : _j.call(_h, log, zero0Error);
            throw zero0Error;
        }
        (_l = (_k = this === null || this === void 0 ? void 0 : this.logger) === null || _k === void 0 ? void 0 : _k.info) === null || _l === void 0 ? void 0 : _l.call(_k, "判断购物车中的商品库存是否足够");
        for (const cartItem of anies) {
            const quantity = cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity;
            const goodsId = cartItem === null || cartItem === void 0 ? void 0 : cartItem.goodsId;
            const goodsSkuId = cartItem === null || cartItem === void 0 ? void 0 : cartItem.goodsSkuId;
            const skuList = cartItem === null || cartItem === void 0 ? void 0 : cartItem.skuList;
            (_m = this === null || this === void 0 ? void 0 : this.goodsService) === null || _m === void 0 ? void 0 : _m.countStock(goodsId, goodsSkuId, skuList, quantity);
        }
        const tradeOrder = new TradeOrder_1.TradeOrder();
        const outTradeNo = this === null || this === void 0 ? void 0 : this.getOutTradeNo();
        tradeOrder.id = outTradeNo;
        tradeOrder.outTradeNo = outTradeNo;
        tradeOrder.shopBuyerId = shopBuyerId;
        tradeOrder.shopId = shopId;
        if (!(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.shopId)) {
            const shopBuyer = await ((_p = (_o = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _o === void 0 ? void 0 : _o.findOneById) === null || _p === void 0 ? void 0 : _p.call(_o, shopBuyerId));
            tradeOrder.shopId = shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.shopId;
        }
        tradeOrder.tradeState = "";
        const buyerReceiveAddress = await ((_q = this === null || this === void 0 ? void 0 : this.buyerReceiveAddressService) === null || _q === void 0 ? void 0 : _q.getDefalut(shopBuyerId, shopId));
        tradeOrder.receiverAddressId = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.id;
        tradeOrder.province = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.province;
        tradeOrder.city = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.city;
        tradeOrder.region = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.region;
        tradeOrder.delivery = "eticket";
        let totalAmount = 0.0;
        tradeOrder.totalAmount = totalAmount;
        await ((_s = (_r = this === null || this === void 0 ? void 0 : this.repository) === null || _r === void 0 ? void 0 : _r.save) === null || _s === void 0 ? void 0 : _s.call(_r, tradeOrder));
        for (const cartItem of anies) {
            let orderItem = new OrderItem_1.OrderItem();
            orderItem.orderId = tradeOrder.id;
            orderItem = {
                ...orderItem,
                ...cartItem,
            };
            await ((_u = (_t = this === null || this === void 0 ? void 0 : this.orderItemRepository) === null || _t === void 0 ? void 0 : _t.save) === null || _u === void 0 ? void 0 : _u.call(_t, orderItem));
            (_w = (_v = this === null || this === void 0 ? void 0 : this.logger) === null || _v === void 0 ? void 0 : _v.info) === null || _w === void 0 ? void 0 : _w.call(_v, "如果购物车中有任何一个商品是需要物流的,则生成的整个订单都是需要物流的");
            const goods = await ((_y = (_x = this === null || this === void 0 ? void 0 : this.goodsRepository) === null || _x === void 0 ? void 0 : _x.findOneById) === null || _y === void 0 ? void 0 : _y.call(_x, cartItem.goodsId));
            if ((goods === null || goods === void 0 ? void 0 : goods.delivery) === "delivery") {
                tradeOrder.delivery = "delivery";
            }
            orderItem = {
                ...orderItem,
                ...goods,
                id: orderItem.id,
            };
            orderItem.goodsName = goods === null || goods === void 0 ? void 0 : goods.name;
            await ((_0 = (_z = this === null || this === void 0 ? void 0 : this.orderItemRepository) === null || _z === void 0 ? void 0 : _z.save) === null || _0 === void 0 ? void 0 : _0.call(_z, orderItem));
            totalAmount = _ === null || _ === void 0 ? void 0 : _.add(totalAmount, (_1 = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _1 === void 0 ? void 0 : _1.call(_, orderItem === null || orderItem === void 0 ? void 0 : orderItem.price, orderItem === null || orderItem === void 0 ? void 0 : orderItem.quantity));
        }
        tradeOrder.totalAmount = totalAmount;
        await ((_3 = (_2 = this === null || this === void 0 ? void 0 : this.repository) === null || _2 === void 0 ? void 0 : _2.save) === null || _3 === void 0 ? void 0 : _3.call(_2, tradeOrder));
        const postFee = await (this === null || this === void 0 ? void 0 : this.getPostFee(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.id));
        tradeOrder.postFee = postFee;
        tradeOrder.totalAmount = _ === null || _ === void 0 ? void 0 : _.add(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.totalAmount, postFee);
        await ((_5 = (_4 = this === null || this === void 0 ? void 0 : this.repository) === null || _4 === void 0 ? void 0 : _4.save) === null || _5 === void 0 ? void 0 : _5.call(_4, tradeOrder));
        (_7 = (_6 = this === null || this === void 0 ? void 0 : this.logger) === null || _6 === void 0 ? void 0 : _6.info) === null || _7 === void 0 ? void 0 : _7.call(_6, "判断每个商品是否下单减库存,如果是,则减去库存");
        await (this === null || this === void 0 ? void 0 : this.subStock(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.id, "order"));
        return tradeOrder;
    }
    async submitOrder(orderId, cartItems = [], shopBuyerId = "", shopId = "") {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const tradeOrder = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, orderId));
        tradeOrder.tradeState = "NOTPAY";
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.save) === null || _d === void 0 ? void 0 : _d.call(_c, tradeOrder));
        // 清空购物车
        (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.info) === null || _f === void 0 ? void 0 : _f.call(_e, "形成订单后,将购物车清空");
        if (!cartItems) {
            await ((_g = this === null || this === void 0 ? void 0 : this.cartItemService) === null || _g === void 0 ? void 0 : _g.clear(shopId, shopBuyerId));
        }
        else {
            await ((_j = (_h = this === null || this === void 0 ? void 0 : this.cartItemService) === null || _h === void 0 ? void 0 : _h.del) === null || _j === void 0 ? void 0 : _j.call(_h, cartItems));
        }
        return tradeOrder;
    }
    async getPostFee(orderId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        let log = "";
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "得到订单运费金额(元)");
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== "NOTPAY") {
            log = "订单不是未支付状态,无法计算运费";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        let postFee = 0.0;
        const delivery = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.delivery;
        if (delivery === "eticket") {
            (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.call(_g, "虚拟商品无需运费,运费为0");
            return postFee;
        }
        const receiverAddressId = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.receiverAddressId;
        if (!receiverAddressId) {
            (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.info) === null || _k === void 0 ? void 0 : _k.call(_j, "订单未设置收货地址,无法计算运费");
            return postFee;
        }
        const shop = await ((_m = (_l = this === null || this === void 0 ? void 0 : this.shopRepository) === null || _l === void 0 ? void 0 : _l.findOneById) === null || _m === void 0 ? void 0 : _m.call(_l, tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.shopId));
        const province = shop === null || shop === void 0 ? void 0 : shop.province;
        const city = shop === null || shop === void 0 ? void 0 : shop.city;
        const region = shop === null || shop === void 0 ? void 0 : shop.region;
        const buyerReceiveAddress = await ((_p = (_o = this === null || this === void 0 ? void 0 : this.buyerReceiveAddressRepository) === null || _o === void 0 ? void 0 : _o.findOneById) === null || _p === void 0 ? void 0 : _p.call(_o, receiverAddressId));
        const provinceAddress = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.province;
        const cityAddress = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.city;
        const regionAddress = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.region;
        const orderItems = await ((_r = (_q = this === null || this === void 0 ? void 0 : this.orderItemRepository) === null || _q === void 0 ? void 0 : _q.findBy) === null || _r === void 0 ? void 0 : _r.call(_q, {
            orderId: orderId,
        }));
        if (province === provinceAddress &&
            city === cityAddress &&
            region === regionAddress) {
            (_t = (_s = this === null || this === void 0 ? void 0 : this.logger) === null || _s === void 0 ? void 0 : _s.info) === null || _t === void 0 ? void 0 : _t.call(_s, "同城运费");
            postFee =
                await ((_u = this === null || this === void 0 ? void 0 : this.deliveryTemplateLocaleService) === null || _u === void 0 ? void 0 : _u.getDeliveryTotalAmount(orderItems));
            return postFee;
        }
        (_w = (_v = this === null || this === void 0 ? void 0 : this.logger) === null || _v === void 0 ? void 0 : _v.info) === null || _w === void 0 ? void 0 : _w.call(_v, "全国运费");
        const anies = await ((_x = this === null || this === void 0 ? void 0 : this.deliveryTemplateGlobalService) === null || _x === void 0 ? void 0 : _x.getDeliveryTemplateGlobalList(province, tradeOrder.shopId, orderItems));
        postFee = await ((_y = this === null || this === void 0 ? void 0 : this.deliveryTemplateGlobalService) === null || _y === void 0 ? void 0 : _y.getDeliveryTotalAmount(anies));
        return postFee;
    }
    getOutTradeNo() {
        var _a, _b, _c;
        return (((_b = (_a = moment()) === null || _a === void 0 ? void 0 : _a.format) === null || _b === void 0 ? void 0 : _b.call(_a, "YYYYMMDDHHmmss")) +
            ((_c = _ === null || _ === void 0 ? void 0 : _.random) === null || _c === void 0 ? void 0 : _c.call(_, 10000000, 99999999, false)));
    }
    async updateAddress(id, addressId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let log = "";
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "设置订单收货地址");
        if (!id) {
            log = "订单id错误,操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.call(_c, log, zero0Error);
            throw zero0Error;
        }
        const buyerReceiveAddress = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.buyerReceiveAddressRepository) === null || _e === void 0 ? void 0 : _e.findOneById) === null || _f === void 0 ? void 0 : _f.call(_e, addressId));
        const tradeOrder = await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.findOneById) === null || _h === void 0 ? void 0 : _h.call(_g, id));
        tradeOrder.receiverAddressId = addressId;
        tradeOrder.province = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.province;
        tradeOrder.city = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.city;
        tradeOrder.region = buyerReceiveAddress === null || buyerReceiveAddress === void 0 ? void 0 : buyerReceiveAddress.region;
        await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, tradeOrder));
        const postFee = await (this === null || this === void 0 ? void 0 : this.getPostFee(id));
        tradeOrder.postFee = postFee;
        tradeOrder.totalAmount = _ === null || _ === void 0 ? void 0 : _.add(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.totalAmount, tradeOrder.postFee);
        await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, tradeOrder));
        return tradeOrder;
    }
    async orderCount(shopBuyerId = "", shopId = "") { }
    async alipayWapPay(orderId) { }
    async alipayRefund(orderId) { }
    async alipayClose(orderId) { }
    async wxpayUnifiedOrder(orderId) {
        var _a, _b, _c, _d, _e;
        let log = "";
        // 查询是否已为此订单创建过微信支付预创建订单
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "进行微信支付统一下单的订单预创建");
        const tradeOrder = await ((_c = this === null || this === void 0 ? void 0 : this.getById) === null || _c === void 0 ? void 0 : _c.call(this, orderId));
        // this?.logger?.info?.('判断购物车中的商品库存是否足够', )
        const tradeState = tradeOrder.tradeState;
        if (!tradeState && tradeState !== "NOTPAY") {
            log = "该订单不是未支付的状态,操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        const shopId = tradeOrder.shopId;
        const shopBuyerId = tradeOrder.shopBuyerId;
        // 通过shopBuyerId找到openId
        const wechatConfig = await (this === null || this === void 0 ? void 0 : this.userService.getWechatConfig(shopId));
        const openId = await (this === null || this === void 0 ? void 0 : this.userService.getOpenId(shopBuyerId, wechatConfig.appId));
        let orderInfo = {
            appid: wechatConfig.appId,
            mchid: wechatConfig.mchId,
            description: "订单" + tradeOrder.outTradeNo,
            out_trade_no: tradeOrder.outTradeNo,
            notify_url: "https://" +
                (this === null || this === void 0 ? void 0 : this.domain.domainName) +
                TradeOrderService_1.wxpayNotifyUrl +
                shopId,
            amount: {
                total: tradeOrder.totalAmount * 100,
                currency: "CNY",
            },
            payer: {
                openid: openId,
            },
            settle_info: {
                profit_sharing: true,
            },
        };
        orderInfo.amount.total = 1;
        const wxpay = await (this === null || this === void 0 ? void 0 : this.getWxpay(shopId));
        const transactionsJsapi = await (wxpay === null || wxpay === void 0 ? void 0 : wxpay.transactions_jsapi(orderInfo));
        orderInfo = {
            ...orderInfo,
            ...transactionsJsapi,
        };
        return transactionsJsapi;
    }
    async paymentNotice(data = "", shopId = "") {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "订单支付成功异步通知消息");
        const wechatConfig = await ((_c = this === null || this === void 0 ? void 0 : this.userService) === null || _c === void 0 ? void 0 : _c.getWechatConfig(shopId));
        const wxpay = await (this === null || this === void 0 ? void 0 : this.getWxpay(shopId));
        const ciphertext = wxpay === null || wxpay === void 0 ? void 0 : wxpay.decipher_gcm((_d = data === null || data === void 0 ? void 0 : data.resource) === null || _d === void 0 ? void 0 : _d.ciphertext, (_e = data === null || data === void 0 ? void 0 : data.resource) === null || _e === void 0 ? void 0 : _e.associated_data, (_f = data === null || data === void 0 ? void 0 : data.resource) === null || _f === void 0 ? void 0 : _f.nonce, wechatConfig === null || wechatConfig === void 0 ? void 0 : wechatConfig.mchKey);
        const outTradeNo = ciphertext === null || ciphertext === void 0 ? void 0 : ciphertext.out_trade_no;
        const tradeState = ciphertext === null || ciphertext === void 0 ? void 0 : ciphertext.trade_state;
        if (tradeState !== "SUCCESS" || !outTradeNo) {
            return "";
        }
        this === null || this === void 0 ? void 0 : this.orderSuccess(outTradeNo, "wxpay");
        return "";
    }
    async getWxpay(shopId = "") {
        var _a, _b, _c, _d;
        const WxPay = require("wechatpay-node-v3"), fse = require("fs-extra"), path = require("path"), appDir = (_a = this === null || this === void 0 ? void 0 : this.app) === null || _a === void 0 ? void 0 : _a.getAppDir();
        const wechatConfig = await ((_b = this === null || this === void 0 ? void 0 : this.userService) === null || _b === void 0 ? void 0 : _b.getWechatConfig(shopId));
        const wxpay = new WxPay({
            appid: wechatConfig === null || wechatConfig === void 0 ? void 0 : wechatConfig.appId,
            mchid: wechatConfig.mchId,
            privateKey: fse === null || fse === void 0 ? void 0 : fse.readFileSync((_c = path === null || path === void 0 ? void 0 : path.join) === null || _c === void 0 ? void 0 : _c.call(path, appDir, "private/apiclient_key.pem")),
            publicKey: fse === null || fse === void 0 ? void 0 : fse.readFileSync((_d = path === null || path === void 0 ? void 0 : path.join) === null || _d === void 0 ? void 0 : _d.call(path, appDir, "private/apiclient_cert.pem")),
            key: wechatConfig === null || wechatConfig === void 0 ? void 0 : wechatConfig.mchKey,
        });
        return wxpay;
    }
    async orderSuccess(outTradeNo, payType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let log = "";
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "订单支付成功,更新订单状态");
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, outTradeNo));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== "NOTPAY") {
            log = "该订单不是未支付的状态,无法进行订单支付成功更新订单状态的操作";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        tradeOrder.tradeState = "SUCCESS";
        tradeOrder.payType = payType;
        tradeOrder.payTime = new Date();
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, tradeOrder));
        (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.info) === null || _k === void 0 ? void 0 : _k.call(_j, "如果是付款减库存,则进行商品库存减少操作");
        this === null || this === void 0 ? void 0 : this.subStock(outTradeNo, "pay");
    }
    async subStock(orderId, subStockType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "进行商品减库存操作,将订单占用的库存从商品库存中减去");
        const orderItems = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.orderItemRepository) === null || _c === void 0 ? void 0 : _c.findBy) === null || _d === void 0 ? void 0 : _d.call(_c, {
            orderId: orderId,
        }));
        for (const orderItem of orderItems) {
            const goods = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.goodsService) === null || _e === void 0 ? void 0 : _e.getById) === null || _f === void 0 ? void 0 : _f.call(_e, orderItem === null || orderItem === void 0 ? void 0 : orderItem.goodsId));
            const subStock = goods === null || goods === void 0 ? void 0 : goods.subStock;
            if (subStock !== subStockType) {
                continue;
            }
            const goodsSkuId = goods === null || goods === void 0 ? void 0 : goods.goodsSkuId;
            const skuMap = [];
            if (goodsSkuId && skuMap) {
            }
            else {
                goods.stock = (goods === null || goods === void 0 ? void 0 : goods.stock) - (orderItem === null || orderItem === void 0 ? void 0 : orderItem.quantity);
                await ((_g = this === null || this === void 0 ? void 0 : this.goodsService) === null || _g === void 0 ? void 0 : _g.update(goods));
            }
            (_j = (_h = this === null || this === void 0 ? void 0 : this.logger) === null || _h === void 0 ? void 0 : _h.info) === null || _j === void 0 ? void 0 : _j.call(_h, "根据商品库存数量更新商品上下架状态");
            await ((_k = this === null || this === void 0 ? void 0 : this.goodsService) === null || _k === void 0 ? void 0 : _k.updateApproveStatus(orderItem === null || orderItem === void 0 ? void 0 : orderItem.goodsId));
        }
    }
    async refund(orderId) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let log = "";
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "已支付的订单申请退款");
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== "SUCCESS") {
            log = "该订单不是已支付状态,无法申请退款";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        tradeOrder.tradeState = "REFUND";
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, tradeOrder));
    }
    async updateTotalAmount(orderId, newTotalAmount) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let log = "";
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "未支付的订单进行修改订单价格操作");
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== "NOTPAY") {
            log = "该订单不是未支付的状态,无法进行修改价格的操作";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        if (!newTotalAmount || newTotalAmount < 0.01) {
            log = "该订单修改后的价格过小";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_h = (_g = this === null || this === void 0 ? void 0 : this.logger) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.call(_g, log, zero0Error);
            throw zero0Error;
        }
        tradeOrder.totalAmount = newTotalAmount;
        await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, tradeOrder));
    }
    async updateShopMemo(orderId, memo) {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "订单进行修改卖家备注操作");
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        tradeOrder.shopMemo = memo;
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, tradeOrder));
    }
    async updateMessage(orderId, message) {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "订单进行修改买家留言操作");
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        tradeOrder.message = message;
        await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.save) === null || _f === void 0 ? void 0 : _f.call(_e, tradeOrder));
        return tradeOrder;
    }
    async auditRefund(orderId) {
        //   let log = ''
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "已支付并申请退款的订单进行退款操作");
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        //     let tradeState: string = tradeOrder?.tradeState;
        const payType = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.payType;
        // if (tradeState !== 'REFUND') {
        //   log = '该订单不是已支付并申请退款的状态,无法进行退款操作';
        //   const zero0Error: Zero0Error = new Zero0Error(log, '5000',)
        //   this?.logger?.error?.(log, zero0Error,)
        //   throw zero0Error
        // }
        if (payType === "wxpay") {
            const wxpay = await (this === null || this === void 0 ? void 0 : this.getWxpay(tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.shopId));
            /**
             * 申请退款
             * @param params 请求参数 路径 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_2_9.shtml
             */
            // refunds(params: Irefunds1 | Irefunds2): Promise<Record<string, any>>;
            const refunds = {
                out_trade_no: orderId,
                out_refund_no: orderId,
                amount: {
                    refund: tradeOrder.totalAmount * 100,
                    total: tradeOrder.totalAmount * 100,
                    currency: "CNY",
                },
            };
            refunds.amount.refund = 1;
            refunds.amount.total = 1;
            const record = await ((_e = wxpay === null || wxpay === void 0 ? void 0 : wxpay.refunds) === null || _e === void 0 ? void 0 : _e.call(wxpay, refunds));
            console.log(record);
            // TODO
        }
        else if (payType === "alipay") {
            // TODO
        }
        else if (payType === "balance") {
            await (this === null || this === void 0 ? void 0 : this.refundBalance(orderId));
        }
        tradeOrder.tradeState = "CLOSED";
        await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, tradeOrder));
        (_j = (_h = this === null || this === void 0 ? void 0 : this.logger) === null || _h === void 0 ? void 0 : _h.info) === null || _j === void 0 ? void 0 : _j.call(_h, "进行库存回退操作");
        (_k = this === null || this === void 0 ? void 0 : this.refundStock) === null || _k === void 0 ? void 0 : _k.call(this, orderId);
    }
    async close(orderId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let log = "";
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "进行未支付订单关闭操作,将订单占用的库存回退到商品库存中");
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        const payType = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.payType;
        if (tradeState !== "NOTPAY") {
            log = "该订单不是未支付的状态,无法进行关闭操作";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        if (payType === "wxpay") {
            // TODO
        }
        else if (payType === "alipay") {
            // TODO
        }
        tradeOrder.tradeState = "CLOSED";
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, tradeOrder));
        (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.info) === null || _k === void 0 ? void 0 : _k.call(_j, "进行库存回退操作");
        (_l = this === null || this === void 0 ? void 0 : this.refundStock) === null || _l === void 0 ? void 0 : _l.call(this, orderId);
    }
    async refundStock(orderId) {
        var _a, _b, _c, _d, _e, _f;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "进行订单库存回退操作,将订单占用的库存回退到商品库存中");
        const orderItems = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.orderItemRepository) === null || _c === void 0 ? void 0 : _c.findBy) === null || _d === void 0 ? void 0 : _d.call(_c, {
            orderId: orderId,
        }));
        for (const orderItem of orderItems) {
            const goods = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.goodsRepository) === null || _e === void 0 ? void 0 : _e.findOneById) === null || _f === void 0 ? void 0 : _f.call(_e, orderItem === null || orderItem === void 0 ? void 0 : orderItem.goodsId));
            const subStock1 = goods === null || goods === void 0 ? void 0 : goods.subStock;
            if (subStock1 !== "order" && subStock1 !== "pay") {
                continue;
            }
        }
    }
    async setDelivery(orderId, deliveryCompany, deliveryTrackNo, needDelivery, isOthers) { }
    async payBalance(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = "";
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "订单进行买家余额支付");
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, id));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== "NOTPAY") {
            log = "订单不是未支付状态,支付失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_f = (_e = this === null || this === void 0 ? void 0 : this.logger) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.call(_e, log, zero0Error);
            throw zero0Error;
        }
        const shopBuyer = await ((_h = (_g = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _g === void 0 ? void 0 : _g.findOneBy) === null || _h === void 0 ? void 0 : _h.call(_g, {
            id: tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.shopBuyerId,
        }));
        const balance = shopBuyer.balance;
        if (!balance || balance < 0.01) {
            log = "买家余额不足,支付失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_k = (_j = this === null || this === void 0 ? void 0 : this.logger) === null || _j === void 0 ? void 0 : _j.error) === null || _k === void 0 ? void 0 : _k.call(_j, log, zero0Error);
            throw zero0Error;
        }
        const totalAmount = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.totalAmount;
        if (balance < totalAmount) {
            log = "买家余额不足,支付失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_m = (_l = this === null || this === void 0 ? void 0 : this.logger) === null || _l === void 0 ? void 0 : _l.error) === null || _m === void 0 ? void 0 : _m.call(_l, log, zero0Error);
            throw zero0Error;
        }
        shopBuyer.balance = (_o = _ === null || _ === void 0 ? void 0 : _.subtract) === null || _o === void 0 ? void 0 : _o.call(_, balance, totalAmount);
        await ((_q = (_p = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _p === void 0 ? void 0 : _p.save) === null || _q === void 0 ? void 0 : _q.call(_p, shopBuyer));
    }
    async refundBalance(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "订单进行买家余额退款");
        const tradeOrder = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.findOneById) === null || _d === void 0 ? void 0 : _d.call(_c, id));
        const payType = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.payType;
        if (payType !== "balance") {
            return;
        }
        const shopBuyer = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _e === void 0 ? void 0 : _e.findOneBy) === null || _f === void 0 ? void 0 : _f.call(_e, {
            id: tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.shopBuyerId,
        }));
        shopBuyer.balance = (shopBuyer === null || shopBuyer === void 0 ? void 0 : shopBuyer.balance) + (tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.totalAmount);
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.shopBuyerRepository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, shopBuyer));
    }
    async bonusToAmount(bonus, rate) {
        var _a, _b, _c, _d, _e;
        let log = "";
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "积分转换成金额(元)");
        if (!bonus) {
            log = "积分过小，转换失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.call(_c, log, zero0Error);
            throw zero0Error;
        }
        return (_e = _ === null || _ === void 0 ? void 0 : _.multiply) === null || _e === void 0 ? void 0 : _e.call(_, bonus, rate);
    }
    async send(orderId, deliveryList) {
        // 标识符名称来自微信小商店
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "订单发货");
        (_d = (_c = this === null || this === void 0 ? void 0 : this.logger) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.call(_c, "发货方式由用户在下单时选择，发货时已经默认了发货方式，因此发货时无需传入发货方式参数。拆单发货时，如果订单中含有多件同样的商品(相同的product_id和相同的sku_id)，这些商品必须在同一个包裹里一起发出。已经完成售后的商品不能进行发货");
        let log = "";
        const tradeOrder = await ((_f = (_e = this === null || this === void 0 ? void 0 : this.repository) === null || _e === void 0 ? void 0 : _e.findOneById) === null || _f === void 0 ? void 0 : _f.call(_e, orderId));
        const tradeState = tradeOrder === null || tradeOrder === void 0 ? void 0 : tradeOrder.tradeState;
        if (tradeState !== "SUCCESS") {
            log = "该订单不是已支付的状态,无法进行发货操作";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
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
        tradeOrder.tradeState = "DELIVERY";
        await ((_o = (_m = this === null || this === void 0 ? void 0 : this.repository) === null || _m === void 0 ? void 0 : _m.save) === null || _o === void 0 ? void 0 : _o.call(_m, tradeOrder));
    }
    async countTradeState(shopId = "", shopBuyerId) {
        var _a;
        let whereSql = ` SELECT t.trade_state, COUNT(*) AS count_0 ${this === null || this === void 0 ? void 0 : this.fromSql} WHERE t.shop_id = '${shopId}' `; // 查询条件字符串
        if (shopBuyerId) {
            whereSql += ` AND t.shop_buyer_id = '${shopBuyerId}' `;
        }
        whereSql += " GROUP BY t.trade_state ";
        return await ((_a = super.query) === null || _a === void 0 ? void 0 : _a.call(this, whereSql));
    }
    async createProfitsharingOrders(shopId = "", transactionId = "", receivers) {
        /**
         * 请求分账API
         * @param params
         * @returns
         * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_1.shtml
         */
    }
    async chart() {
        var _a;
        const sql = ` SELECT 
    SUM(t.total_amount) AS sum_total_amount
    , ( SELECT SUM( quantity ) AS sum_quantity FROM order_item WHERE t.id = order_item.order_id ) AS sum_quantity
    , ( SELECT COUNT(*) FROM ${shopBuyer_service_1.ShopBuyerService === null || shopBuyer_service_1.ShopBuyerService === void 0 ? void 0 : shopBuyer_service_1.ShopBuyerService.TABLE_NAME} b ) AS shop_buyer_count
    ${this === null || this === void 0 ? void 0 : this.fromSql} WHERE ( t.trade_state != 'NOTPAY' AND t.trade_state != 'REFUND' ) `;
        const data = await ((_a = super.query) === null || _a === void 0 ? void 0 : _a.call(this, sql));
        return data === null || data === void 0 ? void 0 : data[0];
    }
};
TradeOrderService.wxpayNotifyUrl = "/staff/web/frontPage/wxpay/paymentNotice/";
// 查询的数据库表名称
TradeOrderService.TABLE_NAME = "trade_order";
__decorate([
    (0, decorator_1.Config)("domain"),
    __metadata("design:type", Object)
], TradeOrderService.prototype, "domain", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], TradeOrderService.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], TradeOrderService.prototype, "app", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(TradeOrder_1.TradeOrder),
    __metadata("design:type", typeorm_1.Repository)
], TradeOrderService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(OrderItem_1.OrderItem),
    __metadata("design:type", typeorm_1.Repository)
], TradeOrderService.prototype, "orderItemRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(ShopBuyer_1.ShopBuyer),
    __metadata("design:type", typeorm_1.Repository)
], TradeOrderService.prototype, "shopBuyerRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Goods_1.Goods),
    __metadata("design:type", typeorm_1.Repository)
], TradeOrderService.prototype, "goodsRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(BuyerReceiveAddress_1.BuyerReceiveAddress),
    __metadata("design:type", typeorm_1.Repository)
], TradeOrderService.prototype, "buyerReceiveAddressRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(Shop_1.Shop),
    __metadata("design:type", typeorm_1.Repository)
], TradeOrderService.prototype, "shopRepository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(DeliveryList_1.DeliveryList),
    __metadata("design:type", typeorm_1.Repository)
], TradeOrderService.prototype, "deliveryListRepository", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", deliveryTemplateLocale_service_1.DeliveryTemplateLocaleService)
], TradeOrderService.prototype, "deliveryTemplateLocaleService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", deliveryTemplateGlobal_service_1.DeliveryTemplateGlobalService)
], TradeOrderService.prototype, "deliveryTemplateGlobalService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", cartItem_service_1.CartItemService)
], TradeOrderService.prototype, "cartItemService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", buyerReceiveAddress_service_1.BuyerReceiveAddressService)
], TradeOrderService.prototype, "buyerReceiveAddressService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", goods_service_1.GoodsService)
], TradeOrderService.prototype, "goodsService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", goodsMessage_service_1.GoodsMessageService)
], TradeOrderService.prototype, "goodsMessageService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], TradeOrderService.prototype, "userService", void 0);
TradeOrderService = TradeOrderService_1 = __decorate([
    (0, decorator_1.Provide)()
], TradeOrderService);
exports.TradeOrderService = TradeOrderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGVPcmRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvdHJhZGUvdHJhZGVPcmRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBMkU7QUFDM0UsaUVBQTZEO0FBQzdELHVEQUFvRDtBQUVwRCxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBQ3RELHdEQUFxRDtBQUdyRCw4Q0FBMkM7QUFDM0Msc0RBQW1EO0FBQ25ELHNEQUFtRDtBQUNuRCwwRUFBdUU7QUFDdkUsNENBQXlDO0FBQ3pDLHFGQUFpRjtBQUNqRixxRkFBaUY7QUFDakYseURBQXFEO0FBQ3JELCtFQUEyRTtBQUMzRSwyREFBd0Q7QUFDeEQsbURBQStDO0FBQy9DLGlFQUE2RDtBQUM3RCw0REFBeUQ7QUFFekQsNEJBQTZCO0FBRTdCLHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFFckQseURBQXlEO0FBQ3pELGlGQUE2RTtBQUU3RSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFHakMsMkRBQXVEO0FBR3ZELElBQWEsaUJBQWlCLHlCQUE5QixNQUFhLGlCQUFrQixTQUFRLDBCQUFXO0lBQWxEOztRQUNFLFNBQVM7UUFDVCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUdQLFdBQU0sR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUs1QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBR3ZCLFFBQUcsR0FBZ0IsSUFBSSxDQUFDO1FBS2hDLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxtQkFBaUIsYUFBakIsbUJBQWlCLHVCQUFqQixtQkFBaUIsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUM5RCxzQkFBc0I7UUFDZCxjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1B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