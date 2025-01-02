import { All, Controller, Inject, Query, Logger } from "@midwayjs/decorator";

import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { ILogger } from "@midwayjs/logger";
import { GoodsCategoryService } from "../../../../../module/trade/goodsCategory.service";

import { JwtPassportMiddleware } from "../../../../../middleware/jwt.passport.middleware";

import { Context } from "@midwayjs/koa";

/**
 * 买家前端页面商品分类控制器
 */
@Controller("/buyer/uni/frontPage/goods/goodsCategory")
export class BuyerUniFrontPageGoodsGoodsCategoryController {
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
   * 注入商品分类服务
   */
  @Inject()
  private goodsCategoryService: GoodsCategoryService = null;
  /**
   * 获取商品分类分页列表
   * 
   * @param shopId - 店铺ID
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All("/page.json", { middleware: [JwtPassportMiddleware] })
  public async page(
    @Query("shopId") shopId,
    @Query("query") query,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page
  ): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    console.log(shopBuyerId);

    // 记录日志
    this?.logger?.info?.("分页列表controller");
    // 调用商品分类服务的分页方法
    return  await this?.goodsCategoryService?.page?.(
      shopId,
      query,
      params,
      reqParam,
      page
    );
  }
  /**
   * 根据ID获取商品分类
   * 
   * @param id - 商品分类ID
   * @returns 返回商品分类信息
   */
  @All("/getById.json", { middleware: [JwtPassportMiddleware] })
  public async getById(@Query("id") id: string): Promise<any> {
    // 调用商品分类服务的根据ID获取方法
    return  await this?.goodsCategoryService?.getById?.(id);
  }
  /**
   * 获取商品分类子分类列表
   * 
   * @param parentId - 父分类ID
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @returns 返回子分类列表
   */
  @All("/arrPane.json")
  public async arrPane(
    @Query("parentId") parentId = "",
    @Query("query") query,
    @Query() params: any,
    @Query() reqParam: ReqParam
  ): Promise<any> {
    // 调用商品分类服务的获取子分类列表方法
    return await this?.goodsCategoryService?.arrPane(
      parentId,
      reqParam
    );
  }
}
