import { All, Controller, Inject, Query } from '@midwayjs/decorator';

import { ReqParam } from '../../../../module/common/model/ReqParam';
import { Page } from '../../../../module/common/model/Page';
import { FormService } from '../../../../module/form/form.service';

/**
 * 员工Web前端页面表单控制器
 * 处理与表单相关的HTTP请求，如分页查询和根据编码查询表单
 */
@Controller('/staff/web/frontPage/form/form')
export class StaffWebFrontPageFormFormController {
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
  @All('/page.json')
  public async page(
    @Query('query') query: string,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 调用formService的page方法进行分页查询
    return await this?.formService?.page?.(query, params, reqParam, page);
  }

  /**
   * 根据编码查询表单
   * @param code - 表单编码
   * @returns 返回查询结果
   */
  @All('/getByCode.json')
  public async getByCode(@Query('code') code: string): Promise<any> {
    // 调用formService的getByCode方法根据编码查询表单
    return await this?.formService?.getByCode(code);
  }
}
