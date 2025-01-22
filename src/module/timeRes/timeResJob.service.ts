// 导入依赖项
import { Inject, Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { ILogger } from "@midwayjs/logger";
import { TimeResJob } from "../../entity/TimeResJob";

import { Zero0Error } from "../common/model/Zero0Error";

import * as sqlUtils from "../common/utils/sqlUtils";
import { TimeRes } from "../../entity/TimeRes";
import dayjs = require("dayjs");
import { ShopBuyer } from "../../entity/ShopBuyer";
import { ShopBuyerService } from "../trade/shopBuyer.service";
import _ = require("lodash");

/**
 * 时间资源任务服务类
 * 提供时间资源任务的分页查询、根据ID查询、删除、更新等功能
 */
@Provide()
export class TimeResJobService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "time_res_job";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${TimeResJobService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  

  , (DATE_format?.(t.time_start, '%H:%i') ) AS time_start_str -- 预定开始时间

  , (DATE_format?.(t.time_end, '%H:%i') ) AS time_end_str -- 预定结束时间
  
  , (DATE_format?.(t.time_end, '%Y-%m-%d') ) AS day -- 预定日期

  , IFNULL(( SELECT COUNT(*) FROM time_res_job_work WHERE time_res_job_work.time_res_job_id = t.id ), 0) AS work_count -- 已预定数

  , ( CASE WHEN t.time_end < NOW() THEN 1 ELSE 0 END ) AS before_now -- 是否已过期

  , ( CASE WHEN ( SELECT COUNT(*) FROM time_res_job_work WHERE time_res_job_work.time_res_job_id = t.id ) < t.quota THEN 1 ELSE 0 END ) AS work -- 是否已达到最大预定数

  , ( SELECT user_id FROM time_res WHERE id = t.time_res_id ) AS user_id 

     `;

  // 注入TimeResJob实体的Repository
  @InjectEntityModel(TimeResJob)
  private repository: Repository<TimeResJob> = null;

  // 注入TimeRes实体的Repository
  @InjectEntityModel(TimeRes)
  private timeJobRepository: Repository<TimeRes> = null;

  // 注入ShopBuyer实体的Repository
  @InjectEntityModel(ShopBuyer)
  private shopBuyerRepository: Repository<ShopBuyer> = null;

  // 注入ShopBuyerService
  @Inject()
  private shopBuyerService: ShopBuyerService = null;

  /**
   * 分页查询时间资源任务
   * @param sellerId - 预约信息发布者id
   * @param user - 用户类型
   * @param query - 查询条件字符串
   * @param params - 前端传递的参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    sellerId: string, // 预约信息发布者id,发布者只能看到自己发布的信息,消费者只能看到指定发布者发布的信息
    user: string, // 用户类型，买家只可以看到可预约的时间段，无法看到已过期的时间段，卖家(排班生产者)可以看到全部时间段
    query = "",
    params: any,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 分页列表查询数据

    // 缓存中有此数据，直接返回
    if (page?.pageSize < 1) {
      // 查看缓存中是否有此数据

      const key = TimeResJobService?.TABLE_NAME + `:arr`;

      const data = await this?.redisService?.get?.(key);

      if (data) {
        const parse = JSON.parse(data);

        return parse;
      }
    }

    let whereSql = " "; // 查询条件字符串

    if (user === "buyer") {
      whereSql += ` AND t.time_end > NOW() `;
    }

    whereSql += ` AND t.time_res_id IN ( SELECT id FROM time_res WHERE time_res.user_id = '${sellerId}' ) `;

    whereSql += sqlUtils?.like?.(["name"], reqParam?.searchValue); // 处理前端的搜索字符串的搜索需求
    // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句
    // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters); // 处理前端的表格中筛选需求
    whereSql += sqlUtils?.query?.(query);
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

    // 将查询结果中的数据列表存入redis
    this?.setArrToRedis?.(data?.list, TimeResJobService?.TABLE_NAME);

    // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
    return _?.keyBy?.(data?.list, "value");
  }

  /**
   * 根据ID查询时间资源任务
   * @param id - 时间资源任务ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 根据id查询一条数据

    const data: any = await super.getByIdBase?.(
      id,
      this?.selectSql,
      this?.fromSql
    );

    data.works = [];

    return data;
  }

  /**
   * 删除时间资源任务
   * @param ids - 时间资源任务ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = TimeResJobService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);

    // 删除redis缓存
    this?.redisService?.del?.(TimeResJobService?.TABLE_NAME + `:arr`);
  }

  /**
   * 更新时间资源任务
   * @param obj - 时间资源任务对象
   * @param timeStartStr - 开始时间字符串
   * @param timeEndStr - 结束时间字符串
   * @param day - 日期字符串
   * @param userId - 用户ID
   * @returns 更新后的时间资源任务
   */
  public async update(
    obj: TimeResJob,
    timeStartStr: string = "",
    timeEndStr: string = "",
    day: string = "",
    userId: string = ""
  ): Promise<TimeResJob> {
    // 排班信息进行新增或修改
    // 一个表进行操作 typeORM

    if (!userId) {
      userId = "1";
    }

    let log = "";

    timeStartStr = day + " " + timeStartStr + ":00";

    timeEndStr = day + " " + timeEndStr + ":00";

    obj.timeStart = dayjs(timeStartStr).toDate();

    obj.timeEnd = dayjs(timeEndStr).toDate();

    // 如果此用户的对应资源不存在，则创建资源

    const timeRes: any = await this?.timeJobRepository?.findOneBy?.({
      userId: userId,
    });

    if (!timeRes) {
      const timeResObj: TimeRes = new TimeRes();

      timeResObj.userId = userId;

      await this?.timeJobRepository?.save?.(timeResObj);

      obj.timeResId = timeResObj.id;
    } else {
      obj.timeResId = timeRes.id;
    }

    // 无法新增或修改结束时间已过时的排班

    if (dayjs(timeStartStr).isAfter(dayjs(timeEndStr))) {
      log = "开始时间晚于结束时间，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    if (dayjs().isAfter(dayjs(timeEndStr))) {
      log = "无法新增或修改结束时间已过时的排班，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    // 新增或修改排班信息时，查看同时段是否已有排班信息存在

    let sql =
      ` SELECT COUNT(*) AS count_0 FROM time_res_job t WHERE 1>0  ` +
      sqlUtils.intersectionTime(
        timeStartStr,
        timeEndStr,
        "t.time_start",
        "t.time_end"
      );

    sql += ` AND t.time_res_id = '${obj.timeResId}' `;

    if (obj?.id) {
      sql += ` AND t.id != '${obj?.id}' `; // 如果是修改数据，则判断是否重复时，需要把原记录筛选掉
    }

    const results = await super.query?.(sql);

    const count: number = results?.[0]?.count_0;

    // 获取同时段可预约最大数量

    if (count > 0) {
      log = "同时段排班信息已存在，操作失败";

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
          TimeResJobService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }

      return obj;
    }

    let old: TimeResJob = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          TimeResJobService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }

      return obj;
    }

    delete obj?.id;

    old = {
      ...old,

      ...obj,
    };

    await this?.repository?.save?.(old); // 修改数据

    return old;
  }

  public async updateScene(
    username: string,
    shopBuyerId: string
  ): Promise<ShopBuyer> {
    // TODO 根据预约信息发布者用户名,找到对应的发布者ID

    const seller: any = await this?.shopBuyerService.findByUsername(
      username,
      "1"
    );

    let shopBuyer: any = await this?.shopBuyerRepository?.findOneById(
      shopBuyerId
    );

    shopBuyer.scene = seller?.id;

    await this?.shopBuyerRepository?.save(shopBuyer);

    return seller;
  }
}
