import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { TradeOrder } from "../../entity/TradeOrder";

import { ILogger } from "@midwayjs/logger";

import { Zero0Error } from "../common/model/Zero0Error";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

/**
 * 交易订单服务类
 */
@Provide()
export class MallMemberCardService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;
  // 查询的数据库表名称
  private static TABLE_NAME = "trade_order";
  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${MallMemberCardService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
      
     `;
  // 注入交易订单实体模型
  @InjectEntityModel(TradeOrder)
  private repository: Repository<TradeOrder> = null;
  /**
   * 分页查询交易订单数据
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
    let whereSql = " "; // 查询条件字符串
    let parameters: any[] = [];
    if (params && params.length > 3) {
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

    if (page?.pageSize < 1) {
      // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, "value");
    }
  }

  private async getToRedis(ids) {
    // 根据id查询一条数据

    for (const id of ids) {
      await this?.getById?.(id);
    }
  }

  /**
   * 根据ID查询交易订单数据
   * @param id - 交易订单ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = MallMemberCardService.TABLE_NAME + `:${id}`;

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
   * 删除交易订单数据
   * @param ids - 交易订单ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = MallMemberCardService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);
  }
  /**
   * 更新交易订单数据
   * @param obj - 交易订单对象
   * @returns 更新后的交易订单对象
   */
  public async update(obj: TradeOrder): Promise<any> {
    // 一个表进行操作 typeORM
    let log = ""; // 删除redis缓存

    const key = MallMemberCardService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      MallMemberCardService?.TABLE_NAME,
      [],
      obj?.id
    ); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
          MallMemberCardService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }
    let old: TradeOrder = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供
      await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          MallMemberCardService?.TABLE_NAME
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
   * 购买会员卡
   * @param memberCardId - 会员卡ID
   * @param selectedNum - 选择数量
   * @param shopBuyerId - 店铺买家ID
   * @returns 无返回值
   */
  public async buy(
    memberCardId: string,
    selectedNum: number,
    shopBuyerId = ""
  ): Promise<void> {}
  /**
   * 保存会员卡优惠信息
   * @param xmlData - XML数据
   * @returns 无返回值
   */
  public async saveMemberCardOffer(xmlData: string): Promise<void> {}
  /**
   * 创建会员卡优惠
   * @param outTradeNo - 外部交易号
   * @param resultCode - 结果代码
   * @returns 无返回值
   */
  public async createMemberCardOffers(
    outTradeNo: string,
    resultCode: string
  ): Promise<void> {}
  /**
   * 购买商城会员卡
   * @param shopId - 店铺ID
   * @param memberCardId - 会员卡ID
   * @param selectedNum - 选择数量
   * @param shopBuyerId - 店铺买家ID
   * @returns 无返回值
   */
  public async buyMallMemberCard(
    shopId = "",
    memberCardId: string,
    selectedNum: number,
    shopBuyerId = ""
  ): Promise<void> {}
  /**
   * 更新店铺结束时间
   * @param xmlData - XML数据
   * @returns 无返回值
   */
  public async updateShopEndTime(xmlData: string): Promise<void> {}
}
