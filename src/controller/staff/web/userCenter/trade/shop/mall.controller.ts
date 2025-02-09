import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
} from '@midwayjs/decorator';

import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';
import { MallService } from '../../../../../../module/trade/mall.service';
import { Mall } from '../../../../../../entity/Mall';

import { Context } from '@midwayjs/koa';

import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心店铺商城控制器
 */
@Controller('/staff/web/userCenter/shop/mall', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterShopMallController {
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
   * 注入商城服务
   */
  @Inject()
  private mallService: MallService = null;
  /**
   * 获取商城分页列表
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
    // 调用商城服务的分页方法
    const data = await this?.mallService?.page?.(query, params, reqParam, page);
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取商城信息
   * 
   * @param id - 商城ID
   * @returns 返回商城信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用商城服务的根据ID获取方法
    return await this?.mallService?.getById?.(id);
  }
  /**
   * 更新商城信息
   * 
   * @param obj - 商城对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Mall): Promise<any> {
    // 调用商城服务的更新方法
    return await this?.mallService?.update?.(obj);
  }
}
