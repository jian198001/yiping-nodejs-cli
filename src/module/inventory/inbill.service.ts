import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Inbill } from '../../entity/Inbill';
import { Zero0Error } from '../common/model/Zero0Error';
import { ILogger } from '@midwayjs/logger';

import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';

import { Stock } from '../../entity/Stock';
import { InbillItem } from '../../entity/InbillItem';
import { Consume } from '../../entity/Consume';
import _ = require('lodash');

/**
 * 入库单服务类
 * 提供入库单的增删改查以及采购入库、领用归还入库等功能
 */
@Provide()
export class InbillService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;
  // 查询的数据库表名称
  private static TABLE_NAME = 'inbill';
  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${InbillService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  `;
  // 注入Inbill实体的Repository
  @InjectEntityModel(Inbill)
  private repository: Repository<Inbill> = null;
  // 注入Stock实体的Repository
  @InjectEntityModel(Stock)
  private stockRepository: Repository<Stock> = null;
  // 注入Consume实体的Repository
  @InjectEntityModel(Consume)
  private consumeRepository: Repository<Consume> = null;
  /**
   * 分页查询入库单
   * @param query - 查询条件字符串
   * @param params - 前端传递的参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    query = '', params: string, reqParam: ReqParam, 
    page: Page, 
  ): Promise<any> {
    // 分页列表查询数据
    let whereSql = ' '; // 查询条件字符串
    let parameters: any[] = [];
    if (params && params.length > 3) {
      parameters = JSON?.parse?.(params);
    }
    whereSql += sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(parameters, ['current', 'pageSize'])) + sqlUtils?.like?.(['name'], reqParam?.searchValue) + sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.query?.(query); // 处理前端的表格中筛选需求
    // 执行查询语句并返回page对象结果
    const data: any = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    );
    if (page?.pageSize > 0) {
      return data;
    }
    if (page?.pageSize < 1) {
      // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, 'value');
    }
  }
  /**
   * 根据ID查询入库单
   * @param id - 入库单ID
   * @returns 查询结果
   */
  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据
    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }
  /**
   * 删除入库单
   * @param ids - 入库单ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 根据id数组删除多条数据
    await this?.repository?.delete?.(ids);
  }
  /**
   * 更新入库单
   * @param obj - 入库单对象
   * @returns 更新后的入库单对象
   */
  public async update(obj: Inbill): Promise<Inbill> {
    // 一个表进行操作 typeORM
    let log = '';
    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      InbillService?.TABLE_NAME,
      null,
      obj?.id
    );
    if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
      log = uniqueText + '已存在，操作失败';
      const zero0Error: Zero0Error = new Zero0Error(log, '5000');
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }
    // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
      delete obj?.id;
      await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, InbillService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }
    let old: Inbill = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供
      await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, InbillService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
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
  /**
   * 采购入库
   * @param obj - 入库单对象
   * @param purchaseOrderId - 采购订单ID
   * @returns 更新后的入库单对象
   */
  public async purchaseInbill(
    obj: Inbill,
    purchaseOrderId = ''
  ): Promise<Inbill> { // 采购入库
    // 一个表进行操作 typeORM 采购入库
    let log = '';
    // 字段非重复性验证
    const uniqueText = await super.unique?.('stock', null, obj?.id);
    if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
      log = uniqueText + '已存在，操作失败';
      const zero0Error: Zero0Error = new Zero0Error(log, '5000');
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }
    // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
      delete obj?.id;
      await this?.stockRepository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, 'stock'); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }
    let old: Stock = await this?.stockRepository?.findOneById?.(obj?.id); // 
    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供
      await this?.stockRepository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, 'stock'); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }
    delete obj?.id;
    old = {
      ...old,
      ...obj,
    };
    await this?.stockRepository?.save?.(old); // 修改数据
  }
  public async consumeInbill(obj: Inbill, items: any[]): Promise<Inbill> { // 领用归还入库
    // 一个表进行操作 typeORM 领用归还入库
    let log = '';
    // 字段非重复性验证
    const uniqueText = await super.unique?.('stock', null, obj?.id);
    if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
      log = uniqueText + '已存在，操作失败';
      const zero0Error: Zero0Error = new Zero0Error(log, '5000');
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }
    await this?.consumeInbillItem(items)
    return
    // if (!obj?.id) {
    //   // 新增数据，主键id的随机字符串值，由后端typeorm提供
    //   log = '新增数据，主键id的随机字符串值，由后端typeorm提供'
    //   delete obj?.id
    //   await this?.stockRepository?.save?.(obj); // insert update
    //   if (!obj?.orderNum) {
    //     await super.sortOrder?.(obj?.id, null, null, 'stock') // 新增数据时，设置此条数据的orderNum排序值
    //   }
    //   return null
    // }
    // let old: Stock = await this?.stockRepository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
    // if (!old) {
    //   // 新增数据，主键id的随机字符串值，由前端页面提供
    //   await this?.stockRepository?.save?.(obj); // insert update
    //   if (!obj?.orderNum) {
    //     await super.sortOrder?.(obj?.id, null, null, 'stock') // 新增数据时，设置此条数据的orderNum排序值
    //   }
    //   return null
    // }
    // delete obj?.id
    // old = {
    //   ...old,
    //   ...obj,
    // };
    // stockRepository?.save?.(old); // 修改数据
  }
  public async consumeInbillItem(items: any[]): Promise<InbillItem> {
    // 一个表进行操作 typeORM 领用归还入库
    if (!items) {
      
      return
    }
 
    for (const  item of items ) {  
      // 增加相应库存
      const stock = await this?.stockRepository.findOne?.({where: {materialId: item?.materialId, sku: item?.sku}})
      stock.quantity = stock?.quantity + item?.instockQuantity
      await this?.stockRepository?.save?.(stock)
      // 领用人信息中减少此物料数量
 
      const consume = await this?.consumeRepository?.findOneById?.(item?.id)
 
      consume.quantity = consume?.quantity - item?.instockQuantity

      await this?.consumeRepository?.save?.(consume)
      
      continue
    }
  }
  
}
