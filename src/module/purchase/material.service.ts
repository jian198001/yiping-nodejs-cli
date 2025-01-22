import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Material } from "../../entity/Material";

import { ILogger } from "@midwayjs/logger";
import { Zero0Error } from "../common/model/Zero0Error";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

/**
 * 物料服务类
 * 提供物料的分页查询、根据ID查询、删除、更新、上架、下架、库存统计、增加库存、减少库存等功能
 */
@Provide()
export class MaterialService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "material";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${MaterialService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = `  SELECT t.*
  , ( CONCAT(t.name, '-', t.sku)) AS label
  , ( CONCAT(t.name, '-', t.sku)) AS text
  , t.id AS value 
  , ( CASE t.approve_status WHEN 'onsale' THEN '上架出售中' ELSE '仓库中' END ) approve_status_cn
  , ( CASE t.sub_stock WHEN 'pay' THEN '付款减库存' WHEN 'delivery' THEN '出库减库存' ELSE '下单减库存' END ) AS sub_stock_cn
  , ( CASE t.delivery WHEN 'delivery' THEN '需物流' ELSE '电子凭证不需物流' END ) AS delivery_cn
        , ( length * breadth * height ) AS volume
     `;

  // 注入Material实体的Repository
  @InjectEntityModel(Material)
  private repository: Repository<Material> = null;

  /**
   * 分页查询物料
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

      const key = MaterialService?.TABLE_NAME + `:arr`;

      const data = await this?.redisService?.get?.(key);

      if (data) {
        const parse = JSON.parse(data);

        return parse;
      }
    }

    console.log("test page");

    let whereSql = " "; // 查询条件字符串

    let parameters: any[] = [];

    if (params && params.length > 3) {
      parameters = JSON?.parse?.(params);
    }

    // 处理前端的表格中筛选需求
    whereSql +=
      sqlUtils?.mulColumnLike?.(
        strUtils?.antParams2Arr?.(parameters, ["current", "pageSize"])
      ) +
      sqlUtils?.like?.(["name"], reqParam?.searchValue) +
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

    // 遍历查询结果,将查询结果中异步读取到redis

    this?.getToRedis?.(_?.map?.(data?.list, "id"));

    if (page?.pageSize > 0) {
      return data;
    }

    // 将查询结果中的数据列表存入redis
    this?.setArrToRedis?.(data?.list, MaterialService?.TABLE_NAME);

    // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
    return _?.keyBy?.(data?.list, "value");
  }

  private async getToRedis(ids) {
    // 根据id查询一条数据

    for (const id of ids) {
      await this?.getById?.(id);
    }
  }

  /**
   * 根据ID查询物料
   * @param id - 物料ID
   * @param shopBuyerId - 店铺买家ID
   * @returns 查询结果
   */
  public async getById(id: string): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }

  /**
   * 根据ID数组删除物料
   * @param ids - 物料ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = MaterialService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);

    // 删除redis缓存
    this?.redisService?.del?.(MaterialService?.TABLE_NAME + `:arr`);
  }

  /**
   * 更新物料
   * @param obj - 物料对象
   * @returns 更新后的物料对象
   */
  public async update(obj: Material): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";

    // 删除redis缓存

    const key = MaterialService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 删除redis缓存
    this?.redisService?.del?.(MaterialService?.TABLE_NAME + `:arr`);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      MaterialService?.TABLE_NAME,
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

    if (!obj?.name || !obj?.materialCategoryId || !obj?.materialSn) {
      log = "商品名称/商品分类/商品货号某些内容为空";

      throw new Zero0Error(log, "5000");
    }

    if (!obj.price || obj?.price < 0.01) {
      log = "商品价格设置错误";

      throw new Zero0Error(log, "5000");
    }

    if (!obj?.approveStatus) {
      obj.approveStatus = "instock";
    }

    if (!obj?.title) {
      obj.title = obj?.name;
    }

    if (!obj?.originPrice) {
      obj.originPrice = obj?.price;
    }

    if (!obj?.quota || obj?.quota < 1) {
      obj.quota = 1000000000;
    }

    if (!obj?.startSaleNum || obj?.startSaleNum < 1) {
      obj.startSaleNum = 1;
    }

    await this?.repository?.save?.(obj); // insert update

    if (!obj?.orderNum) {
      await super.sortOrder?.(obj?.id, null, null, MaterialService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
    }
    return {};
  }

  /**
   * 更新物料审批状态
   * @param id - 物料ID
   * @returns 更新后的物料对象
   */
  public async updateApproveStatus(id: string): Promise<object> {
    return {};
  }

  /**
   * 下架物料
   * @param materialId - 物料ID
   * @returns 无返回值
   */
  public async instock(materialId: string): Promise<void> {
    this?.logger?.info?.("商品下架");

    const material: Material = await this?.repository?.findOneById?.(
      materialId
    );

    material.approveStatus = "instock";

    await this?.repository?.save?.(material);

    return;
  }

  /**
   * 上架物料
   * @param materialId - 物料ID
   * @returns 无返回值
   */
  public async onsale(materialId: string): Promise<void> {
    this?.logger?.info?.("商品上架");

    const material: Material = await this?.repository?.findOneById?.(
      materialId
    );

    material.approveStatus = "onsale";

    await this?.repository?.save?.(material);

    return;
  }

  /**
   * 物料统计
   * @param shopId - 店铺ID
   * @returns 物料数量
   */
  public async materialCount(shopId: string): Promise<number> {
    return 0;
  }

  /**
   * 库存统计
   * @param materialId - 物料ID
   * @param materialSkuId - 物料SKU ID
   * @param skuList - SKU列表
   * @param quantity - 数量
   * @returns 无返回值
   */
  public async countStock(
    materialId: string,
    materialSkuId: string,
    skuList: string,
    quantity: number
  ): Promise<void> {
    let log = "";

    this?.logger?.info?.("判断商品库存是否充足,是否能满足此次购买所需库存");

    const material: Material = await this?.repository?.findOneById?.(
      materialId
    );

    this?.logger?.info?.("多规格商品");

    // TODO

    this?.logger?.info?.("单规格商品");

    if (quantity > material.stock) {
      log = "商品" + material.name + "库存不足";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }
  }

  /**
   * 增加库存
   * @param materialId - 物料ID
   * @param materialSkuId - 物料SKU ID
   * @param quantity - 数量
   * @returns 无返回值
   */
  public async addStock(
    materialId: string,
    materialSkuId: string,
    quantity: number
  ): Promise<any> {
    this?.logger?.info?.("增加库存");

    return {};
  }

  /**
   * 减少库存
   * @param materialId - 物料ID
   * @param materialSkuId - 物料SKU ID
   * @param quantity - 数量
   * @returns 无返回值
   */
  public async reduceStock(
    materialId: string,
    materialSkuId: string,
    quantity: number
  ): Promise<any> {
    this?.logger?.info?.("减少库存");

    return {};
  }
}
