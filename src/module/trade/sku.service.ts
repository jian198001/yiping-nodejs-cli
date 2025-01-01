import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { SkuKey } from '../../entity/SkuKey';

import { ILogger } from '@midwayjs/logger';
import { SkuList } from '../../entity/SkuList';

import { Zero0Error } from '../common/model/Zero0Error';

import _ = require('lodash');


import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';


@Provide()
export class SkuService extends BaseService { // 商品规格服务
  @Logger()
  private logger: ILogger = null

// 查询的数据库表名称
  private static TABLE_NAME = 'sku_key';

// 查询的数据库表名称及别名
  private fromSql = ` FROM ${SkuService?.TABLE_NAME} t `;
 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `

  @InjectEntityModel(SkuKey)
  private repository: Repository<SkuKey> = null;

  @InjectEntityModel(SkuList)
  private skuListRepository: Repository<SkuList> = null;

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

  public async update(obj: SkuKey): Promise<SkuKey> {
    // 一个表进行操作 typeORM

    let log = '';

   // 字段非重复性验证
   const uniqueText = await super.unique?.(SkuService?.TABLE_NAME, null, obj?.id);

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
        await super.sortOrder?.(obj?.id, null, null, SkuService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
      }
      return null
    }

    let old: SkuKey = await this?.repository?.findOneById?.(obj?.id) // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj) // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, SkuService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
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

  public async json2CnStr(jsonStr: string): Promise<string> {
    jsonStr = _?.replace?.(jsonStr, '[', '');

    jsonStr = _?.replace?.(jsonStr, ']', '');

    jsonStr = _?.replace?.(jsonStr, '{', '');

    jsonStr = _?.replace?.(jsonStr, '}', '');

    jsonStr = _?.replace?.(jsonStr, '"', '');

    return jsonStr;
  }

  public async changeSkuList(jsonArray: any[]): Promise<any[]> {
    // 提取出购买信息中的SKU规格信息

    return null
  }

  public async selectById(id: string): Promise<void> {}

  public async getValidSkuList(
    goodsId: string,
    skuPriceUnit: number,
    shopBuyerId = ''
  ): Promise<void> {
    // 取得商品规格的有效价格库存信息（库存需大于0）
  }

  public async getInitialSku(
    jsonArray: any[],
    goodsId: string,
    shopBuyerId = ''
  ): Promise<void> {
    // 取得此买家针对于此商品的默认SKU规格价格库存信息,如此买家购物车中没有此商品信息,则使用此商品的默认SKU规格价格库存信息,如购物车中有,则使用购物车中最新购买的信息
  }

  public async updateGoodsInitialSku(
    goodsId: string,
    initialSkuListMap: any
  ): Promise<void> {
    // 更新商品规格的有效价格库存信息（库存需大于0）中的默认选中的库存
  }

  public async getSkuList(
    goodsId: string,
    skuPriceUnit: number,
    isUpdate: boolean
  ): Promise<void> {
    // 取得商品规格的价格库存信息
  }

  public async updateSkuList(
    skuList: any,
    priceMul: number,
    isUpdate: boolean
  ): Promise<void> {}

  public async getSkuTree(goodsId: string): Promise<void> {
    // 取得商品对应的规格名及规格值信息
  }

  public async saveSku(map: any, skuStep: string): Promise<void> {
    // skuStep(操作步骤)取值集合:save,update,once.save代表新增SKU规格名规格值。update代表数据在修改SKU信息页面提交,但是没有做新增或删除规格名规格值的操作。once代表数据在修改SKU信息页面提交,并且做了新增或删除规格名规格值的操作
  }

  public async saveSkuList(skuList: string): Promise<void> {
    // 编辑商品规格的价格库存信息
  }

  public async getSkuListCn(
    skuListId: string,
    goodsId: string,
    skuList: string
  ): Promise<any> {
    if (!(skuListId) || !(skuList)) {
      return {};
    }
  }

  public async subStock(id: string, subStock: number): Promise<void> {
    const skuList = await this?.skuListRepository?.findOneById?.(id);

    skuList.stockNum = _?.subtract?.(skuList.stockNum, subStock);

    await this?.skuListRepository?.save?.(skuList);
  }

  public async refundStock(id: string, subStock: number): Promise<void> {
    const skuList = await this?.skuListRepository?.findOneById?.(id);

    skuList.stockNum = _?.add(skuList.stockNum, subStock);

    await this?.skuListRepository?.save?.(skuList);
  }
}