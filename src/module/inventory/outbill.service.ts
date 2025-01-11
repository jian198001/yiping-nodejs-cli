import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Outbill } from "../../entity/Outbill";
import { Zero0Error } from "../common/model/Zero0Error";
import { ILogger } from "@midwayjs/logger";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";

import { OutbillItem } from "../../entity/OutbillItem";
import { Stock } from "../../entity/Stock";
import { Consume } from "../../entity/Consume";
import _ = require("lodash");

/**
 * 出库单服务类
 * 提供出库单的增删改查以及物料领用等功能
 */
@Provide()
export class OutbillService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;
  // 查询的数据库表名称
  private static TABLE_NAME = "outbill";
  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${OutbillService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  `;
  // 注入Outbill实体的Repository
  @InjectEntityModel(Outbill)
  private repository: Repository<Outbill> = null;
  // 注入Stock实体的Repository
  @InjectEntityModel(Stock)
  private stockRepository: Repository<Stock> = null;
  // 注入OutbillItem实体的Repository
  @InjectEntityModel(OutbillItem)
  private outbillItemRepository: Repository<OutbillItem> = null;
  // 注入Consume实体的Repository
  @InjectEntityModel(Consume)
  private consumeRepository: Repository<Consume> = null;
  /**
   * 分页查询出库单
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
    whereSql += sqlUtils?.like?.(["name"], reqParam?.searchValue); // 处理前端的搜索字符串的搜索需求
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
   * 根据ID查询出库单
   * @param id - 出库单ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = OutbillService.TABLE_NAME + `:${id}`;

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
   * 删除出库单
   * @param ids - 出库单ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = OutbillService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);
  }
  /**
   * 更新出库单
   * @param obj - 出库单对象
   * @returns 更新后的出库单对象
   */
  public async update(obj: Outbill): Promise<any> {
    // 一个表进行操作 typeORM
    let log = ""; // 删除redis缓存

    const key = OutbillService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      OutbillService?.TABLE_NAME,
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
          OutbillService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }
    let old: Outbill = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供
      await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          OutbillService?.TABLE_NAME
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
   * 物料领用
   * @param obj - 出库单对象
   * @param items - 出库单项数组
   * @param staffId - 员工ID
   * @returns 更新后的出库单对象
   */
  public async consume(
    obj: Outbill,
    items: OutbillItem[],
    staffId: string
  ): Promise<Outbill> {
    // 一个表进行操作 typeORM 物料领用
    let log = ""; // 删除redis缓存

    const key = OutbillService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      OutbillService?.TABLE_NAME,
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
    for (const item of items) {
      item.billId = obj?.id;
    }
    await this?.updateItems(items, staffId);
    // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改
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
          OutbillService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }
    let old: Outbill = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供
      await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          OutbillService?.TABLE_NAME
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
  private async updateItems(items: any[], staffId: string): Promise<void> {
    if (!items) {
      return;
    }
    for (const item of items) {
      await this?.outbillItemRepository?.save?.(item);
      // 减少相应库存
      const stock = await this?.stockRepository?.findOneById?.(item?.id);
      stock.quantity = stock?.quantity - item?.consumeQuantity;
      await this?.stockRepository?.save?.(stock);
      // 领用人信息中增加此物料数量
      let consumeNew = {
        materialId: item?.materialId,
        staffId: staffId,
        quantity: item?.consumeQuantity,
      };
      const consume = await this?.consumeRepository.findOne?.({
        where: { materialId: consumeNew?.materialId, staffId: staffId },
      });
      if (!consume) {
        await this?.consumeRepository?.save?.(consumeNew);
        continue;
      }
      consume.quantity = consume?.quantity + item?.consumeQuantity;
      await this?.consumeRepository?.save?.(consume);
      continue;
    }
  }
  // 采购入库->purchase采购信息->inbill->形成入库单，记录入库信息->stock库存信息
  // 领用出库->stock库存信息->outbill->形成出库单，记录出库信息
  // 领用信息表->谁领用了哪些物料 staffId materialId quantity
  // 归还入库->inbill->形成入库单，记录归还入库信息->stock库存信息
}
