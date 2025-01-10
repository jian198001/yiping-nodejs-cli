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
import { DlgService } from '../../../../../module/webUi/dlg.service';
import { Dlg } from '../../../../../entity/Dlg';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心表单对话框控制器
 * 处理与对话框相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/form/dlg', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterDlgDlgController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  // 注入DlgService实例
  @Inject()
  private dlgService: DlgService = null;
  /**
   * 分页查询对话框
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

    // 调用dlgService的page方法进行分页查询
    const data = await this?.dlgService?.page?.(query, params, reqParam, page);

    return data;
  }

  /**
   * 根据ID查询对话框
   * @param id - 对话框ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用dlgService的getById方法根据ID查询对话框
    return await this?.dlgService?.getById?.(id);
  }

  /**
   * 删除对话框
   * @param ids - 对话框ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用dlgService的del方法删除对话框
    await this?.dlgService?.del?.(ids);
  }

  /**
   * 更新对话框
   * @param obj - 对话框对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Dlg): Promise<any> {
    // 调用dlgService的update方法更新对话框
    return await this?.dlgService?.update?.(obj);
  }
}
