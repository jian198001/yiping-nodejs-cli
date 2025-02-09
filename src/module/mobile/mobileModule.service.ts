// 引入必要的模块和装饰器
import { Provide, Logger } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { MobileModule } from "../../entity/MobileModule";
import { Zero0Error } from "../common/model/Zero0Error";
import { ILogger } from "@midwayjs/logger";

// 引入路径模块
import * as path from "path";
import _ = require("lodash");

// 引入SQL和字符串工具函数
import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";

// 引入文件系统扩展模块和日期处理模块
const fse: any = require("fs-extra"),
  moment: any = require("moment");

/**
 * 移动模块服务类
 * 提供移动模块的增删改查功能
 */
@Provide()
export class MobileModuleService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "mobile_module";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${MobileModuleService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  `;

  // 注入MobileModule实体的Repository
  @InjectEntityModel(MobileModule)
  private repository: Repository<MobileModule> = null;

  /**
   * 分页查询移动模块
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

    let parameters: any[] = [];

    if (params && params?.length > 3) {
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

    // 遍历查询结果,将查询结果异步读取到redis

    // 遍历查询结果,将查询结果中异步读取到redis

    this?.getToRedis?.(_?.map?.(data?.list, "id"));

    if (page?.pageSize > 0) {
      return data;
    }

    // 将查询结果中的数据列表存入redis
    this?.setArrToRedis?.(data?.list, MobileModuleService?.TABLE_NAME);             

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
   * 根据ID查询移动模块
   * @param id - 移动模块ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = MobileModuleService?.TABLE_NAME + `:${id}`;

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
   * 删除移动模块
   * @param ids - 移动模块ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = MobileModuleService?.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);  

    // 删除redis缓存
    this?.redisService?.del?.(MobileModuleService?.TABLE_NAME + `:arr`);                  
  }

  /**
   * 更新移动模块
   * @param obj - 移动模块对象
   * @returns 更新后的移动模块对象
   */
  public async update(obj: MobileModule): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";
    // 删除redis缓存

    const key = MobileModuleService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);   

    // 删除redis缓存
    this?.redisService?.del?.(MobileModuleService?.TABLE_NAME + `:arr`);                    

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      MobileModuleService?.TABLE_NAME,
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

    // 新增数据，主键id的随机字符串值，由后端typeorm提供
    if (!obj?.id) {
      log = "新增数据，主键id的随机字符串值，由后端typeorm提供";

      delete obj?.id;

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          MobileModuleService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
       return {} ;
    }

    let old: MobileModule = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          MobileModuleService?.TABLE_NAME
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
   * 更新页面配置
   * @param packageUview2 - 包路径
   * @param pathModule - 模块路径
   * @returns 无返回值
   */
  public async updatePages(
    packageUview2: string,
    pathModule: string
  ): Promise<void> {
    const join: string = path?.join?.(packageUview2, "..", "pages.json");

    const readFileSync = fse?.readFileSync(join, "UTF-8");

    const evalObj: any = JSON?.parse?.(readFileSync);

    let pages: any[] = evalObj.pages;

    pages = await this?.forEachPages(pages, "pages/" + pathModule + "/page");

    pages = await this?.forEachPages(pages, "pages/" + pathModule + "/detail");

    pages = await this?.forEachPages(pages, "pages/" + pathModule + "/update");

    evalObj.pages = pages;

    const joinBak: string =
      join + "_" + new moment().format?.("YYYYMMDDHHmmss") + "_bak";

    fse?.ensureFileSync(joinBak);

    fse?.copySync(join, joinBak);

    fse?.writeFileSync(join, JSON?.stringify(evalObj), "UTF-8");
  }

  /**
   * 遍历页面数组并添加路径
   * @param pages - 页面数组
   * @param path - 路径
   * @returns 更新后的页面数组
   */
  private async forEachPages(pages: any[], path: string): Promise<any[]> {
    if (!pages) {
      return [];
    }

    if (!path) {
      return pages;
    }

    let b = false;

    _?.forEach(pages, (value, key) => {
      if (path === value.path) {
        b = true;
      }
    });

    if (b) {
      return pages;
    }

    pages.push?.({ path: path });

    return pages;
  }
}
