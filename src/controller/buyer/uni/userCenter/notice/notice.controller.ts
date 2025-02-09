import { All, Controller, Inject, Query, Logger } from "@midwayjs/decorator";
import { ILogger } from "@midwayjs/logger";
import { NoticeService } from "../../../../../module/notice/notice.service";
import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";

import { Notice } from "../../../../../entity/Notice";

import { JwtPassportMiddleware } from "../../../../../middleware/jwt.passport.middleware";

import { Context } from "@midwayjs/koa";

/**
 * 买家用户中心通知控制器
 */
@Controller("/buyer/uni/userCenter/notice/notice", { middleware: [JwtPassportMiddleware,], }, )
export class BuyerUniUserCenterNoticeNoticeController {
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
   * 注入通知服务
   */
  @Inject()
  private noticeService: NoticeService = null;
  /**
   * 获取通知分页列表
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
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.("分页列表controller");
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 打印当前用户的ID
    console?.log?.(shopBuyerId);
    // 调用通知服务的分页方法
    const data = await this?.noticeService?.page?.(
      query,
      params,
      reqParam,
      page
    );
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取通知
   * 
   * @param id - 通知ID
   * @returns 返回通知信息
   */
  @All("/getById.json", )
  public async getById(@Query("id") id: string): Promise<any> {
    // 调用通知服务的根据ID获取方法
    return await this?.noticeService?.getById?.(id);
  }
  /**
   * 更新通知
   * 
   * @param obj - 通知对象
   * @returns 返回更新结果
   */
  @All("/update.json", )
  public async update(@Query() obj: Notice): Promise<any> {
    // 调用通知服务的更新方法
    return this?.noticeService?.update?.(obj);
  }
}
