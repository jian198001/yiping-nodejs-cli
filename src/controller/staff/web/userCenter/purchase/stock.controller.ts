import { All, Controller, Inject, Query, Logger } from '@midwayjs/decorator';

import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';
import { StockService } from '../../../../../module/purchase/stock.service';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心库存控制器
 */
@Controller('/staff/web/userCenter/purchase/stock', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterStockStockController {
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
   * 注入库存服务
   */
  @Inject()
  private stockService: StockService = null;
  /**
   * 获取库存分页列表
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
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    // 获取当前用户的ID
    const staffId: string = this?.ctx?.state?.user?.id;
    // 打印当前用户的ID
    console?.log?.(staffId);
    // 调用库存服务的分页方法
    const data = await this?.stockService?.page?.(query, params, reqParam, page);
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取库存信息
   * 
   * @param id - 库存ID
   * @returns 返回库存信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用库存服务的根据ID获取方法
    return await this?.stockService?.getById?.(id);
  }
}
