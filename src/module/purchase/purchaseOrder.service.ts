import { Inject, Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { PurchaseOrder } from '../../entity/PurchaseOrder';

import { ILogger } from '@midwayjs/logger';
import { Material } from '../../entity/Material';
import { PurchaseOrderItem } from '../../entity/PurchaseOrderItem';
import { ShopBuyer } from '../../entity/ShopBuyer';
import { BuyerReceiveAddress } from '../../entity/BuyerReceiveAddress';
import { Zero0Error } from '../common/model/Zero0Error';
import { DeliveryList } from '../../entity/DeliveryList';

import _ = require('lodash');

import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';

import { Stock } from '../../entity/Stock';
import { UserService } from '../auth/user.service';

const moment = require('moment');

@Provide()
export class PurchaseOrderService extends BaseService {
  private orderNotifyWxpayReturnStr =
    ' <xml> <return_code><![CDATA[SUCCESS]]></return_code> <return_msg><![CDATA[OK]]></return_msg> </xml> ';

  @Logger()
  private logger: ILogger = null

  // 查询的数据库表名称
  private static TABLE_NAME = 'purchase_order';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${PurchaseOrderService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  , ( SELECT COUNT(*) AS item_count FROM purchase_order_item WHERE purchase_order_item.order_id = t.id ) AS item_count 
  , ( CASE t.trade_state WHEN 'submit' THEN '待入库' WHEN 'stock' THEN '已采购完成' ELSE '待提交' END ) AS trade_state_cn
  , ( SELECT username FROM user WHERE user.id = t.create_user_id ) AS username
     `;

  @InjectEntityModel(PurchaseOrder)
  private repository: Repository<PurchaseOrder> = null;

  @InjectEntityModel(PurchaseOrderItem)
  private purchaseOrderItemRepository: Repository<PurchaseOrderItem> = null;

  @InjectEntityModel(ShopBuyer)
  private shopBuyerRepository: Repository<ShopBuyer> = null;

  @InjectEntityModel(Material)
  private materialRepository: Repository<Material> = null;

  @InjectEntityModel(BuyerReceiveAddress)
  private buyerReceiveAddressRepository: Repository<BuyerReceiveAddress> = null;

  @InjectEntityModel(DeliveryList)
  private deliveryListRepository: Repository<DeliveryList> = null;

  @InjectEntityModel(Stock)
  private stockRepository: Repository<Stock> = null;

  @Inject()
  private userService: UserService = null

  public async page(userId,
    tradeState = '',
    query = '', params: string, reqParam: ReqParam,
    page: Page,
  ): Promise<any> {
    // 分页列表查询数据

    // 只有管理员可以管理采购单，其它角色看到的是空列表

    const user = await this?.userService?.getById?.(userId)

    const roleIds: string[] = user?.roleIds

    if (!roleIds?.includes?.('1')) {

      return new Page()

    }

    let whereSql = ' ' // 查询条件字符串

    if (tradeState) {
      whereSql += ` AND t.trade_state = '${tradeState}' `;
    }

    whereSql += sqlUtils?.like?.(['title'], reqParam?.searchValue,) // 处理前端的搜索字符串的搜索需求
    // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize',])) + sqlUtils?.query?.(query)  // 处理前端的表格中筛选需求
    // 执行查询语句并返回page对象结果
    const data: any = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    )

    if (page?.pageSize > 0) {

      return data

    }

    if (page?.pageSize < 1) {
      // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, 'value',)

    }

  }

  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql)
  }

  public async del(idsArr: string[]): Promise<void> {

    await this?.repository?.delete?.(idsArr,)
  }

  public async submit(id = ''): Promise<PurchaseOrder> {
    // 一个表进行操作 typeORM

    const purchaseOrder: PurchaseOrder = await this?.repository?.findOneById?.(id);

    purchaseOrder.tradeState = 'submit';

    await this?.repository?.save?.(purchaseOrder);

    return purchaseOrder;
  }

  public async update(obj: PurchaseOrder): Promise<PurchaseOrder> {
    // 一个表进行操作 typeORM

    let log = '';

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      PurchaseOrderService?.TABLE_NAME,
      [],
      obj?.id
    ); // 新增或修改数据时，判断某字段值在数据库中是否已重复

    if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
      log = uniqueText + '已存在，操作失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }
    // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      log = '新增数据，主键id的随机字符串值，由后端typeorm提供'

      delete obj?.id

      await this?.repository?.save?.(obj) // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          PurchaseOrderService?.TABLE_NAME
        ) // 新增数据时，设置此条数据的orderNum排序值
      }
      return null
    }

    let old: PurchaseOrder = await this?.repository?.findOneById?.(obj?.id) // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj) // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          PurchaseOrderService?.TABLE_NAME
        ) // 新增数据时，设置此条数据的orderNum排序值
      }
      return null
    }
    delete obj?.id

    old = {
      ...old,

      ...obj,
    };

    await this?.repository?.save?.(old) // 修改数据
  }

  public async updateItem(
    obj: Material,
    purchaseOrderItem: PurchaseOrderItem,
    type: string
  ): Promise<PurchaseOrderItem> {
    // 一个表进行操作 typeORM

    let log = '';

    if (type === 'input') {
      // 新增新物料

      // 判断物料名称及规格型号是否重复

      const countUnique: number =
        await this?.materialRepository?.countBy({ name: obj.name, sku: obj.sku });

      if (countUnique > 0) {
        log = '同名称及规格型号物料已存在,操作失败';

        const zero0Error: Zero0Error = new Zero0Error(log, '5000')
        this?.logger?.error?.(log, zero0Error)
        throw zero0Error
      }

      await this?.materialRepository?.save?.(obj);

      purchaseOrderItem.materialId = obj?.id;
    }

    // 判断此物料id在此采购单的其它明细中是否已存在，如存在，则累加

    const materialId: string = purchaseOrderItem?.materialId;

    const orderId: string = purchaseOrderItem?.orderId;

    const one: PurchaseOrderItem =
      await this?.purchaseOrderItemRepository?.findOneBy?.({
        orderId: orderId,
        materialId: materialId,
      });

    if (one) {
      one.quantity =
        parseInt?.(one?.quantity + '') +
        parseInt?.(purchaseOrderItem?.quantity + '');

      await this?.purchaseOrderItemRepository?.save?.(one);

      return one;
    }

    await this?.purchaseOrderItemRepository?.save?.(purchaseOrderItem);

    return null
  }

  public async buy(
    map: any,
    shopBuyerId = '',
    priceUnit: number
  ): Promise<PurchaseOrder> {
    this?.logger?.info?.('立即购买');

    const priceMul: number = _?.multiply?.(1, priceUnit);

    let log = '';

    const data: any = map?.data;

    const materialId: string = data?.materialId;

    const quantity: number = data?.selectedNum;

    const selectedSkuComb: any = data?.selectedSkuComb;

    const material: Material = await this?.materialRepository?.findOneById?.(
      materialId
    );

    const quota: number = material?.quota;

    const startSaleNum: number = material?.startSaleNum;

    if (quota && quantity > quota) {
      log = '购买数量大于限购数,购买失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    if (startSaleNum && quantity < startSaleNum) {
      log = '购买数量小于起售数量,购买失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    const tradeOrder: PurchaseOrder = new PurchaseOrder();

    tradeOrder.shopBuyerId = shopBuyerId;

    tradeOrder.shopId = material?.shopId;

    tradeOrder.tradeState = 'NOTPAY';

    tradeOrder.delivery = 'eticket';

    tradeOrder.freightPayer = 'shop';

    if (material?.delivery === 'delivery') {
      tradeOrder.delivery = 'delivery';
    }

    if (material?.freightPayer === 'shop') {
      tradeOrder.freightPayer = 'shop';
    }

    this?.repository?.save?.(tradeOrder);

    const orderItem: PurchaseOrderItem = new PurchaseOrderItem();

    orderItem.materialId = materialId;

    orderItem.shopBuyerId = shopBuyerId;

    orderItem.quantity = quantity;

    orderItem.materialName = material?.name;

    orderItem.orderId = tradeOrder?.id;

    let price = 0.0;

    if (selectedSkuComb) {
      price = selectedSkuComb?.price;

      price = _?.multiply?.(price, priceMul);

      const materialSkuId: string = selectedSkuComb?.id;

      const propertyPrice: number = selectedSkuComb?.property_price;

      const properties: any[] = selectedSkuComb?.properties;

      orderItem.materialSkuId = materialSkuId;

      orderItem.properties = JSON?.stringify(properties);

      orderItem.propertyPrice = propertyPrice;
    }

    orderItem.price = price;

    this?.purchaseOrderItemRepository?.save?.(orderItem);

    let totalAmount = 0.0;

    totalAmount =
      totalAmount + _?.multiply?.(orderItem?.price, orderItem?.quantity);

    tradeOrder.totalAmount = totalAmount;

    const number: number = await this?.getPostFee?.(tradeOrder?.id);

    tradeOrder.postFee = number;

    tradeOrder.totalAmount = _?.add?.(tradeOrder?.totalAmount, number);

    await this?.repository?.save?.(tradeOrder);

    this?.logger?.info?.('判断每个物料是否下单减库存,如果是,则减去库存');

    await this?.subStock?.(tradeOrder?.id, 'order');

    return tradeOrder;
  }

  public async createOrder(
    shopBuyerId = '',
    shopId = ''
  ): Promise<PurchaseOrder> {
    this?.logger?.info?.('创建订单');

    this?.logger?.info?.('获取购物车信息');

    this?.logger?.info?.('判断购物车中的物料库存是否足够');

    const tradeOrder: PurchaseOrder = new PurchaseOrder();

    tradeOrder.id = await this?.getOutPurchaseNo();

    tradeOrder.shopBuyerId = shopBuyerId;

    tradeOrder.shopId = shopId;

    tradeOrder.delivery = 'eticket';

    tradeOrder.freightPayer = 'shop';

    const totalAmount = 0.0;

    tradeOrder.totalAmount = totalAmount;

    await this?.repository?.save?.(tradeOrder);

    tradeOrder.totalAmount = totalAmount;

    await this?.repository?.save?.(tradeOrder);

    const number: number = await this?.getPostFee(tradeOrder?.id);

    tradeOrder.postFee = number;

    tradeOrder.totalAmount = _?.add(tradeOrder?.totalAmount, number);

    await this?.repository?.save?.(tradeOrder);

    this?.logger?.info?.('形成订单后,将购物车清空');

    this?.logger?.info?.('判断每个物料是否下单减库存,如果是,则减去库存');

    await this?.subStock(tradeOrder?.id, 'order');

    return tradeOrder;
  }

  public async getPostFee(orderId: string): Promise<number> {
    let log = '';

    this?.logger?.info?.('得到订单运费金额(元)');

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== 'NOTPAY') {
      log = '订单不是未支付状态,无法计算运费';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    const postFee = 0.0;

    const delivery: string = tradeOrder?.delivery;

    if (delivery === 'eticket') {
      this?.logger?.info?.('虚拟物料无需运费,运费为0');

      return postFee;
    }

    const freightPayer: string = tradeOrder?.freightPayer;

    if (freightPayer === 'shop') {
      this?.logger?.info?.('卖家承担运费（包邮）的物料,无需运费,运费为0');

      return postFee;
    }

    const receiverAddressId: string = tradeOrder?.receiverAddressId;

    if (!receiverAddressId) {
      this?.logger?.info?.('订单未设置收货地址,无法计算运费');

      return postFee;
    }

    this?.logger?.info?.('全国运费');

    return postFee;
  }

  public async getOutPurchaseNo(): Promise<string> {
    return (
      moment?.()?.format?.('YYYYMMDDHHmmss') +
      _?.random?.(1000000000000000, 9999999999999999, false)
    );
  }

  public async updateAddress(
    id: string,
    addressId: string
  ): Promise<PurchaseOrder> {
    this?.logger?.info?.('设置订单收货地址');

    const buyerReceiveAddress: BuyerReceiveAddress =
      await this?.buyerReceiveAddressRepository?.findOneById?.(addressId);

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(id);

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

  public async orderCount(shopBuyerId = '', shopId = ''): Promise<void> { }

  public async alipayWapPay(orderId: string): Promise<void> { }

  public async alipayRefund(orderId: string): Promise<void> { }

  public async alipayClose(orderId: string): Promise<void> { }

  public async wxpayUnifiedOrder(orderId: string): Promise<void> {
    this?.logger?.info?.('进行微信支付统一下单的订单预创建');
  }

  public async callParseOrderNotifyResult(xmlData: string): Promise<string> {
    this?.logger?.info?.('订单支付成功异步通知消息');

    // let payAppId = ''

    const outPurchaseNo = '';

    let resultCode = '';

    if (resultCode !== 'SUCCESS' || !(outPurchaseNo)) {
      return this?.orderNotifyWxpayReturnStr;
    }

    this?.orderSuccess(outPurchaseNo, 'wxpay');

    return this?.orderNotifyWxpayReturnStr;
  }

  public async orderSuccess(
    outPurchaseNo: string,
    payType: string
  ): Promise<void> {
    let log = '';

    this?.logger?.info?.('订单支付成功,更新订单状态');

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(
      outPurchaseNo
    );

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== 'NOTPAY') {
      log = '该订单不是未支付的状态,无法进行修改价格的操作';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    tradeOrder.tradeState = 'SUCCESS';

    tradeOrder.payType = payType;

    tradeOrder.payTime = new Date();

    await this?.repository?.save?.(tradeOrder);

    this?.logger?.info?.('如果是付款减库存,则进行物料库存减少操作');

    this?.subStock(outPurchaseNo, 'pay');
  }

  public async subStock(orderId: string, subStockType: string): Promise<void> {
    this?.logger?.info?.('进行物料减库存操作,将订单占用的库存从物料库存中减去');
  }

  public async refund(orderId: string): Promise<void> {
    let log = '';

    this?.logger?.info?.('已支付的订单申请退款');

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== 'SUCCESS') {
      log = '该订单不是已支付状态,无法申请退款';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    tradeOrder.tradeState = 'REFUND';

    await this?.repository?.save?.(tradeOrder);
  }

  public async updateTotalAmount(
    orderId: string,
    newTotalAmount: number
  ): Promise<void> {
    let log = '';

    this?.logger?.info?.('未支付的订单进行修改订单价格操作');

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== 'NOTPAY') {
      log = '该订单不是未支付的状态,无法进行修改价格的操作';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    if (!(newTotalAmount) || newTotalAmount < 0.01) {
      log = '该订单修改后的价格过小';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    tradeOrder.totalAmount = newTotalAmount;

    await this?.repository?.save?.(tradeOrder);
  }

  public async updateShopMemo(orderId: string, memo: string): Promise<void> {
    this?.logger?.info?.('订单进行修改卖家备注操作');

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(
      orderId
    );

    tradeOrder.shopMemo = memo;

    await this?.repository?.save?.(tradeOrder);
  }

  public async updateMessage(orderId: string, message: string): Promise<void> {
    this?.logger?.info?.('订单进行修改买家留言操作');

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(
      orderId
    );

    tradeOrder.message = message;

    await this?.repository?.save?.(tradeOrder);
  }

  public async auditRefund(orderId: string): Promise<void> {
    let log = '';

    this?.logger?.info?.('已支付并申请退款的订单进行退款操作');

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    const payType: string = tradeOrder?.payType;

    if (tradeState !== 'REFUND') {
      log = '该订单不是已支付并申请退款的状态,无法进行退款操作';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    if (payType === 'wxpay') {
      // TODO
    } else if (payType === 'alipay') {
      // TODO
    } else if (payType === 'balance') {
      await this?.refundBalance(orderId);
    }

    tradeOrder.tradeState = 'CLOSED';

    await this?.repository?.save?.(tradeOrder);

    this?.logger?.info?.('进行库存回退操作');

    this?.refundStock?.(orderId);
  }

  public async close(orderId: string): Promise<void> {
    let log = '';

    this?.logger?.info?.(
      '进行未支付订单关闭操作,将订单占用的库存回退到物料库存中'
    );

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    const payType: string = tradeOrder?.payType;

    if (tradeState !== 'NOTPAY') {
      log = '该订单不是未支付的状态,无法进行关闭操作';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    if (payType === 'wxpay') {
      // TODO
    } else if (payType === 'alipay') {
      // TODO
    }

    tradeOrder.tradeState = 'CLOSED';

    await this?.repository?.save?.(tradeOrder);

    this?.logger?.info?.('进行库存回退操作');

    this?.refundStock?.(orderId);
  }

  public async refundStock(orderId: string): Promise<void> {
    this?.logger?.info?.('进行订单库存回退操作,将订单占用的库存回退到物料库存中');

    const orderItems: PurchaseOrderItem[] =
      await this?.purchaseOrderItemRepository?.findBy?.({ orderId: orderId });

    for (const orderItem of orderItems) {

      const material: Material = await this?.materialRepository?.findOneById?.(
        orderItem?.materialId
      );

      const subStock1: string = material?.subStock;

      if (subStock1 !== 'order' && subStock1 !== 'pay') {
        continue;
      }

      const materialSkuId: string = orderItem.materialSkuId;

      if (!materialSkuId) {
        this?.logger?.info?.('单规格物料');

        material.stock = material?.stock + orderItem.quantity;

        await this?.materialRepository?.save?.(material);
      }
    }
  }

  public async callParseRefundNotifyResult(xmlData: string): Promise<string> {
    return this?.orderNotifyWxpayReturnStr;
  }

  public async setDelivery(
    orderId: string,
    deliveryCompany: string,
    deliveryTrackNo: string,
    needDelivery: string,
    isOthers: string
  ): Promise<void> { }

  public async payBalance(id: string): Promise<void> {
    let log = '';

    this?.logger?.info?.('订单进行买家余额支付');

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(id);

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== 'NOTPAY') {
      log = '订单不是未支付状态,支付失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    const shopBuyer: ShopBuyer = await this?.shopBuyerRepository?.findOneBy?.({
      id: tradeOrder.shopBuyerId,
    });

    const balance: number = shopBuyer.balance;

    if (!(balance) || balance < 0.01) {
      log = '买家余额不足,支付失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    const totalAmount: number = tradeOrder?.totalAmount;

    if (balance < totalAmount) {
      log = '买家余额不足,支付失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    shopBuyer.balance = _?.subtract?.(balance, totalAmount);

    await this?.shopBuyerRepository?.save?.(shopBuyer);
  }

  public async refundBalance(id: string): Promise<void> {
    this?.logger?.info?.('订单进行买家余额退款');

    const tradeOrder = await this?.repository?.findOneById?.(id);

    const payType: string = tradeOrder?.payType;

    if (payType !== 'balance') {
      return;
    }

    const shopBuyer: ShopBuyer = await this?.shopBuyerRepository?.findOneBy?.({
      id: tradeOrder.shopBuyerId,
    });

    shopBuyer.balance = shopBuyer.balance + tradeOrder.totalAmount;

    await this?.shopBuyerRepository?.save?.(shopBuyer);
  }

  public async bonusToAmount(bonus: number, rate: number): Promise<number> {
    let log = '';

    this?.logger?.info?.('积分转换成金额(元)');

    if (!bonus) {
      log = '积分过小，转换失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    return _?.multiply?.(bonus, rate);
  }

  public async send(orderId: string, deliveryList: any[]): Promise<void> {
    // 标识符名称来自微信小商店

    this?.logger?.info?.('订单发货');

    this?.logger?.info?.(
      '发货方式由用户在下单时选择，发货时已经默认了发货方式，因此发货时无需传入发货方式参数。拆单发货时，如果订单中含有多件同样的物料(相同的product_id和相同的sku_id)，这些物料必须在同一个包裹里一起发出。已经完成售后的物料不能进行发货'
    );

    let log = '';

    const tradeOrder: PurchaseOrder = await this?.repository?.findOneById?.(
      orderId
    );

    const tradeState: string = tradeOrder?.tradeState;

    if (tradeState !== 'SUCCESS') {
      log = '该订单不是已支付的状态,无法进行发货操作';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    if (deliveryList) {
      for (const deliveryListElement of deliveryList) {

        let deliveryListObj: DeliveryList = new DeliveryList();

        deliveryListObj = _?.assign?.(deliveryListObj, deliveryListElement);

        await this?.deliveryListRepository?.save?.(deliveryListObj);
      }
    }

    tradeOrder.tradeState = 'DELIVERY';

    await this?.repository?.save?.(tradeOrder);
  }

  public async purchaseInstock(data: any): Promise<void> {

    for (const item of data?.item) {

      if (!item.exp) {

        continue

      }

      const one: PurchaseOrderItem = await this?.purchaseOrderItemRepository.findOneById?.(item?.id)

      one.exp = item.exp

      await this?.purchaseOrderItemRepository.save(one)

    }

    const id = data?.id

    // 首先更新采购明细单中各个商品的失效期

    // 读取采购单明细列表

    const orderItems: PurchaseOrderItem[] =
      await this?.purchaseOrderItemRepository.findBy?.({ orderId: id });

    // 取出对应的物流信息

    for (const item of orderItems) {

      const materialId: string = item?.materialId;

      const quantity: number = item?.quantity;

      const exp: any = item?.exp;

      // 根据物料ID和有效期，查询此物料对应的库存信息

      let stock: Stock = await this?.stockRepository?.findOneBy?.({
        materialId: materialId,
        exp: exp,
      });

      // 按照库存中有效期信息，来更新库存信息

      // 如果库存已存在

      if (stock) {
        stock.quantity = stock?.quantity + quantity;
      } else {

        stock = new Stock();

        stock = {
          ...stock,
          ...item,
        };

      }

      await this?.stockRepository?.save?.(stock);
    }

    const obj: PurchaseOrder = await this?.repository?.findOneById?.(id);

    obj.tradeState = 'stock';

    await this?.repository?.save?.(obj);
  }
}
