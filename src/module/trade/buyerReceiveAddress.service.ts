/**
 * 导入MidwayJS的依赖注入和日志装饰器
 */
import { Inject, Logger, Provide } from "@midwayjs/decorator";
/**
 * 导入自定义的基础服务类
 */
import { BaseService } from "../common/service/base.service";
/**
 * 导入请求参数模型
 */
import { ReqParam } from "../common/model/ReqParam";
/**
 * 导入分页模型
 */
import { Page } from "../common/model/Page";
/**
 * 导入TypeORM的Repository类
 */
import { Repository } from "typeorm";
/**
 * 导入MidwayJS的实体模型注入装饰器
 */
import { InjectEntityModel } from "@midwayjs/typeorm";
/**
 * 导入买家收货地址实体类
 */
import { BuyerReceiveAddress } from "../../entity/BuyerReceiveAddress";
/**
 * 导入MidwayJS的日志接口
 */
import { ILogger } from "@midwayjs/logger";
/**
 * 导入店铺实体类
 */
import { Shop } from "../../entity/Shop";
/**
 * 导入自定义的错误类
 */
import { Zero0Error } from "../common/model/Zero0Error";
/**
 * 导入Lodash库
 */
import _ = require("lodash");
/**
 * 导入自定义的SQL工具类
 */
import * as sqlUtils from "../common/utils/sqlUtils";
/**
 * 导入自定义的字符串工具类
 */
import * as strUtils from "../common/utils/strUtils";
/**
 * 导入店铺买家服务类
 */
import { ShopBuyerService } from "./shopBuyer.service";

/**
 * 买家收货地址服务类
 */
@Provide()
export class BuyerReceiveAddressService extends BaseService {
  // 买家收货地址服务

  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "buyer_receive_address";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${BuyerReceiveAddressService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;

  @InjectEntityModel(BuyerReceiveAddress)
  private repository: Repository<BuyerReceiveAddress> = null;

  @InjectEntityModel(Shop)
  private shopRepository: Repository<Shop> = null;

  @Inject()
  private shopBuyerService: ShopBuyerService = null;

  /**
   * 分页查询买家收货地址
   * @param shopBuyerId - 店铺买家ID
   * @param query - 查询字符串
   * @param params - 参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns Promise<any> - 返回分页查询结果
   */
  public async page(
    shopBuyerId = "",
    query: string,
    params: string,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 分页列表查询数据 

    // 缓存中有此数据，直接返回
    if (page?.pageSize < 1) {
      // 查看缓存中是否有此数据

      const key = BuyerReceiveAddressService?.TABLE_NAME + `:arr`;  

      const data = await this?.redisService?.get?.(key);        

      if (data) {
        const parse = JSON?.parse?.(data);

        return parse;
      }
    }    

    let whereSql = " "; // 查询条件字符串

    // 处理前端的搜索字符串的搜索需求
    whereSql += sqlUtils?.like?.(["name"], reqParam?.searchValue);

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

    const shopBuyer: any = await this?.shopBuyerService.getById?.(shopBuyerId);

    // 添加查询条件，限制买家ID
    whereSql += ` AND t.buyer_id = '${shopBuyer.buyerId}' `;

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

    // 将查询结果中的数据列表存入redis
    this?.setArrToRedis?.(data?.list, BuyerReceiveAddressService?.TABLE_NAME);              

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
   * 根据ID查询买家收货地址
   * @param id - 收货地址ID
   * @returns Promise<any> - 返回查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = BuyerReceiveAddressService?.TABLE_NAME + `:${id}`;

    let data: any = await this?.redisService?.get?.(key);

    // 缓存中有此数据，直接返回

    if (data) {
      const parse = JSON?.parse?.(data);

      return parse;
    }

    // 缓存中没有此数据，查询数据库

    // 调用父类的getByIdBase方法，根据ID查询数据

    data = await super.getByIdBase?.(id, this?.selectSql, this?.fromSql);

    // 查询数据库后，把数据放入缓存

    this?.redisService?.set?.(key, JSON?.stringify?.(data));

    // 返回数据

    return data;
  }

  /**
   * 删除买家收货地址
   * @param ids - 收货地址ID数组
   * @returns Promise<void> - 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = BuyerReceiveAddressService?.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);  

    // 删除redis缓存
    // 删除redis缓存
    this?.redisService?.del?.(BuyerReceiveAddressService?.TABLE_NAME + `:arr`);     
  }

  /**
   * 更新买家收货地址
   * @param obj - 买家收货地址对象
   * @param shopBuyerId - 店铺买家ID
   * @returns Promise<BuyerReceiveAddress> - 返回更新后的买家收货地址对象
   */
  public async update(
    obj: BuyerReceiveAddress,
    shopBuyerId: string
  ): Promise<BuyerReceiveAddress> {
    // 一个表进行操作 typeORM

    const shopBuyer: any = await this?.shopBuyerService.getById?.(shopBuyerId);

    obj.buyerId = shopBuyer.buyerId;

    let log = "";
    // 删除redis缓存

    const key = BuyerReceiveAddressService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);   

    // 删除redis缓存
    this?.redisService?.del?.(BuyerReceiveAddressService?.TABLE_NAME + `:arr`);               

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      BuyerReceiveAddressService?.TABLE_NAME,
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

    this?.logger?.info?.("首先判断此地址是否已存在");

    this?.logger?.info?.("此买家没有设置任何地址信息,此地址将保存为默认地址");

    // 通过buyerId取得buyerId
    const buyerId = "";

    const number: number = await this?.repository?.countBy({
      buyerId: buyerId,
    });

    if (number < 1) {
      obj.defaultStatus = 1;

      this?.repository?.save?.(obj);

      return;
    }

    if (obj.defaultStatus === 0) {
      this?.logger?.info?.("此地址不是默认地址");

      this?.repository?.save?.(obj);

      return;
    }

    this?.logger?.info?.("此地址是默认地址");

    // 将此会员的所有其它地址都设置为非默认地址，然后再将此地址设置为默认地址
    const sql = ` UPDATE buyer_receive_address SET default_status = '0' WHERE buyer_id = '${buyerId}' `;

    await this?.query?.(sql);

    await this?.repository?.save?.(obj);
  }

  /**
   * 获取买家默认收货地址
   * @param buyerId - 买家ID
   * @param shopId - 店铺ID
   * @returns Promise<BuyerReceiveAddress> - 返回默认收货地址对象
   */
  public async getDefalut(buyerId: string, shopId = ""): Promise<any> {
    // 记录日志，确定此店铺的物流范围是全球还是本地
    const shop: Shop = await this?.shopRepository?.findOneById?.(shopId); // 店铺信息
    const deliveryArea: string = shop.deliveryArea; // 本店铺对应的运营区域TODO
    let sql = ` SELECT t.* FROM buyer_receive_address t WHERE t.buyer_id = '${buyerId}' `;

    if (shop && deliveryArea !== "global") {
      this?.logger?.info?.("此店铺的物流范围是本地");

      sql =
        sql +
        ` AND t.province = '${shop.province}' AND t.city = '${shop.city}' `;

      if (shop.region) {
        sql += ` AND t.region = '${shop.region}' `;
      }
    }

    const order = " ORDER BY t.default_status DESC, order_num DESC ";

    const sqlAddress: string = sql + order;

    const addressList: any[] = await this?.query?.(sqlAddress);

    if (addressList) {
      return _?.head?.(addressList);
    }

    return {};
  }
}
