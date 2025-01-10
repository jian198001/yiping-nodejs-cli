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
import { FormService } from '../../../../../module/form/form.service';
import { Form } from '../../../../../entity/Form';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心表单控制器
 * 处理与表单相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/form/form', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterFormFormController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  // 注入FormService实例
  @Inject()
  private formService: FormService = null;
  /**
   * 分页查询表单
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

    // 调用formService的page方法进行分页查询
    const data = await this?.formService?.page?.(query, params, reqParam, page);

    return data;
  }

  /**
   * 根据ID查询表单
   * @param id - 表单ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用formService的getById方法根据ID查询表单
    return await this?.formService?.getById?.(id);
  }

  /**
   * 删除表单
   * @param ids - 表单ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用formService的del方法删除表单
    await this?.formService?.del?.(ids);
  }

  /**
   * 更新表单
   * @param obj - 表单对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Form): Promise<any> {
    // 调用formService的update方法更新表单
    return await this?.formService?.update?.(obj);
  }
}
