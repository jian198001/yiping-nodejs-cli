import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Dept } from "../../entity/Dept";
import { ILogger } from "@midwayjs/logger";

import { Zero0Error } from "../common/model/Zero0Error";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

const arrayUtils: any = require("../common/utils/arrayUtils"),
  treeUtils: any = require("../common/utils/treeUtils");

/**
 * 部门服务类
 * 提供部门的增删改查、分页查询以及根据角色ID获取部门列表等功能
 */
@Provide()
export class DeptService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "dept";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${DeptService?.TABLE_NAME} t `;

  // 查询结果集要返回的列名称，其中label和value是给select组件的option使用 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;

  // 注入Dept实体的Repository
  @InjectEntityModel(Dept)
  private repository: Repository<Dept> = null;

  /**
   * 分页查询部门
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

    // 处理前端的搜索字符串的搜索需求
    whereSql += sqlUtils?.like?.(["name"], reqParam?.searchValue);
    // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
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
   * 根据ID查询部门
   * @param id - 部门ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }

  /**
   * 根据ID删除部门及其子部门
   * @param id - 部门ID
   * @returns 无返回值
   */
  public async del(id: string): Promise<void> {
    let newVar: any[] = [];

    // 将数组中的键名转换为驼峰命名
    newVar = arrayUtils?.camelCase?.(newVar);

    // 处理树形结构数据
    const treeData = arrayUtils?.handleTree(newVar);

    let children: any = null;

    // 遍历树形数据，查找指定ID的子节点
    for (const treeOne of treeData) {
      if (!children) {
        children = treeUtils.getChildren(treeOne, id);
      }
    }

    const ids: string[] = [];

    // 获取子节点的所有ID
    treeUtils.getIds(children, ids);

    // 批量删除部门及其子部门
    await this?.repository
      ?.createQueryBuilder()
      .delete?.()
      .from(Dept)
      .whereInIds(ids)
      .execute();
  }

  /**
   * 更新部门
   * @param obj - 部门对象
   * @returns 更新后的部门对象
   */
  public async update(obj: Dept): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";
    // 删除redis缓存

    const key = DeptService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      DeptService?.TABLE_NAME,
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

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, DeptService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }

      if (!obj?.code) {
        await this?.updateCode(obj);
      }

      return obj;
    }

    let old: Dept = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, DeptService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }

      if (!obj?.code) {
        await this?.updateCode(obj);
      }

      return obj;
    }

    delete obj?.id;

    old = {
      ...old,

      ...obj,
    };

    await this?.repository?.save?.(old); // 修改数据

    if (!old?.code) {
      await this?.updateCode(old);
    }
    return old;
  }

  /**
   * 更新部门代码
   * @param obj - 部门对象
   * @returns 无返回值
   */
  private async updateCode(obj: Dept): Promise<void> {
    // 如果parentCode为空，则生成一个4位的code

    const parentId = obj.code;

    if (!parentId) {
      // TODO 如果parentId为空，则从当前级别code中选取最大的code来加1

      obj.code = await super.getCode?.(null, DeptService?.TABLE_NAME, 4);

      await this?.repository?.save?.(obj);

      return;
    }

    const parent: Dept = await this?.repository?.findOneById?.(parentId);

    const parentCode = parent?.code;

    const code = await super.getCode?.(parentCode, DeptService?.TABLE_NAME, 4);

    obj.code = code;

    await this?.repository?.save?.(obj);
  }

  public async getListByRoleId(roleId: string): Promise<string[]> {
    let sql = ` select d.id from dept d left join role_dept_map rd on d.id = rd.dept_id where rd.role_id = '${roleId}' `;

    sql = sql + " order by d.parent_id, d.order_num ";

    const newVar: any[] = await this?.query?.(sql);

    if (!newVar) {
      return [];
    }

    const ret: string[] = [];

    for (const newVarOne of newVar) {
      const menuId = newVarOne.id;

      ret.push?.(menuId);
    }

    return ret;
  }
}
