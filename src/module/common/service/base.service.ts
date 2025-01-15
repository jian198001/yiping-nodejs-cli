// 引入Midway.js的装饰器，用于依赖注入和配置注入
import { Config, Inject, Provide } from "@midwayjs/decorator";
// 引入自定义的MySQL查询工具函数
import { query } from "../dao/mysql";
// 引入分页模型
import { Page } from "../model/Page";
// 引入请求参数模型
import { ReqParam } from "../model/ReqParam";

// 引入lodash库，用于处理数组、对象等数据
import _ = require("lodash");
// 引入Redis服务，用于缓存数据
import { RedisService } from "@midwayjs/redis";

/**
 * SQL工具模块，包含各种SQL语句处理函数
 * @module sqlUtils
 */
const sqlUtils: any = require("../utils/sqlUtils"),
  /**
   * 数组工具模块，包含各种数组处理函数
   * @module arrayUtils
   */
  arrayUtils: any = require("../utils/arrayUtils"),
  /**
   * 对象工具模块，包含各种对象处理函数
   * @module objUtils
   */
  objUtils: any = require("../utils/objUtils"),
  /**
   * 分页工具模块，包含各种分页处理函数
   * @module pageUtils
   */
  pageUtils: any = require("../utils/pageUtils");

/**
 * 基础服务类，提供通用的服务功能。
 * 该类使用 Midway.js 的装饰器 `@Provide` 来标记为一个服务提供者，
 * 可以被其他类通过依赖注入使用。
 */
@Provide()
export abstract class BaseService {
  /**
   * 注入 Redis 服务实例，用于缓存数据。
   * 该属性通过 Midway.js 的 `@Inject` 装饰器进行依赖注入。
   */
  @Inject()
  protected redisService: RedisService;

  /**
   * 配置属性，用于存储 MySQL 数据库的配置信息。
   * 该属性通过 Midway.js 的 `@Config` 装饰器注入，配置键为 "typeorm"。
   */
  @Config("typeorm")
  private mysqlConf: any = null;

  /**
   * 静态属性，定义了一个 SQL 查询语句模板。
   * 该 SQL 语句用于查询表中的所有字段，并添加了一些别名，
   * 如将 `name` 字段别名为 `label` 和 `text`，将 `id` 字段别名为 `value`。
   */
  protected static selSql = `
    SELECT t.*
    , t.name AS label
    , t.name AS text
    , t.id AS value
  `;

  /**
   * 分页查询基础方法
   *
   * @param selectSql - 查询的字段
   * @param fromSql - 查询的表
   * @param whereSql - 查询的条件
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  protected async pageBase(
    selectSql: string,
    fromSql: string,
    whereSql = "",
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    if (!page) {
      page = new Page();
    }

    // 构造查询总条数的SQL
    const sqlCount: string = sqlUtils?.selectCount?.(fromSql, whereSql);

    // 执行查询总条数的SQL
    const resultCount: any = await this?.query?.(sqlCount);

    // 获取查询结果的第一条数据
    const head: any = _?.head?.(resultCount);

    // 如果查询结果为空，直接返回分页对象
    if (head?.count_0 < 1) {
      return page;
    }

    // 设置分页对象的总条数
    page.total = head?.count_0;

    if (!reqParam) {
      reqParam = new ReqParam();
    }

    // 设置默认排序
    reqParam = pageUtils?.defaultSort?.(reqParam);

    if (!page) {
      page = new Page();
    }

    // 构造分页查询的SQL
    const sql: string = sqlUtils?.selectPage?.(
      selectSql,
      fromSql,
      whereSql,
      sqlUtils?.orderBy?.(reqParam?.sortName, "t", reqParam?.sortOrder),
      sqlUtils?.limit?.(
        sqlUtils?.getStart?.(page?.pageNum, page?.pageSize),
        page?.pageSize,
        page?.total
      )
    );

    console.log(sql);

    // 执行分页查询的SQL
    const result: any[] = await this?.query?.(sql);

    if (result) {
      // 将查询结果的字段名转换为驼峰命名
      page.list = arrayUtils?.camelCase?.(result);
    }

    return page;
  }

  /**
   * 根据ID查询基础方法
   *
   * @param id - 查询的ID
   * @param selectSql - 查询的字段
   * @param fromSql - 查询的表
   * @returns 返回查询结果
   */
  protected async getByIdBase(
    id: string,
    selectSql: string,
    fromSql: string
  ): Promise<any> {
    // 构造查询条件
    const whereSql: string = sqlUtils?.where?.({ id: id }, "t");

    // 构造查询的SQL
    const sql: string = sqlUtils?.selectPage?.(selectSql, fromSql, whereSql);

    // 执行查询的SQL
    const result: any[] = await this?.query?.(sql);

    if (!result) {
      return {};
    }

    // 将查询结果的字段名转换为驼峰命名
    return objUtils?.camelCase?.(_?.head?.(result));
  }

  /**
   * 查询数组基础方法
   *
   * @param reqParam - 请求参数
   * @param selectSql - 查询的字段
   * @param fromSql - 查询的表
   * @param whereSql - 查询的条件
   * @returns 返回查询结果数组
   */
  protected async arrBase(
    reqParam: ReqParam,
    selectSql: string,
    fromSql: string,
    whereSql = " "
  ): Promise<any[]> {
    if (!reqParam) {
      reqParam = new ReqParam();
    }

    // 构造查询的SQL
    const sql: string = sqlUtils?.selectPage?.(
      selectSql,
      fromSql,
      whereSql,
      sqlUtils?.orderBy?.(reqParam?.sortName, "t", reqParam?.sortOrder),
      " "
    );

    console.log(sql);

    // 执行查询的SQL
    let result: any[] = await this?.query?.(sql);

    // 将查询结果的字段名转换为驼峰命名
    result = arrayUtils?.camelCase?.(result);

    return result;
  }

  /**
   * 查询基础方法
   *
   * @param sql - 查询的SQL
   * @returns 返回查询结果数组
   */
  protected async query(sql: string): Promise<any[]> {
    // 执行查询的SQL
    let result: any[] = await query?.(sql, this?.mysqlConf);

    if (!result || result.length < 1) {
      return result;
    }

    // 将查询结果的字段名转换为驼峰命名
    result = arrayUtils?.camelCase?.(result);

    return result;
  }

  /**
   * 排序基础方法
   *
   * @param id - 排序的ID
   * @param prevId - 前一个ID
   * @param nextId - 后一个ID
   * @param tableName - 排序的表名
   * @returns 返回排序后的序号
   */
  protected async sortOrder(
    id: string,
    prevId: string,
    nextId: string,
    tableName: string
  ): Promise<number> {
    // 排序

    let orderNum = 0;

    // 查询当前ID的序号
    const aniesOrderNum: any[] = await this?.query?.(
      ` SELECT t.order_num FROM ${tableName} t WHERE t.id = '${id}' `
    );

    if (aniesOrderNum) {
      orderNum = aniesOrderNum?.[0]?.order_num;
    }

    let orderNumPrev = 0;

    let orderNumNext = 0;

    if (!prevId && !nextId) {
      // 新增数据

      // 查询表中的记录数
      const aniesCount: any[] = await this?.query?.(
        ` SELECT COUNT(*) AS count_0 FROM ${tableName} `
      );

      let count = 0;

      if (aniesCount) {
        count = aniesCount?.[0]?.count_0;
      }

      if (count < 2) {
        // 只有自己这一条新增记录，代表插入的是第一条记录

        orderNum = 1073741823;

        // 更新当前ID的序号
        await this?.query?.(
          ` UPDATE ${tableName} SET order_num = ${orderNum} WHERE id = '${id}' `
        );

        return orderNum;
      } else {
        // 表中已有记录，这是在最后插入记录

        // 查询表中的最小序号
        const anies: any[] = await this?.query?.(
          ` SELECT MIN(t.order_num) AS min_order_num FROM ${tableName} t `
        );

        if (anies) {
          orderNumNext = anies?.[0]?.min_order_num;
        }

        // 计算当前ID的序号
        orderNum = await this?.getOrderNum?.(orderNumPrev, orderNumNext);

        // 更新当前ID的序号
        await this?.query?.(
          ` UPDATE ${tableName} SET order_num = ${orderNum} WHERE id = '${id}' `
        );

        return orderNum;
      }
    }

    // 拖拽排序

    if (!prevId) {
      // 查询后一个ID的序号
      const sqlNext = ` SELECT t.order_num FROM ${tableName} t WHERE t.id = '${nextId}' `;

      const aniesNext: any[] = await this?.query?.(sqlNext);

      if (aniesNext) {
        orderNumNext = aniesNext?.[0]?.order_num;
      }

      // 得到比当前id小

      const sqlMaxOrderNum = ` SELECT MAX(t.order_num) AS max_order_num FROM ${tableName} t WHERE t.order_num < ( SELECT order_num FROM ${tableName} WHERE id = '${id}' ) `;

      const aniesPrev: any[] = await this?.query?.(sqlMaxOrderNum);

      if (aniesPrev) {
        orderNumPrev = aniesPrev[0]?.order_num;
      }

      orderNum = await this?.getOrderNum?.(orderNumPrev, orderNumNext);

      await this?.query?.(
        ` UPDATE ${tableName} SET order_num = ${orderNum} WHERE id = '${id}' `
      );

      return orderNum;
    }

    if (!nextId) {
      const sqlPrev = ` SELECT t.order_num FROM ${tableName} t WHERE t.id = '${prevId}' `;

      const aniesPrev: any[] = await this?.query?.(sqlPrev);

      if (aniesPrev) {
        orderNumPrev = aniesPrev?.[0]?.order_num;
      }

      const sqlMinOrderNum = ` SELECT MIN(order_num) AS min_order_num FROM ${tableName} t WHERE t.order_num > ( SELECT order_num FROM ${tableName} WHERE id = '${id}'  ) `;

      const anies: any[] = await this?.query?.(sqlMinOrderNum);

      if (anies) {
        orderNumNext = anies?.[0]?.min_order_num;
      }

      if (!orderNumNext || orderNumNext > 2147483646) {
        orderNumNext = 2147483640;
      }

      orderNum = await this?.getOrderNum?.(orderNumPrev, orderNumNext);

      await this?.query?.(
        ` UPDATE ${tableName} SET order_num = ${orderNum} WHERE id = '${id}' `
      );

      return orderNum;
    }

    // 只有前一条的id，后一条id为空

    // 同时有前一条和后一条的id

    const sqlPrev = ` SELECT t.order_num FROM ${tableName} t WHERE t.id = '${prevId}' `;

    const aniesPrev: any[] = await this?.query?.(sqlPrev);

    if (aniesPrev) {
      orderNumPrev = aniesPrev?.[0]?.order_num;
    }

    const sqlNext = ` SELECT t.order_num FROM ${tableName} t WHERE t.id = '${nextId}' `;

    const aniesNext: any[] = await this?.query?.(sqlNext);

    if (aniesNext) {
      orderNumNext = aniesNext?.[0]?.order_num;
    }

    orderNum = await this?.getOrderNum?.(orderNumPrev, orderNumNext);

    await this?.query?.(
      ` UPDATE ${tableName} SET order_num = ${orderNum} WHERE id = '${id}' `
    );

    return orderNum;
  }
  /**
   * 获取排序序号
   *
   * @param {number} orderNumPrev - 前一个排序序号，默认为0
   * @param {number} orderNumNext - 后一个排序序号，默认为0
   * @returns {Promise<number>} 返回计算后的排序序号
   */
  protected async getOrderNum(
    orderNumPrev = 0,
    orderNumNext = 0
  ): Promise<number> {
    // 初始化排序序号差值
    let orderNumSub = 0;

    // 根据前一个和后一个排序序号的大小关系计算差值
    if (orderNumPrev > orderNumNext) {
      // 使用lodash的subtract方法计算差值
      orderNumSub = _?.subtract?.(orderNumPrev, orderNumNext);
    } else {
      // 使用lodash的subtract方法计算差值
      orderNumSub = _?.subtract?.(orderNumNext, orderNumPrev);
    }

    // 将差值除以2并向下取整
    const orderNumSubDec: number = _?.floor(_?.divide?.(orderNumSub, 2));

    // 根据前一个和后一个排序序号的大小关系返回计算后的排序序号
    if (orderNumPrev > orderNumNext) {
      return orderNumPrev + orderNumSubDec;
    }

    return orderNumNext + orderNumSubDec;
  }
  /**
   * 为树形结构中的叶子节点生成唯一的代码值
   *
   * @param parentCode - 父节点的代码值，如果没有父节点则为空字符串
   * @param tableName - 要查询的表名
   * @param len - 代码的固定长度，默认为4
   * @param columnName - 存储代码值的列名，默认为"code"
   * @returns 生成的唯一代码值
   */
  public async getCode(
    parentCode: string,
    tableName: string,
    len = 4,
    columnName = "code"
  ): Promise<string> {
    // 在树形结构中，为每一个叶子节点，生成对应的code值
    // 子节点生成的code值，会在父节点的code值基础上，增加固定长度的后缀
    // 方便数据库查询时，根据父节点找到对应的所有子孙节点，并根据子孙节点，快速找到对应的父节点
    // 计算新的代码长度，如果有父节点，则长度为父节点代码长度加上固定长度
    let newCodeLen = len;
    if (parentCode) {
      newCodeLen = parentCode?.length + len;
    }
    // 构建查询SQL，查找指定长度且符合父节点前缀的最大代码值
    let sql = ` SELECT MAX(t.${columnName}) AS max_code FROM ${tableName} t WHERE LENGTH(t.${columnName}) = ${newCodeLen} `;
    if (parentCode) {
      sql += ` AND ${columnName} LIKE '${parentCode}%' `;
    }
    const results = await this?.query?.(sql);
    const maxCode = results?.[0]?.max_code;
    if (!maxCode) {
      // TODO
      let code = _?.padStart?.("1", len, "0");
      if (parentCode) {
        code = parentCode + code;
      }
      return code;
    }
    // 取得当前parentCode下面的最大值的code的值
    const codeNew = parseInt?.(maxCode) + 1;
    // 设置当前的code为parentCode+code+1的值
    const code = _?.padStart?.(codeNew + "", newCodeLen, "0");
    return code;
  }

  /**
   * 检查给定表中的列值是否唯一
   *
   * @param tableName - 要检查的表名
   * @param columnArr - 要检查的列数组，每个元素包含label和value属性
   * @param id - 可选的ID，用于排除当前记录
   * @returns 如果有重复的值，返回重复的文本，否则返回空字符串
   */
  protected async unique(
    tableName = "",
    columnArr: any[] = [],
    id = ""
  ): Promise<string> {
    // 查询列值是否重复
    // 将表名转换为小写并使用snake_case格式
    tableName = _?.lowerFirst?.(tableName);
    tableName = _?.snakeCase?.(tableName);
    // 构建查询SQL
    const sql = ` SELECT COUNT(*) AS count_0 FROM ${tableName} t WHERE 1>0 `;
    // 如果列数组为空，直接返回
    if (!columnArr) {
      return "";
    }
    // 构建ID条件
    let sqlId = ` `;
    if (id) {
      sqlId = ` AND t.id != '${id}' `;
    }
    // 遍历列数组
    for (const element of columnArr) {
      let label = element?.label;
      const value = element?.value;
      // 将列名转换为小写并使用snake_case格式
      label = _?.lowerFirst?.(label);
      label = _?.snakeCase?.(label);
      // 构建查询条件
      const sqlWhere = sql + ` AND t.${label} = '${value}' ` + sqlId;
      // 执行查询
      const arr = await this?.query?.(sqlWhere);
      const count = arr?.[0]?.count_0;
      // 如果有重复值，返回重复的文本
      if (count > 0) {
        return element?.text;
      }
    }
    // 如果没有重复值，返回空字符串
    return "";
  }
}
