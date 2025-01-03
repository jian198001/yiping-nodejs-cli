// 导入依赖项
import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Zero0Error } from "../common/model/Zero0Error";
import { ILogger } from "@midwayjs/logger";

import { WxPayConfig } from "../../entity/WxPayConfig";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

/**
 * 微信支付配置服务类
 * 提供微信支付配置的分页查询、根据ID查询、删除、更新等功能
 */
@Provide()
export class WxPayConfigService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "wx_pay_config";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${WxPayConfigService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;

  // 注入WxPayConfig实体的Repository
  @InjectEntityModel(WxPayConfig)
  private repository: Repository<WxPayConfig> = null;

  /**
   * 分页查询微信支付配置
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

    let whereSql = " "; // 查询条件字符串

    let parameters: any[] = [];

    if (params && params.length > 3) {
      parameters = JSON?.parse?.(params);
    }

    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
    // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.like?.(['name'], reqParam?.searchValue) 处理前端的搜索字符串的搜索需求
    // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    // 处理前端的表格中筛选需求
    whereSql +=
      sqlUtils?.mulColumnLike?.(
        strUtils?.antParams2Arr?.(parameters, ["current", "pageSize"])
      ) +
      sqlUtils?.whereOrFilters?.(reqParam?.filters) +
      sqlUtils?.like?.(["name"], reqParam?.searchValue) +
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
   * 根据ID查询微信支付配置
   * @param id - 微信支付配置ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }

  /**
   * 删除微信支付配置
   * @param ids - 微信支付配置ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 根据id数组删除多条数据

    await this?.repository?.delete?.(ids);
  }

  /**
   * 更新微信支付配置
   * @param obj - 微信支付配置对象
   * @returns 更新后的微信支付配置对象
   */
  public async update(obj: WxPayConfig): Promise<WxPayConfig> {
    // 一个表进行操作 typeORM

    let log = "";

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      WxPayConfigService?.TABLE_NAME,
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
          WxPayConfigService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }

      return null;
    }

    let old: WxPayConfig = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          WxPayConfigService?.TABLE_NAME
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
