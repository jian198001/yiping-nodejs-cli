// 导入所需的模块和装饰器
import { App, Config, Inject, Logger, Provide } from "@midwayjs/decorator";
import { Application } from "@midwayjs/koa";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Goods } from "../../entity/Goods";
import { ILogger } from "@midwayjs/logger";
import { Zero0Error } from "../common/model/Zero0Error";
import { ShopService } from "./shop.service";
import { Shop } from "../../entity/Shop";
import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import { MultipartFile } from "../../entity/MultipartFile";
import * as fileUtils from "../common/utils/fileUtils";
import _ = require("lodash");

/**
 * 商品服务类
 */
@Provide()
export class GoodsService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 配置项：域名
  @Config("domain")
  private domain: any = { domainName: "" };

  // 应用实例
  @App()
  private app: Application = null;

  // 商品图片为空时的默认图片
  public static emptyGoodsImg = "http://cdn.uviewui.com/uview/empty/data.png";

  // 查询的数据库表名称
  public static TABLE_NAME = "goods";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${GoodsService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
    , ( SELECT name FROM goods_category WHERE goods_category.id = t.goods_category_id ) AS goods_category_name
    , ( CASE t.approve_status WHEN 'onsale' THEN '上架出售中' ELSE '仓库中' END ) approve_status_cn
    , ( CASE t.sub_stock WHEN 'pay' THEN '付款减库存' WHEN 'delivery' THEN '出库减库存' ELSE '下单减库存' END ) AS sub_stock_cn
    , ( CASE t.delivery WHEN 'delivery' THEN '需物流' ELSE '电子凭证不需物流' END ) AS delivery_cn
    , ( length * breadth * height ) AS volume
    , ( CASE t.unit WHEN 'mass' THEN '质量(公斤kg)' WHEN 'volume' THEN '体积(毫升ml)' WHEN 'time' THEN '时间(分minute)' WHEN 'length' THEN '距离(公里km)' WHEN 'area' THEN '面积(平方米m2)' ELSE '件' END ) AS unit_cn 
    , IFNULL(( SELECT uri FROM multipart_file WHERE ext_id = t.id LIMIT 0, 1 ), '${GoodsService.emptyGoodsImg}') AS img 
     `;

  // 注入商品实体模型
  @InjectEntityModel(Goods)
  private repository: Repository<Goods> = null;

  // 注入店铺服务
  @Inject()
  private shopService: ShopService = null;

  // 注入文件上传实体模型
  @InjectEntityModel(MultipartFile)
  private multipartFileRepository: Repository<MultipartFile> = null;

  /**
   * 分页查询商品数据
   * @param goodsCategoryId - 商品分类ID
   * @param approveStatus - 商品审核状态
   * @param query - 查询字符串
   * @param params - 参数对象
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    goodsCategoryId = "",
    approveStatus = "",
    query = "",
    params: string,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 查询条件字符串
    let whereSql = " ";

    // 根据商品分类ID筛选
    if (goodsCategoryId) {
      whereSql += ` AND t.goods_category_id = '${goodsCategoryId}' `;
    }

    // 根据商品审核状态筛选
    if (approveStatus) {
      whereSql += ` AND t.approve_status = '${approveStatus}' `;
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

    // 遍历查询结果,将查询结果中异步读取到redis

    this?.getToRedis?.(_?.map?.(data?.list, "id"));

    if (page?.pageSize > 0) {
      return data;
    }

    // 将查询结果中的数据列表存入redis
    this?.setArrToRedis?.(data?.list, GoodsService?.TABLE_NAME);                       

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
   * 根据ID查询商品数据
   * @param id - 商品ID
   * @param shopBuyerId - 店铺买家ID
   * @returns 查询结果
   */
  public async getById(id: string): Promise<any> {
    // 根据id查询一条数据
    const goods: any = await super.getByIdBase?.(
      id,
      this?.selectSql,
      this?.fromSql
    );

    if (!goods) {
       return {} ;
    }

    const skus: any = {};
    const properties: any[] = [];
    let showAddCart = true;

    // 获取店铺信息
    const shop: Shop = await this?.shopService?.getById?.(goods?.shopId);

    // 判断是否显示添加购物车按钮
    if (shop?.cart === "0") {
      showAddCart = false;
    }

    goods.skus = skus;
    goods.properties = properties;
    goods.showAddCart = showAddCart;

    // 获取商品图片信息
    const multipartFiles: MultipartFile[] =
      await this?.multipartFileRepository.findBy?.({ extId: id });

    const imgs: string[] = [];

    if (multipartFiles) {
      for (const multipartFile of multipartFiles) {
        // 拼接图片URL
        imgs.push?.("https://" + this?.domain.domainName + multipartFile.uri);
      }
      // 拼接商品主图URL
      goods.img = "https://" + this?.domain.domainName + goods.img;
    } else {
      // 添加默认图片
      imgs.push?.(GoodsService.emptyGoodsImg);
    }

    goods.imgs = imgs;

    return goods;
  }

  /**
   * 删除商品数据
   * @param ids - 商品ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = GoodsService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);  

    // 删除redis缓存
    this?.redisService?.del?.(GoodsService?.TABLE_NAME + `:arr`);   
  }

  /**
   * 更新商品数据
   * @param obj - 商品对象
   * @param imgs - 商品图片
   * @returns 更新后的商品对象
   */
  public async update(obj: Goods, imgs = ""): Promise<any> {
    // 删除redis缓存

    const key = GoodsService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key); 

    // 删除redis缓存
    this?.redisService?.del?.(GoodsService?.TABLE_NAME + `:arr`);     
    
    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      GoodsService?.TABLE_NAME,
      [],
      obj?.id
    );

    if (uniqueText) {
      // 某unique字段值已存在，抛出异常，程序处理终止
      const log = uniqueText + "已存在，操作失败";
      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    let log = "";

    // 新增数据，主键id的随机字符串值，由后端typeorm

    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
      delete obj?.id;
    }

    this?.logger?.info?.("新增或修改商品");

    if (!obj?.name || !obj?.goodsCategoryId || !obj?.goodsSn) {
      log = "商品名称/商品分类/商品货号某些内容为空";

      throw new Zero0Error(log, "5000");
    }

    if (!obj?.approveStatus) {
      obj.approveStatus = "instock";
    }

    if (!obj?.title) {
      obj.title = obj?.name;
    }

    if (!obj?.quota || obj?.quota < 1) {
      obj.quota = 1000000000;
    }

    if (!obj?.startSaleNum || obj?.startSaleNum < 1) {
      obj.startSaleNum = 1;
    }

    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
      delete obj?.id;

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, GoodsService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }

      await this?.imgUpdate(imgs, obj?.id);

       return {} ;
    }

    let old: Goods = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, GoodsService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }

      await this?.imgUpdate(imgs, obj?.id);

       return {} ;
    }

    delete obj?.id;

    old = {
      ...old,
      ...obj,
    };

    await this?.imgUpdate(imgs, old?.id);

    await this?.repository?.save?.(old); // 修改数据
  }

  /**
   * 更新审批状态
   * @param id - 商品ID
   * @returns 更新后的商品对象
   */
  public async updateApproveStatus(id: string): Promise<object> {
     return {} ;
  }

  /**
   * 商品下架
   * @param goodsId - 商品ID
   * @returns 无返回值
   */
  public async instock(goodsId: string): Promise<void> {
    this?.logger?.info?.("商品下架");

    const goods: Goods = await this?.repository?.findOneById?.(goodsId);

    goods.approveStatus = "instock";

    await this?.repository?.save?.(goods);

    return;
  }

  /**
   * 商品上架
   * @param goodsId - 商品ID
   * @returns 无返回值
   */
  public async onsale(goodsId: string): Promise<void> {
    this?.logger?.info?.("商品上架");

    const goods: Goods = await this?.repository?.findOneById?.(goodsId);

    goods.approveStatus = "onsale";

    await this?.repository?.save?.(goods);

    return;
  }

  /**
   * 商品数量
   * @param shopId - 店铺ID
   * @returns 商品数量
   */
  public async goodsCount(shopId: string): Promise<number> {
     return 0;
  }

  /**
   * 库存变更
   * @param goodsId - 商品ID
   * @param goodsSkuId - 商品SKU ID
   * @param skuList - SKU列表
   * @param quantity - 数量
   * @returns 无返回值
   */
  public async countStock(
    goodsId: string,
    goodsSkuId: string,
    skuList: string,
    quantity: number
  ): Promise<void> {
    // let log = '';

    this?.logger?.info?.("判断商品库存是否充足,是否能满足此次购买所需库存");

    // const goods: Goods = await this?.repository?.findOneById?.(goodsId);

    this?.logger?.info?.("多规格商品");

    // TODO
  }

  /**
   * 增加库存
   * @param goodsId - 商品ID
   * @param goodsSkuId - 商品SKU ID
   * @param quantity - 数量
   * @returns 无返回值
   */
  public async addStock(
    goodsId: string,
    goodsSkuId: string,
    quantity: number
  ): Promise<void> {
    this?.logger?.info?.("增加库存");

     return
  }

  /**
   * 减少库存
   * @param goodsId - 商品ID
   * @param goodsSkuId - 商品SKU ID
   * @param quantity - 数量
   * @returns 无返回值
   */
  public async reduceStock(
    goodsId: string,
    goodsSkuId: string,
    quantity: number
  ): Promise<void> {
    this?.logger?.info?.("减少库存");

     return
  }

  private async imgUpdate(imgs = "", goodsId = ""): Promise<void> {
    await this?.multipartFileRepository?.delete?.({ extId: goodsId });

    if (!imgs) return;

    const imgArr: any[] = JSON?.parse?.(decodeURIComponent?.(imgs));

    if (!imgArr) return;

    for (const element of imgArr) {
      const multipartFile = new MultipartFile();

      multipartFile.uri = element;

      multipartFile.extId = goodsId;

      await this?.multipartFileRepository?.save?.(multipartFile);
    }
  }

  public async imgUpload(files: any[], query: any): Promise<MultipartFile> {
    // 一个商品分类只能对应一个图片，所以上传新图片前删除旧图片

    // 得到当前上传文件的暂存文件路径

    const file = files?.[0];

    const uri: string = fileUtils?.copySync(
      file,
      "goods",
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
}
