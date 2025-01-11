import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Article } from "../../entity/Article";
import { ILogger } from "@midwayjs/logger";

import * as sqlUtils from "../common/utils/sqlUtils";

import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

/**
 * 文章服务类
 * 提供文章的增删改查以及分页查询功能
 */
@Provide()
export class ArticleService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "article";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${ArticleService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;

  // 注入Article实体的Repository
  @InjectEntityModel(Article)
  private repository: Repository<Article> = null;

  /**
   * 分页查询文章
   * @param categoryId - 分类ID
   * @param query - 查询条件字符串
   * @param params - 前端传递的参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    categoryId = "",
    query = "",
    params: string,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 分页列表查询数据

    this?.logger?.debug?.(
      "分页列表,如pageSize < 1,则不分页，查询全部数据并返回"
    );

    let whereSql = " "; // 查询条件字符串

    if (categoryId) {
      whereSql += ` AND t.category_id = '${categoryId}' `; // 根据分类ID筛选文章
    }

    whereSql += sqlUtils?.like?.(["title"], reqParam?.searchValue); // 处理前端的搜索字符串的搜索需求

    // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql +=
      sqlUtils?.whereOrFilters?.(reqParam?.filters) +
      sqlUtils?.mulColumnLike?.(
        strUtils?.antParams2Arr?.(JSON?.parse?.(params), [
          "current",
          "pageSize",
        ])
      ) +
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
   * 根据ID查询文章
   * @param id - 文章ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }

  /**
   * 删除文章
   * @param ids - 文章ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = ArticleService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);
  }

  /**
   * 更新文章
   * @param obj - 文章对象
   * @returns 更新后的文章对象
   */
  public async update(obj: Article): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";

    log = "更新,新增数据和修改数据,都是使用此方法";

    this?.logger.debug(log);

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
          ArticleService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }

    let old: Article = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          ArticleService?.TABLE_NAME
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
}
