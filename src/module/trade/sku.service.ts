import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { SkuKey } from "../../entity/SkuKey";

import { ILogger } from "@midwayjs/logger";
import { SkuList } from "../../entity/SkuList";

import { Zero0Error } from "../common/model/Zero0Error";

import _ = require("lodash");

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";

@Provide()
export class SkuService extends BaseService {
  // 商品规格服务
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "sku_key";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${SkuService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;

  @InjectEntityModel(SkuKey)
  private repository: Repository<SkuKey> = null;

  @InjectEntityModel(SkuList)
  private skuListRepository: Repository<SkuList> = null;
  /**
   * 分页查询商品规格数据
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页参数
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
      page,
    );

    // 遍历查询结果,将查询结果异步读取到redis

    // 遍历查询结果,将查询结果中异步读取到redis

    this?.getToRedis?.(_?.map?.(data?.list, 'id'))

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

      await this?.getById?.(id)

    }
  
  }

  /**
   * 根据ID查询一条商品规格数据
   * @param id - 商品规格ID
   * @returns Promise<any> - 返回查询结果
   */
  public async getById(id = ""): Promise<any> {

    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据
    
    // 查看缓存中是否有此数据

    const key = SkuService.TABLE_NAME + `:${id}`;

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
   * 根据商品规格ID删除商品规格信息
   * @param ids - 商品规格ID数组
   * @returns Promise<void> - 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 根据商品规格ID删除商品规格信息
    await this?.repository?.delete?.(ids);
  }
  /**
   * 更新或插入SKU规格信息
   * @param obj - 包含SKU规格信息的对象
   * @returns Promise<SkuKey> - 返回更新后的SKU规格信息对象
   */
  public async update(obj: SkuKey): Promise<SkuKey> {
    // 一个表进行操作 typeORM

    let log = "";
// 删除redis缓存

    const key = SkuService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      SkuService?.TABLE_NAME,
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
        await super.sortOrder?.(obj?.id, null, null, SkuService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }

    let old: SkuKey = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, SkuService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
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
   * 将JSON字符串转换为中文格式的字符串
   * @param jsonStr - 输入的JSON字符串
   * @returns Promise<string> - 返回转换后的中文格式字符串
   */
  public async json2CnStr(jsonStr: string): Promise<string> {
    // 将JSON字符串转换为中文格式的字符串
    jsonStr = _?.replace?.(jsonStr, "[", "");
    jsonStr = _?.replace?.(jsonStr, "]", "");
    jsonStr = _?.replace?.(jsonStr, "{", "");
    jsonStr = _?.replace?.(jsonStr, "}", "");
    jsonStr = _?.replace?.(jsonStr, '"', "");
    return jsonStr;
  }
  /**
   * 提取购买信息中的SKU规格信息
   * @param jsonArray - 包含购买信息的JSON数组
   * @returns Promise<any[]> - 返回提取出的SKU规格信息数组
   */
  public async changeSkuList(jsonArray: any[]): Promise<any[]> {
    // 提取出购买信息中的SKU规格信息
    return null;
  }
  /**
   * 根据id查询一条商品规格数据
   * @param id - 商品规格ID
   * @returns Promise<void> - 无返回值
   */
  public async selectById(id: string): Promise<void> {
    // 根据id查询一条数据
  }
  /**
   * 取得商品规格的有效价格库存信息（库存需大于0）
   * @param goodsId - 商品ID
   * @param skuPriceUnit - 商品规格的价格单位
   * @param shopBuyerId - 买家ID（可选）
   * @returns Promise<void> - 无返回值
   */
  public async getValidSkuList(
    goodsId: string,
    skuPriceUnit: number,
    shopBuyerId = ""
  ): Promise<void> {
    // 取得商品规格的有效价格库存信息（库存需大于0）
  }
  public async getInitialSku(
    jsonArray: any[],
    goodsId: string,
    shopBuyerId = ""
  ): Promise<void> {
    // 取得此买家针对于此商品的默认SKU规格价格库存信息,如此买家购物车中没有此商品信息,则使用此商品的默认SKU规格价格库存信息,如购物车中有,则使用购物车中最新购买的信息
  }
  /**
   * 更新商品规格的有效价格库存信息（库存需大于0）中的默认选中的库存
   * @param goodsId - 商品ID
   * @param initialSkuListMap - 包含默认选中库存的商品规格信息映射
   * @returns Promise<void> - 无返回值
   */
  public async updateGoodsInitialSku(
    goodsId: string,
    initialSkuListMap: any
  ): Promise<void> {
    // 更新商品规格的有效价格库存信息（库存需大于0）中的默认选中的库存
  }
  /**
   * 取得商品规格的价格库存信息
   * @param goodsId - 商品ID
   * @param skuPriceUnit - 商品规格的价格单位
   * @param isUpdate - 是否更新商品规格的价格库存信息
   * @returns Promise<void> - 无返回值
   */
  public async getSkuList(
    goodsId: string,
    skuPriceUnit: number,
    isUpdate: boolean
  ): Promise<void> {
    // 取得商品规格的价格库存信息
  }
  /**
   * 保存商品规格的价格库存信息
   * @param skuList - 商品规格的价格库存信息
   * @returns Promise<void> - 无返回值
   */
  public async saveSkuList(skuList: string): Promise<void> {
    // 编辑商品规格的价格库存信息
  }
  /**
   * 根据商品规格ID、商品ID和商品规格列表获取商品规格的中文名称
   * @param skuListId - 商品规格ID
   * @param goodsId - 商品ID
   * @param skuList - 商品规格列表
   * @returns Promise<any> - 返回商品规格的中文名称
   */
  public async getSkuListCn(
    skuListId: string,
    goodsId: string,
    skuList
  ): Promise<any> {
    // 如果商品规格ID或商品规格列表为空，则返回空对象
    if (!skuListId || !skuList) {
      return {};
    }
  }
  /**
   * 减少商品规格的库存数量
   * @param id - 商品规格ID
   * @param subStock - 要减少的库存数量
   * @returns Promise<void> - 无返回值
   */
  public async subStock(id: string, subStock: number): Promise<void> {
    // 根据商品规格ID查询商品规格信息
    const skuList = await this?.skuListRepository?.findOneById?.(id);

    // 减少商品规格的库存数量
    skuList.stockNum = _?.subtract?.(skuList.stockNum, subStock);

    // 保存更新后的商品规格信息到数据库中
    await this?.skuListRepository?.save?.(skuList);
  }
  /**
   * 增加商品规格的库存数量
   * @param id - 商品规格ID
   * @param subStock - 要增加的库存数量
   * @returns Promise<void> - 无返回值
   */
  public async refundStock(id: string, subStock: number): Promise<void> {
    // 根据商品规格ID查询商品规格信息
    const skuList = await this?.skuListRepository?.findOneById?.(id);

    // 增加商品规格的库存数量
    skuList.stockNum = _?.add(skuList.stockNum, subStock);

    // 保存更新后的商品规格信息到数据库中
    await this?.skuListRepository?.save?.(skuList);
  }
}
