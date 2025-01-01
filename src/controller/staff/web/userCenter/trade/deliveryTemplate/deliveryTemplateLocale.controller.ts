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
import { DeliveryTemplateLocaleService } from '../../../../../../module/trade/deliveryTemplateLocale.service';
import { DeliveryTemplateLocale } from '../../../../../../entity/DeliveryTemplateLocale';

import { Context } from '@midwayjs/koa';

import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心配送模板地区控制器
 */
@Controller('/staff/web/userCenter/deliveryTemplate/deliveryTemplateLocale')
export class StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController {
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
   * 注入配送模板地区服务
   */
  @Inject()
  private deliveryTemplateLocaleService: DeliveryTemplateLocaleService = null;
  /**
   * 获取配送模板地区分页列表
   * 
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
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

    // 获取当前用户的ID
    const staffId: string = this?.ctx?.state?.user?.id;

    // 打印当前用户的ID
    console.log(staffId);

    // 调用配送模板地区服务的分页方法
    const data = await this?.deliveryTemplateLocaleService?.page?.(
      query,
      params,
      reqParam,
      page
    );

    // 返回分页结果
    return data;
  }

  /**
   * 根据ID获取配送模板地区信息
   * 
   * @param id - 配送模板地区ID
   * @returns 返回配送模板地区信息
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用配送模板地区服务的根据ID获取方法
    return await this?.deliveryTemplateLocaleService?.getById?.(id);
  }

  /**
   * 删除配送模板地区
   * 
   * @param ids - 配送模板地区ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', { middleware: [JwtPassportMiddleware] })
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用配送模板地区服务的删除方法
    await this?.deliveryTemplateLocaleService?.del?.(ids);

    // 返回空值
    return null;
  }

  /**
   * 更新配送模板地区信息
   * 
   * @param obj - 配送模板地区对象
   * @returns 返回更新结果
   */
  @All('/update.json', { middleware: [JwtPassportMiddleware] })
  public async update(@Body() obj: DeliveryTemplateLocale): Promise<any> {
    // 调用配送模板地区服务的更新方法
    return await this?.deliveryTemplateLocaleService?.update?.(obj);
  }
}
