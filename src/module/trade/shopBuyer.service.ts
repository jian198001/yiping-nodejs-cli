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
import _ = require('lodash');
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

  public async page(
    parentShopBuyerId = "",
    query: string,
    params: string,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 分页列表查询数据

    console?.log(this?.log);

    let whereSql = " "; // 查询条件字符串

    if (parentShopBuyerId) {
      whereSql += ` AND t.parent_id = '${parentShopBuyerId}' `;
    }

    whereSql += sqlUtils?.like?.(["code"], reqParam?.searchValue, ); // 处理前端的搜索字符串的搜索需求
// sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters); // 处理前端的表格中筛选需求
    whereSql += sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize', ]));
    whereSql += sqlUtils?.query?.(query);
// 执行查询语句并返回page对象结果
    const data: any = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    )
    
    if (page?.pageSize > 0) {
      
        return data
  
      }
  
      if (page?.pageSize < 1) {
        // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
        return _?.keyBy?.(data?.list, 'value',)
  
      }
  
  }

  public async getById(id = ""): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }

  public async getByCode(code = ""): Promise<ShopBuyer> {
    return await this?.repository?.findOneBy?.({ code: code });
  }

  public async del(idsArr: string[]): Promise<void> {
    await this?.repository?.delete?.(idsArr);
  }

  public async update(obj: ShopBuyer): Promise<ShopBuyer> {
    // 一个表进行操作 typeORM

    let log = "";

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

  public async updateScene(scene = "", shopBuyerId: string): Promise<string> {
    let data = "";

    const shopBuyer: ShopBuyer = await this?.repository?.findOneById?.(
      shopBuyerId
    );

    if (shopBuyer?.scene) {
      // 先判断用户是否已进行邀请关联，如果已关联过了，则不再进行邀请关联业务逻辑

      data = "myScene";

      return data;
    }

    const parent: ShopBuyer = await this?.repository?.findOneBy?.({
      code: scene,
    });

    if (!(parent) || shopBuyerId === parent?.id) {
      // 自己不能成为自己的上级

      data = "sceneIsError";

      return data;
    }

    if (!parent?.scene) {
      data = "parentSceneIsEmpty";

      return data;
    }

    shopBuyer.parentId = parent.id;

    shopBuyer.scene = await super.getCode?.(
      parent.scene,
      ShopBuyerService?.TABLE_NAME,
      4,
      "scene"
    );

    await this?.repository?.save?.(shopBuyer);

    data = "myScene";

    return data;
  }

  public async getQrcode(shopId = "", shopBuyerId: string): Promise<any> {
    if (!shopBuyerId) {
      return null;
    }

    const shopBuyer: ShopBuyer = await this?.repository?.findOneById?.(
      shopBuyerId
    );

    if (!shopBuyer) {
      return null;
    }

    const data: any = {
      code: shopBuyer?.code,
    };

    if (!shopBuyer?.scene) {
      data.code = "parentSceneIsEmpty";
    }

    if (shopBuyer?.img) {
      // 如果二维码已经生成过，则直接返回二维码

      data.img = shopBuyer?.img;

      return data;
    }

    if (!shopBuyer?.code) {
      shopBuyer.code = await super.getCode?.(null, "shop_buyer", 8);
    }

    const shop: Shop = await this?.shopService.getById?.(shopId);

    // 如果没有生成过，则生成二维码

    const accessToken: string = await this?.userService?.getAccessToken?.(
      shopId
    );

    const scene = `s=${shop.code}&b=${shopBuyer.code}`;

    const img: string = await this?.userService?.getwxacodeunlimit?.(
      scene,
      accessToken
    );

    shopBuyer.img = img;

    await this?.repository?.save?.(shopBuyer);

    data.img = shopBuyer?.img;

    return data;
    
  }

  public async getParent(shopBuyerId = ""): Promise<any> {
    const shopBuyer: ShopBuyer = await this?.repository?.findOneById?.(
      shopBuyerId
    );

    if (!(shopBuyer) || !(shopBuyer?.scene)) {
      return null;
    }

    const childrenScene: string = shopBuyer?.scene?.substring?.(
      0,
      shopBuyer.scene.length - 4
    );

    const whereSql = ` AND t.scene = '${childrenScene}' `;

    const arr: any[] = await super.arrBase?.(
      null,
      this?.selectSql,
      this?.fromSql,
      whereSql
    );

    if (!arr) {
      return null;
    }

    return arr?.[0];
  }

  public async getChildren(shopBuyerId = ""): Promise<any[]> { 

    return []
    
  }

  public async findByUsername(username: string, shopId: string): Promise<any> {
    let log = "";

    let sql = ` SELECT t.* FROM shop_buyer t WHERE t.shop_id = '${shopId}' AND t.buyer_id IN ( SELECT id FROM buyer WHERE buyer.username = '${username}' ) `;

    const result: any[] = await super.query?.(sql);

    if (!result) {
      // 查找的用户名不存在，抛出异常，程序处理终止
      log = "查找的用户名不存在，操作失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    return result?.[0];
  }
}
