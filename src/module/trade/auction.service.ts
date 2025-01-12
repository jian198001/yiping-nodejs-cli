import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Auction } from "../../entity/Auction";
import { ILogger } from "@midwayjs/logger";
import { LatestBid } from "../../entity/LatestBid";
import { Zero0Error } from "../common/model/Zero0Error";
import { AuctionActivity } from "../../entity/AuctionActivity";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

/**
 * 拍卖服务类
 */
@Provide()
export class AuctionService extends BaseService {
  @Logger()
  private logger: ILogger = null;
  // 拍卖延迟时间（分钟）
  private delayInMinutes = 5;
  // 查询的数据库表名称
  private static TABLE_NAME = "auction";
  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${AuctionService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;
  @InjectEntityModel(Auction)
  private repository: Repository<Auction> = null;
  @InjectEntityModel(AuctionActivity)
  private auctionActivityRepository: Repository<AuctionActivity> = null;
  @InjectEntityModel(LatestBid)
  private latestBidRepository: Repository<LatestBid> = null;
  /**
   * 分页查询拍卖记录
   * @param query - 查询字符串
   * @param params - 参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns Promise<any> - 返回分页查询结果
   */
  public async page(
    query = "",
    params: string,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 分页列表查询数据

    console?.log(this?.delayInMinutes);

    let whereSql = " "; // 查询条件字符串

    // 处理前端的搜索字符串的搜索需求
    whereSql += sqlUtils?.like?.(["name"], reqParam?.searchValue);
    // 处理前端的表格中筛选需求
    whereSql +=
      sqlUtils?.whereOrFilters?.(reqParam?.filters) +
      sqlUtils?.mulColumnLike?.(
        strUtils?.antParams2Arr?.(JSON?.parse?.(params), [
          "current",
          "pageSize",
        ])
      ) +
      sqlUtils?.query?.(query);
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
   * 根据ID查询拍卖记录
   * @param id - 拍卖记录ID
   * @returns Promise<any> - 返回查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = AuctionService.TABLE_NAME + `:${id}`;

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
   * 删除拍卖记录
   * @param ids - 拍卖记录ID数组
   * @returns Promise<void> - 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = AuctionService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);
  }
  /**
   * 更新拍卖记录
   * @param obj - 拍卖记录对象
   * @returns Promise<Auction> - 返回更新后的拍卖记录对象
   */
  public async update(obj: Auction): Promise<any> {
    // 一个表进行操作 typeORM

    let log = ""; // 删除redis缓存

    const key = AuctionService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      AuctionService?.TABLE_NAME,
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
          AuctionService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
       return {} ;
    }

    let old: Auction = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          AuctionService?.TABLE_NAME
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
   * 进行拍卖操作
   * @param obj - 拍卖对象
   * @returns Promise<Auction> - 返回拍卖对象
   */
  public async auction(obj: Auction): Promise<Auction> {
    let log = "";

    const startPrice: number = obj?.startPrice;

    if (!startPrice || startPrice < 0.01) {
      log = "起拍价金额过小，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const reservePrice: number = obj?.reservePrice;

    if (!reservePrice || reservePrice < 0.01) {
      log = "保留价金额过小，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const incrementRange: number = obj?.incrementRange;

    if (!incrementRange || incrementRange < 0.01) {
      log = "增价幅度金额过小，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const auctionActivity =
      await this?.auctionActivityRepository?.findOneById?.(
        obj.auctionActivityId
      );

    const startTime: any = auctionActivity.startTime;

    const now = new Date();

    if (!startTime || startTime <= now) {
      log = "拍卖会已开始或已结束，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    obj.maxPrice = obj?.startPrice;

    obj.endTime = null; // TODO

    await this?.repository?.save?.(obj);

    return obj; // insert update
  }
  /**
   * 进行拍卖操作
   * @param obj - 拍卖对象
   * @returns Promise<Auction> - 返回拍卖对象
   */
  public async buyerInquiry(obj: LatestBid): Promise<string> {
    let log = "";

    const auctionId = obj?.auctionId;

    const auction1 = await this?.repository?.findOneById?.(auctionId);

    const endTime = auction1.endTime;

    if (!endTime) {
      log = "此商品拍卖已结束，出价失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    let maxPrice: number = auction1.maxPrice;

    if (!maxPrice) {
      maxPrice = 0.01;
    }

    const bidPrice: number = obj?.bidPrice;

    if (bidPrice <= maxPrice) {
      log = "您的出价已过期，目前有其它会员出价更高，您的出价失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    auction1.maxPrice = bidPrice;

    auction1.endTime = new Date(); // TODO

    await this?.repository?.save?.(auction1);

    obj.bidTime = new Date();

    await this?.latestBidRepository?.save?.(obj);

     return  ' ' // insert update
  }
}
