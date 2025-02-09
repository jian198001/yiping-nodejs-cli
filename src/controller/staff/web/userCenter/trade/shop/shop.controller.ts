import { All, Controller, Inject, Query, Logger } from "@midwayjs/decorator";

import { ReqParam } from "../../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../../module/common/model/Page";
import { ILogger } from "@midwayjs/logger";
import { ShopService } from "../../../../../../module/trade/shop.service";
import { Shop } from "../../../../../../entity/Shop";
import { AlipayConfig } from "../../../../../../entity/AlipayConfig";
import { WxPayConfig } from "../../../../../../entity/WxPayConfig";
import { Address } from "../../../../../../entity/Address";

import { Context } from "@midwayjs/koa";

import { JwtPassportMiddleware } from "../../../../../../middleware/jwt.passport.middleware";

/**
 * 员工用户中心店铺控制器
 */
@Controller("/staff/web/userCenter/shop/shop", { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterShopShopController {
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
   * 注入店铺服务
   */
  @Inject()
  private shopService: ShopService = null;
  /**
   * 获取店铺分页列表
   * 
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All("/page.json", )
  public async page(
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
    // 调用店铺服务的分页方法
    const data = await this?.shopService?.page?.(query, params, reqParam, page);
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取店铺信息
   * 
   * @param id - 店铺ID
   * @returns 返回店铺信息
   */
  @All("/getById.json", )
  public async getById(@Query("id") id: string): Promise<any> {
    // 调用店铺服务的根据ID获取方法
    return await this?.shopService?.getById?.(id);
  }
  /**
   * 更新店铺信息
   * 
   * @param obj - 店铺对象
   * @param address - 地址对象
   * @param wxPayConfig - 微信支付配置对象
   * @param alipayConfig - 支付宝支付配置对象
   * @param appIdWxpay - 微信支付AppID
   * @param appIdAlipay - 支付宝支付AppID
   * @returns 返回更新结果
   */
  @All("/update.json", )
  public async update(
    @Query() obj: Shop = null,
    @Query() address: Address = null,
    @Query() wxPayConfig: WxPayConfig = null,
    @Query() alipayConfig: AlipayConfig = null,
    @Query("appIdWxpay") appIdWxpay = "",
    @Query("appIdAlipay") appIdAlipay = ""
  ): Promise<any> {
    // 设置微信支付AppID
    wxPayConfig.appId = appIdWxpay;
    // 设置支付宝支付AppID
    alipayConfig.appId = appIdAlipay;
    // 调用店铺服务的更新方法
    return await this?.shopService?.update(
      obj,
      address,
      wxPayConfig,
      alipayConfig
    );
  }
}
