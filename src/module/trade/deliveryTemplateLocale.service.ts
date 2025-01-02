import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { DeliveryTemplateLocale } from '../../entity/DeliveryTemplateLocale';

import { ILogger } from '@midwayjs/logger';

import { Zero0Error } from '../common/model/Zero0Error';

import _ = require('lodash');


import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';


@Provide()
export class DeliveryTemplateLocaleService extends BaseService { // 本地物流模版服务
  
  @Logger()
  private logger: ILogger = null

// 查询的数据库表名称
  private static TABLE_NAME = 'delivery_template_locale';

// 查询的数据库表名称及别名
  private fromSql = ` FROM ${DeliveryTemplateLocaleService?.TABLE_NAME} t `;
 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `

  @InjectEntityModel(DeliveryTemplateLocale)
  private repository: Repository<DeliveryTemplateLocale> = null;

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

  public async del(ids: string[]): Promise<void> {
    await this?.repository?.delete?.(ids, )
  }

  public async update(
    obj: DeliveryTemplateLocale
  ): Promise<DeliveryTemplateLocale> {
    // 一个表进行操作 typeORM

    let log = '';

   // 字段非重复性验证
   const uniqueText = await super.unique?.(
      DeliveryTemplateLocaleService?.TABLE_NAME,
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
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          DeliveryTemplateLocaleService?.TABLE_NAME
        ) // 新增数据时，设置此条数据的orderNum排序值
      }
      return null
    }

    let old: DeliveryTemplateLocale = await this?.repository?.findOneById?.(
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
          DeliveryTemplateLocaleService?.TABLE_NAME
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
    this?.logger?.info?.('计算订单运费金额');

    let totalAmount = 0.0;

    if (!list) {
      return totalAmount;
    }

    let templateSame = true; // 所有订单的运费模板是否相同

    let valuationSame = true; // 所有订单的运费计价方式是否相同

    const firstMap: any = _?.head?.(list); // 集合中的第一个订单,其它订单要与此订单进行比较

    let totalQuantity = 0; // 所有订单的商品总件数

    let totalVolume = 0; // 所有订单的商品总体积

    let totalMass = 0; // 所有订单的商品总质量

    let valuationFirst: string = firstMap.valuation; // 第一个订单的运费计价方式

    let startStandardsFirst: number = firstMap.startStandards; // 第一个订单的首费标准

    let startFeesFirst: number = firstMap.startFees; // 第一个订单的首费价格

    let addStandardsFirst: number = firstMap.addStandards; // 第一个订单的续费标准

    let addFeesFirst: number = firstMap.addFees; // 第一个订单的续费价格

    const freightPayerFirst: string = firstMap.freightPayer;

    if (freightPayerFirst !== 'buyer') {
      startStandardsFirst = 0;

      firstMap.startStandardsFirst = startStandardsFirst;

      startFeesFirst = 0;

      firstMap.startFeesFirst = startFeesFirst;

      addStandardsFirst = 0;

      firstMap.addStandardsFirst = addStandardsFirst;

      addFeesFirst = 0;

      firstMap.addFeesFirst = addFeesFirst;
    }

    if (!valuationFirst) {
      valuationFirst = 'quantity';
    }

    if (!startStandardsFirst) {
      startStandardsFirst = 0;
    }

    if (!startFeesFirst) {
      startFeesFirst = 0;
    }

    if (!addStandardsFirst) {
      addStandardsFirst = 0;
    }

    if (!addStandardsFirst) {
      addStandardsFirst = 0;
    }

    let maxStartFees: number = startFeesFirst; // 所有订单中最大的那个首费价格

    let maxStartFeesMap: any = firstMap; // 所有订单中拥有最大首费价格的那个订单

    for (const  listElement of  list )  {

      const valuation: string = listElement.valuation;

      const quantity: number = listElement.quantity;

      const volume: number = listElement.volume;

      const mass: number = listElement.mass;

      const freightPayer: string = listElement.freightPayer;

      if (quantity) {
        totalQuantity = _?.add(totalQuantity, quantity);
      }

      if (volume) {
        totalVolume = _?.add(totalVolume, volume);
      }

      if (mass) {
        totalMass = _?.add(totalMass, mass);
      }

      if (valuationFirst === valuation) {
        valuationSame = false;

        templateSame = false;
      }

      let startStandards: number = listElement.startStandards;

      let startFees: number = listElement.startFees;

      let addStandards: number = listElement.addStandards;

      let addFees: number = listElement.addFees;

      if (freightPayer !== 'buyer') {
        startStandards = 0;

        listElement.startStandards = startStandards;

        startFees = 0;

        listElement.startFees = startFees;

        addStandards = 0;

        listElement.addStandards = addStandards;

        addFees = 0;

        listElement.addFees = addFees;
      }

      this?.logger?.info?.(
        '如果此子订单不是最大首费的订单,则很可能完全按照续费价格进行整体计费,这里计算按续费价格整体计费的(元)'
      );

      let totalAmountOrderItem = 0;

      if (!startStandards) {
        startStandards = 0;
      }

      if (!startFees) {
        startFees = 0;
      }

      if (!addStandards) {
        addStandards = 0;
      }

      if (startFees > maxStartFees) {
        maxStartFees = startFees;

        maxStartFeesMap = listElement;

        listElement.maxStartFeesMap = true;

        if (valuation === 'mass') {
          totalAmountOrderItem = _?.multiply?.(
            _?.subtract?.(mass, startStandards),
            addFees
          );
        } else if (valuation === 'volume') {
          totalAmountOrderItem = _?.multiply?.(
            _?.subtract?.(volume, startStandards),
            addFees
          );
        } else {
          totalAmountOrderItem = _?.multiply?.(
            _?.subtract?.(quantity, startStandards),
            addFees
          );
        }
      } else {
        listElement.maxStartFeesMap = false;

        if (valuation === 'mass') {
          totalAmountOrderItem = _?.multiply?.(
            _?.divide?.(mass, startStandards),
            addFees
          );
        } else if (valuation === 'volume') {
          totalAmountOrderItem = _?.multiply?.(
            _?.divide?.(volume, startStandards),
            addFees
          );
        } else {
          totalAmountOrderItem = _?.multiply?.(
            _?.divide?.(quantity, startStandards),
            addFees
          );
        }
      }

      listElement.totalAmountOrderItem = totalAmountOrderItem;

      if (
        startStandards !== startStandardsFirst ||
        startFees !== startFeesFirst ||
        addStandards !== addStandardsFirst ||
        addFees !== addFeesFirst
      ) {
        templateSame = false;
      }
    }

    totalAmount = _?.add(totalAmount, maxStartFees);

    this?.logger?.info?.('所有订单中最大的那个首费价格:' + totalAmount);

    this?.logger?.info?.(
      '代表订单中所有子订单对应的商品的运费计价方式和价格完全相同'
    );

    this?.logger?.info?.(
      '当我同时购买2件商品A和2件商品B,因为这两款商品都使用同一个运费模板,则只使用其中一款商品的首件运费,其余商品直接按照续件的运费进行计算,即购买2件商品A和2件商品B时'
    );

    if (templateSame && valuationSame) {
      this?.logger?.info?.(
        '订单中所有子订单对应的商品的运费计价方式和价格完全相同'
      );

      if (valuationFirst === 'mass') {
        const otherMass: number = _?.subtract?.(
          totalMass,
          maxStartFeesMap.startStandards
        );

        if (otherMass < 0.01) {
          return totalAmount;
        }

        totalAmount = _?.add(totalAmount, _?.multiply?.(otherMass, addFeesFirst));

        return totalAmount;
      }

      if (valuationFirst === 'volume') {
        const otherVolume: number = _?.subtract?.(
          totalVolume,
          maxStartFeesMap.startStandards
        );

        if (otherVolume < 0.01) {
          return totalAmount;
        }

        totalAmount = _?.add(
          totalAmount,
          _?.multiply?.(otherVolume, addFeesFirst)
        );

        return totalAmount;
      }

      const otherQuantity: number = _?.subtract?.(
        totalQuantity,
        maxStartFeesMap.startStandards
      );

      if (otherQuantity < 0.01) {
        return totalAmount;
      }

      totalAmount = _?.add(
        totalAmount,
        _?.multiply?.(otherQuantity, addFeesFirst)
      );

      return totalAmount;
    }

    this?.logger?.info?.(
      '当我同时购买2件商品A和2件商品C,这两款商品都是按照件数计算运费,但使用的是不同的运费模板,则会比较这两款商品中首件的运费,选择首件运费最大的费用作为首件费用（商品C首件运费20元）,然后忽略商品A的首件运费,商品A全部按照该商品的续件费用进行计算运费'
    );

    this?.logger?.info?.(
      '当我同时购买2件商品A和2kg商品D,商品A按照件数计算运费,商品D按照重量计算运费,则会比较这两款商品中首件（首公斤）的运费,选择首件（首公斤）运费最大的费用作为首件（首公斤）费用（商品D首公斤运费12元）,然后忽略商品A的首件运费,商品A全部按照该商品的续件费用进行计算运费'
    );

    this?.logger?.info?.(
      '订单中所有子订单对应的商品的运费计价方式相同,但是价格不同.或者,订单中所有子订单对应的商品的运费计价方式不同'
    );

    for (const any of list )  {

      totalAmount = _?.add(totalAmount, any.totalAmountOrderItem);
    }

    return totalAmount;
  }
}
