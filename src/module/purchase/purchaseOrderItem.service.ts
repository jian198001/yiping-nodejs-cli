import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';

import { ILogger } from '@midwayjs/logger';
import { PurchaseOrderItem } from '../../entity/PurchaseOrderItem';
import { Zero0Error } from '../common/model/Zero0Error';

import _ = require('lodash');

import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';

const moment = require('moment');

@Provide()
export class PurchaseOrderItemService extends BaseService {

  @Logger()
  private logger: ILogger = null

  // 查询的数据库表名称
  private static TABLE_NAME = 'purchase_order_item';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${PurchaseOrderItemService?.TABLE_NAME} t `;
 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql} 
  , ( SELECT name AS material_name FROM material WHERE t.material_id = material.id ) AS material_name 
  , ( SELECT sku AS material_sku FROM material WHERE t.material_id = material.id ) AS material_sku 

     `;

  @InjectEntityModel(PurchaseOrderItem)
  private repository: Repository<PurchaseOrderItem> = null;

  public async page(
    orderId = '',
    query = '', params: string, reqParam: ReqParam,
    page: Page,
  ): Promise<any> {
    let whereSql = ' ' // 查询条件字符串

    whereSql += sqlUtils?.like?.(['name'], reqParam?.searchValue,) // 处理前端的搜索字符串的搜索需求

    if (orderId) {
      whereSql += ` AND t.order_id = '${orderId}' `;
    }
// sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize', ])) + sqlUtils?.query?.(query)  // 处理前端的表格中筛选需求

    console.log(whereSql);
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

  public async del(ids: string[]): Promise<void> {
    // 根据id数组删除多条数据
    await this?.repository?.delete?.(ids,)
  }

  public async update(obj: PurchaseOrderItem): Promise<PurchaseOrderItem> {
    // 一个表进行操作 typeORM

    let log = '';

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      PurchaseOrderItemService?.TABLE_NAME,
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
          PurchaseOrderItemService?.TABLE_NAME
        ) // 新增数据时，设置此条数据的orderNum排序值
      }
      return null
    }

    let old: PurchaseOrderItem = await this?.repository?.findOneById?.(obj?.id) // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj) // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          PurchaseOrderItemService?.TABLE_NAME
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

  public async getOutPurchaseNo(): Promise<string> {
    return (
      moment().format?.('YYYYMMDDHHmmss') +
      _?.random?.(1000000000000000, 9999999999999999, false)
    );
  }

  public async orderCount(shopBuyerId = '', shopId = ''): Promise<void> { }

  public async alipayWapPay(orderId: string): Promise<void> { }

  public async alipayRefund(orderId: string): Promise<void> { }

  public async alipayClose(orderId: string): Promise<void> { }

  public async wxpayUnifiedOrder(orderId: string): Promise<void> {
    this?.logger?.info?.('进行微信支付统一下单的订单预创建');
  }

  public async subStock(orderId: string, subStockType: string): Promise<void> {
    this?.logger?.info?.('进行物料减库存操作,将订单占用的库存从物料库存中减去');
  }

  public async setDelivery(
    orderId: string,
    deliveryCompany: string,
    deliveryTrackNo: string,
    needDelivery: string,
    isOthers: string
  ): Promise<void> { }

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
}