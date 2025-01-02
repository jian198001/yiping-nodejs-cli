// 导入所需的装饰器和模块
import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { GrouponCard } from '../../entity/GrouponCard';
import { ILogger } from '@midwayjs/logger';
import { Zero0Error } from '../common/model/Zero0Error';
import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';
import _ = require('lodash');

/**
 * 团购卡服务类
 */
@Provide()
export class GrouponCardService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = 'groupon_card';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${GrouponCardService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  `;

  // 注入团购卡实体模型
  @InjectEntityModel(GrouponCard)
  private repository: Repository<GrouponCard> = null;

  /**
   * 分页查询团购卡数据
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

    let parameters: any[] = [];

    if (params && params.length > 3) {
      parameters = JSON?.parse?.(params);
    }

    // 构建查询条件
    whereSql += sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(parameters, ['current', 'pageSize',])) + sqlUtils?.like?.(['name'], reqParam?.searchValue, ) + sqlUtils?.whereOrFilters?.(reqParam?.filters) +  sqlUtils?.query?.(query);   // 处理前端的表格中筛选需求

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
      return _?.keyBy?.(data?.list, 'value',);
    }
  }

  /**
   * 根据ID查询团购卡数据
   * @param id - 团购卡ID
   * @returns 查询结果
   */
  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }

  /**
   * 删除团购卡数据
   * @param ids - 团购卡ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    await this?.repository?.delete?.(ids, );
  }

  /**
   * 更新团购卡数据
   * @param obj - 团购卡对象
   * @returns 更新后的团购卡对象
   */
  public async update(obj: GrouponCard): Promise<GrouponCard> {
    // 一个表进行操作 typeORM

    let log = '';

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      GrouponCardService?.TABLE_NAME,
      [],
      obj?.id
    ); // 新增或修改数据时，判断某字段值在数据库中是否已重复

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
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          GrouponCardService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }

    let old: GrouponCard = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          GrouponCardService?.TABLE_NAME
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
   * 检查团购卡基本信息
   * @param card - 团购卡对象
   * @returns 无返回值
   */
  public async checkCardBaseInfo(card: any): Promise<void> {}

  /**
   * 解密团购卡代码
   * @param encryptCode - 加密的团购卡代码
   * @returns 无返回值
   */
  public async decryptCardCode(encryptCode: any): Promise<void> {}

  /**
   * 查询团购卡代码
   * @param cardId - 团购卡ID
   * @param code - 团购卡代码
   * @param checkConsume - 是否检查消费
   * @returns 无返回值
   */
  public async queryCardCode(
    cardId: string,
    code: string,
    checkConsume: boolean
  ): Promise<void> {}

  /**
   * 消费团购卡代码
   * @param code - 团购卡代码
   * @returns 无返回值
   */
  public async consumeCardCode(code: string): Promise<void> {}

  /**
   * 更新用户团购卡状态
   * @param memberCardOffer - 用户团购卡对象
   * @returns 无返回值
   */
  public async updateUserCardStatus(memberCardOffer: any): Promise<void> {}

  /**
   * 标记团购卡代码
   * @param code - 团购卡代码
   * @param cardId - 团购卡ID
   * @param shopBuyerId - 店铺买家ID
   * @param isMark - 是否标记
   * @returns 无返回值
   */
  public async markCardCode(
    code: string,
    cardId: string,
    shopBuyerId = '',
    isMark: boolean
  ): Promise<void> {}

  /**
   * 获取团购卡详情
   * @param cardId - 团购卡ID
   * @returns 无返回值
   */
  public async getCardDetail(cardId: string): Promise<void> {}

  /**
   * 创建团购卡
   * @param cardCreateMessage - 团购卡创建消息
   * @param goods - 团购卡商品
   * @returns 无返回值
   */
  public async createCard(cardCreateMessage: any, goods: any): Promise<void> {}

  /**
   * 创建团购卡优惠券
   * @param cardCreateMessage - 团购卡创建消息
   * @param quantity - 数量
   * @returns 无返回值
   */
  public async createCardOffer(
    cardCreateMessage: any,
    quantity: number
  ): Promise<void> {}

  /**
   * 创建团购卡二维码
   * @param cardId - 团购卡ID
   * @param outerStr - 团购卡外部字符串
   * @param expiresIn - 过期时间
   * @param shopBuyerId - 店铺买家ID
   * @param code - 团购卡代码
   * @param isUniqueCode - 是否唯一代码
   * @returns 无返回值
   */
  public async createQrcodeCard(
    cardId: string,
    outerStr: string,
    expiresIn: number,
    shopBuyerId = '',
    code: string,
    isUniqueCode: boolean
  ): Promise<void> {}

  /**
   * 团购卡代码失效
   * @param cardId - 团购卡ID
   * @param code - 团购卡代码
   * @param reason - 原因
   * @returns 无返回值
   */
  public async unavailableCardCode(
    cardId: string,
    code: string,
    reason: string
  ): Promise<void> {}

  /**
   * 删除团购卡
   * @param cardId - 团购卡ID
   * @returns 无返回值
   */
  public async deleteCard(cardId: string): Promise<void> {}

  /**
   * 团购卡代码储值
   * @param cardId - 团购卡ID
   * @param codeList - 团购卡代码列表
   * @returns 无返回值
   */
  public async cardCodeDeposit(
    cardId: string,
    codeList: string[]
  ): Promise<void> {}

  /**
   * 团购卡代码储值计数
   * @param cardId - 团购卡ID
   * @returns 无返回值
   */
  public async cardCodeDepositCount(cardId: string): Promise<void> {}

  /**
   * 团购卡代码校验码
   * @param cardId - 团购卡ID
   * @param codeList - 团购卡代码列表
   * @returns 无返回值
   */
  public async cardCodeCheckcode(
    cardId: string,
    codeList: string[]
  ): Promise<void> {}

  /**
   * 团购卡图文消息获取html
   * @param cardId - 团购卡ID
   * @returns 无返回值
   */
  public async cardMpnewsGethtml(cardId: string): Promise<void> {}

  /**
   * 团购卡库存变更
   * @param cardId - 团购卡ID
   * @param changeValue - 变更值
   * @returns 无返回值
   */
  public async cardModifyStock(
    cardId: string,
    changeValue: number
  ): Promise<void> {}

  /**
   * 团购卡代码更新
   * @param cardId - 团购卡ID
   * @param oldCode - 旧代码
   * @param newCode - 新代码
   * @returns 无返回值
   */
  public async cardCodeUpdate(
    cardId: string,
    oldCode: string,
    newCode: string
  ): Promise<void> {}

  /**
   * 团购卡支付细胞设置
   * @param cardId - 团购卡ID
   * @param isOpen - 是否开启
   * @returns 无返回值
   */
  public async cardPaycellSet(cardId: string, isOpen: boolean): Promise<void> {}

  /**
   * 团购卡自主消费细胞设置
   * @param cardId - 团购卡ID
   * @param isOpen - 是否开启
   * @param needVerifyCod - 是否需要验证码
   * @param needRemarkAmount - 是否需要备注金额
   * @returns 无返回值
   */
  public async cardSelfConsumeCellSet(
    cardId: string,
    isOpen: boolean,
    needVerifyCod: boolean,
    needRemarkAmount: boolean
  ): Promise<void> {}

  /**
   * 获取用户团购卡列表
   * @param shopBuyerId - 店铺买家ID
   * @param cardId - 团购卡ID
   * @returns 无返回值
   */
  public async getUserCardList(
    shopBuyerId = '',
    cardId: string
  ): Promise<void> {}

  /**
   * 团购卡开始
   * @param code - 团购卡代码
   * @param shopBuyerId - 店铺买家ID
   * @param cardId - 团购卡ID
   * @returns 无返回值
   */
  public async beginCard(
    code: string,
    shopBuyerId = '',
    cardId: string
  ): Promise<void> {}

  /**
   * 用户获取团购卡
   * @param code - 团购卡代码
   * @param shopBuyerId - 店铺买家ID
   * @param cardId - 团购卡ID
   * @param orderItemId - 订单项ID
   * @returns 无返回值
   */
  public async userGetCard(
    code: string,
    shopBuyerId = '',
    cardId: string,
    orderItemId: string
  ): Promise<void> {}

  /**
   * 审核退款
   * @param orderId - 订单ID
   * @returns 无返回值
   */
  public async auditRefund(orderId: string): Promise<void> {}

  /**
   * 激活团购卡
   * @param code - 团购卡代码
   * @param cardId - 团购卡ID
   * @param activateBeginTime - 激活开始时间
   * @param activateEndTime - 激活结束时间
   * @param initBonus - 初始奖金
   * @param initBalance - 初始余额
   * @returns 无返回值
   */
  public async activate(
    code: string,
    cardId: string,
    activateBeginTime: any,
    activateEndTime: any,
    initBonus: number,
    initBalance: number
  ): Promise<void> {}
}
