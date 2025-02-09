import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
  Files,
} from "@midwayjs/decorator";

import { ReqParam } from "../../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../../module/common/model/Page";
import { ILogger } from "@midwayjs/logger";
import { GoodsService } from "../../../../../../module/trade/goods.service";
import { Goods } from "../../../../../../entity/Goods";

import { Context } from "@midwayjs/koa";

import { JwtPassportMiddleware } from "../../../../../../middleware/jwt.passport.middleware";

/**
 * 员工用户中心商品控制器
 */
@Controller("/staff/web/userCenter/goods/goods", {
  middleware: [JwtPassportMiddleware],
})
export class StaffWebUserCenterGoodsGoodsController {
  /**
   * 注入上下文对象
   */
  @Inject()
  private ctx: Context = null;
  /**
   * 注入日志记录器
   */
  @Logger()
  private logger: ILogger = null;
  /**
   * 注入商品服务
   */
  @Inject()
  private goodsService: GoodsService = null;
  /**
   * 获取商品分页列表
   *
   * @param goodsCategoryId - 商品分类ID
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All("/page.json")
  public async page(
    @Query("goodsCategoryId") goodsCategoryId = "",
    @Query("query") query: string,
    @Query("params") params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.("分页列表controller");
    // 获取当前用户的ID
    const staffId: string = this?.ctx?.state?.user?.id;
    // 打印当前用户的ID
    console?.log?.(staffId);
    // 调用商品服务的分页方法
    const data = await this?.goodsService?.page?.(
      goodsCategoryId,
      null,
      query,
      params,
      reqParam,
      page
    );
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取商品信息
   *
   * @param id - 商品ID
   * @returns 返回商品信息
   */
  @All("/getById.json")
  public async getById(@Query("id") id: string): Promise<any> {
    // 调用商品服务的根据ID获取方法
    return await this?.goodsService?.getById?.(id);
  }
  /**
   * 删除商品
   *
   * @param ids - 商品ID数组
   * @returns 返回删除结果
   */
  @All("/del.json")
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用商品服务的删除方法
    await this?.goodsService?.del?.(ids);
  }
  /**
   * 更新商品信息
   *
   * @param obj - 商品对象
   * @param imgs - 商品图片
   * @returns 返回更新结果
   */
  @All("/update.json")
  public async update(
    @Body() obj: Goods = null,
    @Query("imgs") imgs = ""
  ): Promise<any> {
    // 调用商品服务的更新方法
    return await this?.goodsService?.update(obj, imgs);
  }

  public async updateSku(
    @Body() obj: any = null
  ) {

    console.log(obj);
    
    return null;

  }

  /**
   * 上架商品
   *
   * @param id - 商品ID
   * @returns 返回操作结果
   */
  @All("/onsale.json")
  public async onsale(@Query("id") id: string): Promise<any> {
    // 调用商品服务的上架方法
    await this?.goodsService?.onsale(id);
  }
  /**
   * 下架商品
   *
   * @param id - 商品ID
   * @returns 返回操作结果
   */
  @All("/instock.json")
  public async instock(@Query("id") id: string): Promise<any> {
    // 调用商品服务的下架方法
    await this?.goodsService?.instock(id);
  }
  /**
   * 上传商品图片
   *
   * @param files - 上传的文件
   * @param query - 查询参数
   * @returns 返回上传结果
   */
  @All("/imgUpload.json")
  public async imgUpload(@Files() files, @Query() query): Promise<any> {
    // 调用商品服务的图片上传方法
    return await this?.goodsService?.imgUpload(files, query);
  }
}
