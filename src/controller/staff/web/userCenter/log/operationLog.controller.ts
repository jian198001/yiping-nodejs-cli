import { All, Controller, Inject, Query, Logger, Body } from '@midwayjs/decorator';

import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';
import { OperationLogService } from '../../../../../module/log/operationLog.service';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心操作日志控制器
 * 处理与操作日志相关的HTTP请求，如分页查询、根据ID查询、删除
 */
@Controller('/staff/web/userCenter/log/operationLog')
export class StaffWebUserCenterLogOperationLogController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  // 注入OperationLogService实例
  @Inject()
  private operationLogService: OperationLogService = null;
  /**
   * 分页查询操作日志
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/page.json', { middleware: [JwtPassportMiddleware] })
  public async page(
    @Query('query') query: string,
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');

    // 获取当前用户ID
    const staffId: string = this?.ctx?.state?.user?.id;

    console.log(staffId);

    // 调用operationLogService的page方法进行分页查询
    const data = await this?.operationLogService?.page?.(query, params, reqParam, page);

    return data;
  }

  /**
   * 根据ID查询操作日志
   * @param id - 操作日志ID
   * @returns 返回查询结果
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用operationLogService的getById方法根据ID查询操作日志
    return await this?.operationLogService?.getById?.(id);
  }

  /**
   * 删除操作日志
   * @param ids - 操作日志ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', { middleware: [JwtPassportMiddleware] })
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用operationLogService的del方法删除操作日志
    await this?.operationLogService?.del?.(ids);
  }
}
