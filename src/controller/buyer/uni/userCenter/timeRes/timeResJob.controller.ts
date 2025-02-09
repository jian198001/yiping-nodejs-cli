import { All, Controller, Inject, Query, Logger } from "@midwayjs/decorator";
import { ILogger } from "@midwayjs/logger";
import { TimeResJobService } from "../../../../../module/timeRes/timeResJob.service";
import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";

import { TimeResJob } from "../../../../../entity/TimeResJob";

import { JwtPassportMiddleware } from "../../../../../middleware/jwt.passport.middleware";

import { Context } from "@midwayjs/koa";

/**
 * 买家用户中心可预约时间段管理控制器
 */
@Controller("/buyer/uni/userCenter/timeRes/timeResJob", { middleware: [JwtPassportMiddleware,], }, )
export class BuyerUniUserCenterTimeResTimeResJobController {
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
   * 注入可预约时间段管理服务
   */
  @Inject()
  private timeResJobService: TimeResJobService = null;
  /**
   * 获取可预约时间段分页列表
   * 
   * @param user - 用户信息
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All("/page.json", )
  public async page(
    @Query("user") user,
    @Query("query") query: string,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.("分页列表controller");
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用可预约时间段管理服务的分页方法
    const data = await this?.timeResJobService?.page?.(
      shopBuyerId,
      user,
      query,
      params,
      reqParam,
      page
    );
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取可预约时间段信息
   * 
   * @param id - 可预约时间段ID
   * @returns 返回可预约时间段信息
   */
  @All("/getById.json", )
  public async getById(@Query("id") id: string): Promise<any> {
    // 调用可预约时间段管理服务的根据ID获取方法
    return await this?.timeResJobService?.getById?.(id);
  }
  /**
   * 更新可预约时间段信息
   * 
   * @param obj - 可预约时间段对象
   * @param timestartStr - 开始时间字符串
   * @param timeEndStr - 结束时间字符串
   * @param day - 日期
   * @returns 返回更新结果
   */
  @All("/update.json", )
  public async update(
    @Query() obj: TimeResJob,
    @Query("timeStartStr") timestartStr: string,
    @Query("timeEndStr") timeEndStr: string,
    @Query("day") day: string
  ): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 打印当前用户的ID
    console?.log?.(shopBuyerId);
    // 调用可预约时间段管理服务的更新方法
    return await this?.timeResJobService?.update(
      obj,
      timestartStr,
      timeEndStr,
      day,
      shopBuyerId
    );
  }
  /**
   * 更新场景信息
   * 
   * @param username - 用户名
   * @returns 返回更新结果
   */
  @All("/updateScene.json", )
  public async updateScene(@Query("username") username: string): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用可预约时间段管理服务的更新场景方法
    return await this?.timeResJobService?.updateScene(username, shopBuyerId);
  }
}
