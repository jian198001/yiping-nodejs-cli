import { Inject, Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { CartItem } from '../../entity/CartItem';
import { ILogger } from '@midwayjs/logger';
import { Goods } from '../../entity/Goods';
import { GoodsService } from './goods.service';
import { Zero0Error } from '../common/model/Zero0Error';
import { GoodsMessageService } from './goodsMessage.service';

import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';

import _ = require('lodash')

@Provide()
export class CartItemService extends BaseService { // 购物车服务

  @Logger()
  private logger: ILogger = null

  public static TABLE_NAME = 'cart_item';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${CartItemService?.TABLE_NAME} t `;
 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  

    , ( SELECT name FROM goods WHERE t.goods_id = goods.id ) AS goods_name

    , ( SELECT price FROM goods WHERE t.goods_id = goods.id ) AS price

     `;

  @InjectEntityModel(CartItem)
  private repository: Repository<CartItem> = null;

  @Inject()
  private goodsService: GoodsService = null;

  @Inject()
  private goodsMessageService: GoodsMessageService = null;

  public async page(
    shopId = '',
    shopBuyerId,
    query: string, params: string,
    reqParam: ReqParam, 
    page: Page, 
  ): Promise<any> {
    let whereSql = ' ' // 查询条件字符串

    if (shopId) {
      whereSql += ` AND t.shop_id = '${shopId}' `;
    }

    whereSql += ` AND t.shop_buyer_id = '${shopBuyerId}' `;

    whereSql += sqlUtils?.like?.(['name'], reqParam?.searchValue, ) // 处理前端的搜索字符串的搜索需求
// sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize', ])) + sqlUtils?.query?.(query)  // 处理前端的表格中筛选需求

    console.log(whereSql);

    const pageBase = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    );

    console.log('test');

    console.log(pageBase);

    return pageBase;
  }

  /**
   * count

   */
  public async count(shopId = '', shopBuyerId: string ): Promise<number> {
    let whereSql = ' ' // 查询条件字符串

    if (shopId) {
      whereSql += ` AND t.shop_id = '${shopId}' `;
    }

    whereSql += ` AND t.shop_buyer_id = '${shopBuyerId}' `;

    const sqlCount: string = sqlUtils?.selectCount?.(this?.fromSql, whereSql); // 总条数

    const resultCount: any = await this?.query?.(sqlCount);

    const head: any = _?.head(resultCount)

    return head.count_0;
  }

  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql)
  }

  public async del(idsArr: string[]): Promise<void> {
    await this?.repository?.delete?.(idsArr);
  }

  public async update(obj: CartItem): Promise<CartItem> {
    // 一个表进行操作 typeORM

    let log = '';

   // 字段非重复性验证
   const uniqueText = await super.unique?.(
      CartItemService?.TABLE_NAME,
      null,
      obj?.id
    );

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
        await super.sortOrder?.(obj?.id, null, null, CartItemService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
      }
      return null
    }

    let old: CartItem = await this?.repository?.findOneById?.(obj?.id) // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj) // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, CartItemService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
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

  public async save(
    map: any,
    shopBuyerId,
    priceUnit: number
  ): Promise<void> {
    let log = '';

    const priceMul: number = _?.multiply?.(1, priceUnit);

    const data: any = map?.data;

    const goodsId: string = data?.goodsId;

    const quantity: number = data?.selectedNum;

    const selectedSkuComb: any = data?.selectedSkuComb;

    const goods: Goods = null;

    const quota: number = goods?.quota;

    const startSaleNum: number = goods?.startSaleNum;

    let price: number = 0;

    const goodsSkuId = '';

    const propertyPrice = 0.0;

    const list = '';

    const skuListNew: any[] = [];

    if ((quota) && quantity > quota) {
      log = '购买数量大于限购数,购买失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    if ((startSaleNum) && quantity < startSaleNum) {
      log = '购买数量小于起售数量,购买失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    if (selectedSkuComb) {
      price = selectedSkuComb?.price;

      price = _?.multiply?.(price, priceMul);

      // let goodsSkuId: string = selectedSkuComb?.id;

      // let propertyPrice: number = selectedSkuComb?.property_price;

      let properties: any[] = selectedSkuComb?.properties;

      properties = await this?.propertiesPriceMul(properties, priceUnit);

      const propertiesPriceSum: number = await this?.propertiesSum(properties);

      price = _?.add(price, propertiesPriceSum);

      // let list: string = selectedSkuComb?.list;

      // let skuListCn: string = await this?.skuService?.getSkuListCn(list, null, null, );

      // let skuListNew: any[] = JSON?.parse?.(list);
    }

    this?.logger?.info?.(
      '查询此买家已有的购物车信息,将相同商品取出,进行SKU规格比较,看是否相同,如果相同,则重新计算数量和单价,如果不同,则新增购物车信息'
    );

    const cartItems: CartItem[] = await this?.repository?.findBy?.({
      goodsId: goodsId,
      shopBuyerId: shopBuyerId,
    });

    if (!cartItems) {
      this?.logger?.info?.('此买家购物车中不存在相同商品');

      const cartItem: CartItem = new CartItem();

      cartItem.goodsId = goodsId;

      cartItem.shopBuyerId = shopBuyerId;

      cartItem.quantity = quantity;

      cartItem.shopId = goods?.shopId;

      cartItem.goodsName = goods?.name;

      this?.repository?.save?.(cartItem);

      return;
    }

    if (!(goodsSkuId) || !(list) || !(skuListNew)) {
      this?.logger?.info?.(
        '此买家购买的是单规格商品,并且此商品在购物车中已购买过,则更新数量及单价信息'
      );

      const cartItem1: CartItem = _?.head?.(cartItems);

      const quantity1: number = cartItem1.quantity;

      // let price1: number = cartItem1.price;

      let propertyPriceExist = 0.0;

      if (cartItem1.propertyPrice) {
        propertyPriceExist = cartItem1.propertyPrice;
      }

      const messages1: string = cartItem1.messages;

      const cartMessages1: string = cartItem1.cartMessages;

      const priceNew = 0.0;

      cartItem1.price = priceNew;

      cartItem1.quantity = _?.add(quantity, quantity1);

      cartItem1.propertyPrice = _?.add(propertyPriceExist, propertyPrice);

      cartItem1.messages = await this?.goodsMessageService?.insertMessages(
        messages1,
        null
      );

      cartItem1.cartMessages = await this?.goodsMessageService?.insertMessages(
        cartMessages1,
        null
      );

      this?.repository?.save?.(cartItem1);
    }
  }

  public async propertiesSum(list: any[]): Promise<number> {
    let sum = 0.0;

    if (!list) {
      return sum;
    }

    for (const property of list) {

      const v: any[] = property.v;

      if (!v) {
        continue;
      }

      for (const vElement of v) {

        const price: number = vElement.price;

        sum = _?.add(sum, price);
      }
    }

    return sum;
  }

  public async propertiesPriceMul(
    list: any[],
    priceUnit: number
  ): Promise<any[]> {
    if (!list) {
      return null
    }

    for (const property of list) {

      const v: any[] = property.v;

      if (!v) {
        continue;
      }

      for (const vElement of v) {

        let price: number = vElement.price;

        price = _?.multiply?.(price, priceUnit);

        vElement.price = price;
      }
    }

    return list;
  }

  public async add(cartItem: CartItem): Promise<CartItem> { 

    this?.logger?.info?.(
      '根据会员id,商品id和规格获取购物车中商品,查看此商品在购物车中是否存在'
    );

    const existCartItem: CartItem = await this?.getCartItem(cartItem);

    if (!existCartItem) {
      this?.logger?.info?.('此商品在购物车中不存在');

      this?.repository?.save?.(cartItem);

      return null
    }

    this?.logger?.info?.('此商品在购物车中已存在');

    existCartItem.quantity =
      parseInt?.(existCartItem.quantity + '') + parseInt?.(cartItem.quantity + '');

    this?.repository?.save?.(existCartItem);

    return existCartItem;
  }

  public async getCartItem(cartItem: CartItem): Promise<CartItem> {
    this?.logger?.info?.('根据会员id,商品id和规格获取购物车中商品');

    const where: any = {
      shopId: cartItem.shopId,
      shopBuyerId: cartItem.shopBuyerId,
      goodsId: cartItem.goodsId,
    };
 
    if (cartItem.goodsSkuId) {
      where.goodsSkuId = cartItem?.goodsSkuId;
    }

    const cartItems = await this?.repository?.findBy?.(where);

    if (!cartItems) {
      this?.logger?.info?.('此商品在购物车中不存在');

      return null
    }

    this?.logger?.info?.('此商品在购物车中已存在');

    return _?.head?.(cartItems);
  }

  public async updateQuantity(id: string, quantity: number): Promise<void> {
    let cartItem: CartItem = null;

    if (quantity < 1) {
      await this?.repository?.delete?.({ id: id })

      return;
    }

    cartItem = await this?.repository?.findOneById?.(id);

    this?.goodsService?.countStock(
      cartItem.goodsId,
      cartItem.goodsSkuId,
      cartItem.skuList,
      quantity
    );

    cartItem.quantity = quantity;

    await this?.repository?.save?.(cartItem);
  }

  public async clear(shopId = '', shopBuyerId: string ): Promise<CartItem> {
    const cartItem: CartItem = new CartItem();

    cartItem.shopId = shopId;

    cartItem.shopBuyerId = shopBuyerId;

    await this?.repository?.remove(cartItem);

    return cartItem;
  }
}