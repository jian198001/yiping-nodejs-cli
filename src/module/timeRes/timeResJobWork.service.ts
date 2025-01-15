// 导入依赖项
import { Inject, Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Not, Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { ILogger } from "@midwayjs/logger";
import { TimeResJobWork } from "../../entity/TimeResJobWork";

import { Zero0Error } from "../common/model/Zero0Error";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import { TimeResJobService } from "./timeResJob.service";
import _ = require("lodash");

/**
 * 时间资源工作服务类
 * 提供时间资源工作的分页查询、根据ID查询、删除、预约等功能
 */
@Provide()
export class TimeResJobWorkService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "time_res_job_work";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${TimeResJobWorkService?.TABLE_NAME} t LEFT JOIN time_res_job j ON (t.time_res_job_id = j.id) `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  , (DATE_format?.(j.time_start, '%H:%i') ) AS time_start_str -- 预定开始时间

  , (DATE_format?.(j.time_end, '%H:%i') ) AS time_end_str -- 预定结束时间

  , (DATE_format?.(j.time_end, '%Y-%m-%d') ) AS day -- 预定日期

  , (DATE_format?.(j.create_date, '%m-%d %H:%i') ) AS create_date_str -- 预定操作时间

  , j.content AS content

  , ( SELECT username FROM buyer WHERE id = ( SELECT buyer_id FROM shop_buyer WHERE id = ( SELECT user_id FROM time_res WHERE id = ( SELECT time_res_id FROM time_res_job WHERE id = t.time_res_job_id ) ) ) ) AS username -- 信息发布者用户名

  , ( SELECT username FROM buyer WHERE id = ( SELECT buyer_id FROM shop_buyer WHERE id =  t.user_id) ) AS shop_buyer_username -- 买家用户名

     `;

  // 注入TimeResJobWork实体的Repository
  @InjectEntityModel(TimeResJobWork)
  private repository: Repository<TimeResJobWork> = null;

  // 注入TimeResJobService
  @Inject()
  private timeResJobService: TimeResJobService = null;

  /**
   * 分页查询时间资源工作
   * @param query - 查询条件字符串
   * @param params - 前端传递的参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    query = "",
    params: any,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 分页列表查询数据

    let whereSql = " "; // 查询条件字符串

    // 处理前端的搜索字符串的搜索需求
    whereSql += sqlUtils?.like?.(["name"], reqParam?.searchValue);

    let parameters: any[] = [];
    if (params && params?.length > 3) {
      // 解析前端传递的参数
      parameters = JSON?.parse?.(params);
    }
    // 处理前端的表格中筛选需求

    // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句
    // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql +=
      sqlUtils?.mulColumnLike?.(
        strUtils?.antParams2Arr?.(parameters, ["current", "pageSize"])
      ) +
      sqlUtils?.whereOrFilters?.(reqParam?.filters) +
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
   * 根据ID查询时间资源工作
   * @param id - 时间资源工作ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = TimeResJobWorkService.TABLE_NAME + `:${id}`;

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
   * 删除时间资源工作
   * @param ids - 时间资源工作ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = TimeResJobWorkService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);
  }

  /**
   * 预约时间资源工作
   * @param obj - 时间资源工作对象
   * @returns 预约后的时间资源工作对象
   */
  public async work(obj: TimeResJobWork): Promise<any> {
    // 对某资源的某一时间段，进行预约
    // 一个表进行操作 typeORM

    obj = {
      ...obj,
      timeResJobId: obj?.id,
    };

    let log = "",
      uniqueWhere: any = { timeResJobId: obj.timeResJobId };

    delete obj?.id;

    if (obj?.id) {
      uniqueWhere.id = Not(obj?.id); // 如果是修改数据，则判断是否重复时，需要把原记录筛选掉
    }

    const count: number = await this?.repository?.count({ where: uniqueWhere });

    const timeResJob: any = await this?.timeResJobService.getById?.(
      obj.timeResJobId
    );

    const quota = timeResJob.quota;

    if (timeResJob.userId === obj.userId) {
      log = "您无法预定您自己发布的工作安排，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    if (count >= quota) {
      log = "此资源已到达最大预约数量，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    uniqueWhere = {
      ...uniqueWhere,
      userId: obj.userId,
    };

    const countUser: number = await this?.repository?.count({
      where: uniqueWhere,
    });

    if (countUser > 0) {
      log = "您已预约过，无需再次预约，操作失败";

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
          TimeResJobWorkService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }

      return obj;
    }

    let old: TimeResJobWork = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          TimeResJobWorkService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }

      return {};
    }

    delete obj?.id;

    old = {
      ...old,

      ...obj,
    };

    await this?.repository?.save?.(old); // 修改数据
  }
}
