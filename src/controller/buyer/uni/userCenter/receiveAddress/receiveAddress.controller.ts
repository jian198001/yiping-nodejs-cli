import { All, Controller, Inject, Query, Logger } from "@midwayjs/decorator";
import { ILogger } from "@midwayjs/logger";
import { BuyerReceiveAddressService } from "../../../../../module/trade/buyerReceiveAddress.service";
import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";

import { BuyerReceiveAddress } from "../../../../../entity/BuyerReceiveAddress";

import { JwtPassportMiddleware } from "../../../../../middleware/jwt.passport.middleware";

import { Context } from "@midwayjs/koa";

/**
 * 买家用户中心收货地址控制器
 */
@Controller("/buyer/uni/userCenter/receiveAddress/receiveAddress")
export class BuyerUniUserCenterReceiveAddressReceiveAddressController {
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
   * 注入买家收货地址服务
   */
  @Inject()
  private buyerReceiveAddressService: BuyerReceiveAddressService = null;
  /**
   * 获取收货地址分页列表
   * 
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All("/page.json", { middleware: [JwtPassportMiddleware] })
  public async page(
    @Query("query") query: string,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.("分页列表controller");
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用买家收货地址服务的分页方法
    const data = await this?.buyerReceiveAddressService?.page?.(
      shopBuyerId,
      query,
      params,
      reqParam,
      page
    );
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取收货地址
   * 
   * @param id - 收货地址ID
   * @returns 返回收货地址信息
   */
  @All("/getById.json", { middleware: [JwtPassportMiddleware] })
  public async getById(@Query("id") id: string): Promise<any> {
    // 调用买家收货地址服务的根据ID获取方法
    return await this?.buyerReceiveAddressService?.getById?.(id);
  }
  /**
   * 更新收货地址
   * 
   * @param obj - 收货地址对象
   * @returns 返回更新结果
   */
  @All("/update.json", { middleware: [JwtPassportMiddleware] })
  public async update(@Query() obj: BuyerReceiveAddress): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用买家收货地址服务的更新方法
    return await this?.buyerReceiveAddressService?.update(obj, shopBuyerId);
  }
}
