// 导入所需的装饰器和模块
import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { MemberCardOffer } from "../../entity/MemberCardOffer";
import { ILogger } from "@midwayjs/logger";
import { MemberCardOfferConsume } from "../../entity/MemberCardOfferConsume";
import { Zero0Error } from "../common/model/Zero0Error";
import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

/**
 * 会员卡服务类
 */
@Provide()
export class MemberCardOfferService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "member_card_offer";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${MemberCardOfferService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  `;

  // 注入会员卡实体模型
  @InjectEntityModel(MemberCardOffer)
  private repository: Repository<MemberCardOffer> = null;

  // 注入会员卡消费实体模型
  @InjectEntityModel(MemberCardOfferConsume)
  private memberCardOfferConsumeRepository: Repository<MemberCardOfferConsume> =
    null;

  /**
   * 分页查询会员卡数据
   * @param query - 查询字符串
   * @param params - 参数对象
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

      const key = MemberCardOfferService?.TABLE_NAME + `:arr`;

      const data = await this?.redisService?.get?.(key);      

      if (data) {
        const parse = JSON?.parse?.(data);

        return parse;
      }
    }    

    let whereSql = " "; // 查询条件字符串

    let parameters: any[] = [];

    if (params && params?.length > 3) {
      parameters = JSON?.parse?.(params);
    }

    // 构建查询条件
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

    // 将查询结果中的数据列表存入redis
    this?.setArrToRedis?.(data?.list, MemberCardOfferService?.TABLE_NAME);   

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
   * 根据ID查询会员卡数据
   * @param id - 会员卡ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = MemberCardOfferService?.TABLE_NAME + `:${id}`;

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
   * 删除会员卡数据
   * @param ids - 会员卡ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = MemberCardOfferService?.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);  

    // 删除redis缓存
    this?.redisService?.del?.(MemberCardOfferService?.TABLE_NAME + `:arr`);  
  }

  /**
   * 更新会员卡数据
   * @param obj - 会员卡对象
   * @returns 更新后的会员卡对象
   */
  public async update(obj: MemberCardOffer): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";
    // 删除redis缓存

    const key = MemberCardOfferService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key); 

    // 删除redis缓存
    this?.redisService?.del?.(MemberCardOfferService?.TABLE_NAME + `:arr`);      

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      MemberCardOfferService?.TABLE_NAME,
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
          MemberCardOfferService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
       return {} ;
    }

    let old: MemberCardOffer = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          MemberCardOfferService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
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

  /**
   * 会员卡消费
   * @param memberCardOfferConsume - 会员卡消费对象
   * @returns 会员卡消费对象
   */
  public async consume(
    memberCardOfferConsume: MemberCardOfferConsume
  ): Promise<MemberCardOfferConsume> {
    let log = "";

    this?.logger?.info?.("取得会员卡包中会员卡信息");

    const memberCardOfferId: string = memberCardOfferConsume.memberCardOfferId;

    const memberCardOffer: MemberCardOffer =
      await this?.repository?.findOneById?.(memberCardOfferId);

    if (!memberCardOffer) {
      log = "会员卡包中不存在此会员卡";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    this?.logger?.info?.("以上条件都通过，代表此卡可以核销");

    this?.logger?.info?.(
      "此卡如果是首次使用，并且是使用即激活，则激活此卡，设定此卡的有效期信息"
    );

    this?.logger?.info?.(
      "判断此卡有没有核销过，如果没有核销过，说明是首次使用"
    );

    const consumeCount: number =
      await this?.memberCardOfferConsumeRepository?.countBy({
        memberCardOfferId: memberCardOfferId,
      });

    if (!consumeCount) {
      this?.logger?.info?.("首次使用");

      const activateType: string = memberCardOffer.activateType;

      if (activateType === "use") {
        this?.logger?.info?.("此卡的类型是首次使用时激活,进行激活操作");

        await this?.activate(memberCardOfferId);
      }
    }

    const consume: number = memberCardOffer.consume;

    if (!consume) {
      log = "会员卡包中此会员卡核销次数已用尽,核销失败";

      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const endTime: any = memberCardOffer.endTime;

    console?.log(endTime);

    // TODO

    const beginTime: any = memberCardOffer.beginTime;

    console?.log(beginTime);

    // TODO

    memberCardOffer.consume = memberCardOffer.consume - 1;

    await this?.repository?.save?.(memberCardOffer);

    await this?.memberCardOfferConsumeRepository?.save?.(
      memberCardOfferConsume
    );

    return memberCardOfferConsume;
  }

  public async activate(memberCardOfferId: string): Promise<MemberCardOffer> {
    this?.logger?.info?.("会员卡包中会员卡激活操作");

    const memberCardOffer: MemberCardOffer =
      await this?.repository?.findOneById?.(memberCardOfferId);

    const type = memberCardOffer.type;

    const beginTime: any = new Date();

    const endTime: any = new Date();

    if (type === "DATE_TYPE_FIX_TIME_RANGE") {
    } else if (type === "DATE_TYPE_FIX_TERM") {
    }

    memberCardOffer.beginTime = beginTime;

    memberCardOffer.endTime = endTime;

    await this?.repository?.save?.(memberCardOffer);

    return memberCardOffer;
  }

  public async init(
    memberCardOffer: MemberCardOffer
  ): Promise<MemberCardOffer> {
    const type = memberCardOffer.type;

    const beginTime: any = new Date();

    const endTime: any = new Date();

    if (type === "DATE_TYPE_FIX_TIME_RANGE") {
    } else if (type === "DATE_TYPE_FIX_TERM") {
    }

    memberCardOffer.beginTime = beginTime;

    memberCardOffer.endTime = endTime;

    await this?.repository?.save?.(memberCardOffer);

    return memberCardOffer;
  }

  public async refundConsume(
    memberCardOfferId: string
  ): Promise<MemberCardOffer> {
    const memberCardOffer: MemberCardOffer =
      await this?.repository?.findOneById?.(memberCardOfferId);

    memberCardOffer.consume = memberCardOffer.consume + 1;

    await this?.repository?.save?.(memberCardOffer);

    return memberCardOffer;
  }
}
