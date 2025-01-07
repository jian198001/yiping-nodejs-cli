// 导入所需的模块和装饰器
import { Inject, Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { GoodsMessage } from '../../entity/GoodsMessage';

import { ILogger } from '@midwayjs/logger';
import { SkuService } from './sku.service';

import { Zero0Error } from '../common/model/Zero0Error';

import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';
import _ = require('lodash');

/**
 * 商品消息服务类
 */
@Provide()
export class GoodsMessageService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = 'goods_message';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${GoodsMessageService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
     `;

  // 注入商品消息实体模型
  @InjectEntityModel(GoodsMessage)
  private repository: Repository<GoodsMessage> = null;

  // 注入SKU服务
  @Inject()
  private skuService: SkuService = null;

  /**
   * 分页查询商品消息数据
   * @param query - 查询字符串
   * @param params - 参数对象
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

    // 处理前端的搜索字符串的搜索需求
    whereSql += sqlUtils?.like?.(['name'], reqParam?.searchValue,); 

    // 处理前端的表格中筛选需求
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize',])) + sqlUtils?.query?.(query);  

    // 执行查询语句并返回page对象结果
    const data: any = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page,
    );

    // 遍历查询结果,将查询结果异步读取到redis

    for (const item of data?.list) {
      
      this?.getById?.(item?.id);

    }

    if (page?.pageSize > 0) {
      return data;
    }
  
    if (page?.pageSize < 1) {
      // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, 'value',);
    }
  }

  /**
   * 根据ID查询商品消息数据
   * @param id - 商品消息ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {

    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据
    
    // 查看缓存中是否有此数据

    const key = GoodsMessageService.TABLE_NAME + `:${id}`;

    let data: any = await this?.redisService?.get?.(key);

    // 缓存中有此数据，直接返回

    if (data) { 

        const parse = JSON.parse(data);
  
        return parse;
   
    }

    // 缓存中没有此数据，查询数据库

    // 调用父类的getByIdBase方法，根据ID查询数据

    data = await super.getByIdBase?.(id, this?.selectSql, this?.fromSql);

    // 查询数据库后，把数据放入缓存

    await this?.redisService?.set?.(key, JSON.stringify(data));

    // 返回数据

    return data;
  }

  /**
   * 删除商品消息数据
   * @param ids - 商品消息ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    await this?.repository?.delete?.(ids,);
  }

  /**
   * 更新商品消息数据
   * @param obj - 商品消息对象
   * @returns 更新后的商品消息对象
   */
  public async update(obj: GoodsMessage): Promise<GoodsMessage> {
    // 一个表进行操作 typeORM

    let log = '';
// 删除redis缓存

    const key = GoodsMessageService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      GoodsMessageService?.TABLE_NAME,
      null,
      obj?.id
    );

    if (uniqueText) { 
      // 某unique字段值已存在，抛出异常，程序处理终止
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
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          GoodsMessageService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }

    let old: GoodsMessage = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          GoodsMessageService?.TABLE_NAME
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

  /**
   * 从购物车消息中获取中文描述
   * @param cartMessages - 购物车消息字符串
   * @returns 中文描述字符串
   */
  public async getCnStrFromCart(cartMessages: string): Promise<string> {
    if (!cartMessages) {
      return '';
    }

    cartMessages = await this?.skuService?.json2CnStr(cartMessages);

    if (!cartMessages) {
      return '';
    }

    cartMessages = '买家留言: ' + cartMessages;

    return cartMessages;
  }

  /**
   * 获取商品消息
   * @param goodsId - 商品ID
   * @returns 商品消息数组
   */
  public async getMessage(goodsId: string): Promise<any[]> {
    return null;
  }

  /**
   * 保存商品消息
   * @param obj - 商品消息对象
   * @returns 保存成功的消息ID
   */
  public async saveGoodsMessage(obj: GoodsMessage): Promise<string> {
    return null;
  }

  /**
   * 插入消息到消息列表
   * @param listMessagesStr - 消息列表字符串
   * @param messages - 要插入的消息对象
   * @returns 更新后的消息列表字符串
   */
  public async insertMessages(
    listMessagesStr: string,
    messages: any
  ): Promise<string> {
    if (!listMessagesStr) {
      return JSON?.stringify([messages]);
    }

    const parse: any[] = JSON?.parse?.(listMessagesStr);

    if (!parse) {
      return JSON?.stringify([messages]);
    }

    parse.push?.(messages);

    return JSON?.stringify(parse);
  }

  /**
   * 插入购物车消息到购物车消息列表
   * @param listCartMessagesStr - 购物车消息列表字符串
   * @param cartMessages - 要插入的购物车消息对象
   * @returns 更新后的购物车消息列表字符串
   */
  public async insertCartMessages(
    listCartMessagesStr,
    cartMessages: any
  ): Promise<string> {
    if (!listCartMessagesStr) {
      return JSON?.stringify([cartMessages]);
    }

    const parse: any[] = JSON?.parse?.(listCartMessagesStr);

    if (!parse) {
      return JSON?.stringify([cartMessages]);
    }

    parse.push?.(cartMessages);

    return JSON?.stringify(parse);
  }
}
