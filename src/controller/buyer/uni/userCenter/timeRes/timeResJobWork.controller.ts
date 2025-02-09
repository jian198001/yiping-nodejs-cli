import { All, Controller, Inject, Query, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { TimeResJobWorkService } from '../../../../../module/timeRes/timeResJobWork.service';
import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';

import { TimeResJobWork } from '../../../../../entity/TimeResJobWork';

import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

import { Context } from '@midwayjs/koa';

/**
 * 买家用户中心工作时间管理控制器
 */
@Controller('/buyer/uni/userCenter/timeRes/timeResJobWork', { middleware: [JwtPassportMiddleware,], }, )
export class BuyerUniUserCenterTimeResTimeResJobWorkController {
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
   * 注入工作时间管理服务
   */
  @Inject()
  private timeResJobWorkService: TimeResJobWorkService = null;
  /**
   * 获取工作时间分页列表
   * 
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All('/page.json', )
  public async page(
    @Query('query') query: string,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 打印当前用户的ID
    console?.log?.(shopBuyerId);
    // 调用工作时间管理服务的分页方法
    const data = await this?.timeResJobWorkService?.page?.(query, params, reqParam, page);
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取工作时间信息
   * 
   * @param id - 工作时间ID
   * @returns 返回工作时间信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用工作时间管理服务的根据ID获取方法
    return await this?.timeResJobWorkService?.getById?.(id);
  }
  /**
   * 预约工作时间
   * 
   * @param obj - 工作时间对象
   * @returns 返回预约结果
   */
  @All('/work.json', )
  public async work(@Query() obj: TimeResJobWork): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 设置用户ID
    obj.userId = shopBuyerId;
    // 调用工作时间管理服务的预约方法
    return await this?.timeResJobWorkService?.work(obj);
  }
}
