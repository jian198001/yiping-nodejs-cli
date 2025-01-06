import { Config, Inject, Provide } from "@midwayjs/decorator";
import { query } from "../dao/mysql";
import { Page } from "../model/Page";
import { ReqParam } from "../model/ReqParam";

import _ = require("lodash");
import { RedisService } from "@midwayjs/redis";

const sqlUtils: any = require("../utils/sqlUtils"),
  arrayUtils: any = require("../utils/arrayUtils"),
  objUtils: any = require("../utils/objUtils"),
  pageUtils: any = require("../utils/pageUtils");

@Provide()
export abstract class BaseService {

  @Inject()
  protected redisService: RedisService;

  @Config("typeorm")
  private mysqlConf: any = null;

  protected static selSql = ` SELECT t.*
  , t.name AS label
  , t.name AS text
  , t.id AS value `;
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
      return null;
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

  protected async getOrderNum(
    orderNumPrev = 0,
    orderNumNext = 0
  ): Promise<number> {
    let orderNumSub = 0;

    if (orderNumPrev > orderNumNext) {
      orderNumSub = _?.subtract?.(orderNumPrev, orderNumNext);
    } else {
      orderNumSub = _?.subtract?.(orderNumNext, orderNumPrev);
    }

    const orderNumSubDec: number = _?.floor(_?.divide?.(orderNumSub, 2));

    if (orderNumPrev > orderNumNext) {
      return orderNumPrev + orderNumSubDec;
    }

    return orderNumNext + orderNumSubDec;
  }

  public async getCode(
    parentCode: string,
    tableName: string,
    len = 4,
    columnName = "code"
  ): Promise<string> {
    // 在树形结构中，为每一个叶子节点，生成对应的code值
    // 子节点生成的code值，会在父节点的code值基础上，增加固定长度的后缀
    // 方便数据库查询时，根据父节点找到对应的所有子孙节点，并根据子孙节点，快速找到对应的父节点

    let newCodeLen = len;

    if (parentCode) {
      newCodeLen = parentCode?.length + len;
    }

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

  protected async unique(
    tableName = "",
    columnArr: any[] = [],
    id = ""
  ): Promise<string> {
    // 查询列值是否重复

    tableName = _?.lowerFirst?.(tableName);

    tableName = _?.snakeCase?.(tableName);

    const sql = ` SELECT COUNT(*) AS count_0 FROM ${tableName} t WHERE 1>0 `;

    if (!columnArr) {
      return null;
    }

    let sqlId = ` `;

    if (id) {
      sqlId = ` AND t.id != '${id}' `;
    }

    for (const element of columnArr) {
      let label = element?.label;

      const value = element?.value;

      label = _?.lowerFirst?.(label);

      label = _?.snakeCase?.(label);

      const sqlWhere = sql + ` AND t.${label} = '${value}' ` + sqlId;

      const arr = await this?.query?.(sqlWhere);

      const count = arr?.[0]?.count_0;

      if (count > 0) {
        return element?.text;
      }
    }

    return null;
  }
}
