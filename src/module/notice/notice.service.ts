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
    console?.log(this?.log);

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

    if (page?.pageSize > 0) {
      return data;
    }

    if (page?.pageSize < 1) {
      // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, "value");
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

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = NoticeService.TABLE_NAME + `:${id}`;

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
  }

  /**
   * 更新通知消息
   * @param obj - 通知消息对象
   * @returns 更新后的通知消息对象
   */
  public async update(obj: Notice): Promise<Notice> {
    // 一个表进行操作 typeORM

    let log = "";

    // 删除redis缓存

    const key = NoticeService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      NoticeService?.TABLE_NAME,
      [{ label: "title", value: obj?.title, text: "标题" }],
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
      return null;
    }

    let old: Notice = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供
      await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, NoticeService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
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
}
