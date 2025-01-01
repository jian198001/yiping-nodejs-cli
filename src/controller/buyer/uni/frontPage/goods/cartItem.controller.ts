import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
} from "@midwayjs/decorator";

import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { ILogger } from "@midwayjs/logger";
import { CartItemService } from "../../../../../module/trade/cartItem.service";
import { CartItem } from "../../../../../entity/CartItem";

import { JwtPassportMiddleware } from "../../../../../middleware/jwt.passport.middleware";
import { Context } from "@midwayjs/koa";

/**
 * 买家前端页面商品购物车项控制器
 */
@Controller("/buyer/uni/frontPage/goods/cartItem")
export class BuyerUniFrontPageGoodsCartItemController {
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
   * 注入购物车项服务
   */
  @Inject()
  private cartItemService: CartItemService = null;
  /**
   * 获取购物车项分页列表
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
    // 记录日志
    this?.logger?.info?.("分页列表controller");
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用购物车项服务的分页方法
    return await this?.cartItemService?.page?.(
      shopId,
      shopBuyerId,
      query,
      params,
      reqParam,
      page
    );
  }
  /**
   * 获取购物车项数量
   * 
   * @param shopId - 店铺ID
   * @returns 返回购物车项数量
   */
  @All("/count.json", { middleware: [JwtPassportMiddleware] })
  public async count(@Query("shopId") shopId): Promise<any> {
    // 记录日志
    this?.logger?.info?.("分页列表controller");
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用购物车项服务的数量统计方法
    return await this?.cartItemService?.count(
      shopId,
      shopBuyerId
    );
  }
  /**
   * 根据ID获取购物车项
   * 
   * @param id - 购物车项ID
   * @returns 返回购物车项信息
   */
  @All("/getById.json", { middleware: [JwtPassportMiddleware] })
  public async getById(@Query("id") id): Promise<any> {
    // 调用购物车项服务的根据ID获取方法
    return await this?.cartItemService?.getById?.(id);
  }
  /**
   * 添加购物车项
   * 
   * @param cartItem - 购物车项信息
   * @returns 返回添加结果
   */
  @All("/add.json", { middleware: [JwtPassportMiddleware] })
  public async add(@Query() cartItem: CartItem = null): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 设置购物车项的买家ID
    cartItem.shopBuyerId = shopBuyerId;
    // 调用购物车项服务的添加方法
    return await this?.cartItemService?.add(cartItem);
  }
  /**
   * 清空购物车项
   * 
   * @param shopId - 店铺ID
   * @returns 返回清空结果
   */
  @All("/clear.json", { middleware: [JwtPassportMiddleware] })
  public async clear(@Query("shopId") shopId): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用购物车项服务的清空方法
    return await this?.cartItemService?.clear(
      shopId,
      shopBuyerId
    );
  }
  /**
   * 更新购物车项数量
   * 
   * @param id - 购物车项ID
   * @param quantity - 数量
   * @returns 返回更新结果
   */
  @All("/updateQuantity.json", { middleware: [JwtPassportMiddleware] })
  public async updateQuantity(
    @Query("id") id: string,
    @Query("quantity") quantity: number
  ): Promise<any> {
    // 将数量转换为整数
    quantity = parseInt?.(quantity + "");
    // 调用购物车项服务的更新数量方法
    return await this?.cartItemService?.updateQuantity(id, quantity);
  }
  /**
   * 删除购物车项
   * 
   * @param cartItems - 购物车项ID数组
   * @returns 返回删除结果
   */
  @All("/del.json", { middleware: [JwtPassportMiddleware] })
  public async del(@Body() cartItems: string[] = []): Promise<any> {
    // 调用购物车项服务的删除方法
    return await this?.cartItemService?.del(cartItems);
  }
}
