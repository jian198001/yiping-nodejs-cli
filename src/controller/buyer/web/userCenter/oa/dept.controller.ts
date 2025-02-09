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
import { DeptService } from '../../../../../module/oa/dept.service';
import { Dept } from '../../../../../entity/Dept';

import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

import { Context } from '@midwayjs/koa';

/**
 * 买家Web用户中心OA部门控制器
 * 处理与部门相关的HTTP请求，如分页查询、根据ID查询和更新
 */
@Controller('/buyer/web/userCenter/oa/dept', { middleware: [JwtPassportMiddleware,], }, )
export class BuyerWebUserCenterDeptDeptController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  // 注入DeptService实例
  @Inject()
  private deptService: DeptService = null;
  /**
   * 分页查询部门
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
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

    // 获取当前用户ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    console?.log?.(shopBuyerId);

    // 调用deptService的page方法进行分页查询
    const data = await this?.deptService?.page?.(query, params, reqParam, page);

    return data;
  }

  /**
   * 根据ID查询部门
   * @param id - 部门ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用deptService的getById方法根据ID查询部门
    return await this?.deptService?.getById?.(id);
  }

  /**
   * 更新部门
   * @param obj - 部门对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Dept): Promise<any> {
    // 调用deptService的update方法更新部门
    return await this?.deptService?.update?.(obj);
  }
}
