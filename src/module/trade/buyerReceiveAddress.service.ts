import { Inject, Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { BuyerReceiveAddress } from '../../entity/BuyerReceiveAddress';

import { ILogger } from '@midwayjs/logger';
import { Shop } from '../../entity/Shop';

import { Zero0Error } from '../common/model/Zero0Error';

import _ = require('lodash');


import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';

import { ShopBuyerService } from './shopBuyer.service';

@Provide()
export class BuyerReceiveAddressService extends BaseService { // 买家收货地址服务

  @Logger()
  private logger: ILogger = null

  // 查询的数据库表名称
  private static TABLE_NAME = 'buyer_receive_address';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${BuyerReceiveAddressService?.TABLE_NAME} t `;
 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `

  @InjectEntityModel(BuyerReceiveAddress)
  private repository: Repository<BuyerReceiveAddress> = null;

  @InjectEntityModel(Shop)
  private shopRepository: Repository<Shop> = null;

  @Inject()
  private shopBuyerService: ShopBuyerService = null;

  public async page(
    shopBuyerId = '',
    query: string, params: string, reqParam: ReqParam, 
    page: Page, 
  ): Promise<any> {
    let whereSql = ' ' // 查询条件字符串

    whereSql += sqlUtils?.like?.(['name'], reqParam?.searchValue, ) // 处理前端的搜索字符串的搜索需求
// sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize', ])) + sqlUtils?.query?.(query)  // 处理前端的表格中筛选需求

    const shopBuyer: any = await this?.shopBuyerService.getById?.(shopBuyerId);

    whereSql += ` AND t.buyer_id = '${shopBuyer.buyerId}' `;
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
    await this?.repository?.delete?.(idsArr, )
  }

  public async update(
    obj: BuyerReceiveAddress,
    shopBuyerId: string
  ): Promise<BuyerReceiveAddress> {
    // 一个表进行操作 typeORM

    const shopBuyer: any = await this?.shopBuyerService.getById?.(shopBuyerId);

    obj.buyerId = shopBuyer.buyerId;

    let log = '';

   // 字段非重复性验证
   const uniqueText = await super.unique?.(
      BuyerReceiveAddressService?.TABLE_NAME,
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
    }

    this?.logger?.info?.('首先判断此地址是否已存在');

    this?.logger?.info?.('此买家没有设置任何地址信息,此地址将保存为默认地址');

    // 通过buyerId取得buyerId

    const buyerId = '';

    const number: number = await this?.repository?.countBy({
      buyerId: buyerId,
    });

    if (number < 1) {
      obj.defaultStatus = 1;

      this?.repository?.save?.(obj);

      return;
    }

    if (obj.defaultStatus === 0) {
      this?.logger?.info?.('此地址不是默认地址');

      this?.repository?.save?.(obj);

      return;
    }

    this?.logger?.info?.('此地址是默认地址');

    // 将此会员的所有其它地址都设置为非默认地址，然后再将此地址设置为默认地址
    const sql = ` UPDATE buyer_receive_address SET default_status = '0' WHERE buyer_id = '${buyerId}' `;

    await this?.query?.(sql);

    await this?.repository?.save?.(obj);
  }

  public async getDefalut(
    buyerId: string,
    shopId = ''
  ): Promise<BuyerReceiveAddress> {
    this?.logger?.info?.(
      '确定此店铺的物流范围是全国还是本地,如果运营区域是全国，则寻找全部的地址中的默认地址，否则寻找本地区域内的地址'
    );

    const shop: Shop = await this?.shopRepository?.findOneById?.(shopId); // 店铺信息

    const deliveryArea: string = shop.deliveryArea; // 本店铺对应的运营区域TODO

    let sql = ` SELECT t.* FROM buyer_receive_address t WHERE t.buyer_id = '${buyerId}' `;

    if ((shop) && deliveryArea !== 'global') {
      this?.logger?.info?.('此店铺的物流范围是本地');

      sql =
        sql +
        ` AND t.province = '${shop.province}' AND t.city = '${shop.city}' `;

      if (shop.region) {
        sql += ` AND t.region = '${shop.region}' `;
      }
    }

    const order = ' ORDER BY t.default_status DESC, order_num DESC ';

    const sqlAddress: string = sql + order;

    const addressList: any[] = await this?.query?.(sqlAddress);

    if (addressList) {
      return _?.head?.(addressList);
    }

    return null
  }
}
