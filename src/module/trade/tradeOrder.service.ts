import { Inject, Logger, Provide, App, Config } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { TradeOrder } from "../../entity/TradeOrder";

import { ILogger } from "@midwayjs/logger";
import { Goods } from "../../entity/Goods";
import { OrderItem } from "../../entity/OrderItem";
import { ShopBuyer } from "../../entity/ShopBuyer";
import { BuyerReceiveAddress } from "../../entity/BuyerReceiveAddress";
import { Shop } from "../../entity/Shop";
import { DeliveryTemplateLocaleService } from "./deliveryTemplateLocale.service";
import { DeliveryTemplateGlobalService } from "./deliveryTemplateGlobal.service";
import { CartItemService } from "./cartItem.service";
import { BuyerReceiveAddressService } from "./buyerReceiveAddress.service";
import { Zero0Error } from "../common/model/Zero0Error";
import { GoodsService } from "./goods.service";
import { GoodsMessageService } from "./goodsMessage.service";
import { DeliveryList } from "../../entity/DeliveryList";

import _ = require("lodash");

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";

import * as arrayUtils from "../common/utils/arrayUtils";
import { UserService } from "../partcApi/tencent/wx/ma/service/user.service";

const moment = require("moment");

import { Application } from "@midwayjs/koa";
import { ShopBuyerService } from "./shopBuyer.service";

@Provide()
export class TradeOrderService extends BaseService {
  // 交易订单服务
  quitUrl = "";

  returnUrl = "";

  @Config("domain")
  private domain = { domainName: "" };

  private static wxpayNotifyUrl = "/staff/web/frontPage/wxpay/paymentNotice/";

  @Logger()
  private logger: ILogger = null;

  @App()
  private app: Application = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "trade_order";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${TradeOrderService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  , ( CASE t.pay_type WHEN 'wxpay' THEN '微信支付' WHEN 'alipay' THEN '支付宝' ELSE '未支付或其它支付方式' END ) AS pay_type_cn
  , ( CASE t.trade_state WHEN 'SUCCESS' THEN '已付款' WHEN 'DELIVERY' THEN '已发货' WHEN 'CLOSED' THEN '已关闭' WHEN 'REFUND' THEN '申请退款' ELSE '待付款' END ) AS trade_state_cn
  , ( CASE WHEN ( SELECT COUNT(*) AS count_item FROM order_item WHERE t.total_amount >= .01 AND t.id = order_item.order_id ) < 1 THEN '收银订单' ELSE '商品订单' END ) AS count_item 
  , ( SELECT SUM( quantity ) AS sum_quantity FROM order_item WHERE t.id = order_item.order_id ) AS sum_quantity
  , ( SELECT SUM( price * quantity ) AS goods_amount FROM order_item WHERE t.id = order_item.order_id ) AS goods_amount 

  , ( DATE_format?.(create_date, '%Y-%m-%d %H:%i:%S') ) AS create_date_str -- 下单时间,例:1980-01-01 08:00:00

     `;

  private selectSqlOrderItem = ` ${BaseService.selSql} 
  
  `;

  private fromSqlOrderItem = " FROM order_item t ";

  @InjectEntityModel(TradeOrder)
  private repository: Repository<TradeOrder> = null;

  @InjectEntityModel(OrderItem)
  private orderItemRepository: Repository<OrderItem> = null;

  @InjectEntityModel(ShopBuyer)
  private shopBuyerRepository: Repository<ShopBuyer> = null;

  @InjectEntityModel(Goods)
  private goodsRepository: Repository<Goods> = null;

  @InjectEntityModel(BuyerReceiveAddress)
  private buyerReceiveAddressRepository: Repository<BuyerReceiveAddress> = null;

  @InjectEntityModel(Shop)
  private shopRepository: Repository<Shop> = null;

  @InjectEntityModel(DeliveryList)
  private deliveryListRepository: Repository<DeliveryList> = null;

  @Inject()
  private deliveryTemplateLocaleService: DeliveryTemplateLocaleService = null;

  @Inject()
  private deliveryTemplateGlobalService: DeliveryTemplateGlobalService = null;

  @Inject()
  private cartItemService: CartItemService = null;

  @Inject()
  private buyerReceiveAddressService: BuyerReceiveAddressService = null;

  @Inject()
  private goodsService: GoodsService = null;

  @Inject()
  private goodsMessageService: GoodsMessageService = null;

  @Inject()
  private userService: UserService = null;

  public async page(
    tradeState = "",
    shopId = "",
    shopBuyerId,
    query: string,
    params: string,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    let whereSql = " "; // 查询条件字符串
 
    let parameters: any[] = [];

    if (params && params.length > 3) {
      parameters = JSON?.parse?.(params);
    }

    whereSql +=
      sqlUtils?.whereOrFilters?.(reqParam?.filters) +
      sqlUtils?.mulColumnLike?.(
        strUtils?.antParams2Arr?.(parameters, ["current", "pageSize"])
      ) + sqlUtils?.like?.(["outTradeNo"], reqParam?.searchValue) +
      sqlUtils?.query?.(query); // 处理前端的表格中筛选需求

    if (shopBuyerId) {
      whereSql += ` AND t.shop_buyer_id = '${shopBuyerId}' `;
    }

    if (tradeState) {
      whereSql += ` AND t.trade_state = '${tradeState}' `;
    }

    const pageNew: Page = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    );

    if (!pageNew || !pageNew?.list) {
      return pageNew;
    }

    const ids: string[] = [];

    for (const element of pageNew?.list) {
      ids?.push?.(element?.id);
    }

    const whereSqlOrderItem: string = sqlUtils?.whereOr("order_id", ids);

    const childrens: any[] = await super.arrBase?.(
      new ReqParam(),
      this?.selectSqlOrderItem,
      this?.fromSqlOrderItem,
      whereSqlOrderItem
    );

    if (!childrens) {
      return pageNew;
    }

    const childrenMap = arrayUtils?.keyObj?.(childrens, "order_id");

    for (const element of pageNew?.list) {
      element.orderItems = childrenMap?.[element?.id];
    }

    return pageNew;
  }

  public async getById(id = ""): Promise<any> {
    // 根据id查询一条数据

    let log = "";

    if (!id) {
      log = "订单id错误,操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const getById = await super.getByIdBase?.(
      id,
      this?.selectSql,
      this?.fromSql
    );

    getById.orderItems = await this?.getOrderItems(id);

    return getById;
  }

  public async getOrderItems(orderId = ""): Promise<any[]> {
    const reqParam: ReqParam = null;

    const whereSql = ` AND t.order_id = '${orderId}' `;

    return super.arrBase?.(
      reqParam,
      this?.selectSqlOrderItem,
      this?.fromSqlOrderItem,
      whereSql
    );
  }

  public async del(ids: string[]): Promise<void> {
    await this?.repository?.delete?.(ids);
  }

  public async update(obj: TradeOrder): Promise<TradeOrder> {
    // 一个表进行操作 typeORM

    let log = "";

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      TradeOrderService?.TABLE_NAME,
      [],
      obj?.id
    ); // 新增或修改数据时，判断某字段值在数据库中是否已重复

    if (uniqueText) {
      // 某unique字段值已存在，抛出异常，程序处理终止
      log = uniqueText + "已存在，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }
    // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      log = "新增数据，主键id的随机字符串值，由后端typeorm提供";

      delete obj?.id;

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          TradeOrderService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }

    let old: TradeOrder = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          TradeOrderService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }

      return null;
    }
    delete obj?.id;

    old = {
      ...old,

      ...obj,
    };

    await this?.repository?.save?.(old); // 修改数据
  }

  public async amountBuy(
    totalAmount = 0.0,
    message = "",
    shopBuyerId,
    shopMemo = ""
  ): Promise<TradeOrder> {
    // 无商品订单、收银订单

    let log = "";

    if (totalAmount && totalAmount < 0.01) {
      log = "支付金额过小,支付失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const tradeOrder: TradeOrder = new TradeOrder();

    const outTradeNo = this?.getOutTradeNo();

    tradeOrder.id = outTradeNo;

    tradeOrder.outTradeNo = outTradeNo;

    tradeOrder.shopBuyerId = shopBuyerId;

    tradeOrder.tradeState = "NOTPAY";

    tradeOrder.delivery = "eticket";

    tradeOrder.message = message;

    tradeOrder.totalAmount = totalAmount;

    await this?.repository?.save?.(tradeOrder);

    return tradeOrder;
  }

  public async buy(
    map: any = {},
    shopBuyerId,
    priceUnit = 1
  ): Promise<TradeOrder> {
    // priceUnit可选值为1或者.01或者100，是为了处理页面显示的金额信息和数据库中存储的商品价格信息单位可能不一致的问题，页面显示金额信息可能是分为单位，数据库中存储价格信息可能是元为单位

    // map内各标识符名称来自有赞

    this?.logger?.info?.("商品详情-立即购买");

    // 针对一个商品下单，选择商品sku和数量

    let log = "";

    const data: any = JSON?.parse?.(map?.data)?.data; // 订单数据

    const goodsId: string = data?.goodsId; // 商品id

    const quantity: number = data?.selectedNum; // 购买数量

    const messages: any = data?.messages;

    const cartMessages: any = data?.cartMessages;

    const goods: Goods = await this?.goodsRepository?.findOneById?.(goodsId); // 查询商品信息

    const quota: number = goods?.quota; // 此商品的限购数

    const startSaleNum: number = goods?.startSaleNum; // 起售数量

    if (quota && quantity > quota) {
      log = "购买数量大于限购数,购买失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    if (startSaleNum && quantity < startSaleNum) {
      log = "购买数量小于起售数量,购买失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const buyerReceiveAddress =
      await this?.buyerReceiveAddressService?.getDefalut(
        shopBuyerId,
        goods?.shopId
      );

    // 取得当前用户默认收货地址信息,设置为订单收货地址,用户在提交订单前,可以修改这个地址

    const tradeOrder: TradeOrder = new TradeOrder();

    const outTradeNo = this?.getOutTradeNo();

    tradeOrder.id = outTradeNo;

    tradeOrder.outTradeNo = outTradeNo;

    tradeOrder.shopBuyerId = shopBuyerId;

    tradeOrder.shopId = goods?.shopId;

    if (!tradeOrder?.shopId) {
      const shopBuyer: ShopBuyer =
        await this?.shopBuyerRepository?.findOneById?.(shopBuyerId);

      tradeOrder.shopId = shopBuyer?.shopId;
    }

    // 创建订单时,订单肯定是未支付状态,所以设置订单状态为未支付
    tradeOrder.tradeState = "";

    if (buyerReceiveAddress) {
      tradeOrder.receiverAddressId = buyerReceiveAddress?.id;

      tradeOrder.province = buyerReceiveAddress?.province;

      tradeOrder.city = buyerReceiveAddress?.city;

      tradeOrder.region = buyerReceiveAddress?.region;
    }

    // 订单默认的物流状态是虚拟物品，不需要物流，当订单中的任一商品需物流时，则整个订单将变为需物流的状态

    tradeOrder.delivery = "eticket";

    if (goods?.delivery === "delivery") {
      tradeOrder.delivery = "delivery";
    }

    await this?.repository?.save?.(tradeOrder);

    const orderItem: OrderItem = new OrderItem();

    orderItem.goodsId = goodsId;

    orderItem.shopBuyerId = shopBuyerId;

    orderItem.quantity = quantity;

    orderItem.goodsName = goods?.name;

    orderItem.orderId = tradeOrder?.id;

    orderItem.messages = await this?.goodsMessageService?.insertMessages(
      null,
      messages
    );

    orderItem.cartMessages =
      await this?.goodsMessageService?.insertCartMessages(null, cartMessages);

    this?.orderItemRepository?.save?.(orderItem);

    let totalAmount = 0.0;

    totalAmount =
      totalAmount + _?.multiply?.(orderItem?.price, orderItem?.quantity);

    tradeOrder.totalAmount = totalAmount;

    // 得到订单运费金额(元)

    const postFee: number = await this?.getPostFee(tradeOrder?.id);

    tradeOrder.postFee = postFee;

    tradeOrder.totalAmount = _?.add(tradeOrder?.totalAmount, postFee);

    await this?.repository?.save?.(tradeOrder);

    this?.logger?.info?.("判断每个商品是否下单减库存,如果是,则减去库存");

    await this?.subStock(tradeOrder?.id, "order");

    return tradeOrder;
  }

  public async createOrder(
    shopBuyerId = "",
    shopId = "",
    cartItems: string[] = []
  ): Promise<TradeOrder> {
    let log = "";

    this?.logger?.info?.("创建订单");

    this?.logger?.info?.("获取购物车信息");

    let anies: any[] = null;

    if (cartItems) {
      // 查询购物车中多条信息
      const whereSql = sqlUtils?.whereOr("id", cartItems);

      const fromSql = ` FROM ${CartItemService?.TABLE_NAME} t `;

      const selectSql = ` ${BaseService.selSql} `;

      const sql: string = sqlUtils?.selectPage?.(
        selectSql,
        fromSql,
        whereSql,
        sqlUtils?.orderBy?.("order_num", "t", " DESC "),
        " "
      );

      anies = await super.query?.(sql);
    } else {
      anies = [];
    }

    if (!anies) {
      log = "购物车为空,创建订单失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    this?.logger?.info?.("判断购物车中的商品库存是否足够");

    for (const cartItem of anies) {
      const quantity: number = cartItem?.quantity;

      const goodsId: string = cartItem?.goodsId;

      const goodsSkuId: string = cartItem?.goodsSkuId;

      const skuList: string = cartItem?.skuList;

      this?.goodsService?.countStock(goodsId, goodsSkuId, skuList, quantity);
    }

    const tradeOrder: TradeOrder = new TradeOrder();

    const outTradeNo = this?.getOutTradeNo();

    tradeOrder.id = outTradeNo;

    tradeOrder.outTradeNo = outTradeNo;

    tradeOrder.shopBuyerId = shopBuyerId;

    tradeOrder.shopId = shopId;

    if (!tradeOrder?.shopId) {
      const shopBuyer: ShopBuyer =
        await this?.shopBuyerRepository?.findOneById?.(shopBuyerId);

      tradeOrder.shopId = shopBuyer?.shopId;
    }

    tradeOrder.tradeState = "";

    const buyerReceiveAddress =
      await this?.buyerReceiveAddressService?.getDefalut(shopBuyerId, shopId);

    tradeOrder.receiverAddressId = buyerReceiveAddress?.id;

    tradeOrder.province = buyerReceiveAddress?.province;

    tradeOrder.city = buyerReceiveAddress?.city;

    tradeOrder.region = buyerReceiveAddress?.region;

    tradeOrder.delivery = "eticket";

    let totalAmount = 0.0;

    tradeOrder.totalAmount = totalAmount;

    await this?.repository?.save?.(tradeOrder);

    for (const cartItem of anies) {
      let orderItem: OrderItem = new OrderItem();

      orderItem.orderId = tradeOrder.id;

      orderItem = {
        ...orderItem,
        ...cartItem,
      };

      await this?.orderItemRepository?.save?.(orderItem);

      this?.logger?.info?.(
        "如果购物车中有任何一个商品是需要物流的,则生成的整个订单都是需要物流的"
      );

      const goods: Goods = await this?.goodsRepository?.findOneById?.(
        cartItem.goodsId
      );

      if (goods?.delivery === "delivery") {
        tradeOrder.delivery = "delivery";
      }

      orderItem = {
        ...orderItem,
        ...goods,
        id: orderItem.id,
      };

      orderItem.goodsName = goods?.name;

      await this?.orderItemRepository?.save?.(orderItem);

      totalAmount = _?.add(
        totalAmount,
        _?.multiply?.(orderItem?.price, orderItem?.quantity)
      );
    }

    tradeOrder.totalAmount = totalAmount;

    await this?.repository?.save?.(tradeOrder);

    const postFee: number = await this?.getPostFee(tradeOrder?.id);

    tradeOrder.postFee = postFee;

    tradeOrder.totalAmount = _?.add(tradeOrder?.totalAmount, postFee);

    await this?.repository?.save?.(tradeOrder);

    this?.logger?.info?.("判断每个商品是否下单减库存,如果是,则减去库存");

    await this?.subStock(tradeOrder?.id, "order");

    return tradeOrder;
  }

  public async submitOrder(
    orderId: string,
    cartItems: string[] = [],
    shopBuyerId = "",
    shopId = ""
  ): Promise<TradeOrder> {
    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    tradeOrder.tradeState = "NOTPAY";

    await this?.repository?.save?.(tradeOrder);

    // 清空购物车

    this?.logger?.info?.("形成订单后,将购物车清空");

    if (!cartItems) {
      await this?.cartItemService?.clear(shopId, shopBuyerId);
    } else {
      await this?.cartItemService?.del(cartItems);
    }

    return tradeOrder;
  }

  public async getPostFee(orderId: string): Promise<number> {
    let log = "";

    this?.logger?.info?.("得到订单运费金额(元)");

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== "NOTPAY") {
      log = "订单不是未支付状态,无法计算运费";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    let postFee = 0.0;

    const delivery: string = tradeOrder?.delivery;

    if (delivery === "eticket") {
      this?.logger?.info?.("虚拟商品无需运费,运费为0");

      return postFee;
    }

    const receiverAddressId: string = tradeOrder?.receiverAddressId;

    if (!receiverAddressId) {
      this?.logger?.info?.("订单未设置收货地址,无法计算运费");

      return postFee;
    }

    const shop: Shop = await this?.shopRepository?.findOneById?.(
      tradeOrder?.shopId
    );

    const province: string = shop?.province;

    const city: string = shop?.city;

    const region: string = shop?.region;

    const buyerReceiveAddress: BuyerReceiveAddress =
      await this?.buyerReceiveAddressRepository?.findOneById?.(
        receiverAddressId
      );

    const provinceAddress: string = buyerReceiveAddress?.province;

    const cityAddress: string = buyerReceiveAddress?.city;

    const regionAddress: string = buyerReceiveAddress?.region;

    const orderItems: OrderItem[] = await this?.orderItemRepository?.findBy?.({
      orderId: orderId,
    });

    if (
      province === provinceAddress &&
      city === cityAddress &&
      region === regionAddress
    ) {
      this?.logger?.info?.("同城运费");

      postFee =
        await this?.deliveryTemplateLocaleService?.getDeliveryTotalAmount(
          orderItems
        );

      return postFee;
    }

    this?.logger?.info?.("全国运费");

    const anies =
      await this?.deliveryTemplateGlobalService?.getDeliveryTemplateGlobalList(
        province,
        tradeOrder.shopId,
        orderItems
      );

    postFee = await this?.deliveryTemplateGlobalService?.getDeliveryTotalAmount(
      anies
    );

    return postFee;
  }

  public getOutTradeNo(): string {
    return (
      moment()?.format?.("YYYYMMDDHHmmss") +
      _?.random?.(10000000, 99999999, false)
    );
  }

  public async updateAddress(
    id: string,
    addressId: string
  ): Promise<TradeOrder> {
    let log = "";

    this?.logger?.info?.("设置订单收货地址");

    if (!id) {
      log = "订单id错误,操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const buyerReceiveAddress: BuyerReceiveAddress =
      await this?.buyerReceiveAddressRepository?.findOneById?.(addressId);

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(id);

    tradeOrder.receiverAddressId = addressId;

    tradeOrder.province = buyerReceiveAddress?.province;

    tradeOrder.city = buyerReceiveAddress?.city;

    tradeOrder.region = buyerReceiveAddress?.region;

    await this?.repository?.save?.(tradeOrder);

    const postFee: number = await this?.getPostFee(id);

    tradeOrder.postFee = postFee;

    tradeOrder.totalAmount = _?.add(
      tradeOrder?.totalAmount,
      tradeOrder.postFee
    );

    await this?.repository?.save?.(tradeOrder);

    return tradeOrder;
  }

  public async orderCount(shopBuyerId = "", shopId = ""): Promise<void> {}

  public async alipayWapPay(orderId: string): Promise<void> {}

  public async alipayRefund(orderId: string): Promise<void> {}

  public async alipayClose(orderId: string): Promise<void> {}

  public async wxpayUnifiedOrder(orderId: string): Promise<void> {
    let log = "";

    // 查询是否已为此订单创建过微信支付预创建订单

    this?.logger?.info?.("进行微信支付统一下单的订单预创建");

    const tradeOrder: any = await this?.getById?.(orderId);

    // this?.logger?.info?.('判断购物车中的商品库存是否足够', )

    const tradeState: string = tradeOrder.tradeState;

    if (!tradeState && tradeState !== "NOTPAY") {
      log = "该订单不是未支付的状态,操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const shopId: string = tradeOrder.shopId;

    const shopBuyerId: string = tradeOrder.shopBuyerId;

    // 通过shopBuyerId找到openId

    const wechatConfig: any = await this?.userService.getWechatConfig(shopId);

    const openId: string = await this?.userService.getOpenId(
      shopBuyerId,
      wechatConfig.appId
    );

    let orderInfo: any = {
      appid: wechatConfig.appId,

      mchid: wechatConfig.mchId,

      description: "订单" + tradeOrder.outTradeNo,

      out_trade_no: tradeOrder.outTradeNo,

      notify_url:
        "https://" +
        this?.domain.domainName +
        TradeOrderService.wxpayNotifyUrl +
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

    const wxpay = await this?.getWxpay(shopId);

    const transactionsJsapi: any = await wxpay?.transactions_jsapi(orderInfo);

    orderInfo = {
      ...orderInfo,
      ...transactionsJsapi,
    };

    return transactionsJsapi;
  }

  public async paymentNotice(data: any = "", shopId = ""): Promise<string> {
    this?.logger?.info?.("订单支付成功异步通知消息");

    const wechatConfig: any = await this?.userService?.getWechatConfig(shopId);

    const wxpay = await this?.getWxpay(shopId);

    const ciphertext: any = wxpay?.decipher_gcm(
      data?.resource?.ciphertext,
      data?.resource?.associated_data,
      data?.resource?.nonce,
      wechatConfig?.mchKey
    );

    const outTradeNo: string = ciphertext?.out_trade_no;

    const tradeState: string = ciphertext?.trade_state;

    if (tradeState !== "SUCCESS" || !outTradeNo) {
      return "";
    }

    this?.orderSuccess(outTradeNo, "wxpay");

    return "";
  }

  public async getWxpay(shopId = ""): Promise<any> {
    const WxPay = require("wechatpay-node-v3"),
      fse: any = require("fs-extra"),
      path: any = require("path"),
      appDir = this?.app?.getAppDir();

    const wechatConfig: any = await this?.userService?.getWechatConfig(shopId);

    const wxpay: any = new WxPay({
      appid: wechatConfig?.appId,

      mchid: wechatConfig.mchId,

      privateKey: fse?.readFileSync(
        path?.join?.(appDir, "private/apiclient_key.pem")
      ),

      publicKey: fse?.readFileSync(
        path?.join?.(appDir, "private/apiclient_cert.pem")
      ),

      key: wechatConfig?.mchKey,
    });

    return wxpay;
  }

  public async orderSuccess(
    outTradeNo: string,
    payType: string
  ): Promise<void> {
    let log = "";

    this?.logger?.info?.("订单支付成功,更新订单状态");

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      outTradeNo
    );

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== "NOTPAY") {
      log = "该订单不是未支付的状态,无法进行订单支付成功更新订单状态的操作";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    tradeOrder.tradeState = "SUCCESS";

    tradeOrder.payType = payType;

    tradeOrder.payTime = new Date();

    await this?.repository?.save?.(tradeOrder);

    this?.logger?.info?.("如果是付款减库存,则进行商品库存减少操作");

    this?.subStock(outTradeNo, "pay");
  }

  public async subStock(orderId: string, subStockType: string): Promise<void> {
    this?.logger?.info?.("进行商品减库存操作,将订单占用的库存从商品库存中减去");

    const orderItems: OrderItem[] = await this?.orderItemRepository?.findBy?.({
      orderId: orderId,
    });

    for (const orderItem of orderItems) {
      const goods = await this?.goodsService?.getById?.(
        orderItem?.goodsId,
        null
      );

      const subStock: string = goods?.subStock;

      if (subStock !== subStockType) {
        continue;
      }

      const goodsSkuId: string = goods?.goodsSkuId;

      const skuMap: any = [];

      if (goodsSkuId && skuMap) {
      } else {
        goods.stock = goods?.stock - orderItem?.quantity;

        await this?.goodsService?.update(goods);
      }

      this?.logger?.info?.("根据商品库存数量更新商品上下架状态");

      await this?.goodsService?.updateApproveStatus(orderItem?.goodsId);
    }
  }

  public async refund(orderId: string): Promise<void> {
    let log = "";

    this?.logger?.info?.("已支付的订单申请退款");

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== "SUCCESS") {
      log = "该订单不是已支付状态,无法申请退款";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    tradeOrder.tradeState = "REFUND";

    await this?.repository?.save?.(tradeOrder);
  }

  public async updateTotalAmount(
    orderId: string,
    newTotalAmount: number
  ): Promise<void> {
    let log = "";

    this?.logger?.info?.("未支付的订单进行修改订单价格操作");

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== "NOTPAY") {
      log = "该订单不是未支付的状态,无法进行修改价格的操作";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    if (!newTotalAmount || newTotalAmount < 0.01) {
      log = "该订单修改后的价格过小";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    tradeOrder.totalAmount = newTotalAmount;

    await this?.repository?.save?.(tradeOrder);
  }

  public async updateShopMemo(orderId: string, memo: string): Promise<void> {
    this?.logger?.info?.("订单进行修改卖家备注操作");

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    tradeOrder.shopMemo = memo;

    await this?.repository?.save?.(tradeOrder);
  }

  public async updateMessage(
    orderId: string,
    message: string
  ): Promise<TradeOrder> {
    this?.logger?.info?.("订单进行修改买家留言操作");

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    tradeOrder.message = message;

    await this?.repository?.save?.(tradeOrder);

    return tradeOrder;
  }

  public async auditRefund(orderId: string): Promise<void> {
    //   let log = ''

    this?.logger?.info?.("已支付并申请退款的订单进行退款操作");

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    //     let tradeState: string = tradeOrder?.tradeState;

    const payType: string = tradeOrder?.payType;

    // if (tradeState !== 'REFUND') {

    //   log = '该订单不是已支付并申请退款的状态,无法进行退款操作';

    //   const zero0Error: Zero0Error = new Zero0Error(log, '5000',)
    //   this?.logger?.error?.(log, zero0Error,)
    //   throw zero0Error

    // }

    if (payType === "wxpay") {
      const wxpay = await this?.getWxpay(tradeOrder?.shopId);

      /**
       * 申请退款
       * @param params 请求参数 路径 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_2_9.shtml
       */
      // refunds(params: Irefunds1 | Irefunds2): Promise<Record<string, any>>;

      const refunds: any = {
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

      const record: any = await wxpay?.refunds?.(refunds);

      console.log(record);

      // TODO
    } else if (payType === "alipay") {
      // TODO
    } else if (payType === "balance") {
      await this?.refundBalance(orderId);
    }

    tradeOrder.tradeState = "CLOSED";

    await this?.repository?.save?.(tradeOrder);

    this?.logger?.info?.("进行库存回退操作");

    this?.refundStock?.(orderId);
  }

  public async close(orderId: string): Promise<void> {
    let log = "";

    this?.logger?.info?.(
      "进行未支付订单关闭操作,将订单占用的库存回退到商品库存中"
    );

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    const payType: string = tradeOrder?.payType;

    if (tradeState !== "NOTPAY") {
      log = "该订单不是未支付的状态,无法进行关闭操作";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    if (payType === "wxpay") {
      // TODO
    } else if (payType === "alipay") {
      // TODO
    }

    tradeOrder.tradeState = "CLOSED";

    await this?.repository?.save?.(tradeOrder);

    this?.logger?.info?.("进行库存回退操作");

    this?.refundStock?.(orderId);
  }

  public async refundStock(orderId: string): Promise<void> {
    this?.logger?.info?.(
      "进行订单库存回退操作,将订单占用的库存回退到商品库存中"
    );

    const orderItems: OrderItem[] = await this?.orderItemRepository?.findBy?.({
      orderId: orderId,
    });

    for (const orderItem of orderItems) {
      const goods: Goods = await this?.goodsRepository?.findOneById?.(
        orderItem?.goodsId
      );

      const subStock1: string = goods?.subStock;

      if (subStock1 !== "order" && subStock1 !== "pay") {
        continue;
      }
    }
  }

  public async setDelivery(
    orderId: string,
    deliveryCompany: string,
    deliveryTrackNo: string,
    needDelivery: string,
    isOthers: string
  ): Promise<void> {}

  public async payBalance(id: string): Promise<void> {
    let log = "";

    this?.logger?.info?.("订单进行买家余额支付");

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(id);

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== "NOTPAY") {
      log = "订单不是未支付状态,支付失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const shopBuyer: ShopBuyer = await this?.shopBuyerRepository?.findOneBy?.({
      id: tradeOrder?.shopBuyerId,
    });

    const balance: number = shopBuyer.balance;

    if (!balance || balance < 0.01) {
      log = "买家余额不足,支付失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const totalAmount: number = tradeOrder?.totalAmount;

    if (balance < totalAmount) {
      log = "买家余额不足,支付失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    shopBuyer.balance = _?.subtract?.(balance, totalAmount);

    await this?.shopBuyerRepository?.save?.(shopBuyer);
  }

  public async refundBalance(id: string): Promise<void> {
    this?.logger?.info?.("订单进行买家余额退款");

    const tradeOrder = await this?.repository?.findOneById?.(id);

    const payType: string = tradeOrder?.payType;

    if (payType !== "balance") {
      return;
    }

    const shopBuyer: ShopBuyer = await this?.shopBuyerRepository?.findOneBy?.({
      id: tradeOrder?.shopBuyerId,
    });

    shopBuyer.balance = shopBuyer?.balance + tradeOrder?.totalAmount;

    await this?.shopBuyerRepository?.save?.(shopBuyer);
  }

  public async bonusToAmount(bonus: number, rate: number): Promise<number> {
    let log = "";

    this?.logger?.info?.("积分转换成金额(元)");

    if (!bonus) {
      log = "积分过小，转换失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    return _?.multiply?.(bonus, rate);
  }

  public async send(orderId: string, deliveryList: any[]): Promise<void> {
    // 标识符名称来自微信小商店

    this?.logger?.info?.("订单发货");

    this?.logger?.info?.(
      "发货方式由用户在下单时选择，发货时已经默认了发货方式，因此发货时无需传入发货方式参数。拆单发货时，如果订单中含有多件同样的商品(相同的product_id和相同的sku_id)，这些商品必须在同一个包裹里一起发出。已经完成售后的商品不能进行发货"
    );

    let log = "";

    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== "SUCCESS") {
      log = "该订单不是已支付的状态,无法进行发货操作";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    if (deliveryList) {
      for (const deliveryListElement of deliveryList) {
        let deliveryListObj: DeliveryList = new DeliveryList();

        deliveryListObj = _?.assign?.(deliveryListObj, deliveryListElement);

        await this?.deliveryListRepository?.save?.(deliveryListObj);
      }
    }

    tradeOrder.tradeState = "DELIVERY";

    await this?.repository?.save?.(tradeOrder);
  }

  public async countTradeState(
    shopId = "",
    shopBuyerId: string
  ): Promise<any[]> {
    let whereSql = ` SELECT t.trade_state, COUNT(*) AS count_0 ${this?.fromSql} WHERE t.shop_id = '${shopId}' `; // 查询条件字符串

    if (shopBuyerId) {
      whereSql += ` AND t.shop_buyer_id = '${shopBuyerId}' `;
    }

    whereSql += " GROUP BY t.trade_state ";

    return await super.query?.(whereSql);
  }

  public async createProfitsharingOrders(
    shopId = "",
    transactionId = "",
    receivers: any[]
  ): Promise<void> {
    /**
     * 请求分账API
     * @param params
     * @returns
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_1.shtml
     */
  }

  public async chart(): Promise<any> {
    const sql = ` SELECT 
    SUM(t.total_amount) AS sum_total_amount
    , ( SELECT SUM( quantity ) AS sum_quantity FROM order_item WHERE t.id = order_item.order_id ) AS sum_quantity
    , ( SELECT COUNT(*) FROM ${ShopBuyerService?.TABLE_NAME} b ) AS shop_buyer_count
    ${this?.fromSql} WHERE ( t.trade_state != 'NOTPAY' AND t.trade_state != 'REFUND' ) `;

    const data = await super.query?.(sql);

    return data?.[0];
  }
}