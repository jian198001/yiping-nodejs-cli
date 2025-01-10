import { All, Controller, Query, Inject, Logger } from '@midwayjs/decorator';

import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';

import { ProfitSharingService } from '../../../../../../module/trade/profitSharing.service';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心买家分账控制器
 */
@Controller('/staff/web/userCenter/trade/buyer/profitSharing', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterTradeOrderBuyerProfitSharingController {
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
   * 注入分账服务
   */
  @Inject()
  private profitSharingService: ProfitSharingService = null;
  /**
   * 获取分账分页列表
   * 
   * @param shopBuyerId - 店铺买家ID
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All('/page.json', )
  public async page(
    @Query('shopBuyerId') shopBuyerId = '',
    @Query('query') query: string,
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');

    // 获取当前用户的ID
    const staffId: string = this?.ctx?.state?.user?.id;

    // 打印当前用户的ID
    console.log(staffId);

    // 调用分账服务的分页方法
    const data = await this?.profitSharingService?.page?.(
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
   * 根据ID获取分账信息
   * 
   * @param id - 分账ID
   * @returns 返回分账信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用分账服务的根据ID获取方法
    return await this?.profitSharingService?.getById?.(id);
  }
}
