import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Stock } from "../../entity/Stock";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import { Zero0Error } from "../common/model/Zero0Error";
import { ILogger } from "@midwayjs/core";

/**
 * 库存服务类
 * 提供库存的分页查询、根据ID查询、删除、更新、增加库存等功能
 */
@Provide()
export class StockService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "stock";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${StockService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql} 
  , ( SELECT name FROM material WHERE t.material_id = material.id ) AS material_name
  , ( SELECT sku AS material_sku FROM material WHERE t.material_id = material.id ) AS material_sku 
     `;
  // 注入Stock实体的Repository
  @InjectEntityModel(Stock)
  private repository: Repository<Stock> = null;
  /**
   * 分页查询库存
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

    // 缓存中有此数据，直接返回
    if (page?.pageSize < 1) {
      // 查看缓存中是否有此数据

      const key = StockService?.TABLE_NAME + `:arr`;

      const data = await this?.redisService?.get?.(key);

      if (data) {
        const parse = JSON?.parse?.(data);

        return parse;
      }
    }

    let whereSql = " AND t.quantity > 0 "; // 查询条件字符串

    if (reqParam?.searchValue) {
      whereSql += ` AND t.material_id IN ( SELECT id FROM material WHERE name LIKE '%${reqParam?.searchValue}%' ) `;
    }

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
    const data = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    );

    console?.log?.("test");

    console?.log?.(JSON?.stringify?.(data));

    return data;
  }
  /**
   * 根据ID查询库存
   * @param id - 库存ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = StockService?.TABLE_NAME + `:${id}`;

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
   * 根据ID数组删除库存
   * @param ids - 库存ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = StockService?.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);

    // 删除redis缓存
    // 删除redis缓存
    this?.redisService?.del?.(StockService?.TABLE_NAME + `:arr`);
  }
  /**
   * 更新库存
   * @param obj - 库存对象
   * @returns 更新后的库存对象
   */
  public async update(obj: Stock): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";
    // 删除redis缓存

    const key = StockService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 删除redis缓存
    this?.redisService?.del?.(StockService?.TABLE_NAME + `:arr`);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      StockService?.TABLE_NAME,
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
    }

    this?.logger?.info?.("新增或修改商品");

    await this?.repository?.save?.(obj); // insert update

    if (!obj?.orderNum) {
      await super.sortOrder?.(obj?.id, null, null, StockService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
    }
    return {};
  }
  /**
   * 增加库存
   * @param obj - 库存对象
   * @returns 增加后的库存对象
   */
  public async add(obj: Stock): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";
    // 删除redis缓存

    const key = StockService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 删除redis缓存
    this?.redisService?.del?.(StockService?.TABLE_NAME + `:arr`);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      StockService?.TABLE_NAME,
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
    }

    this?.logger?.info?.("新增或修改商品");

    await this?.repository?.save?.(obj); // insert update

    if (!obj?.orderNum) {
      await super.sortOrder?.(obj?.id, null, null, StockService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
    }
    return {};
  }
}
