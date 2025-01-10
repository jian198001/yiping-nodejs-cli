import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
} from '@midwayjs/decorator';

import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';
import { JobLogService } from '../../../../../module/job/jobLog.service';
import { JobLog } from '../../../../../entity/JobLog';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心作业日志控制器
 * 处理与作业日志相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/job/jobLog', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterJobJobLogController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入JobLogService实例
  @Inject()
  private jobLogService: JobLogService = null;
  
  /**
   * 分页查询作业日志
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
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
    
    // 获取当前用户ID
    const staffId: string = this?.ctx?.state?.user?.id;
    
    console.log(staffId);
    
    // 调用jobLogService的page方法进行分页查询
    const data = await this?.jobLogService?.page?.(query, params, reqParam, page);
    return data;
  }
  
  /**
   * 根据ID查询作业日志
   * @param id - 作业日志ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用jobLogService的getById方法根据ID查询作业日志
    return await this?.jobLogService?.getById?.(id);
  }
  
  /**
   * 删除作业日志
   * @param ids - 作业日志ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用jobLogService的del方法删除作业日志
    await this?.jobLogService?.del?.(ids);
  }
  
  /**
   * 更新作业日志
   * @param obj - 作业日志对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: JobLog): Promise<any> {
    // 调用jobLogService的update方法更新作业日志
    return await this?.jobLogService?.update?.(obj);
  }
}
