import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { GoodsPropertiesKey } from "../../entity/GoodsPropertiesKey";

import { ILogger } from "@midwayjs/logger";
import { GoodsPropertiesValue } from "../../entity/GoodsPropertiesValue";

import { Zero0Error } from "../common/model/Zero0Error";

import _ = require("lodash");

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";

/**
 * 商品属性服务类
 */
@Provide()
export class GoodsPropertiesService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "goods_properties_key";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${GoodsPropertiesService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  


        , (t.name) AS k
        , (t.id) AS k_id

     `;

  // 注入商品属性键实体模型
  @InjectEntityModel(GoodsPropertiesKey)
  private repository: Repository<GoodsPropertiesKey> = null;

  // 注入商品属性值实体模型
  @InjectEntityModel(GoodsPropertiesValue)
  private goodsPropertiesValueRepository: Repository<GoodsPropertiesValue> =
    null;

  // 价格单位转换因子
  private priceUnit = 0.01;

  /**
   * 分页查询商品属性数据
   * @param query - 查询字符串
   * @param params - 参数对象
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    query = "",
    params: any,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 分页列表查询数据

    // 查询条件字符串
    let whereSql = " ";

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
   * 根据ID查询商品属性数据
   * @param id - 商品属性ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }

  /**
   * 删除商品属性数据
   * @param ids - 商品属性ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除商品属性数据
    await this?.repository?.delete?.(ids);
  }

  /**
   * 更新商品属性数据
   * @param obj - 商品属性对象
   * @returns 更新后的商品属性对象
   */
  public async update(obj: GoodsPropertiesKey): Promise<GoodsPropertiesKey> {
    // 一个表进行操作 typeORM

    let log = "";

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      GoodsPropertiesService?.TABLE_NAME,
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
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          GoodsPropertiesService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }

    let old: GoodsPropertiesKey = await this?.repository?.findOneById?.(
      obj?.id
    ); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          GoodsPropertiesService?.TABLE_NAME
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
   * 从购物车属性中获取中文描述
   * @param properties - 购物车属性字符串
   * @returns 中文描述字符串
   */
  public async getCnStrFromCart(properties: string): Promise<string> {
    return null;
  }

  /**
   * 从购物车属性中获取初始SKU
   * @param properties - 购物车属性字符串
   * @returns 初始SKU对象
   */
  public async getInitialSkuFromCart(properties: string): Promise<object> {
    return null;
  }

  /**
   * 将字符串转换为布尔值
   * @param multiple - 字符串值
   * @returns 布尔值
   */
  public async toBoolean(multiple: string): Promise<boolean> {
    if (!multiple) {
      return false;
    }

    if (multiple === "1") {
      return true;
    }

    return false;
  }

  /**
   * 获取商品属性列表
   * @param goodsId - 商品ID
   * @returns 商品属性列表
   */
  public async list(goodsId: string): Promise<any[]> {
    this?.logger?.info?.("取得商品对应的可加价属性名及属性值信息");

    const whereSql = " AND t.goods_id = '#{goodsId}' ";

    const anies: any[] = await super.arrBase?.(
      null,
      this?.selectSql,
      this?.fromSql,
      whereSql
    );

    if (!anies) {
      return [];
    }

    for (const any of anies) {
      any.is_multiple = false;

      const multiple: string = any.multiple;

      if (multiple === "1") {
        any.is_multiple = true;

        const goodsPropertiesValues: any[] = [];

        for (const goodsPropertiesValue of goodsPropertiesValues) {
          let price: number = goodsPropertiesValue.price;

          price = _?.divide?.(price, this?.priceUnit);

          goodsPropertiesValue.price = price;
        }

        any.v = goodsPropertiesValues;
      }

      if (!anies) {
        return [];
      }

      return anies;
    }
  }

  public async save(map: any): Promise<void> {
    if (!map) {
      return;
    }

    const goodsId: string = map?.goodsId;

    this?.logger?.info?.("遍历此商品对应的旧的规格名,把对应的规格值删除");

    const sql =
      " DELETE FROM goods_properties_value WHERE goods_properties_key_id IN ( SELECT id FROM goods_properties_key WHERE goods_id = '#{goodsId}' ) ";

    await this?.query?.(sql);

    this?.logger?.info?.("删除此商品对应的旧的规格名");

    const goodsPropertiesKey: GoodsPropertiesKey = new GoodsPropertiesKey();

    goodsPropertiesKey.goodsId = goodsId;

    await this?.repository?.remove(goodsPropertiesKey);

    const data: any[] = map?.data;

    if (!data) {
      return;
    }

    for (const any of data) {
      let goodsPropertiesKey1: GoodsPropertiesKey = new GoodsPropertiesKey();

      goodsPropertiesKey1 = _?.assign?.(goodsPropertiesKey1, any);

      await this?.repository?.save?.(goodsPropertiesKey1);

      const v: any[] = any.v;

      if (!v) {
        continue;
      }

      for (const vElement of v) {
        let goodsPropertiesValue: GoodsPropertiesValue =
          new GoodsPropertiesValue();

        goodsPropertiesValue = _?.assign?.(goodsPropertiesValue, vElement);

        goodsPropertiesValue.goodsPropertiesKeyId = goodsPropertiesKey1.id;

        await this?.goodsPropertiesValueRepository?.save?.(
          goodsPropertiesValue
        );
      }
    }
  }
}
