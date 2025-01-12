import { Logger, Provide, Inject } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";
import { Buyer } from "../../entity/Buyer";
import { ILogger } from "@midwayjs/logger";
import { Zero0Error } from "../common/model/Zero0Error";
import { ShopBuyer } from "../../entity/ShopBuyer";
import { UserService } from "../partcApi/tencent/wx/ma/service/user.service";
import { UserOpenId } from "../../entity/UserOpenId";

import _ = require("lodash");

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";

import { TradeOrderService } from "./tradeOrder.service";
import { GoogleCredentials } from "../../entity/GoogleCredentials";
import { CredentialsService } from "../partcApi/google/credentials.service";

const crypto: any = require("../common/utils/crypto");

@Provide()
export class BuyerService extends BaseService {
  // 买家服务

  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "buyer";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${BuyerService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;

  @InjectEntityModel(Buyer)
  private repository: Repository<Buyer> = null;

  @InjectEntityModel(ShopBuyer)
  private shopBuyerRepository: Repository<ShopBuyer> = null;

  @InjectEntityModel(UserOpenId)
  private userOpenIdRepository: Repository<UserOpenId> = null;

  @Inject()
  private tradeOrderService: TradeOrderService = null;

  @Inject()
  private userService: UserService = null;

  @Inject()
  private credentialsService: CredentialsService = null;

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

  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = BuyerService.TABLE_NAME + `:${id}`;

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

  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = BuyerService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);
  }

  public async update(obj: Buyer): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      BuyerService?.TABLE_NAME,
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
        await super.sortOrder?.(obj?.id, null, null, BuyerService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }
       return {} ;
    }

    let old: Buyer = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, BuyerService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }
       return {} ;
    }
    delete obj?.id;

    old = {
      ...old,

      ...obj,
    };

    await this?.repository?.save?.(old); // 修改数据
  }

  public async buyerLogin(
    usernamePasswordToken: Buyer,
    shopId = ""
  ): Promise<any> {
    let log = "";

    const count: number = await this?.repository?.countBy({
      username: usernamePasswordToken.username,
    });

    if (count < 1) {
      log = "用户名不存在，将直接新建用户";

      console.log(log);

      delete usernamePasswordToken.id;

      await this?.reg(shopId, { ...usernamePasswordToken }, "buyer");
    }

    const user = await this?.login(usernamePasswordToken, shopId);

    return user;
  }

  public async sellerLogin(
    usernamePasswordToken: Buyer,
    shopId = ""
  ): Promise<any> {
    let log = "";

    const count: number = await this?.repository?.countBy({
      username: usernamePasswordToken.username,
    });

    if (count < 1) {
      log = "用户名不存在，将直接新建用户";

      console.log(log);

      delete usernamePasswordToken.id;

      await this?.reg(shopId, { ...usernamePasswordToken }, "seller");
    }

    const user = await this?.login(usernamePasswordToken, shopId);

    return user;
  }

  public async login(usernamePasswordToken: Buyer, shopId = ""): Promise<any> {
    let log = "";

    console.log("用户登陆");

    const password: string = crypto?.md5?.(usernamePasswordToken.password);

    const whereSql = ` AND t.username = '${usernamePasswordToken.username}' AND t.password = '${password}' `;

    const anies: any[] = await super.arrBase?.(
      null,
      this?.selectSql,
      this?.fromSql,
      whereSql
    );

    if (!anies) {
      log = "用户名或密码错误";

      const zero0Error: Zero0Error = new Zero0Error(log, "401");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const buyerId = anies?.[0]?.id;

    let shopBuyer: ShopBuyer = await this?.shopBuyerRepository?.findOne?.({
      where: { shopId: shopId, buyerId: buyerId },
    });

    if (!shopBuyer) {
      shopBuyer = new ShopBuyer();

      shopBuyer.shopId = shopId;

      shopBuyer.buyerId = buyerId;

      shopBuyer.code = await super.getCode?.(null, "shop_buyer", 8);

      await this?.shopBuyerRepository?.save?.(shopBuyer);
    }

    return shopBuyer;
  }

  public async loginWxma(
    code = "the code is a mock one",
    shopId = ""
  ): Promise<any> {
    const userInfo: any = await this?.userService?.login(code, shopId, "buyer");

    const userRole = "buyer";

    const namespace = "wxma";

    // 查询有无此wxMaUserInfo对应的userOpenId信息，无则新建，有则返回信息TODO 整理成独立的方法

    const sql = ` SELECT t.user_id FROM user_open_id t WHERE t.open_id = '${userInfo.openid}' AND t.app_id = '${userInfo.appId}' AND t.user_role = '${userRole}' AND t.namespace = '${namespace}' `;

    const result: any[] = await super.query?.(sql);

    let buyerId = "";

    if (!result) {
      // 此微信用户未登录过，进行注册

      const buyer: Buyer = new Buyer();

      await this?.repository?.save?.(buyer);

      const userOpenId: UserOpenId = new UserOpenId();

      userOpenId.appId = userInfo?.appId;

      userOpenId.openId = userInfo?.openid;

      userOpenId.namespace = namespace;

      userOpenId.userRole = userRole;

      userOpenId.userId = buyer?.id;

      await this?.userOpenIdRepository?.save?.(userOpenId);

      buyerId = buyer?.id;
    } else {
      buyerId = result?.[0]?.user_id;
    }

    let shopBuyer: ShopBuyer = await this?.shopBuyerRepository?.findOne?.({
      where: { shopId: shopId, buyerId: buyerId },
    });

    if (!shopBuyer) {
      shopBuyer = new ShopBuyer();

      shopBuyer.shopId = shopId;

      shopBuyer.buyerId = buyerId;

      shopBuyer.code = await super.getCode?.(null, "shop_buyer", 8);

      await this?.shopBuyerRepository?.save?.(shopBuyer);
    }

    return shopBuyer;
  }

  public async loginGoogle(
    googleCredentials: GoogleCredentials,
    shopId = ""
  ): Promise<any> {
    googleCredentials.googleId = googleCredentials.id;

    const userInfo = await this?.credentialsService.update(googleCredentials);

    const userRole = "buyer";

    const namespace = "google";

    // 查询有无此wxMaUserInfo对应的userOpenId信息，无则新建，有则返回信息TODO 整理成独立的方法

    const sql = ` SELECT t.user_id FROM user_open_id t WHERE t.open_id = '${userInfo.googleId}' AND t.user_role = '${userRole}' AND t.namespace = '${namespace}' `;

    const result: any[] = await super.query?.(sql);

    let buyerId = "";

    if (!result) {
      // 此微信用户未登录过，进行注册

      const buyer: Buyer = new Buyer();

      await this?.repository?.save?.(buyer);

      const userOpenId: UserOpenId = new UserOpenId();

      userOpenId.namespace = namespace;

      userOpenId.userRole = userRole;

      userOpenId.userId = buyer?.id;

      await this?.userOpenIdRepository?.save?.(userOpenId);

      buyerId = buyer?.id;
    } else {
      buyerId = result?.[0]?.user_id;
    }

    let shopBuyer: ShopBuyer = await this?.shopBuyerRepository?.findOne?.({
      where: { shopId: shopId, buyerId: buyerId },
    });

    if (!shopBuyer) {
      shopBuyer = new ShopBuyer();

      shopBuyer.shopId = shopId;

      shopBuyer.buyerId = buyerId;

      shopBuyer.code = await super.getCode?.(null, "shop_buyer", 8);

      await this?.shopBuyerRepository?.save?.(shopBuyer);
    }

    return shopBuyer;
  }

  public async getPhoneNumberInfo(
    code: string,
    shopId = "",
    encryptedData: string,
    ivStr: string
  ): Promise<void> {}

  public async reg(shopId = "", buyer: Buyer, userRole = ""): Promise<Buyer> {
    let log = "";

    buyer.password = crypto?.md5?.(buyer.password);

    const count: number = await this?.repository?.countBy({
      username: buyer.username,
    });

    if (count > 0) {
      log = "用户名已存在,注册失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    await this?.repository?.save?.(buyer);

    const countShopBuyer: number = await this?.shopBuyerRepository?.countBy({
      buyerId: buyer.id,
      shopId: shopId,
    });

    if (countShopBuyer) {
      return buyer;
    }

    const shopBuyer: ShopBuyer = new ShopBuyer();

    shopBuyer.buyerId = buyer.id;

    shopBuyer.shopId = shopId;

    shopBuyer.userRole = userRole;

    await this?.shopBuyerRepository?.save?.(shopBuyer);

    return buyer;
  }

  public async imgUpload(files: any, id: string): Promise<void> {}

  public async uploadFile(file: any, id: string): Promise<void> {}

  public async imgDel(fileId: string): Promise<void> {}

  public async updateNicknameAndGender(
    obj: any,
    birthDateStr: string,
    code: string,
    shopId = ""
  ): Promise<void> {}

  public async balanceAdd(
    shopBuyerId = "",
    amount: number,
    shopId = ""
  ): Promise<ShopBuyer> {
    let log = "";

    if (!amount || amount < 0.01) {
      log = "金额不能小于0.01元";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const buyerId = "";

    const shopBuyer: ShopBuyer = await this?.shopBuyerRepository?.findOneBy?.({
      buyerId: buyerId,
      shopId: shopId,
    });

    let balance = shopBuyer.balance;

    if (!balance) {
      balance = 0.0;
    }

    balance = _?.add(balance, amount);

    shopBuyer.balance = balance;

    await this?.shopBuyerRepository?.save?.(shopBuyer);

    return shopBuyer;
  }

  public async bind(
    shopId = "",
    shopBuyerId = "",
    openId: string
  ): Promise<any> {
     return {} ;
  }

  public async batchesTransfer(
    shopId = "",
    transferDetailList: any[] = []
  ): Promise<any> {
    /**
     * 发起商家转账零钱
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_1.shtml
     */
    const wxpay: any = await this?.tradeOrderService?.getWxpay(shopId);

    const transferDetailList1: any[] = [
      {
        out_detail_no: "aaaaaaaaaaaaaaaaaaaaaaa",
        /** 转账金额(分) */
        transfer_amount: 1,
        /** 转账备注 */
        transfer_remark: "测试转账",
        /** 用户在直连商户应用下的用户标示 */
        openid: "oyqG0689ons_qg8NfEi-Pw5K553Y",
      },
    ];

    const input: any = {
      /** 商家批次单号 */
      out_batch_no: "aaaaaaaaaaaaaaaaaaaaaaa",
      /** 批次名称 */
      batch_name: "测试转账到零钱",
      /** 批次备注 */
      batch_remark: "测试转账到零钱",
      /** 转账总金额(分) */
      total_amount: 1,
      /** 转账总笔数 */
      total_num: 1,
      /** 转账明细列表 */
      transfer_detail_list: transferDetailList1,
    };

    const dataOutput: any = await wxpay?.batches_transfer(input);

    console.log(dataOutput);
  }
}
