import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Aftersale } from "../../entity/Aftersale";
import { ILogger } from "@midwayjs/logger";

import { Zero0Error } from "../common/model/Zero0Error";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

/**
 * 售后服务类
 */
@Provide()
export class AftersaleService extends BaseService {
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "aftersale";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${AftersaleService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;
  @InjectEntityModel(Aftersale)
  private repository: Repository<Aftersale> = null;
  /**
   * 分页查询售后服务记录
   * @param query - 查询字符串
   * @param params - 参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns Promise<any> - 返回分页查询结果
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
    whereSql +=
      sqlUtils?.mulColumnLike?.(
        strUtils?.antParams2Arr?.(parameters, ["current", "pageSize"])
      ) +
      sqlUtils?.like?.(["name"], reqParam?.searchValue) +
      sqlUtils?.whereOrFilters?.(reqParam?.filters) +
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
   * 根据ID查询售后服务记录
   * @param id - 售后服务记录ID
   * @returns Promise<any> - 返回查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = AftersaleService.TABLE_NAME + `:${id}`;

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
   * 删除售后服务记录
   * @param ids - 售后服务记录ID数组
   * @returns Promise<void> - 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = AftersaleService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);
  }
  /**
   * 更新售后服务记录
   * @param obj - 售后服务记录对象
   * @returns Promise<Aftersale> - 返回更新后的售后服务记录对象
   */
  public async update(obj: Aftersale): Promise<any> {
    // 一个表进行操作 typeORM
    let log = ""; // 删除redis缓存

    const key = AftersaleService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      AftersaleService?.TABLE_NAME,
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
          AftersaleService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }
    let old: Aftersale = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供
      await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          AftersaleService?.TABLE_NAME
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
  /**
   * 同意售后申请
   * @param orderId - 售后单号
   * @param addressId - 同意退货时传入地址id
   * @returns Promise<void> - 无返回值
   */
  public async acceptapply(orderId: string, addressId: string): Promise<void> {
    // 标识符名称来自微信小商店
    this?.logger?.info?.("同意售后");
    // orderId: 售后单号
    // address_id: 同意退货时传入地址id
  }
  /**
   * 拒绝退款申请
   * @param orderId - 售后单号
   * @param rejectReason - 拒绝原因
   * @returns Promise<void> - 无返回值
   */
  public async rejectrefund(
    orderId: string,
    rejectReason: string
  ): Promise<void> {
    // 标识符名称来自微信小商店
    this?.logger?.info?.("拒绝售后");
    // orderId: 售后单号
    // reject_reason: 拒绝原因
  }
}
