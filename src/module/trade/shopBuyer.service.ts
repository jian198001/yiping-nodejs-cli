import { Logger, Provide, Inject } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { ShopBuyer } from "../../entity/ShopBuyer";

import { ILogger } from "@midwayjs/logger";

import { Zero0Error } from "../common/model/Zero0Error";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";

import { UserService } from "../partcApi/tencent/wx/ma/service/user.service";
import { ShopService } from "./shop.service";
import { Shop } from "../../entity/Shop";
import _ = require("lodash");
@Provide()
export class ShopBuyerService extends BaseService {
  // 消费者服务
  @Logger()
  private logger: ILogger = null;

  public static TABLE_NAME = "shop_buyer";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${ShopBuyerService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  

  , ( SELECT username FROM buyer WHERE buyer.id = t.buyer_id ) AS username

  , ( SELECT t1.code FROM ${ShopBuyerService?.TABLE_NAME} t1 WHERE t.parent_id = t1.id ) AS parent_code  

  , ( SELECT COUNT(*) FROM ${ShopBuyerService?.TABLE_NAME} t2 WHERE t2.parent_id = t.id ) AS children_count -- 我邀请的人数量

  , ( SELECT COUNT(*) FROM trade_order WHERE shop_buyer_id = t.id ) AS order_count -- 订单数量

  , ( SELECT COUNT(*) FROM profit_sharing WHERE account = t.id ) AS profit_sharing_count -- 分账数量

     `;

  @InjectEntityModel(ShopBuyer)
  private repository: Repository<ShopBuyer> = null;

  @Inject()
  private userService: UserService = null;

  @Inject()
  private shopService: ShopService = null;

  private log = "";
  /**
   * 分页查询店铺买家列表
   * @param parentShopBuyerId - 父级店铺买家ID
   * @param query - 查询字符串
   * @param params - 参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns Promise<any> - 返回分页查询结果
   * @description 根据父级店铺买家ID、查询字符串、参数字符串、请求参数对象和分页对象，分页查询店铺买家列表，并返回符合条件的店铺买家信息
   */
  public async page(
    parentShopBuyerId = "",
    query: string,
    params: string,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 分页列表查询数据

    console?.log(this?.log);

    // 初始化查询条件字符串
    let whereSql = " "; // 查询条件字符串

    // 如果父级店铺买家ID存在，则添加到查询条件中
    if (parentShopBuyerId) {
      whereSql += ` AND t.parent_id = '${parentShopBuyerId}' `;
    }

    // 使用sqlUtils?.like处理前端的搜索字符串的搜索需求
    whereSql += sqlUtils?.like?.(["code"], reqParam?.searchValue); // 处理前端的搜索字符串的搜索需求
    // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    // 使用sqlUtils?.whereOrFilters处理前端的表格中筛选需求
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters); // 处理前端的表格中筛选需求
    // 使用sqlUtils?.mulColumnLike处理pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句
    whereSql += sqlUtils?.mulColumnLike?.(
      strUtils?.antParams2Arr?.(JSON?.parse?.(params), ["current", "pageSize"])
    );
    // 使用sqlUtils?.query处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql += sqlUtils?.query?.(query);
    // 执行查询语句并返回page对象结果
    // 执行分页查询
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
      // 返回分页数据
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
   * 根据ID查询店铺买家信息
   * @param id - 店铺买家ID
   * @returns Promise<any> - 返回查询到的店铺买家信息
   * @description 根据ID查询一条店铺买家数据，包括店铺买家的基本信息、关联的买家用户名、父级店铺买家代码、子级店铺买家数量、订单数量和分账数量
   */
  public async getById(id = ""): Promise<any> {
    // 根据id查询一条数据

    // 调用父类的getByIdBase方法，根据ID查询店铺买家信息
    // this?.selectSql 和 this?.fromSql 是预定义的查询字段和表名
    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }
  /**
   * 根据店铺买家代码获取店铺买家信息
   * @param code - 店铺买家代码
   * @returns Promise<ShopBuyer> - 返回查询到的店铺买家信息
   * @description 根据店铺买家代码查询店铺买家信息，如果未找到则返回null
   */
  public async getByCode(code = ""): Promise<ShopBuyer> {
    // 使用TypeORM的findOneBy方法根据店铺买家代码查询店铺买家信息
    return await this?.repository?.findOneBy?.({ code: code });
  }
  /**
   * 删除指定ID的店铺买家
   * @param ids - 要删除的店铺买家ID数组
   * @returns Promise<void> - 无返回值
   * @description 根据提供的店铺买家ID数组，删除对应的店铺买家记录
   */
  public async del(ids: string[]): Promise<void> {
    // 使用TypeORM的delete方法删除指定ID的店铺买家
    await this?.repository?.delete?.(ids);
  }
  /**
   * 更新店铺买家信息
   * @param obj - 店铺买家对象
   * @returns Promise<ShopBuyer> - 返回更新后的店铺买家对象
   * @description 根据提供的店铺买家对象，更新店铺买家信息，如果店铺买家不存在则新增，存在则修改
   */
  public async update(obj: ShopBuyer): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";
    // 删除redis缓存

    const key = ShopBuyerService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      ShopBuyerService?.TABLE_NAME,
      [],
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
          ShopBuyerService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }

    let old: ShopBuyer = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          ShopBuyerService?.TABLE_NAME
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
   * 更新店铺买家的场景信息
   * @param scene - 新的场景信息
   * @param shopBuyerId - 店铺买家ID
   * @returns Promise<string> - 返回更新结果的状态码
   * @description 根据提供的场景信息和店铺买家ID，更新店铺买家的场景信息，如果场景信息已存在则返回相应状态码，否则更新场景信息并返回成功状态码
   */
  public async updateScene(scene = "", shopBuyerId: string): Promise<string> {
    let data = "";

    // 根据店铺买家ID查询店铺买家信息
    const shopBuyer: ShopBuyer = await this?.repository?.findOneById?.(
      shopBuyerId
    );

    // 如果店铺买家的场景信息已存在，则返回"myScene"
    if (shopBuyer?.scene) {
      data = "myScene";

      return data;
    }

    // 根据场景信息查询父级店铺买家信息
    const parent: ShopBuyer = await this?.repository?.findOneBy?.({
      code: scene,
    });

    // 如果父级店铺买家不存在或与当前店铺买家相同，则返回"sceneIsError"
    if (!parent || shopBuyerId === parent?.id) {
      data = "sceneIsError";

      return data;
    }

    // 如果父级店铺买家的场景信息为空，则返回"parentSceneIsEmpty"
    if (!parent?.scene) {
      data = "parentSceneIsEmpty";

      return data;
    }

    // 设置店铺买家的父级ID和场景信息
    shopBuyer.parentId = parent.id;
    shopBuyer.scene = await super.getCode?.(
      parent.scene,
      ShopBuyerService?.TABLE_NAME,
      4,
      "scene"
    );

    // 保存更新后的店铺买家信息
    await this?.repository?.save?.(shopBuyer);

    // 返回"myScene"表示更新成功
    data = "myScene";

    return data;
  }
  /**
   * 获取店铺买家的二维码
   * @param shopId - 店铺ID
   * @param shopBuyerId - 店铺买家ID
   * @returns Promise<any> - 返回包含二维码信息的对象
   * @description 根据店铺ID和店铺买家ID生成或获取店铺买家的二维码，如果已生成则直接返回，否则生成新的二维码并保存
   */
  public async getQrcode(shopId = "", shopBuyerId: string): Promise<any> {
    // 如果店铺买家ID为空，则返回null
    if (!shopBuyerId) {
      return null;
    }

    // 根据店铺买家ID查询店铺买家信息
    const shopBuyer: ShopBuyer = await this?.repository?.findOneById?.(
      shopBuyerId
    );

    // 如果店铺买家不存在，则返回null
    if (!shopBuyer) {
      return null;
    }

    // 初始化返回数据对象
    const data: any = {
      code: shopBuyer?.code,
    };

    // 如果店铺买家的场景为空，则设置返回码为"parentSceneIsEmpty"
    if (!shopBuyer?.scene) {
      data.code = "parentSceneIsEmpty";
    }

    // 如果店铺买家的二维码图片已存在，则直接返回二维码图片
    if (shopBuyer?.img) {
      data.img = shopBuyer?.img;
      return data;
    }

    // 如果店铺买家的二维码代码为空，则生成新的二维码代码
    if (!shopBuyer?.code) {
      shopBuyer.code = await super.getCode?.(null, "shop_buyer", 8);
    }

    // 根据店铺ID查询店铺信息
    const shop: Shop = await this?.shopService.getById?.(shopId);

    // 获取店铺的访问令牌
    const accessToken: string = await this?.userService?.getAccessToken?.(
      shopId
    );

    // 构建场景字符串
    const scene = `s=${shop.code}&b=${shopBuyer.code}`;

    // 根据场景字符串和访问令牌生成二维码图片
    const img: string = await this?.userService?.getwxacodeunlimit?.(
      scene,
      accessToken
    );

    // 将生成的二维码图片保存到店铺买家信息中
    shopBuyer.img = img;
    await this?.repository?.save?.(shopBuyer);

    // 设置返回数据中的二维码图片
    data.img = shopBuyer?.img;

    // 返回包含二维码信息的对象
    return data;
  }

  /**
   * 根据店铺买家ID获取其父级店铺买家
   * @param shopBuyerId - 店铺买家ID
   * @returns Promise<any> - 返回查询到的父级店铺买家信息
   * @description 根据店铺买家ID查询其父级店铺买家，如果未找到则返回null
   */
  public async getParent(shopBuyerId = ""): Promise<any> {
    // 根据id查询一条数据
    const shopBuyer: ShopBuyer = await this?.repository?.findOneById?.(
      shopBuyerId
    );

    // 如果店铺买家不存在或场景为空，则返回null
    if (!shopBuyer || !shopBuyer?.scene) {
      return null;
    }

    // 获取子场景
    const childrenScene: string = shopBuyer?.scene?.substring?.(
      0,
      shopBuyer.scene.length - 4
    );

    // 构建SQL查询语句
    const whereSql = ` AND t.scene = '${childrenScene}' `;

    // 执行SQL查询
    const arr: any[] = await super.arrBase?.(
      null,
      this?.selectSql,
      this?.fromSql,
      whereSql
    );

    // 如果查询结果为空，则返回null
    if (!arr) {
      return null;
    }

    // 返回查询结果
    return arr?.[0];
  }
  /**
   * 根据店铺买家ID获取其所有子级店铺买家
   * @param shopBuyerId - 店铺买家ID
   * @returns Promise<any[]> - 返回查询到的子级店铺买家列表
   * @description 根据店铺买家ID查询其所有子级店铺买家，如果未找到则返回空数组
   */
  public async getChildren(shopBuyerId = ""): Promise<any[]> {
    // 返回一个空数组
    return [];
  }

  /**
   * 根据用户名和店铺ID查找店铺买家
   * @param username - 用户名
   * @param shopId - 店铺ID
   * @returns Promise<any> - 返回查询到的店铺买家信息
   * @description 根据用户名和店铺ID查询店铺买家信息，如果未找到则抛出异常
   */
  public async findByUsername(username: string, shopId: string): Promise<any> {
    // 记录日志
    let log = "";

    // 构建SQL查询语句
    let sql = ` SELECT t.* FROM shop_buyer t WHERE t.shop_id = '${shopId}' AND t.buyer_id IN ( SELECT id FROM buyer WHERE buyer.username = '${username}' ) `;

    // 执行SQL查询
    const result: any[] = await super.query?.(sql);

    // 如果查询结果为空，则抛出异常
    if (!result) {
      // 记录日志
      log = "查找的用户名不存在，操作失败";

      // 创建Zero0Error对象
      const zero0Error: Zero0Error = new Zero0Error(log, "5000");

      // 记录错误日志
      this?.logger?.error?.(log, zero0Error);

      // 抛出异常
      throw zero0Error;
    }

    // 返回查询结果
    return result?.[0];
  }
}
