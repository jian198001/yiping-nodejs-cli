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
import { DiscountCardService } from '../../../../../../module/trade/discountCard.service';
import { DiscountCard } from '../../../../../../entity/DiscountCard';

import { Context } from '@midwayjs/koa';

import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心折扣卡控制器
 */
@Controller('/staff/web/userCenter/card/discountCard', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterCardDiscountCardController {
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
   * 注入折扣卡服务
   */
  @Inject()
  private discountCardService: DiscountCardService = null;
  /**
   * 获取折扣卡分页列表
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
    console.log(staffId);

    // 调用折扣卡服务的分页方法
    const data = await this?.discountCardService?.page?.(query, params, reqParam, page);

    // 返回分页结果
    return data;
  }

  /**
   * 根据ID获取折扣卡信息
   * 
   * @param id - 折扣卡ID
   * @returns 返回折扣卡信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用折扣卡服务的根据ID获取方法
    return await this?.discountCardService?.getById?.(id);
  }

  /**
   * 删除折扣卡
   * 
   * @param ids - 折扣卡ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用折扣卡服务的删除方法
    await this?.discountCardService?.del?.(ids);

    // 返回空值
    return null;
  }

  /**
   * 更新折扣卡信息
   * 
   * @param obj - 折扣卡对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: DiscountCard): Promise<any> {
    // 调用折扣卡服务的更新方法
    return await this?.discountCardService?.update?.(obj);
  }
}
