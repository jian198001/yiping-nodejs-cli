import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { GiftCard } from '../../entity/GiftCard';

import { ILogger } from '@midwayjs/logger';

import { Zero0Error } from '../common/model/Zero0Error';

import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';
import _ = require('lodash');
@Provide()
export class GiftCardService extends BaseService {
  
  @Logger()
  private logger: ILogger = null

// 查询的数据库表名称
  private static TABLE_NAME = 'gift_card';

// 查询的数据库表名称及别名
  private fromSql = ` FROM ${GiftCardService?.TABLE_NAME} t `;
 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `

  @InjectEntityModel(GiftCard)
  private repository: Repository<GiftCard> = null;

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
      page,
    );

    // 遍历查询结果,将查询结果异步读取到redis

    for (const item of data?.list) {
      
      this?.getById?.(item?.id);

    }

    if (page?.pageSize > 0) {
      
        return data
  
      }
  
      if (page?.pageSize < 1) {
        // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
        return _?.keyBy?.(data?.list, 'value',)
  
      }
  
  }

  public async getById(id = ""): Promise<any> {

    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据
    
    // 查看缓存中是否有此数据

    const key = GiftCardService.TABLE_NAME + `:${id}`;

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

  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = GiftCardService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    }

    // 调用delete方法，根据ID删除数据
    await this?.repository?.delete?.(ids);
  }

  public async update(obj: GiftCard): Promise<GiftCard> {
    // 一个表进行操作 typeORM

    let log = '';

   // 字段非重复性验证
   const uniqueText = await super.unique?.(
      GiftCardService?.TABLE_NAME,
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
        await super.sortOrder?.(obj?.id, null, null, GiftCardService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
      }
      return null
    }

    let old: GiftCard = await this?.repository?.findOneById?.(obj?.id) // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj) // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, GiftCardService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
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

  public async checkCardBaseInfo(card: any): Promise<void> {}

  public async decryptCardCode(encryptCode: any): Promise<void> {}

  public async queryCardCode(
    cardId: string,
    code: string,
    checkConsume: boolean
  ): Promise<void> {}

  public async consumeCardCode(code: string): Promise<void> {}

  public async updateUserCardStatus(memberCardOffer: any): Promise<void> {}

  public async markCardCode(
    code: string,
    cardId: string,
    shopBuyerId = '',
    isMark: boolean
  ): Promise<void> {}

  public async getCardDetail(cardId: string): Promise<void> {}

  public async createCard(cardCreateMessage: any, goods: any): Promise<void> {}

  public async createCardOffer(
    cardCreateMessage: any,
    quantity: number
  ): Promise<void> {}

  public async createQrcodeCard(
    cardId: string,
    outerStr: string,
    expiresIn: number,
    shopBuyerId = '',
    code: string,
    isUniqueCode: boolean
  ): Promise<void> {}

  public async unavailableCardCode(
    cardId: string,
    code: string,
    reason: string
  ): Promise<void> {}

  public async deleteCard(cardId: string): Promise<void> {}

  public async cardCodeDeposit(
    cardId: string,
    codeList: string[]
  ): Promise<void> {}

  public async cardCodeDepositCount(cardId: string): Promise<void> {}

  public async cardCodeCheckcode(
    cardId: string,
    codeList: string[]
  ): Promise<void> {}

  public async cardMpnewsGethtml(cardId: string): Promise<void> {}

  public async cardModifyStock(
    cardId: string,
    changeValue: number
  ): Promise<void> {}

  public async cardCodeUpdate(
    cardId: string,
    oldCode: string,
    newCode: string
  ): Promise<void> {}

  public async cardPaycellSet(cardId: string, isOpen: boolean): Promise<void> {}

  public async cardSelfConsumeCellSet(
    cardId: string,
    isOpen: boolean,
    needVerifyCod: boolean,
    needRemarkAmount: boolean
  ): Promise<void> {}

  public async getUserCardList(
    shopBuyerId = '',
    cardId: string
  ): Promise<void> {}

  public async beginCard(
    code: string,
    shopBuyerId = '',
    cardId: string
  ): Promise<void> {}

  public async userGetCard(
    code: string,
    shopBuyerId = '',
    cardId: string,
    orderItemId: string
  ): Promise<void> {}

  public async auditRefund(orderId: string): Promise<void> {}

  public async activate(
    code: string,
    cardId: string,
    activateBeginTime: any,
    activateEndTime: any,
    initBonus: number,
    initBalance: number
  ): Promise<void> {}
}
