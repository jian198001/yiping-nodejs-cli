// 导入所需的装饰器和模块
import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { MemberCard } from "../../entity/MemberCard";
import { ILogger } from "@midwayjs/logger";
import { Zero0Error } from "../common/model/Zero0Error";
import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

/**
 * 会员卡服务类
 */
@Provide()
export class MemberCardService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "member_card";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${MemberCardService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
      
     `;

  // 注入会员卡实体模型
  @InjectEntityModel(MemberCard)
  private repository: Repository<MemberCard> = null;

  /**
   * 分页查询会员卡数据
   * @param query - 查询字符串
   * @param params - 参数对象
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    query = "",
    params: string,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 分页列表查询数据

    // 缓存中有此数据，直接返回
    if (page?.pageSize < 1) {
      // 查看缓存中是否有此数据

      const key = MemberCardService?.TABLE_NAME + `:arr`;

      const data = await this?.redisService?.get?.(key);      

      if (data) {
        const parse = JSON?.parse?.(data);

        return parse;
      }
    }   

    let whereSql = " "; // 查询条件字符串

    let parameters: any[] = [];

    if (params && params?.length > 3) {
      parameters = JSON?.parse?.(params);
    }

    // 构建查询条件
    whereSql +=
      sqlUtils?.mulColumnLike?.(
        strUtils?.antParams2Arr?.(parameters, ["current", "pageSize"])
      ) +
      sqlUtils?.like?.(["name"], reqParam?.searchValue) +
      sqlUtils?.whereOrFilters?.(reqParam?.filters) +
      sqlUtils?.query?.(query); // 处理前端的表格中筛选需求

    // 执行查询语句并返回page对象结果
    const data: any = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    );

    // 遍历查询结果,将查询结果异步读取到redis

    // 遍历查询结果,将查询结果中异步读取到redis

    this?.getToRedis?.(_?.map?.(data?.list, "id"));

    if (page?.pageSize > 0) {
      return data;
    }

    // 将查询结果中的数据列表存入redis
    this?.setArrToRedis?.(data?.list, MemberCardService?.TABLE_NAME); 

          // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, "value");
    
  }

  private async getToRedis(ids) {
    // 根据id查询一条数据

    for (const id of ids) {
      await this?.getById?.(id);
    }
  }

  /**
   * 根据ID查询会员卡数据
   * @param id - 会员卡ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = MemberCardService?.TABLE_NAME + `:${id}`;

    let data: any = await this?.redisService?.get?.(key);

    // 缓存中有此数据，直接返回

    if (data) {
      const parse = JSON?.parse?.(data);

      return parse;
    }

    // 缓存中没有此数据，查询数据库

    // 调用父类的getByIdBase方法，根据ID查询数据

    data = await super.getByIdBase?.(id, this?.selectSql, this?.fromSql);

    // 查询数据库后，把数据放入缓存

    this?.redisService?.set?.(key, JSON?.stringify?.(data));

    // 返回数据

    return data;
  }

  /**
   * 删除会员卡数据
   * @param ids - 会员卡ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = MemberCardService?.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);  

    // 删除redis缓存
    this?.redisService?.del?.(MemberCardService?.TABLE_NAME + `:arr`); 
  }

  /**
   * 更新会员卡数据
   * @param obj - 会员卡对象
   * @returns 更新后的会员卡对象
   */
  public async update(obj: MemberCard): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";
    // 删除redis缓存

    const key = MemberCardService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key); 

    // 删除redis缓存
    this?.redisService?.del?.(MemberCardService?.TABLE_NAME + `:arr`);        

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      MemberCardService?.TABLE_NAME,
      null,
      obj?.id
    );

    if (uniqueText) {
      // 某unique字段值已存在，抛出异常，程序处理终止
      log = uniqueText + "已存在，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      log = "新增数据，主键id的随机字符串值，由后端typeorm提供";

      delete obj?.id;

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          MemberCardService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
       return {} ;
    }

    let old: MemberCard = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          MemberCardService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
       return {} ;
    }
    delete obj?.id;

    old = {
      ...old,

      ...obj,
    };

    await this?.repository?.save?.(old); // 修改数据
  }

  /**
   * 检查会员卡基本信息
   * @param card - 会员卡对象
   * @returns 无返回值
   */
  public async checkCardBaseInfo(card: any): Promise<void> {}

  /**
   * 解密会员卡代码
   * @param encryptCode - 加密的会员卡代码
   * @returns 无返回值
   */
  public async decryptCardCode(encryptCode: any): Promise<void> {}

  /**
   * 查询会员卡代码
   * @param cardId - 会员卡ID
   * @param code - 会员卡代码
   * @param checkConsume - 是否检查消费
   * @returns 无返回值
   */
  public async queryCardCode(
    cardId: string,
    code: string,
    checkConsume: boolean
  ): Promise<void> {}

  /**
   * 消费会员卡代码
   * @param code - 会员卡代码
   * @returns 无返回值
   */
  public async consumeCardCode(code: string): Promise<void> {}

  /**
   * 更新用户会员卡状态
   * @param memberCardOffer - 用户会员卡对象
   * @returns 无返回值
   */
  public async updateUserCardStatus(memberCardOffer: any): Promise<void> {}

  /**
   * 标记会员卡代码
   * @param code - 会员卡代码
   * @param cardId - 会员卡ID
   * @param shopBuyerId - 店铺买家ID
   * @param isMark - 是否标记
   * @returns 无返回值
   */
  public async markCardCode(
    code: string,
    cardId: string,
    shopBuyerId = "",
    isMark: boolean
  ): Promise<void> {}

  /**
   * 获取会员卡详情
   * @param cardId - 会员卡ID
   * @returns 无返回值
   */
  public async getCardDetail(cardId: string): Promise<void> {}

  /**
   * 创建会员卡
   * @param cardCreateMessage - 创建会员卡消息对象
   * @param goods - 商品对象
   * @returns 无返回值
   */
  public async createCard(cardCreateMessage: any, goods: any): Promise<void> {}

  /**
   * 创建会员卡优惠
   * @param cardCreateMessage - 创建会员卡消息对象
   * @param quantity - 数量
   * @returns 无返回值
   */
  public async createCardOffer(
    cardCreateMessage: any,
    quantity: number
  ): Promise<void> {}

  public async createQrcodeCard(
    cardId: string,
    outerStr: string,
    expiresIn: number,
    shopBuyerId = "",
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
    shopBuyerId = "",
    cardId: string
  ): Promise<void> {}

  public async beginCard(
    code: string,
    shopBuyerId = "",
    cardId: string
  ): Promise<void> {}

  public async userGetCard(
    code: string,
    shopBuyerId = "",
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
