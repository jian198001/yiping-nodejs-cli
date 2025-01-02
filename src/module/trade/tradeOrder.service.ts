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

  public async del(idsArr: string[]): Promise<void> {
    await this?.repository?.delete?.(idsArr);
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

/**
 * 分页查询交易订单
 * @param tradeState - 交易状态
 * @param shopId - 店铺ID
 * @param shopBuyerId - 店铺买家ID
 * @param query - 查询条件
 * @param params - 参数
 * @param reqParam - 请求参数
 * @param page - 分页信息
 * @returns 分页结果
 */
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

/**
 * 根据ID获取交易订单
 * @param id - 订单ID
 * @returns 交易订单信息
 */
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

/**
 * 获取订单商品项
 * @param orderId - 订单ID
 * @returns 订单商品项列表
 */
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

/**
 * 删除交易订单
 * @param idsArr - 订单ID数组
 * @returns 无返回值
 */
public async del(idsArr: string[]): Promise<void> {
  await this?.repository?.delete?.(idsArr);
}

/**
 * 更新交易订单
 * @param obj - 交易订单对象
 * @returns 更新后的交易订单对象
 */
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
    log = "新增数据，主键id的随机字符串值，

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
  /**
   * 提交订单并清空购物车
   * @param orderId - 订单ID
   * @param cartItems - 购物车商品项ID数组，默认为空数组
   * @param shopBuyerId - 店铺买家ID，默认为空字符串
   * @param shopId - 店铺ID，默认为空字符串
   * @returns Promise<TradeOrder> - 返回提交后的订单信息
   */
  public async submitOrder(
    orderId: string,
    cartItems: string[] = [],
    shopBuyerId = "",
    shopId = ""
  ): Promise<TradeOrder> {
    // 根据订单ID从数据库中查询订单信息
    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    // 设置订单状态为未支付
    tradeOrder.tradeState = "NOTPAY";

    // 保存更新后的订单信息到数据库中
    await this?.repository?.save?.(tradeOrder);

    // 记录日志，表示形成订单后将购物车清空
    this?.logger?.info?.("形成订单后,将购物车清空");

    // 如果购物车商品项ID数组为空，则调用cartItemService的clear方法清空购物车
    if (!cartItems) {
      await this?.cartItemService?.clear(shopId, shopBuyerId);
    } else {
      // 如果购物车商品项ID数组不为空，则调用cartItemService的del方法删除购物车中的指定商品项
      await this?.cartItemService?.del(cartItems);
    }

    // 返回提交后的订单信息
    return tradeOrder;
  }

  /**
   * 计算订单的运费金额
   * @param orderId - 订单ID
   * @returns Promise<number> - 运费金额
   */
  public async getPostFee(orderId: string): Promise<number> {
    let log = "";

    // 记录日志，表示开始计算订单的运费金额
    this?.logger?.info?.("得到订单运费金额(元)");

    // 根据订单ID从数据库中查询订单信息
    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );

    // 获取订单的交易状态
    const tradeState: string = tradeOrder?.tradeState;

    // 如果订单不是未支付状态，则抛出异常，提示订单不是未支付状态，无法计算运费
    if (tradeState !== "NOTPAY") {
      log = "订单不是未支付状态,无法计算运费";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    // 初始化运费金额为0
    let postFee = 0.0;

    // 获取订单的配送方式
    const delivery: string = tradeOrder?.delivery;

    // 如果配送方式是电子票，则直接返回运费金额为0，因为虚拟商品无需运费
    if (delivery === "eticket") {
      this?.logger?.info?.("虚拟商品无需运费,运费为0");

      return postFee;
    }

    // 获取订单的收货地址ID
    const receiverAddressId: string = tradeOrder?.receiverAddressId;

    // 如果收货地址ID为空，则直接返回运费金额为0，因为订单未设置收货地址，无法计算运费
    if (!receiverAddressId) {
      this?.logger?.info?.("订单未设置收货地址,无法计算运费");

      return postFee;
    }

    // 根据订单的店铺ID从数据库中查询店铺信息
    const shop: Shop = await this?.shopRepository?.findOneById?.(
      tradeOrder?.shopId
    );

    // 获取店铺所在的省份、城市和地区
    const province: string = shop?.province;
    const city: string = shop?.city;
    const region: string = shop?.region;

    // 根据收货地址ID从数据库中查询收货地址信息
    const buyerReceiveAddress: BuyerReceiveAddress =
      await this?.buyerReceiveAddressRepository?.findOneById?.(
        receiverAddressId
      );

    // 获取收货地址的省份、城市和地区
    const provinceAddress: string = buyerReceiveAddress?.province;
    const cityAddress: string = buyerReceiveAddress?.city;
    const regionAddress: string = buyerReceiveAddress?.region;

    // 根据订单ID从数据库中查询订单商品项
    const orderItems: OrderItem[] = await this?.orderItemRepository?.findBy?.({
      orderId: orderId,
    });

    // 如果店铺所在的省份、城市和地区与收货地址的省份、城市和地区相同，则计算同城运费
    if (
      province === provinceAddress &&
      city === cityAddress &&
      region === regionAddress
    ) {
      this?.logger?.info?.("同城运费");

      // 调用deliveryTemplateLocaleService的getDeliveryTotalAmount方法计算同城运费
      postFee =
        await this?.deliveryTemplateLocaleService?.getDeliveryTotalAmount(
          orderItems
        );

      return postFee;
    }

    // 记录日志，表示开始计算全国运费
    this?.logger?.info?.("全国运费");

    // 调用deliveryTemplateGlobalService的getDeliveryTemplateGlobalList方法获取全国运费模板列表
    const anies =
      await this?.deliveryTemplateGlobalService?.getDeliveryTemplateGlobalList(
        province,
        tradeOrder.shopId,
        orderItems
      );

    // 调用deliveryTemplateGlobalService的getDeliveryTotalAmount方法计算全国运费
    postFee = await this?.deliveryTemplateGlobalService?.getDeliveryTotalAmount(
      anies
    );

    return postFee;
  }
  /**
   * 生成订单号
   * @returns 返回生成的订单号
   */
  public getOutTradeNo(): string {
    // 使用moment库获取当前时间并格式化为'YYYYMMDDHHmmss'的字符串
    // 使用lodash库生成一个10000000到99999999之间的随机数，并转换为字符串
    // 将时间字符串和随机数字符串拼接起来作为订单号返回
    return (
      moment()?.format?.("YYYYMMDDHHmmss") +
      _?.random?.(10000000, 99999999, false)
    );
  }
  /**
   * 更新订单的收货地址
   * @param id - 订单ID
   * @param addressId - 收货地址ID
   * @returns Promise<TradeOrder> - 返回更新后的订单信息
   */
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
  /**
   * 获取订单数量
   * @param shopBuyerId - 店铺买家ID，默认为空字符串
   * @param shopId - 店铺ID，默认为空字符串
   * @returns Promise<void> - 无返回值
   */
  public async orderCount(shopBuyerId = "", shopId = ""): Promise<void> {}

  /**
   * 处理支付宝手机网页支付
   * @param orderId - 订单ID
   * @returns Promise<void> - 无返回值
   */
  public async alipayWapPay(orderId: string): Promise<void> {}

  /**
   * 处理支付宝退款操作
   * @param orderId - 订单ID
   * @returns Promise<void> - 无返回值
   */
  public async alipayRefund(orderId: string): Promise<void> {}

  /**
   * 处理支付宝关闭订单操作
   * @param orderId - 订单ID
   * @returns Promise<void> - 无返回值
   */
  public async alipayClose(orderId: string): Promise<void> {}
  /**
   * 创建微信支付统一下单订单
   * @param orderId - 订单ID
   * @returns Promise<void> - 无返回值
   */
  public async wxpayUnifiedOrder(orderId: string): Promise<void> {
    let log = "";
    // 查询是否已为此订单创建过微信支付预创建订单
    this?.logger?.info?.("进行微信支付统一下单的订单预创建");
    const tradeOrder: any = await this?.getById?.(orderId);
    // this?.logger?.info?.('判断购物车中的商品库存是否足够', )
    const tradeState: string = tradeOrder.tradeState;
    // 如果订单不是未支付状态，则抛出异常，提示操作失败
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
    // 构造微信支付统一下单的订单信息
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
    // 为了测试，将订单金额设置为1分
    orderInfo.amount.total = 1;
    const wxpay = await this?.getWxpay(shopId);
    // 调用微信支付API创建统一下单订单
    const transactionsJsapi: any = await wxpay?.transactions_jsapi(orderInfo);
    // 将返回的订单信息合并到原始订单信息中
    orderInfo = {
      ...orderInfo,
      ...transactionsJsapi,
    };
    // 返回创建的统一下单订单信息
    return transactionsJsapi;
  }
  /**
   * 处理微信支付的异步通知
   * @param data - 微信支付异步通知的数据
   * @param shopId - 店铺ID，默认为空字符串
   * @returns Promise<string> - 返回空字符串
   */
  public async paymentNotice(data: any = "", shopId = ""): Promise<string> {
    // 记录日志，表示接收到微信支付成功的异步通知消息
    this?.logger?.info?.("订单支付成功异步通知消息");
    // 从用户服务中获取微信支付配置
    const wechatConfig: any = await this?.userService?.getWechatConfig(shopId);
    // 获取微信支付实例
    const wxpay = await this?.getWxpay(shopId);
    // 解密微信支付异步通知的数据
    const ciphertext: any = wxpay?.decipher_gcm(
      data?.resource?.ciphertext,
      data?.resource?.associated_data,
      data?.resource?.nonce,
      wechatConfig?.mchKey
    );
    // 获取订单号
    const outTradeNo: string = ciphertext?.out_trade_no;
    // 获取交易状态
    const tradeState: string = ciphertext?.trade_state;
    // 如果交易状态不是成功或订单号为空，则直接返回空字符串
    if (tradeState !== "SUCCESS" || !outTradeNo) {
      return "";
    }
    // 处理订单支付成功的逻辑
    this?.orderSuccess(outTradeNo, "wxpay");
    // 返回空字符串
    return "";
  }
  /**
   * 获取微信支付实例
   * @param shopId - 店铺ID，默认为空字符串
   * @returns Promise<any> - 返回微信支付实例
   */
  public async getWxpay(shopId = ""): Promise<any> {
    // 引入wechatpay-node-v3库
    const WxPay = require("wechatpay-node-v3"),
      // 引入fs-extra库，用于文件操作
      fse: any = require("fs-extra"),
      // 引入path库，用于路径操作
      path: any = require("path"),
      // 获取应用程序目录
      appDir = this?.app?.getAppDir();
    // 从用户服务中获取微信支付配置
    const wechatConfig: any = await this?.userService?.getWechatConfig(shopId);
    // 创建微信支付实例
    const wxpay: any = new WxPay({
      // 设置微信支付的appid
      appid: wechatConfig?.appId,
      // 设置微信支付的商户号
      mchid: wechatConfig.mchId,
      // 读取私钥文件
      privateKey: fse?.readFileSync(
        path?.join?.(appDir, "private/apiclient_key.pem")
      ),
      // 读取公钥文件
      publicKey: fse?.readFileSync(
        path?.join?.(appDir, "private/apiclient_cert.pem")
      ),
      // 设置微信支付的商户密钥
      key: wechatConfig?.mchKey,
    });
    // 返回微信支付实例
    return wxpay;
  }
  /**
   * 处理订单支付成功的逻辑
   * @param outTradeNo - 订单号
   * @param payType - 支付类型
   * @returns Promise<void> - 无返回值
   */
  public async orderSuccess(
    outTradeNo: string,
    payType: string
  ): Promise<void> {
    let log = "";
    // 记录日志，表示订单支付成功，开始更新订单状态
    this?.logger?.info?.("订单支付成功,更新订单状态");
    // 根据订单号从数据库中查询订单信息
    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      outTradeNo
    );
    // 获取订单的交易状态
    const tradeState: string = tradeOrder?.tradeState;
    // 如果订单不是未支付状态，则抛出异常，提示无法进行订单支付成功更新订单状态的操作
    if (tradeState !== "NOTPAY") {
      log = "该订单不是未支付的状态,无法进行订单支付成功更新订单状态的操作";
      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;

    // 更新订单状态为已支付
    tradeOrder.tradeState = "SUCCESS";

    // 更新订单的支付类型
    tradeOrder.payType = payType;

    // 更新订单的支付时间为当前时间
    tradeOrder.payTime = new Date();

    // 保存更新后的订单信息到数据库中
    await this?.repository?.save?.(tradeOrder);

    // 记录日志，表示如果是付款减库存，则进行商品库存减少操作
    this?.logger?.info?.("如果是付款减库存,则进行商品库存减少操作");

    // 调用subStock方法进行商品库存减少操作
    this?.subStock(outTradeNo, "pay");
  }

  /**
   * 处理商品减库存操作
   * @param orderId - 订单ID
   * @param subStockType - 减库存类型
   * @returns Promise<void> - 无返回值
   */
  public async subStock(orderId: string, subStockType: string): Promise<void> {
    // 记录日志，表示开始商品减库存操作
    this?.logger?.info?.("进行商品减库存操作,将订单占用的库存从商品库存中减去");

    // 根据订单ID从数据库中查询订单商品项
    const orderItems: OrderItem[] = await this?.orderItemRepository?.findBy?.({
      orderId: orderId,
    });

    // 遍历订单商品项
    for (const orderItem of orderItems) {
      // 根据商品ID从数据库中查询商品信息
      const goods = await this?.goodsService?.getById?.(
        orderItem?.goodsId,
        null
      );

      // 获取商品的减库存类型
      const subStock: string = goods?.subStock;

      // 如果商品的减库存类型与传入的减库存类型不匹配，则跳过当前商品
      if (subStock !== subStockType) {
        continue;
      }

      // 获取商品的SKU ID
      const goodsSkuId: string = goods?.goodsSkuId;

      // 创建一个空的SKU映射数组
      const skuMap: any = [];

      // 如果商品有SKU ID且SKU映射数组不为空，则执行以下逻辑
      if (goodsSkuId && skuMap) {
        // 此处应根据SKU ID和SKU映射数组进行减库存操作，但当前代码中未实现具体逻辑
      } else {
        // 如果商品没有SKU ID或SKU映射数组为空，则直接减少商品的库存数量
        goods.stock = goods?.stock - orderItem?.quantity;

        // 更新商品信息到数据库中
        await this?.goodsService?.update(goods);
      }

      // 记录日志，表示开始根据商品库存数量更新商品上下架状态
      this?.logger?.info?.("根据商品库存数量更新商品上下架状态");

      // 更新商品的上下架状态
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

  /**
   * 处理订单库存回退操作
   * 该方法用于将订单占用的库存回退到商品库存中
   * @param orderId - 订单ID
   * @returns Promise<void> - 无返回值
   */
  public async refundStock(orderId: string): Promise<void> {
    // 记录日志，表示开始进行订单库存回退操作
    this?.logger?.info?.(
      "进行订单库存回退操作,将订单占用的库存回退到商品库存中"
    );

    // 根据订单ID从数据库中查询订单商品项
    const orderItems: OrderItem[] = await this?.orderItemRepository?.findBy?.({
      orderId: orderId,
    });

    // 遍历订单商品项
    for (const orderItem of orderItems) {
      // 根据商品ID从数据库中查询商品信息
      const goods: Goods = await this?.goodsRepository?.findOneById?.(
        orderItem?.goodsId
      );

      // 获取商品的减库存类型
      const subStock1: string = goods?.subStock;

      // 如果商品的减库存类型不是“order”或“pay”，则跳过当前商品
      if (subStock1 !== "order" && subStock1 !== "pay") {
        continue;
      }

      // 如果商品有SKU ID，则执行以下逻辑
      if (goods?.goodsSkuId) {
        // 此处应根据SKU ID进行库存回退操作，但当前代码中未实现具体逻辑
      } else {
        // 如果商品没有SKU ID，则直接增加商品的库存数量
        goods.stock = goods?.stock + orderItem?.quantity;

        // 更新商品信息到数据库中
        await this?.goodsRepository?.save?.(goods);
      }

      // 记录日志，表示开始根据商品库存数量更新商品上下架状态
      this?.logger?.info?.("根据商品库存数量更新商品上下架状态");

      // 更新商品的上下架状态
      await this?.goodsService?.updateApproveStatus(orderItem?.goodsId);
    }
  }
  public async setDelivery(
    orderId: string,
    deliveryCompany: string,
    deliveryTrackNo: string,
    needDelivery: string,
    isOthers: string
  ): Promise<void> {}
  /**
   * 设置订单的发货信息
   * 该方法用于设置订单的发货公司、快递单号、是否需要发货以及是否为其他发货方式等信息
   * @param orderId - 订单ID
   * @param deliveryCompany - 发货公司名称
   * @param deliveryTrackNo - 快递单号
   * @param needDelivery - 是否需要发货，取值为'1'表示需要发货，'0'表示不需要发货
   * @param isOthers - 是否为其他发货方式，取值为'1'表示是其他发货方式，'0'表示不是其他发货方式
   * @returns Promise<void> - 无返回值
   */
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
  /**
   * 处理订单的买家余额退款操作
   * @param id - 订单ID
   * @returns Promise<void> - 无返回值
   */
  public async refundBalance(id: string): Promise<void> {
    // 记录日志，表示开始处理订单的买家余额退款操作
    this?.logger?.info?.("订单进行买家余额退款");
    
    // 根据订单ID从数据库中查询订单信息
    const tradeOrder = await this?.repository?.findOneById?.(id);
    
    // 获取订单的支付类型
    const payType: string = tradeOrder?.payType;
    
    // 如果支付类型不是余额支付，则直接返回，不进行退款操作
    if (payType !== "balance") {
      return;
    }
    
    // 根据订单的店铺买家ID从数据库中查询店铺买家信息
    const shopBuyer: ShopBuyer = await this?.shopBuyerRepository?.findOneBy?.({
      id: tradeOrder?.shopBuyerId,
    });
    
    // 将店铺买家的余额增加订单的总金额
    shopBuyer.balance = shopBuyer?.balance + tradeOrder?.totalAmount;
    
    // 保存更新后的店铺买家信息到数据库中
    await this?.shopBuyerRepository?.save?.(shopBuyer);
  }
  /**
   * 将积分转换为金额（元）
   * @param bonus - 要转换的积分数量
   * @param rate - 积分转换为金额的比率
   * @returns Promise<number> - 转换后的金额
   */
  public async bonusToAmount(bonus: number, rate: number): Promise<number> {
    // 记录日志，表示开始积分转换为金额的操作
    this?.logger?.info?.("积分转换成金额(元)");
    
    // 如果积分数量为0或未提供，则抛出异常，提示积分过小，转换失败
    if (!bonus) {
      const log = "积分过小，转换失败";
      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }
    
    // 使用lodash的multiply方法将积分数量乘以转换比率，得到转换后的金额
    return _?.multiply?.(bonus, rate);
  }
  /**
   * 处理订单发货逻辑
   * @param orderId - 订单ID
   * @param deliveryList - 发货列表，包含每个包裹的发货信息
   * @returns Promise<void> - 无返回值
   */
  public async send(orderId: string, deliveryList: any[]): Promise<void> {
    // 标识符名称来自微信小商店
    // 记录日志，表示开始处理订单发货
    this?.logger?.info?.("订单发货");
    
    // 记录日志，提示发货方式由用户在下单时选择，发货时无需传入发货方式参数，拆单发货时相同商品必须在同一个包裹里一起发出，已完成售后的商品不能发货
    this?.logger?.info?.(
      "发货方式由用户在下单时选择，发货时已经默认了发货方式，因此发货时无需传入发货方式参数。拆单发货时，如果订单中含有多件同样的商品(相同的product_id和相同的sku_id)，这些商品必须在同一个包裹里一起发出。已经完成售后的商品不能进行发货"
    );
    
    let log = "";
    
    // 根据订单ID从数据库中查询订单信息
    const tradeOrder: TradeOrder = await this?.repository?.findOneById?.(
      orderId
    );
    
    // 获取订单的交易状态
    const tradeState: string = tradeOrder?.tradeState;
    
    // 如果订单不是已支付状态，则抛出异常，提示无法进行发货操作
    if (tradeState !== "SUCCESS") {
      log = "该订单不是已支付的状态,无法进行发货操作";
    
      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }
    
    // 如果发货列表不为空，则遍历发货列表，将每个包裹的发货信息保存到数据库中
    if (deliveryList) {
      for (const deliveryListElement of deliveryList) {
        let deliveryListObj: DeliveryList = new DeliveryList();
    
        deliveryListObj = _?.assign?.(deliveryListObj, deliveryListElement);
    
        await this?.deliveryListRepository?.save?.(deliveryListObj);
      }
    }
    
    // 更新订单状态为已发货
    tradeOrder.tradeState = "DELIVERY";
    
    // 保存更新后的订单信息到数据库中
    await this?.repository?.save?.(tradeOrder);
  }
  /**
   * 统计交易订单状态数量
   * @param shopId - 店铺ID
   * @param shopBuyerId - 店铺买家ID
   * @returns 包含交易状态和对应数量的统计信息数组
   */
  public async countTradeState(
    shopId = "",
    shopBuyerId: string
  ): Promise<any[]> {
    // 构建查询SQL语句，统计每个交易状态的订单数量
    let whereSql = ` SELECT t.trade_state, COUNT(*) AS count_0 ${this?.fromSql} WHERE t.shop_id = '${shopId}' `; // 查询条件字符串
    
    // 如果提供了店铺买家ID，则添加到查询条件中
    if (shopBuyerId) {
      whereSql += ` AND t.shop_buyer_id = '${shopBuyerId}' `;
    }
    
    // 按交易状态分组
    whereSql += " GROUP BY t.trade_state ";
    
    // 执行查询并返回结果
    return await super.query?.(whereSql);
  }
  /**
   * 创建微信支付分账订单
   * @param shopId - 店铺ID
   * @param transactionId - 微信支付交易ID
   * @param receivers - 分账接收方列表
   * @returns 无返回值
   * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_1.shtml
   */
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
  /**
   * 查询交易订单统计信息
   * @returns 包含总金额、商品数量和店铺买家数量的统计信息
   */
  public async chart(): Promise<any> {
    // 构建查询SQL语句
    const sql = ` SELECT 
    // 计算交易订单的总金额
    SUM(t.total_amount) AS sum_total_amount
    // 计算交易订单中商品的总数量
    , ( SELECT SUM( quantity ) AS sum_quantity FROM order_item WHERE t.id = order_item.order_id ) AS sum_quantity
    // 统计店铺买家的数量
    , ( SELECT COUNT(*) FROM ${ShopBuyerService?.TABLE_NAME} b ) AS shop_buyer_count
    // 指定查询的表名和别名
    ${this?.fromSql} 
    // 添加查询条件，排除未支付和退款的订单
    WHERE ( t.trade_state != 'NOTPAY' AND t.trade_state != 'REFUND' ) `;
    
    // 执行查询并返回结果
    const data = await super.query?.(sql);
    
    // 返回查询结果中的第一条记录
    

    return data?.[0];
  }
}
