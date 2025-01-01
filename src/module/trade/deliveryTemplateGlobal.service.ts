import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { DeliveryTemplateGlobal } from '../../entity/DeliveryTemplateGlobal';

import { ILogger } from '@midwayjs/logger';

import { Zero0Error } from '../common/model/Zero0Error';

import _ = require('lodash');


import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';


@Provide()
export class DeliveryTemplateGlobalService extends BaseService { // 全域物流模版服务
  
  @Logger()
  private logger: ILogger = null

// 查询的数据库表名称
  private static TABLE_NAME = 'delivery_template_global';

// 查询的数据库表名称及别名
  private fromSql = ` FROM ${DeliveryTemplateGlobalService?.TABLE_NAME} t `;

// 查询结果集要返回的列名称，其中label和value是给select组件的option使用 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` SELECT t.*
        , ( CASE valuation WHEN 'mass' THEN '按重量' WHEN 'volume' THEN '按体积' ELSE '按件数' END ) AS valuation_cn
        , ( SELECT COUNT(*) FROM goods WHERE t.id = goods?.delivery_template_global_id ) AS goods_count
        , ( t.name ) AS text
        , ( t.id ) AS value
     `;

  @InjectEntityModel(DeliveryTemplateGlobal)
  private repository: Repository<DeliveryTemplateGlobal> = null;

  public async page(
    query = '', params: string, reqParam: ReqParam, 
    page: Page, 
  ): Promise<any> {
    // 分页列表查询数据

    let whereSql = ' ' // 查询条件字符串

    
      let parameters: any[] = []

      if (params && params.length > 3) {
      
        parameters = JSON?.parse?.(params)

      }

      whereSql += sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(parameters, ['current', 'pageSize',])) + sqlUtils?.like?.(['name'], reqParam?.searchValue, ) + sqlUtils?.whereOrFilters?.(reqParam?.filters) +  sqlUtils?.query?.(query)   // 处理前端的表格中筛选需求
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
    obj: DeliveryTemplateGlobal
  ): Promise<DeliveryTemplateGlobal> {
    // 一个表进行操作 typeORM

    let log = '';

   // 字段非重复性验证
   const uniqueText = await super.unique?.(
      DeliveryTemplateGlobalService?.TABLE_NAME,
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
          DeliveryTemplateGlobalService?.TABLE_NAME
        ) // 新增数据时，设置此条数据的orderNum排序值
      }
      return null
    }

    let old: DeliveryTemplateGlobal = await this?.repository?.findOneById?.(
      obj?.id
    ); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj) // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          DeliveryTemplateGlobalService?.TABLE_NAME
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

  public async getDeliveryTotalAmount(list: any[]): Promise<number> {
    return 0.0;
  }

  public async getDeliveryTemplateGlobalList(
    province: string,
    shopId = '',
    list: any[]
  ): Promise<any[]> {
    const arr: any[] = [];

    for (let orderItemMap of list )  {

      const goodsId: string = orderItemMap.goodsId;

      console?.log(goodsId);

      const whereSql =
        " t.shop_id = '#{shopId}' AND t.id IN ( SELECT delivery_template_global_id FROM goods WHERE delivery_template_global_id IS NOT NULL AND goods.id = '#{goodsId}' AND goods.delivery = 'delivery' AND goods.freight_payer = 'buyer' ) AND ( t.area_names LIKE '%#{province}%' OR t.default_status = '1' ) ";

      const deliveryTemplateGlobalList: any[] = await this?.arrBase?.(
        null,
        this?.selectSql,
        this?.fromSql,
        whereSql
      );

      if (!deliveryTemplateGlobalList) {
        continue;
      }

      const defaultMap: any = _?.last(deliveryTemplateGlobalList);

      const valuation = defaultMap.valuation;

      let map: any = {};

      map = _?.head?.(deliveryTemplateGlobalList);

      map.valuation = valuation;

      orderItemMap = _?.assign?.(orderItemMap, map);

      arr?.push?.(orderItemMap);
    }

    return arr;
  }

  public async insertArea(
    id: string,
    areaName: string,
    areaId: string
  ): Promise<void> {}
}