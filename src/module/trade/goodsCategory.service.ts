// 导入所需的模块和装饰器
import { App, Logger, Provide } from "@midwayjs/decorator";
import { Application } from "@midwayjs/koa";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { GoodsCategory } from "../../entity/GoodsCategory";
import { MultipartFile } from "../../entity/MultipartFile";
import { ILogger } from "@midwayjs/logger";
import { Zero0Error } from "../common/model/Zero0Error";
import _ = require("lodash");
import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import * as fileUtils from "../common/utils/fileUtils";

/**
 * 商品分类服务类
 */
@Provide()
export class GoodsCategoryService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 应用实例
  @App()
  private app: Application = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "goods_category";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${GoodsCategoryService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  

  , t.id AS cat_id

  , t.name AS cat_name

    , ( SELECT uri FROM multipart_file WHERE multipart_file.ext_id = t.id LIMIT 0,1 ) AS img

    , ( SELECT uri FROM multipart_file WHERE multipart_file.ext_id = t.id LIMIT 0,1 ) AS back_img

    , LENGTH(code)/4 AS level 

     `;

  // 注入商品分类实体模型
  @InjectEntityModel(GoodsCategory)
  private repository: Repository<GoodsCategory> = null;

  // 注入文件上传实体模型
  @InjectEntityModel(MultipartFile)
  private multipartFileRepository: Repository<MultipartFile> = null;

  /**
   * 分页查询商品分类数据
   * @param shopId - 店铺ID
   * @param query - 查询字符串
   * @param params - 参数对象
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    shopId = "",
    query = "",
    params: string,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 查询条件字符串
    let whereSql = " ";

    // 根据店铺ID筛选
    if (shopId) {
      whereSql += ` AND t.shop_id = '${shopId}' `;
    }

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
    this?.setArrToRedis?.(data?.list, GoodsCategoryService?.TABLE_NAME);                         

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
   * 根据ID查询商品分类数据
   * @param id - 商品分类ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = GoodsCategoryService.TABLE_NAME + `:${id}`;

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

    this?.redisService?.set?.(key, JSON?.stringify?.(data));

    // 返回数据

    return data;
  }

  /**
   * 获取商品分类的子分类
   * @param parentId - 父级分类ID
   * @param reqParam - 请求参数对象
   * @returns 商品分类的子分类数组
   */
  public async arrPane(parentId: string, reqParam: ReqParam): Promise<any[]> {
    // 按照NutUI的格式，通过第一级商品栏目的ID，取得对应下两级商品栏目信息

    // 通过栏目的id，取得栏目的code
    const obj: GoodsCategory = await this?.repository?.findOneById?.(parentId);
    const parentCode = obj.code;

    // 通过like语句，一次性查询此栏目下的所有子栏目信息
    const whereSql = ` AND t.code LIKE '${parentCode}%' AND LENGTH(t.code) > 7 `;
    const anies: any[] = await super.arrBase?.(
      reqParam,
      this?.selectSql,
      this?.fromSql,
      whereSql
    );

    const arr: any[] = [];

    // 将二级目录筛选出来，放到arr中
    for (const element of anies) {
      if (element?.code?.length === 8) {
        arr?.push?.(element);
        continue;
      }
    }

    // 将对应的三级栏目整合到二级栏目下
    for (const element of arr) {
      const code = element?.code;
      for (const aniesOne of anies) {
        const subCode = aniesOne?.code;
        if (subCode.length === 12 && _?.startsWith?.(subCode, code)) {
          if (!element?.childCateList || !element?.childCateList?.length) {
            element.childCateList = [];
          }
          element?.childCateList?.push?.(aniesOne);
        }
      }
    }

    return arr;
  }

  /**
   * 删除商品分类数据
   * @param ids - 商品分类ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = GoodsCategoryService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);  

    // 删除redis缓存
    this?.redisService?.del?.(GoodsCategoryService?.TABLE_NAME + `:arr`);  
  }

  /**
   * 更新商品分类数据
   * @param obj - 商品分类对象
   * @returns 更新后的商品分类对象
   */
  public async update(obj: GoodsCategory): Promise<any> {
    // 一个表进行操作 typeORM
    let log = "";
    // 删除redis缓存

    const key = GoodsCategoryService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key); 

    // 删除redis缓存
    this?.redisService?.del?.(GoodsCategoryService?.TABLE_NAME + `:arr`);       

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      GoodsCategoryService?.TABLE_NAME,
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
          GoodsCategoryService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      if (!obj?.code) {
        await this?.updateCode(obj);
      }

      return;
    }

    let old: GoodsCategory = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供
      await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          GoodsCategoryService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      if (!obj?.code) {
        await this?.updateCode(obj);
      }

      return;
    }

    delete obj?.id;

    old = {
      ...old,
      ...obj,
    };

    await this?.repository?.save?.(old); // 修改数据

    if (!old?.code) {
      await this?.updateCode(old);
    }
    return;
  }

  private async updateCode(obj: GoodsCategory): Promise<void> {
    // 如果parentCode为空，则生成一个4位的code

    const parentId = obj.parentId;

    if (!parentId) {
      // TODO 如果parentId为空，则从当前级别code中选取最大的code来加1

      obj.code = await super.getCode?.(
        null,
        GoodsCategoryService?.TABLE_NAME,
        4
      );

      await this?.repository?.save?.(obj);

      return;
    }

    const parent: GoodsCategory = await this?.repository?.findOneById?.(
      parentId
    );

    const parentCode = parent?.code;

    const code = await super.getCode?.(
      parentCode,
      GoodsCategoryService?.TABLE_NAME,
      4
    );

    obj.code = code;

    await this?.repository?.save?.(obj);
  }

  public async imgUpload(files: any[], query: any): Promise<MultipartFile> {
    // 一个商品分类只能对应一个图片，所以上传新图片前删除旧图片

    await this?.imgDel(query?.id);

    // 得到当前上传文件的暂存文件路径

    const file = files?.[0];

    const uri: string = fileUtils?.copySync(
      file,
      "goodsCategory",
      this?.app?.getAppDir()
    );

    // public/fileLoad/upload/新文件名，作为multipart_file表的uri字段值，业务ID（如传送的是车辆的驾驶证，则业务ID是car表的pid），作为multipart_file表的ext_id,ext_type是car_行驶证的英文

    const multipartFile = new MultipartFile();

    multipartFile.uri = uri;

    multipartFile.extId = query?.id;

    // multipartFile.extType = query?.mimeType

    await this?.multipartFileRepository?.save?.(multipartFile);

    // 把multipart_file对象信息返回

    return multipartFile;
  }

  public async imgDel(id: string): Promise<void> {
    await this?.multipartFileRepository?.delete?.({ extId: id });
  }

  /**
   * getMaxCodeLength
   */
  public async getMaxCodeLength(): Promise<number> {
    // 1代表1层目录，2代表2层目录，3代表3层目录

    const sql = ` SELECT LENGTH(code)/4  AS code_length ${this?.fromSql} WHERE code = MAX(code)  `;

    return await super.query?.(sql)[0]?.code_length;
  }
}
