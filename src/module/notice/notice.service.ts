// 引入必要的模块和装饰器
import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Notice } from "../../entity/Notice";
import { ILogger } from "@midwayjs/logger";
import { Zero0Error } from "../common/model/Zero0Error";
import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

/**
 * 通知消息服务类
 * 提供通知消息的增删改查功能
 */
@Provide()
export class NoticeService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "notice";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${NoticeService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  `;

  // 注入Notice实体的Repository
  @InjectEntityModel(Notice)
  private repository: Repository<Notice> = null;

  // 日志字符串
  private log = "";

  /**
   * 分页查询通知消息
   * @param query - 查询条件字符串
   * @param params - 前端传递的参数字符串
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

    this.log = "分页列表查询数据";

    this?.logger?.info?.(this.log);

    // 缓存中有此数据，直接返回
    if (page?.pageSize < 1) {
      // 查看缓存中是否有此数据

      const key = NoticeService?.TABLE_NAME + `:arr`;   

      const data = await this?.redisService?.get?.(key);        

      if (data) {
        const parse = JSON?.parse?.(data);

        return parse;
      }
    }    


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

    // 遍历查询结果,将查询结果中异步读取到redis

    this?.getToRedis?.(_?.map?.(data?.list, "id"));

    if (page?.pageSize > 0) {
      return data;
    }

    // 将查询结果中的数据列表存入redis
    this?.setArrToRedis?.(data?.list, NoticeService?.TABLE_NAME);                    

          // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, "value");
    
  }

  private async getToRedis(ids) {
    for (const id of ids) {
      await this?.getById?.(id);
    }
  }

  /**
   * 根据ID查询通知消息
   * @param id - 通知消息ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    console.log("getById");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = NoticeService.TABLE_NAME + `:${id}`;

    let data: any = await this?.redisService?.get?.(key);

    // 缓存中有此数据，直接返回

    if (data) {
      this?.logger?.info?.("缓存中有此数据，直接返回");

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
   * 删除通知消息
   * @param ids - 通知消息ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = NoticeService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    }

    // 调用父类的delBase方法，根据ID删除数据
    await this?.repository?.delete?.(ids);  

    // 删除redis缓存
    this?.redisService?.del?.(NoticeService?.TABLE_NAME + `:arr`);                
  }

  /**
   * 更新通知消息
   * @param obj - 通知消息对象
   * @returns 更新后的通知消息对象
   */
  public async update(obj: Notice): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";

    // 删除redis缓存

    const key = NoticeService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);   

    // 删除redis缓存
    this?.redisService?.del?.(NoticeService?.TABLE_NAME + `:arr`);                

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      NoticeService?.TABLE_NAME,
      [],
      obj?.id
    );

    if (uniqueText) {
      // 某unique字段值已存在，抛出异常，程序处理终止
      log = uniqueText + "已存在，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    // 新增数据，主键id的随机字符串值，由后端typeorm提供
    if (!obj?.id) {
      log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
      delete obj?.id;
      await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, NoticeService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }

      return {};
    }

    let old: Notice = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供
      await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, NoticeService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
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
