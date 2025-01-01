import { All, Controller, Inject, Query, Logger } from "@midwayjs/decorator";

import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { ILogger } from "@midwayjs/logger";
import { GoodsService } from "../../../../../module/trade/goods.service";
import { FavorService } from "../../../../../module/trade/favor.service";
import { Favor } from "../../../../../entity/Favor";

import { JwtPassportMiddleware } from "../../../../../middleware/jwt.passport.middleware";

import { Context } from "@midwayjs/koa";

/**
 * 买家前端页面商品控制器
 */
@Controller("/buyer/uni/frontPage/goods/goods")
export class BuyerUniFrontPageGoodsGoodsController {
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
   * 注入收藏服务
   */
  @Inject()
  private favorService: FavorService = null;
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
  @All("/page.json", { middleware: [JwtPassportMiddleware] })
  public async page(
    @Query("goodsCategoryId") goodsCategoryId = "",
    @Query("query") query,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.("分页列表controller");
    // 调用商品服务的分页方法
    return  await this?.goodsService?.page?.(
      goodsCategoryId,
      "onsale",
      query,
      params,
      reqParam,
      page
    );
  }
  /**
   * 根据ID获取商品
   * 
   * @param id - 商品ID
   * @returns 返回商品信息
   */
  @All("/getById.json", { middleware: [JwtPassportMiddleware] })
  public async getById(@Query("id") id: string): Promise<any> {
    // 调用商品服务的根据ID获取方法
    return  await this?.goodsService?.getById?.(id, null);
  }
  /**
   * 收藏商品
   * 
   * @param favor - 收藏信息
   * @returns 返回收藏结果
   */
  @All("/favor.json", { middleware: [JwtPassportMiddleware] })
  public async favor(favor: Favor): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    // 设置收藏的买家ID
    favor.shopBuyerId = shopBuyerId;

    // 调用收藏服务的更新方法
    return await this?.favorService?.update(favor);
  }
}
