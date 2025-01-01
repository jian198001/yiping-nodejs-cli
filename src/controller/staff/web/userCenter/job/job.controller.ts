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
import { JobService } from '../../../../../module/job/job.service';
import { Job } from '../../../../../entity/Job';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心作业控制器
 * 处理与作业相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/job/job')
export class StaffWebUserCenterJobJobController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  // 注入JobService实例
  @Inject()
  private jobService: JobService = null;
  /**
   * 分页查询作业
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

    // 调用jobService的page方法进行分页查询
    const data = await this?.jobService?.page?.(query, params, reqParam, page);

    return data;
  }

  /**
   * 根据ID查询作业
   * @param id - 作业ID
   * @returns 返回查询结果
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用jobService的getById方法根据ID查询作业
    return await this?.jobService?.getById?.(id);
  }

  /**
   * 删除作业
   * @param ids - 作业ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', { middleware: [JwtPassportMiddleware] })
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用jobService的del方法删除作业
    await this?.jobService?.del?.(ids);
  }

  /**
   * 更新作业
   * @param obj - 作业对象
   * @returns 返回更新结果
   */
  @All('/update.json', { middleware: [JwtPassportMiddleware] })
  public async update(@Body() obj: Job): Promise<any> {
    // 调用jobService的update方法更新作业
    return await this?.jobService?.update?.(obj);
  }
}
