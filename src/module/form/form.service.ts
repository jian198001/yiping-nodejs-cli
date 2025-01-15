import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Form } from "../../entity/Form";

import { ILogger } from "@midwayjs/logger";

import { Zero0Error } from "../common/model/Zero0Error";

import _ = require("lodash");

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";

import moment = require("moment");

/**
 * 表单服务类
 * 提供表单的增删改查以及分页查询功能
 */
@Provide()
export class FormService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "form";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${FormService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;

  // 注入Form实体的Repository
  @InjectEntityModel(Form)
  private repository: Repository<Form> = null;

  private log = "";

  /**
   * 分页查询表单
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

    whereSql += sqlUtils?.like?.(["name"], reqParam?.searchValue); // 处理前端的搜索字符串的搜索需求

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
   * 根据ID查询表单
   * @param id - 表单ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }

  /**
   * 根据Code查询表单
   * @param code - 表单Code
   * @returns 查询结果
   */
  public async getByCode(code = ""): Promise<any> {
    // 根据id查询一条数据

    const whereSql = ` AND t.code = '${code}' `; // 构造查询条件

    const arr: any[] = await super.arrBase?.(
      null,
      this?.selectSql,
      this?.fromSql,
      whereSql
    );

    if (arr && arr?.length) return arr?.[0];

    return {};
  }

  /**
   * 删除表单
   * @param ids - 表单ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = FormService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);
  }

  /**
   * 更新表单
   * @param obj - 表单对象
   * @returns 更新后的表单对象
   */
  public async update(obj: Form): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";

    if (!obj.code) {
      obj.code =
        moment().format?.("YYYYMMDDHHmmss") + _?.random?.(10, 99, false);
    }

    console.log(obj.code);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      FormService?.TABLE_NAME,
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
    // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      log = "新增数据，主键id的随机字符串值，由后端typeorm提供";

      delete obj?.id;

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, FormService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }
      return {};
    }

    let old: Form = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    console.log(JSON.stringify(old));

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, FormService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
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
